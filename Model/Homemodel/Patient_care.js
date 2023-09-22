const mongoose=require('mongoose')


const PatientCareModel=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Short_Description:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('PatientCare',PatientCareModel)