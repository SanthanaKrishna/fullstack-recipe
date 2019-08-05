const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    instruction: {
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes:{
        type:Number,
        default: 0
    },
    userName:{
        type:String
    }
})



module.exports = mongoose.model('Recipe', RecipeSchema);