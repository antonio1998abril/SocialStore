const User = require("../Models/UserSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const controller = {
    register: async (req,res,next)=>{
        const {name,lastname,service,tel,email,password} = req.body
        const user =await User.findOne({email})
        console.log(req.body)
        if (user) return res.status(302).json({msg:"The user already exist"})

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            name, lastname, service, tel, email, password:passwordHash
        })
            await newUser.save().then(result => {
        
            const accesstoken = createAccessToken({id:newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            console.log(accesstoken)
            res.json({accesstoken})
        }).catch(next)
    },

    refreshToken: async(req,res,next) =>{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(302).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(302).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
        })
    },
    login: async(req,res,next) => {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        console.log(req.body)

        if(!user) return res.status(302).json({msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(302).json({msg: "Incorrect password."})

        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })

        res.json({accesstoken})
    },
    logout: async(req,res,next) => {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: "Logged out"})
    },
    getUser: async(req,res,next) => {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(302).json({msg: "User does not exist."})

        res.json(user)
    } 
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = controller