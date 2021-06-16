const Category = require("../Models/CategorySchema")
const Products = require("../Models/ProductSchema")

const controller = {
    getCategory: async (req,res,next)=>{
        await Category.find({user:req.user.id}).then(categories => {
            res.json(categories)
           }).catch(next) 
    },
    createCategory: async(req,res,next) =>{
        const {categoryName} = req.body;
        const category = await Category.findOne({categoryName,user:req.user.id})

        if(category) return res.json('ERROR')

        const newCateogry = new Category({categoryName,user:req.user.id})
        await newCateogry.save().then(result =>{
            res.json({msg:"Created a new Category"})
        }).catch(next)
    },
    deleteCategory: async(req,res,next) => {
        const products = await Products.findOne({category: req.params.id})
        if(products) return res.status(302).json({msg: "Please delete all products with the same relationship."})

        await Category.findByIdAndDelete(req.params.id).then(()=>{
            res.json({msg:"Deleted a Category"})
        }).catch(next) 
            
    },
    updateCateogry: async(req,res,next) => {
        const {categoryName} = req.body;
        await Category.findByIdAndUpdate({_id:req.params.id},{categoryName}).then(()=>{
                res.json({msg:"Updated category"})
            }).catch(next) 
    }
}
module.exports = controller