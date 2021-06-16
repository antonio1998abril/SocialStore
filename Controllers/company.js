const Company =require('../Models/CompanySchema')
const Products=require('../Models/ProductSchema')


const controller = {
    getCompany:async(req,res,next)=>{
            await Company.find({user:req.user.id}).then(companies => {
            res.json(companies)
           }).catch(next) 
    },
    createCompany:async(req,res,next)=>{
        const {companyName, ubication, companyService,openService, companyEmail, port}= req.body;
        const company = await Company.findOne({companyName},{user:req.user.id})
        
        if(company) return res.status(302).json({msg:"This company already exist"})
            const newCompany = new Company({
                companyName,ubication, companyService,openService, companyEmail, port,user:req.user.id})
        
        await newCompany.save().then(()=>{
            res.json({msg:"Created new company"})
        }).catch(next) 
    },
    deleteCompany:async(req,res,next)=>{
        const products = await Products.findOne({bycompany: req.params.id})
        if(products) return res.status(302).json({msg: "Please delete all products with the same relationship."})

        await Company.findByIdAndDelete(req.params.id).then(()=>{
            res.json({msg: "Deleted a Category"})
        }).catch(next) 
    },
    updateCompany:async(req,res,next)=>{
        const {companyName, ubication, companyService,openService, companyEmail, port} = req.body;
        await Category.findByIdAndUpdate({_id:req.params.id},{companyName, ubication, 
            companyService,openService, companyEmail, port}).then(()=>{
                res.json({msg:"Updated category"})
            }).catch(next) 
    }
}
module.exports = controller

