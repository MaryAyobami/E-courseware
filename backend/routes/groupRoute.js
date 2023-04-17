const Student = require('../models/student')
const express = require('express')
const router = express.Router()

// get single student
const getUserById = async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        return res.status(200).json(
            {
                success: true,
                student
            }
        )
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

const getAllUsers = async(req,res)=>{
    try{
        const students = await Student.find()
        return res.status(200).json(
            {
                success: true,
                students
            }
        )
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        });
    }
}


router.get('/api/single-student/:id', getUserById)
router.get('/api/all-students', getAllUsers)


module.exports = router