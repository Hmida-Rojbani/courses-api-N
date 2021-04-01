const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    title : {type: String, required : true},
    author : String,
    tags : [String],
    price : Number,
    isPublished : Boolean,
    date : {type : Date, default : Date.now()}
});

const Course = mongoose.model('Course',course_schema);

module.exports = Course;