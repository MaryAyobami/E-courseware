const Student = require('../models/student')
const express = require('express')
const router = express.Router()
const attachStudent = require('../auth/attachStudent')
const Resources = require('../models/resources')
const Lecturer = require('../models/lecturers')

// get course materials
router.get('/api/student-resources', attachStudent, async(req,res)=>{
    try{
        let resources;
        const student = req.user.sub
        const studentProfile = await Student.findById(student)
        console.log(studentProfile)      
        if (req.query.type == 'GNS'){
            resources = await Resources.find({type:req.query.type})
        } 
        else{
            resources = await Resources.find({level:studentProfile.level, department: studentProfile.department, type:req.query.type})
        }
     
        console.log(resources)
        res.status(200).send({
            resources: resources
        })
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

// get course materials
router.get('/api/lecturer-resources', attachStudent, async(req,res)=>{
    try{
        const lecturer = req.user.sub
        const lecturerProfile = await Lecturer.findById(lecturer)
        console.log(lecturerProfile)      
        const resources = await Resources.find({department: lecturerProfile.department, type:req.query.type})
        console.log(resources)
        res.status(200).send({
            resources: resources
        })
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})


module.exports = router