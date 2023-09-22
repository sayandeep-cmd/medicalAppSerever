const mongoose=require('mongoose')

const BannerSchema=mongoose.Schema({
    Banner_image:{
        type:String,
        required:[true,'Please add a banner image'],
    },
    Title:{
        type:String,
        required:[true,'Please add a title']
    },
    Short_description:{
        type : String ,
        maxlength:1024,
        required:true
    },
    Active:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model('Banner',BannerSchema)