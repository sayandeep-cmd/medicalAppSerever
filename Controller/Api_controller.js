const DoctorModel = require('../Model/Doctor')
const DepartmentModel = require('../Model/Department')
const AppointmentSchema = require('../Model/Appointment')
const BlogModel = require('../Model/Post/PostModel')
const commentModel = require('../Model/Post/Commentmodel')
const BannerModel=require('../Model/Homemodel/Banner')
const nodemailer = require('nodemailer')
const Banner = require('../Model/Homemodel/Banner')


const alldoctors = async (req, res) => {
    try {
        await DoctorModel.find().populate([{ path: 'Department' }]).then(data => {
            return res.status(200).json({ success: true, data: data, message: 'Fetched all doctor' })
        })
    } catch {
        return res.status(400).json({ success: false, message: "cant fetch doctors" })
    }
}

const singledoctor = async (req, res) => {
    const id = req.params.id
    try {
        await DoctorModel.findById(id).populate([{ path: "Department" }]).then(data => {
            return res.status(200).json({ success: true, data: data, message: 'Fetched single doctor' })
        })
    } catch {
        return res.status(400).json({ success: false, message: "cant fetch doctors" })
    }
}

const allDepartments = async (req, res) => {
    try {
        await DepartmentModel.find().then(data => {
            return res.status(200).json({ success: true, data: data, message: 'Fetched all departments' })
        })
    } catch {
        return res.status(400).json({ success: false, message: "cant fetch departments" })
    }
}
const singledepartment = async (req, res) => {
    const id = req.params.id
    try {
        await DepartmentModel.findById(id).then(data => {
            return res.status(200).json({ success: true, data: data, message: 'Fetched single department' })
        })
    } catch {
        return res.status(400).json({ success: false, message: "cant fetch department" })
    }
}

const Appointment = async (req, res) => {
    try {
        await new AppointmentSchema({
            Doctor_Name: req.body.Doctor_Name,
            date: req.body.date,
            time: req.body.time,
            name: req.body.name,
            phone: req.body.phone,
            message: req.body.message,
            Booking_Id: req.body.Booking_Id,
            Email: req.body.email
        }).save().then(data => {
            var transported = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "sayandeepdey8@gmail.com",
                    pass: "eazafqocuhbzxxdd",
                }
            });
            var mailoptions = {
                from: 'sayandeep@no-reply.com', // sender address
                to: data.Email, // list of receivers
                subject: "Appointment Booking Mail", // Subject line
                text: 'Hello ' + data.name + ',\n\n' + 'Please Check your Appointment under \n' + ' Doctor ' + data.Doctor_Name + ' at ' + data.time + ' on ' + data.date + '\n\nThank you\n\n'
            };
            transported.sendMail(mailoptions, function (err) {
                if (err) {
                    console.log("Technical Glitch");
                } else {
                    return res.status(200).json({ success: true, data: data, message: 'Appointment created successfully' })
                    console.log("Email Sent Successfully")
                }
            })
        }).catch(err => {
            console.log(err);
        })
    } catch {
        return res.status(400).json({ success: false, message: 'cant create appointment' })
    }
}

const getblog = async (req, res) => {
    try {
        await BlogModel.find().then(data => {
            return res.status(200).json({ success: true, data: data, message: 'blog fetched' })
        })
    } catch {
        return res.status(400).json({ success: false, message: 'Cant fetch blog' })
    }
}

const singleBlog = async (req, res) => {
    try {
        await BlogModel.findById(req.params.id).then(data => {
            return res.status(200).json({ success: true, data: data, message: 'Single blog fetched' })
        })
    } catch {
        return res.status(400).json({ success: false, message: 'cant fetch blog' })
    }
}

const createcomment = async (req, res) => {
    try {
        await new commentModel({
            postId: req.body.postId,
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        }).save().then(data => {
            return res.status(200).json({ success: true, data: data, message: 'new comment added' })
        }).catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
    } catch {
        return res.status(400).json({ success: false, message: "Internal Server Error" })
    }
}

const getcomments = async (req, res) => {
    try {
        await commentModel.find().populate([{ path: 'postId' }]).then(data => {
            return res.status(200).json({ success: true, data: data, message: 'comments fetched' })
        })
    } catch {
        return res.status(400).json({ success: false, message: "Server error" })
    }
}


const search = async (req, res) => {
    try {
        const { keyword } = req.params
        const resutls = await BlogModel
            .find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { postText: { $regex: keyword, $options: "i" } },
                ],
            })
            
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
}

const getbanner=async (req,res)=>{
    try{
    await BannerModel.find().then(data=>{
        return res.status(200).json({"success":true,data:data,message:'fetched'})
    })
    }catch(err){
        return res.status(400).json({'success':false,'message':'server error','error':err});
    }
}

const getappointments=async(req,res)=>{
    try{
        AppointmentSchema.find().then(data=>{
            return  res.status(200).json({"success":true,"data":data})
        })
    }catch{
        return   res.status(400).json("server error")
    }
}
module.exports = {
    alldoctors,
    singledoctor,
    allDepartments,
    singledepartment,
    Appointment,
    getblog,
    singleBlog,
    createcomment,
    getcomments,
    search,
    getbanner,
    getappointments
}