const mongoose = require ('mongoose')
const Company_Schema = require ('./Schemas/Company')


module.exports = mongoose.model('company',Company_Schema)