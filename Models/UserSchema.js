const mongoose = require ('mongoose')
const Users_Schema = require ('./Schemas/User')


module.exports = mongoose.model('user',Users_Schema)