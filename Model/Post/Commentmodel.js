const mongoose=require('mongoose')


const CommentModel=mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    comment: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://media.istockphoto.com/id/1389898125/photo/young-woman-chewing-gum-cute-iconic-character-3d-rendering.jpg?s=2048x2048&w=is&k=20&c=AIvEivO7BjTwE-QVOfVeS0BypDzFpq4Xt_KVxk8L0yg=',
        required:false
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('comment',CommentModel)