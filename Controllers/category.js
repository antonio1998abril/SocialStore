const Category = require("../Models/CategorySchema")
const Product = require("../Models/ProductSchema")

const controller = {
    getCategory: async (req,res,next)=>{
        await Category.find().then(result=>{
            res.json(result)
        }).catch(next)
    },
    createCategory: async(req,res,next) =>{
        const {categoryName} = req.body;
        const category = await Category.findOne({categoryName})

        if(category) return res.json('ERROR')

        const newCateogry = new Category({categoryName})
        await newCateogry.save().then(result =>{
            res.json(result)
        }).catch(next)
    },
    deleteCategory: async(req,res,next) => {
        
            
    },
    updateCateogry: async(req,res,next) => {
        
    }
}
module.exports = controller