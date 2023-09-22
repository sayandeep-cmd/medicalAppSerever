const mongoose=require('mongoose')


const Doctormodel=mongoose.Schema({
    Department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"department",
        required:true
    },
    Doctor_Name:{
        type : String ,
        required:true
    },
    About_myself:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
})


module.exports=mongoose.model('Doctor',Doctormodel)