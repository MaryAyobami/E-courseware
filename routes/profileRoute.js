const Student = require('../models/student')
const express = require('express')
const router = express.Router()
const attachStudent = require('../auth/attachStudent')


//get profile information
router.get('/api/profile', attachStudent, async(req, res)=>{
    try{
        const student = req.user.sub
        const studentProfile = await Student.findById(student)
        console.log(studentProfile)
        res.status(200).json({
          studentProfile
        })
    }
    catch(e){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

// edit  profile info
router.put('/api/edit-profile', attachStudent, async(req,res)=>{
    try{
        const {department,level,name,matricnumber,email} = req.body
        const lecturer = await Student.findByIdAndUpdate(req.user.sub,{department,level,name,matricnumber,email})
        res.status(200).send('Resourses saved sucessfully')
    }
    catch(e){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

module.exports = router