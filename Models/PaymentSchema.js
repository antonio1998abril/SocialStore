const mongoose = require ('mongoose')
const Payment_Schema = require ('./Schemas/Payment')


module.exports = mongoose.model('payment', Payment_Schema)