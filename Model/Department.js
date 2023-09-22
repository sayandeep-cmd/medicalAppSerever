const mongoose=require('mongoose')


const DepartmentModel=mongoose.Schema({
    Department_Name:{
        type:String,
        required:true
    },
    small_image:{
        type:String,
        required:true
    },
    big_image:{
        type:String,
        required:true
    },
    big_description:{
        type:String,
        required:true
    },
    services:{
        type:String,
        required:true
    },
    Department_no:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('department',DepartmentModel)