const ldap = require('ldapjs')
const error = require('../exception').error
const config = {
  ssoType: 'ldap',
    server: 'ldap://xx.xxx.com',
    bindDn: 'cn=readonly',
    baseDn: 'dc=xxx,dc=com',
    bindPassword: 'xxxxxx',
    searchDn: 'ou=users'
}

const client = ldap.createClient({
  url: config.server
})

function bind(dn, password, code, msg) {
  client.bind(dn, password, function(err) {
    if (err) {
      throw error(code, msg)
    }
  })
}

function search(email) {
  let user
  const opts = {
    filter: `(mail=${email})`,
    scope: 'sub', // 查询范围没有深度限制
    timeLimit: 500 // 查询超时时间
  }

  return new Promise(resolve => {
    client.search(`${config.searchDn},${config.baseDn}`, opts, function(
      err,
      res
    ) {
      // 查询结果事件响应
      res.on('searchEntry', function(entry) {
        user = entry.object
      })

      res.on('searchReference', function(referral) {
        console.log('referral: ' + referral.uris.join())
      })

      // 查询错误事件
      res.on('error', function() {
        client.unbind()
        throw error('LdapSearchError', 'ldap client search error')
      })

      // 查询结束
      res.on('end', function() {
        resolve(user)
        client.unbind()
      })
    })
  })
}

async function login(email, password) {
  bind(
    `${config.bindDn},${config.baseDn}`,
    config.bindPassword,
    'LdapBindFail',
    'ldap client bind failed'
  )
  const user = await search(email)
  if (user) {
    bind(
      `${user.dn}`,
      password,
      'IncorrectPassword',
      'login failed, incorrect password'
    )
  } else {
    throw error('InvalidUser', 'invalid user')
  }
  return user
}

// login('xxxxxx@rouchi.com', 'xxxxxx')
module.exports = login
