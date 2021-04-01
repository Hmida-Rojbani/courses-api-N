const mongoose = require('mongoose');
const Joi = require('joi');

const course_schema = new mongoose.Schema({
    title : {type: String, unique:true, required : true},
    author : String,
    tags : [String],
    price : {type : Number, required : function () { return this.isPublished }},
    isPublished : Boolean,
    date : {type : Date, default : Date.now()}
});

const Course = mongoose.model('Course',course_schema);

const course_validation_schema = Joi.object({
    title : Joi.string().max(40).min(5).required(),
    author : Joi.string().max(30).required(),
    tags : Joi.array().items(Joi.string().min(2)),
    price : Joi.number().positive().min(10).max(500),
    isPublished : Joi.boolean()
});

function course_validation(body) {
    return course_validation_schema.validate(body);
}

const course_validation_update_schema = Joi.object({
    title : Joi.string().max(40).min(5),
    author : Joi.string().max(30),
    tags : Joi.array().items(Joi.string().min(2)),
    price : Joi.number().positive().min(10).max(500),
    isPublished : Joi.boolean()
});

function course_validation_update(body) {
    return course_validation_update_schema.validate(body);
}

module.exports.Course = Course;
module.exports.course_validation = course_validation;
module.exports.course_validation_update = course_validation_update;