const Student = require('../models/student')
const express = require('express')
const router = express.Router()
const attachStudent = require('../auth/attachStudent')
const Resources = require('../models/resources')

// get course materials
router.get('/api/student-resources', attachStudent, async(req,res)=>{
    try{
        const student = req.user.sub
        const studentProfile = await Student.findById(student)
        console.log(req.query.type)

        const resources = await Resources.find({level:studentProfile.level, department: studentProfile.department, type:req.query.type})
        res.status(200).send({
            resources: resources
        })
    }

    catch(err){
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

module.exports = router