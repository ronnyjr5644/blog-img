const mongoose = require('mongoose')

//new mongoose.Schema is used to specify a data for our schema
const blogSchema=new mongoose.Schema({
    title:{ 
        type:String,
        unique: true
    },
    description: String,
    content: {
        type: String,
        required:[true, 'only string allowed' ] },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
});
//linking our schema to our model
const Blog=mongoose.model('Blog',blogSchema);

module.exports = Blog
