const router = require('express').Router();
const {Course, course_validation, course_validation_update} = require('../models/course');
const _ = require('lodash')

router.get('', async (req,res) =>{
    let courses = await Course.find();

    res.send(courses)
})

router.post('', async (req,res) =>{
    var valid_res = course_validation(req.body)
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let course = new Course(_.pick(req.body,['title','author','tags','price','isPublished']));
    try {
        await course.save();
    } catch (error) {
        res.status(400).send('Storage problem in DB : '+ error.message)
    }
    res.status(201).send(course)
})
// by Id
router.get('/id/:id', async (req,res) =>{
    try {
        var course = await Course.findById(req.params.id);
    } catch (error) {
        return res.status(400).send('Unaccepted Id');
    }
    if(!course)
        return res.status(404).send('Course with this id is not found');
    res.send(course)
})


// by title
router.get('/title/:title', async (req,res) =>{

        var courses = await Course.find({title : { $regex : '^'+req.params.title}});

    if(!courses)
        return res.status(404).send('Course with this title is not found');
    res.send(courses)
})
// with price in bounds
// eq (==) ; neq (!=)
// gt (>)  ; gte (>=)
// lt (<)  ; lte (<=)
// in : [ e1 , e2 ]  ||  nin  : [ e1 , e2 ]
router.get('/price/:min/:max', async (req,res) =>{

    var courses = await Course.find({price : { $lte : req.params.max,
        $gte : req.params.min  }});

if(!courses)
    return res.status(404).send('There are no courses between the given two prices');
res.send(courses)
});

// update Course 

router.put('/id/:id', async (req,res) =>{
    var valid_res = course_validation_update(req.body)
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    try {
        var course = await Course.findById(req.params.id);
    } catch (error) {
        return res.status(400).send('Unaccepted Id');
    }
    if(!course)
        return res.status(404).send('Course with this id is not found');
    // update
    course = _.merge(course,req.body);
    try {
        await course.save();
    } catch (error) {
        res.status(400).send('Storage problem in DB : '+ error.message)
    }
    res.send(course)
})
// delete  course
router.delete('/id/:id', async (req,res) =>{
    try {
        var course = await Course.findByIdAndDelete(req.params.id);
    } catch (error) {
        return res.status(400).send('Unaccepted Id');
    }
    if(!course)
        return res.status(404).send('Course with this id is not found');

    res.send(course)
})



module.exports = router;