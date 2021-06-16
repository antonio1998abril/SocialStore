const Port = require('../Models/PortSchema')

const Products = require('../Models/ProductSchema')
const Company = require('../Models/CompanySchema')
const Category = require('../Models/CategorySchema')
 
const controller = {
    getPort:async(req,res,next)=>{
            await Port.find({user:req.user.id}).then(ports => {
            res.json(ports)
           }).catch(next) 
    },
    createPort:async(req,res,next)=>{
        const {portName,description,ubication}= req.body;
        const port = await Port.findOne({portName},{user:req.user.id})
        
        if(port) return res.status(302).json({msg:"This port already exist"})
            const newPort = new Port({portName,user:req.user.id,description,ubication})
        
        await newPort.save().then(()=>{
            res.json({msg:"Created new Port"})
        }).catch(next) 
    },
    deletePort:async(req,res,next)=>{
        const products = await Products.findOne({port: req.params.id})
        if(products) return res.status(400).json({msg: "Please delete all products with the same relationship."})

        const company = await Company.findOne({port: req.params.id})
        if(company) return res.status(400).json({msg: "Please delete all companies with the same relationship."})

        const category = await Category.findOne({port: req.params.id})
        if(category) return res.status(400).json({msg: "Please delete all categories with the same relationship."})

        await Port.findByIdAndDelete(req.params.id).then(()=>{
            res.json({msg: "Port Deleted"})
        }).catch(next) 
    },
    updatePort:async(req,res,next)=>{
        const {portName} = req.body;
        await Port.findByIdAndUpdate({_id:req.params.id},{portName}).then(()=>{
                res.json({msg:"Updated port"})
            }).catch(next) 
    }
}
module.exports = controller

