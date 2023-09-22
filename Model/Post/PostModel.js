const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model("post", PostSchema);

