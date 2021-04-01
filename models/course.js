const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    title : {type: String, unique:true, required : true},
    author : String,
    tags : [String],
    price : {type : Number, required : function () { return this.isPublished }},
    isPublished : Boolean,
    date : {type : Date, default : Date.now()}
});

const Course = mongoose.model('Course',course_schema);

module.exports = Course;