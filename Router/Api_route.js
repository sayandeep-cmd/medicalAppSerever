const express=require('express')
const Api_router=express.Router()
const HomePageController=require('../Controller/HomePageController')
const Api_Controller=require('../Controller/Api_controller')
const Auth_controller=require('../Controller/Auth_Api_Controller')


// Authentication
Api_router.post('/register',Auth_controller.UserCreate)
Api_router.post('/login',Auth_controller.user_login)

Api_router.get('/GetBanner',HomePageController.GetBannerAPI)
Api_router.get('/GetPersonalCare',HomePageController.GetPersonalCareAPI)
Api_router.get('/GetPatientSection',HomePageController.GetPatientCaresectionAPI)

// Doctors
Api_router.get('/alldoctors',Api_Controller.alldoctors)
Api_router.get('/singledoctor/:id',Api_Controller.singledoctor)


// Category
Api_router.get('/alldepartments',Api_Controller.allDepartments)
Api_router.get('/singledepartment/:id',Api_Controller.singledepartment)

// Appointment
Api_router.post('/create/appointment',Api_Controller.Appointment)
Api_router.get('/allappointment',Api_Controller.getappointments)

// banner
Api_router.get('/getbanner',Api_Controller.getbanner)


// Blog
Api_router.get('/allblog',Api_Controller.getblog)
Api_router.get('/singleblog/:id',Api_Controller.singleBlog)
Api_router.get('/search/:keyword',Api_Controller.search)

// comment
Api_router.post('/create/comment',Api_Controller.createcomment)
Api_router.get('/allcomments',Api_Controller.getcomments)

module.exports=Api_router