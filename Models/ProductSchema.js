const mongoose = require ('mongoose')
const Product_Schema = require ('./Schemas/Product')


module.exports = mongoose.model('product', Product_Schema)