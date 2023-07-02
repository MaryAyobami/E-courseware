const Student = require('../models/student')
const express = require('express')
const router = express.Router()
const attachStudent = require('../auth/attachStudent')
const Lecturer = require('../models/lecturers')

// get course materials
router.get('/api/instructor-approval', attachStudent, async(req,res)=>{
    try{
        const student = req.user.sub
        const currentstudent = await Student.findById(student)
        console.log(currentstudent)      
        const lecturers = await Lecturer.find({ department: currentstudent.department})

        console.log(lecturers)

      
        res.status(200).send({
           lecturers: lecturers,
         
        })
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

router.get('/api/request-approval', attachStudent, async(req,res)=>{
    try{
        // const student = req.user.sub
        // const currentstudent = await Student.findById(student)
        // console.log(currentstudent)      
        const lecturer = await Lecturer.find({ email: req.body.email})

        console.log(lecturer)


        let message;

        if(!lecturer){
            return res.status(400).send('Lecturer email does not exist, check and try again')
        }
        else if(lecturer){
            res.status(200).send('Lecturer found')
        }
      
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})


module.exports = router