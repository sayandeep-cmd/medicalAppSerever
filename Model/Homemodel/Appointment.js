const mongoose=require('mongoose')


const AppointmentFormModel=mongoose.Schema({
    Department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    Doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    },
    Full_name:{
        type:String,
        required:true
    },
    Phone_Number:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Appointment',AppointmentFormModel)