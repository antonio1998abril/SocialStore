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
        const {portName,description,ubication,images}= req.body;
        const port = await Port.findOne({portName},{user:req.user.id})
        
        if(port) return res.status(302).json({msg:"This port already exist"})
            const newPort = new Port({portName,user:req.user.id,description,ubication,images})
        
        await newPort.save().then(()=>{
            res.json({msg:"Created new Port"})
        }).catch(next) 
    },
    deletePort:async(req,res,next)=>{
        const portName = await Port.findById(req.params.id).select('portName');

        const products = await Products.findOne({port: portName.portName})
        if(products) return res.status(302).json({msg: "Please delete all products with the same relationship."})

        const company = await Company.findOne({port: portName.portName})
        if(company) return res.status(302).json({msg: "Please delete all companies with the same relationship."})

        const category = await Category.findOne({port:portName.portName})
        if(category) return res.status(302).json({msg: "Please delete all categories with the same relationship."})

        await Port.findByIdAndDelete(req.params.id).then(()=>{
            res.json({msg: "Port Deleted"})
        }).catch(next) 
    },
    updatePort:async(req,res,next)=>{
        const {portName,description,ubication,images} = req.body;
        if (!portName || !ubication  || !description || !images) return res.status(302).json({msg:"Complete all fields correctly."})
        await Port.findByIdAndUpdate({_id:req.params.id},{portName,ubication,description,images}).then(()=>{
                res.json({msg:"Updated port"})
            }).catch(next) 
    }
}
module.exports = controller

