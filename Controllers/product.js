const Product = require('../Models/ProductSchema')

class APIfeature{
    constructor(query,queryString){
        this.query=query;
        this.queryString = queryString
    }
    filter(){
        const queryObj = { ...this.queryString}
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach( e => delete (queryObj[e]))

        let queryStr = JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
        }else{
            this.query=this.query.sort('-createdAt')
        }
        return this;

    }
}
const controller = {

}
module.exports = controller