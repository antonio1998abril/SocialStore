const Product = require('../Models/ProductSchema')
const User = require('../Models/UserSchema')
const Company = require('../Models/CompanySchema')

const Port = require ('../Models/PortSchema')
const Categories = require ('../Models/CategorySchema')

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

        function getsize(result){
            resultSize = Object.keys(result)
            return resultSize.length
        }
        
       await  Product.find({ $or:[{title:{$regex:search,$options:'i'}},{description:{$regex:search,$options:'i'}}, 
          /*  {price: {$gte:searchnumber}} */{content:{$regex:search,$options:'i'}} 
        ]})
        .lean()
        .populate({path:'user',model:'user'}).then((result)=>{
            if(!result || 0 === result.length){
                User.find({$or:[{name:{$regex:search, $options:'i'}}, {ocupation:{$regex:search,$options:'i'}},
                    {email:{$regex:search,$options:'i'}}, {service:{$regex:search,$options:'i'}},
                    {tel:{$regex:search,$options:'i'}}
            ]})
            .lean()
                .then(result=>{
                    if(!result || 0 === result.length){
                        Company.find({ $or:[{companyName:{$regex:search,$options:'i'}},{ubication:{$regex:search,$options:'i'}}, 
                        {companyEmail:{$regex:search,$options:'i'}}  
                        ]})
                        .lean()
                        .then(result =>{
                            if(!result || 0 === result.length){
                                 Port.find({ $or:[{portName:{$regex:search,$options:'i'}},{description:{$regex:search,$options:'i'}}, 
                                {ubication:{$regex:search,$options:'i'}}  
                                ]})
                                .lean()
                                .then(result =>{
                                    if(!result || 0 === result.length){
                                        Categories.find({portName:{$regex:search,$options:'i'}})
                                        .lean()
                                        .then(result => {
                                            if(!result || 0 === result.length){
                                                return res.status(302).json({msg:"we can't find anything"}) 
                                            }else{
                                                return res.json({
                                                    result,
                                                })
                                            }
                                        })
                                    }else{
                                        return res.json({result})
                                    }
                                }) 
                            }else{
                                return res.json({result})
                            }
                        })
                    }else{
                        return res.json({result})
                    }
                })
            }else{
                return res.json({
                    result,
                    size:getsize(result)
                })
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
        const {title,price,description,content,category,port,bycompany,images} = req.body;
        const product = await Product.findOne({title})
        
        if (product) return res.status(400).json({msg:"This product already exists."})
        if (!title || !price  || !description  || !content || !images) return res.status(302).json({msg:"Complete all fields correctly."})

        const newProduct = new Product({
            price,title:title.toLowerCase(),description,content,category,port,bycompany,byuser:req.user.id,images
            })

            await newProduct.save().then(function(){
                res.json({msg:"created a new product"})
            })
    },
    deleteProduct: async(req,res,next) => {
        await Product.findByIdAndDelete(req.params.id).then(() =>{
            res.json({msg:"deleted"})
        }).catch(next)
    },

    updateProduct:async(req,res) => {
        const {title,price,description,content,images,category,port,bycompany}=req.body;
        if (!title || !price  || !description  || !content || !images) return res.status(302).json({msg:"Complete all fields correctly."})
        
        await Product.findByIdAndUpdate({_id:req.params.id},{
            title:title.toLowerCase(),price,description,content,images,category,port,bycompany
        })
        res.json({msg:"Updated prodct"})
    },

    finddetail:async(req,res) => {
        try{
            const ProductResult = await Product.findById({_id:req.params.id})
        const UserResult = await  User.findById({_id:req.params.id})
        const CompanyResult = await  Company.findById({_id:req.params.id})
        const PortResult = await Port.findById({_id:req.params.id})
        const CategoryResult = await Categories.findById({_id:req.params.id})

        return (ProductResult ? res.json(ProductResult) : UserResult ? res.json(UserResult) :
                CompanyResult ? res.json(CompanyResult) : PortResult ? res.json(PortResult) :
                CategoryResult ?res.json(CategoryResult) : res.status(302).json({msg:"!UPS, something was wrong"})
        
        );
        }catch(err){
            return res.status(302).json({msg:"!UPS, something was wrong"})
        }
        
    }
}
module.exports = controller


