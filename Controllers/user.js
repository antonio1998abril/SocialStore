const User = require("../Models/UserSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const controller = {
    register: async (req,res,next)=>{
        const {name,lastname,service,tel,email,password,repeat} = req.body
        if (password != repeat) return res.status(302).json({msg:"Password doen't match"})

        const user =await User.findOne({email})
        if (user) return res.status(302).json({msg:"The user already exist"})

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            name, lastname, service, tel, email, password:passwordHash
        })
            await newUser.save().then(result => {
        
            const accesstoken = createAccessToken({id:newUser._id, email:newUser.email})
            const refreshtoken = createRefreshToken({id: newUser._id, email:newUser.email})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            res.json({accesstoken})
        }).catch(next)
    },

    refreshToken: async(req,res,next) =>{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(302).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(302).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id, email:user.email})
            console.log("acceso",accesstoken)
            res.json({accesstoken})
        })
    },
    login: async(req,res,next) => {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user) return res.status(302).json({msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(302).json({msg: "Incorrect password."})

        const accesstoken = createAccessToken({id: user._id, email:user.email})
        const refreshtoken = createRefreshToken({id: user._id, email:user.email})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
        res.json({accesstoken})
    },
    logout: async(req,res,next) => {
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
        return res.json({msg: "Logged out"})
    },
    getUser: async(req,res,next) => {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(302).json({msg: "Error to get user."})

        res.json(user)
    },
    /* get user info */
    updateConfig:async(req,res)=>{
        
    },
    /* ******* */ 
    /* CART */
    addCart: async(req,res)=>{
        try{
            const user=await User.findById(req.user.id)
            if(!user){
                return res.status(400).json({msg:"User doesnt exist"})
            }
            console.log("User",user)
            await User.findByIdAndUpdate({_id:req.user.id},{
                cart:req.body.cart
            })
                return res.json({msg:"Added to cart"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    history:async(req,res)=>{
        try{
            const history =await Payments.find({user_id:req.user.id})
            res.json(history)
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = controller