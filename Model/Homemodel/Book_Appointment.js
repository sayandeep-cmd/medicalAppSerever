const mongoose=require('mongoose')


const BookAppointmentSectionModel=mongoose.Schema({
    Image:{
        type:String,
        required:true
    },
    Phone_Number:{
        type:String,
        required:true,
        default:'+91 8240718652'
    },
    Title:{
        type:String,
        required:true
    },
    Small_Paragraph:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Book_Appointment_Section',BookAppointmentSectionModel)