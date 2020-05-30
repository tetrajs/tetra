module.exports.config = require('./setup')
module.exports.config = require('./informations')

module.exports.install = require('./module/install')
module.exports.remove = require('./module/remove')
module.exports.link = require('./module/link')
module.exports.unlink = require('./module/unlink')

module.exports.model = require('./database/model')
module.exports.reset = require('./database/reset')
module.exports.seed = require('./database/seed')