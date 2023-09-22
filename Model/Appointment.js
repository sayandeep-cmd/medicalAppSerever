const mongoose=require('mongoose')


const AppointmnetSchema=mongoose.Schema({
    Doctor_Name:{
        type:String,
        required :true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    Booking_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    Email:{
        type: String ,
        required: true
    }
})

module.exports=mongoose.model('appointment',AppointmnetSchema)