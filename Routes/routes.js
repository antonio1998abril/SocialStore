const express =require('express');
const CategoryController = require('../Controllers/category')
const UserController = require('../Controllers/user')
const ProductController = require ('../Controllers/product')
const auth = require('../middleware/auth')

const routes = {
    category: express.Router()
    .get('/get',CategoryController.getCategory)
    .post('/create',CategoryController.createCategory),

    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)

    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser),

    product: express.Router()


}

module.exports = routes