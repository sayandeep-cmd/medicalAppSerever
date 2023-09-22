const mongoose=require('mongoose')


const TestimonialModel=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Review:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Testimonial',TestimonialModel)