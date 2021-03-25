const router = require('express').Router();
const Course = require('../models/course');
const _ = require('lodash')

router.get('', async (req,res) =>{
    let courses = await Course.find();

    res.send(courses)
})

router.post('', async (req,res) =>{
    let course = new Course(_.pick(req.body,['title','author','tags','price','isPublished']));
    await course.save();
    res.status(201).send(course)
})

module.exports = router;