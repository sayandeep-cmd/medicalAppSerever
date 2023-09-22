const express=require('express')
const Admin_router=express.Router()
const AdminController=require('../Controller/AdminController')
const admin_verify=require('../middleware/Authentication')
const multer=require('multer')
const upload=multer();

Admin_router.get('/',AdminController.signIn)
Admin_router.get('/dashboard',[admin_verify.tokenverification],AdminController.adminauth,AdminController.dashboard)
Admin_router.get('/banner',[admin_verify.tokenverification],AdminController.adminauth,AdminController.banner)
Admin_router.get('/banner/active/:id',AdminController.activatebanner)
Admin_router.get('/banner/delete/:id',AdminController.deletebanner)
Admin_router.get('/Department',[admin_verify.tokenverification],AdminController.adminauth,AdminController.Department)
Admin_router.get('/Department/:id',AdminController.deletedepartment)
Admin_router.get('/Doctors',[admin_verify.tokenverification],AdminController.adminauth,AdminController.doctors)
Admin_router.get('/Doctors/:id',AdminController.deletedoctor)
Admin_router.get('/blog',[admin_verify.tokenverification],AdminController.adminauth,AdminController.blog)
Admin_router.get('/logout',AdminController.logout)   
Admin_router.post('/login/admin',AdminController.loginadmin)

// Department
Admin_router.post('/create/department',AdminController.createdepartment)
Admin_router.post('/create/banner',AdminController.createbanner)
Admin_router.post('/create/doctor',AdminController.createdoctor)
Admin_router.post('/create/blog',AdminController.createpost)



module.exports=Admin_router