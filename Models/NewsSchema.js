const mongoose = require ('mongoose')
const News_Schema = require ('./Schemas/News')


module.exports = mongoose.model('news', News_Schema)