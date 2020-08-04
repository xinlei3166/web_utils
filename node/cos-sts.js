const STS = require('qcloud-cos-sts')
const { error } = require('../exception')
const errorCode = require('../exception/error-code')
const { COS_SECRET_ID, COS_SECRET_KEY } = require('../settings')

// 允许的存储桶
const buckets = ['xxxxxx', 'xxxxxx']
// 允许的区域
const regions = ['ap-shanghai']

// 配置参数
const config = {
  secretId: COS_SECRET_ID,
  secretKey: COS_SECRET_KEY,
  proxy: '',
  durationSeconds: 1800,

  // 放行判断相关参数
  bucket: '',
  region: '',
  allowPrefix: '', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
  // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
  allowActions: [
    // 简单上传
    'name/cos:PutObject',
    'name/cos:PostObject',
    // 分片上传
    'name/cos:InitiateMultipartUpload',
    'name/cos:ListMultipartUploads',
    'name/cos:ListParts',
    'name/cos:UploadPart',
    'name/cos:CompleteMultipartUpload'
  ]
}

function getPolicy() {
  let shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf('-'))
  let appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'))
  return {
    version: '2.0',
    statement: [
      {
        action: config.allowActions,
        effect: 'allow',
        principal: { qcs: ['*'] },
        resource: [
          'qcs::cos:' +
            config.region +
            ':uid/' +
            appId +
            ':prefix//' +
            appId +
            '/' +
            shortBucketName +
            '/' +
            config.allowPrefix
        ]
      }
    ]
  }
}

/**
 * 获取临时密钥
 * @param options
 * options.bucket: 存储桶
 * options.region: 区域
 * @returns {Promise<Object>}
 */
function getSTSTempSecret(options) {
  const { bucket, region } = options

  if (!buckets.includes(bucket)) {
    throw error(errorCode.InvalidParams, 'bucket 参数错误')
  }

  if (!regions.includes(region)) {
    throw error(errorCode.InvalidParams, 'region 参数错误')
  }

  config.bucket = bucket
  config.region = region

  return new Promise((resolve, reject) => {
    STS.getCredential(
      {
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy: getPolicy()
      },
      function(err, tempKeys) {
        if (err) {
          reject(
            error(
              errorCode.AcquireCosSecretFail.code,
              errorCode.AcquireCosSecretFail.msg
            )
          )
        } else {
          resolve(tempKeys)
        }
      }
    )
  })
}

// usages
// getSTSTempSecret({ bucket: 'xxxxxx', region: 'ap-shanghai' })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })

module.exports = {
  getSTSTempSecret
}
