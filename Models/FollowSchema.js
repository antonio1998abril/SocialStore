const mongoose = require ('mongoose')
const Follow_Schema = require ('./Schemas/Follow')


module.exports = mongoose.model('follow', Follow_Schema)