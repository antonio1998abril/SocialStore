const mongoose = require ('mongoose')
const Port_Schema = require ('./Schemas/Port')


module.exports = mongoose.model('port', Port_Schema)