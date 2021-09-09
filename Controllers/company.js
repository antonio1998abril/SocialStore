const Company =require('../Models/CompanySchema')
const Products=require('../Models/ProductSchema')


const controller = {
    getCompany:async(req,res,next)=>{
            await Company.find({user:req.user.id}).then(companies => {
            res.json(companies)
           }).catch(next) 
    },
    createCompany:async(req,res,next)=>{
        const {companyName, ubication, companyService,openService, companyEmail, port,tel}= req.body;
        const company = await Company.findOne({companyName},{user:req.user.id})
        
        if(company) return res.status(302).json({msg:"This company already exist"})
            const newCompany = new Company({
                companyName,ubication, companyService,openService, companyEmail, port,user:req.user.id,tel})
        
        await newCompany.save().then(()=>{
            res.json({msg:"Created new company"})
        }).catch(next) 
    },
    deleteCompany:async(req,res,next)=>{
        const  companyName = await Company.findById(req.params.id).select('companyName');

        const products = await Products.findOne({bycompany:companyName.companyName})
        if(products) return res.status(302).json({msg: "Please delete all products with the same relationship."})

        await Company.findByIdAndDelete(req.params.id).then(()=>{
            res.json({msg: "Deleted a Category"})
        }).catch(next) 
    },
    updateCompany:async(req,res,next)=>{
        const {companyName, ubication, companyService,openService, companyEmail, port,tel} = req.body;
        await Company.findByIdAndUpdate({_id:req.params.id},{companyName, ubication, 
            companyService,openService, companyEmail, port ,tel}).then(()=>{
                res.json({msg:"Updated category"})
            }).catch(next) 
    }
}
module.exports = controller

