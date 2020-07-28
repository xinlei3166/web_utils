const Hashids = require('hashids/cjs')
const settings = require('../settings')
const hashids = new Hashids(settings.HASH_KEY)

function hashidEncode(id) {
  return hashids.encode(id)
}

function hashidDecode(hashid) {
  return hashids.decode(hashid)[0]
}

module.exports = {
  hashidEncode,
  hashidDecode
}
