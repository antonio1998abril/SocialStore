const express =require('express');
const UserController = require('../Controllers/user')
const ProductController = require ('../Controllers/product')
const CompanyController = require ('../Controllers/company')
const PortController = require('../Controllers/port')
const CategoryController = require('../Controllers/category')
const auth = require('../middleware/auth');


const routes = {
    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)
    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser),

    product: express.Router()
    .get('/getPro',ProductController.getProducts)
    .get('/getanything',ProductController.getanything)
    .get('/adminProducts',auth,ProductController.getAdminProducts)
    .post('/createPro',auth,ProductController.createProducts)
    .delete('/deletePro/:id',ProductController.deleteProduct),

    company: express.Router()
    .get('/getCompany',auth,CompanyController.getCompany)
    .post('/createCompany',auth,CompanyController.createCompany)
    .delete('/Companyde/:id',CompanyController.deleteCompany)
    .put('/CompanyUp/:id',auth,CompanyController.updateCompany),

    category: express.Router()
    .get('/getCategory',auth,CategoryController.getCategory)
    .post('/createCategory',auth,CategoryController.createCategory)
    .delete('/deleteCategory/:id',CategoryController.deleteCategory)
    .put('/updateCategory/:id',auth,CategoryController.updateCateogry),

    port: express.Router()
    .get('/getPorts',auth,PortController.getPort)
    .post('/createPort',auth,PortController.createPort)
    .delete('/deletePort/:id',PortController.deletePort)
    .put('/updatePort/:id',auth,PortController.updatePort)
}

module.exports = routes
