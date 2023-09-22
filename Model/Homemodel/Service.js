const mongoose=require('mongoose')

const ServiceSchema=mongoose.Schema({

    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    small_description:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Service',ServiceSchema)