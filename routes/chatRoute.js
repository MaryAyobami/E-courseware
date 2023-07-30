const Student = require('../models/student')
const express = require('express')
const router = express.Router()
const Lecturer = require('../models/lecturers')
const attachStudent = require('../auth/attachStudent')
const Resources = require('../models/resources')

// get course materials
router.get('/api/forum-members', attachStudent, async(req,res)=>{
    try{
        const student = req.user.sub
        const currentstudent = await Student.findById(student)
        console.log(currentstudent)      
        if(currentstudent){
            const allstudent = await Student.find({level: req.query.level, department: currentstudent.department})
            const otherusers = allstudent.filter((item)=> item.matricnumber != currentstudent.matricnumber)
             res.status(200).send({
                users: otherusers,
                currentuser: currentstudent
             })
        }

        else{
            const currentstudent = await Lecturer.findById(student)
            let members = []
            const allstudent = await Student.find({level: req.query.level, department: currentstudent.department})
            const otherusers = await Lecturer.find({department: currentstudent.department})

            members = [... allstudent,...otherusers]

           console.log(members)
             res.status(200).send({
                users: members,
                currentuser: currentstudent
             })
        }
       
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

module.exports = router