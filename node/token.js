const jwt = require('jsonwebtoken')
const shortuuid = require('short-uuid')

const key = require('../settings').SECRET_KEY
const error = require('../exception').error
const errorCode = require('../exception/error-code')

class JWT {
  /**
   * JSON Web Token
   * usages:
   *  const t = new JWT()
   *  const token = t.encode(key, { sub: 111, expiresIn: 1 })
   *  const payload = t.decode(key, token)
   *  const accessToken = t.generateAccessToken({ sub: 111 })
   *  const refreshToken = t.generateRefreshToken({ sub: 111, expiresIn: 1 })
   *  const newAccessToken = t.refreshAccessToken(accessToken)
   * eg:
   *  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJ2akpncDhXOWQ0d05GaGlYcDlWcFVjIiwiaXNzIjoiUm91Y2hpIEZlZCIsImlhdCI6MTU5NTU3OTgwODQxMSwiZXhwIjoxNTk1NTc5ODA4NDEzLCJhdWQiOiJmZWQtd2ViIiwic3ViIjoicm91Y2hpIiwiZXhwaXJlc0luIjoyfQ.8E6agqiyOB6luzi50uPAoxKlPWe-cdMB-J5EIkWod9s
   */
  constructor() {
    this._alg = 'HS256'
    this._typ = 'JWT'
    this._iss = 'XianLing'
    this.accessExpiresIn = 3600 * 24
    this.refreshExpiresIn = 3600 * 24 * 30
  }

  // 声明加密的算法 通常直接使用 HMAC SHA256
  get alg() {
    return this._alg
  }

  // 声明类型，这里是jw
  get typ() {
    return this._typ
  }

  // 签发者
  get iss() {
    return this._iss
  }

  // 唯一身份标识
  get jti() {
    return this.generateJti()
  }

  // 签发时间
  get iat() {
    return this.generateTimestamp()
  }

  generateJti() {
    return shortuuid.generate()
  }

  generateTimestamp() {
    return Math.floor(new Date().valueOf() / 1000)
  }

  /**
   * 信息体
   * @param payload
   * payload.nbf (Not Before)：如果当前时间在nbf里的时间之前，则Token不被接受；一般都会留一些余地，比如几分钟，是否使用是可选的；
   * payload.jti: jwt的唯一身份标识，主要用来作为一次性token，从而回避重放攻击。
   * payload.iss: 该JWT的签发者，是否使用是可选的。
   * payload.sub: 该JWT所面向的用户，是否使用是可选的。
   * payload.iat(issued at): 在什么时候签发的(UNIX时间)，是否使用是可选的。
   * payload.exp(expires): 什么时候过期，这里是一个Unix时间戳，是否使用是可选的。
   * payload.aud: 接收该JWT的一方，是否使用是可选的。
   * payload.scopes: 授权域
   * @returns payload
   */
  buildPayload(payload) {
    const expiresIn = payload.expiresIn
    delete payload.expiresIn
    return {
      jti: this.jti,
      iss: this.iss,
      iat: this.iat,
      exp: this.iat + expiresIn,
      aud: 'fed-web',
      sub: payload.sub,
      tokenType: payload.tokenType,
      scopes: payload.scopes,
      ...payload
    }
  }

  encode(key, payload) {
    return jwt.sign(this.buildPayload(payload), key, {
      algorithm: this.alg,
      header: { typ: this.typ, alg: this.alg }
    })
  }

  _verify(key, token) {
    try {
      return jwt.verify(token, key)
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw error(
          errorCode.TokenExpiresError.code,
          errorCode.TokenExpiresError.msg
        )
      } else {
        // JsonWebTokenError
        throw error(
          errorCode.InvalidTokenError.code,
          errorCode.InvalidTokenError.msg
        )
      }
    }
  }

  _decode(token) {
    try {
      const decoded = jwt.decode(token, { complete: true })
      return decoded.payload
    } catch (err) {
      throw error(
        errorCode.InvalidTokenError.code,
        errorCode.InvalidTokenError.msg
      )
    }
  }

  decode(key, token, verify = true) {
    let payload
    if (verify) {
      payload = this._verify(key, token)
    } else {
      payload = this._decode(token)
    }
    if (payload) {
      if (this.verifyJti(payload.jti) && this.verifySub(payload.sub)) {
        return payload
      }
    }
  }

  verifyJti(jti) {
    if (!jti) {
      throw error(errorCode.InvalidTokenError.code, 'invalid token jti')
    }
    return true
  }

  verifySub(sub) {
    if (!sub) {
      throw error(errorCode.InvalidTokenError.code, 'invalid token sub')
    }
    return true
  }

  processPayload(payload, tokenType) {
    const expiresInType = {
      accessToken: this.accessExpiresIn,
      refreshToken: this.refreshExpiresIn
    }
    const expiresIn = payload.expiresIn || expiresInType[tokenType]
    return {
      sub: payload.sub || '',
      expiresIn,
      scopes: payload.scopes || [],
      tokenType,
      ...payload
    }
  }

  // 生成访问token
  generateAccessToken(payload) {
    return this.encode(key, this.processPayload(payload, 'accessToken'))
  }

  // 生成刷新token
  generateRefreshToken(payload) {
    return this.encode(key, this.processPayload(payload, 'refreshToken'))
  }

  refreshAccessToken(refreshToken, payload = {}) {
    const refreshPayload = this.decode(key, refreshToken)
    const { sub, scopes } = refreshPayload
    return this.generateAccessToken({ sub, scopes, ...payload })
  }
}

module.exports = new JWT()
