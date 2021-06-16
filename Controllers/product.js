const Product = require('../Models/ProductSchema')
const User = require('../Models/UserSchema')
const Company = require('../Models/CompanySchema')

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
            queryStr = `{"or":[`+queryStr+`]}`;

        queryStr = JSON.stringify(queryStr.replace(/\b(gte|gt|lt|lte|regex|or)\b/g,match=>'$'+match))
            queryStr = JSON.parse(queryStr)
            queryStr = queryStr.replace(/"/g, "'").replace(/'title'/g, "title").replace(/'description'/g, "description");

        const searchquery = queryStr.split(',')
            let searchtitle = searchquery[0]
            let descriptionvalue = searchquery[1]

            searchtitle = searchtitle +`}`
            descriptionvalue = '{'+descriptionvalue 

        let search = searchtitle +','+ descriptionvalue; 
            search = search.replace(/'/g, '"').replace(/title/g, '"title"').replace(/description/g, '"description"');

        this.query.find(JSON.parse(search))
        return this;
    }
  //  filterbydescription(){
  //      const queryObj = { ...this.queryString}
  //      const excludedFields = ['page', 'sort', 'limit']
  //      excludedFields.forEach( e => delete (queryObj[e]))

 //       let queryStr = JSON.stringify(queryObj)
 //       queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)

//        this.query.find(JSON.parse(queryStr))
//        return this;
//    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
        }else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page=this.queryString.page *1||1
        const limit=this.queryString.limit * 1||6
        const skip =(page -1)*limit;
        this.quey=this.query.skip(skip).limit(limit)
        return this;
    }
}
const controller = {
    getanything:async(req,res,next) =>{
        const search = req.query.SearchG
        const searchnumber = Number(search)

        Product.find({ $or:[{title:{$regex:search,$options:'i'}},{description:{$regex:search,$options:'i'}}, 
          /*  {price: {$gte:searchnumber}} */{content:{$regex:search,$options:'i'}} 
        ]})
        .lean()
        .populate({path:'user',model:'user'}).then((post)=>{
            if(!post || 0 === post.length){
                User.find({$or:[{name:{$regex:search, $options:'i'}}, {ocupation:{$regex:search,$options:'i'}},
                    {email:{$regex:search,$options:'i'}}, {service:{$regex:search,$options:'i'}},
                    {tel:{$regex:search,$options:'i'}}
            ]})
            .lean()
                .then(post=>{
                    if(!post || 0 === post.length){
                        Company.find({ $or:[{companyName:{$regex:search,$options:'i'}},{ubication:{$regex:search,$options:'i'}}, 
                        {companyEmail:{$regex:search,$options:'i'}}  
                        ]})
                        .lean()
                        .then(post =>{
                            if(!post || 0 === post.length){
                                return res.status(302).json({msg:"we can't find anything"})

                            }else{
                                return res.json({post})
                            }
                        })
                    }else{
                        return res.json({post})
                    }
                })
            }else{
                return res.json({post})
            }
        })
    },

    getProducts:async(req,res,next) => {
        const features = new APIfeature(Product.find().lean(),req.query)
        .filter().sort().paginating()
            await features.query.then((products)=> {
            res.json({
                status:'success',
                result:products.length,
                products:products
            })
        }).catch(next)
    },

    getAdminProducts:async(req,res,next) =>{
        console.log("usuario", req.user.id)
        await Product.find({byuser:req.user.id}).then(products => {
            res.json(products)
           }).catch(next) 
    },

    createProducts: async(req,res,next) => {
        const {title,price,description,content,category,port,bycompany} = req.body;
        const product = await Product.findOne({title})
            if (product) return res.status(400).json({msg:"This product already exists."})
        
        const newProduct = new Product({
            price,title:title.toLowerCase(),description,content,category,port,bycompany,byuser:req.user.id
            })
            await newProduct.save().then(function(){
                res.json({msg:"created a new product"})
            }).catch(next)
    },
    deleteProduct: async(req,res,next) => {
        await Product.findByIdAndDelete(req.params.id).then(() =>{
            res.json({msg:"deleted"})
        }).catch(next)
           
    }
}
module.exports = controller


