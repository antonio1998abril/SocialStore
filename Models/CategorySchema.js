const mongoose = require ('mongoose')
const Category_Schema = require ('./Schemas/Category')


module.exports = mongoose.model('category', Category_Schema)