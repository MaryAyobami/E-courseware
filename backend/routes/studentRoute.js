const Student = require('../models/student')
const Token = require('../models/token');
const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwtDecode = require('jwt-decode')
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const axios = require('axios');
const dotenv = require('dotenv')
const randToken = require('rand-token'); 
const attachStudent = require('../auth/attachStudent')
dotenv.config()
// validation with joi
const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    matricnumber: Joi.string().min(6).required(),
    department: Joi.string().required(),
    email: Joi.string().required(),
    displayname: Joi.string().required(),
    level: Joi.number().required(),
    college: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).required()
})

const loginSchema = Joi.object({
    matricnumber: Joi.string().min(6).required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).required()
})
const SECRET = process.env.SECRET
//token
const generateToken = student => {
 
    const token = jsonwebtoken.sign({
    sub: student._id,
    email: student.email,
    aud: 'api.example.com',
    iss: 'api.example.com',
  }, SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  })
 
 
  return token
}


// routes

// registration
router.post('/api/register-student' , async(req,res)=>{
    // validation
    const { error } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try{
        const checkStudent = await Student.findOne({matricnumber: req.body.matricnumber})
        if(checkStudent){
            return res.status(400).send('Registration Failed! Matric Number already exists.')
        }
        else{
            //  hash passwords
            const salt = await bcrypt.genSalt(0)
            const hashedpassword = await bcrypt.hash(req.body.password,salt)
            
            const student = new Student({
                name : req.body.name,
                matricnumber : req.body.matricnumber, 
                email : req.body.email,
                password : hashedpassword,
                department : req.body.department,
                college : req.body.college,
                level: req.body.level,
                displayname: req.body.displayname

            })
            const newStudent = await student.save()

            if(newStudent){
                const accessToken = generateToken(newStudent);
                const decodedToken = jwtDecode(accessToken);
                const expiresAt = decodedToken.exp;

                res.status(201).json({
                    message: "You have successfully registered",
                    _id: newStudent.id,
                    department: newStudent.department,
                    accessToken,
                    expiresAt,
                    refreshToken: createRefreshToken(newStudent),
                   
                }) 
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(`An error ocurred. DETAILS : ${err}`);
    }
})

const getRefreshToken = () => randToken.uid(256)

// login
router.post('/api/login-student', async (req,res)=>{
    // validation
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const student = await Student.findOne({matricnumber : req.body.matricnumber})

    if(!student){
        return res.status(400).send('Incorrect matric number or password')
    }
    // check password validity
    const validPassword = await bcrypt.compare(req.body.password , student.password)
    if(!validPassword){
        return res.status(400).send('Invalid Password')
    }
    else{
        const accessToken = generateToken(student)
        const decodedAccessToken = jwtDecode(accessToken)
        const accessTokenExpiresAt = decodedAccessToken.exp
        const refreshToken = getRefreshToken(student)
    
        const storedRefreshToken = new Token({ refreshToken, user: student._id })
        await storedRefreshToken.save()
        res.status(200).json({
            message: "You have successfully log in",
            _id: student.id,
            department: student.department,
            accessToken,
            expiresAt: accessTokenExpiresAt,
            refreshToken
        })
    }
})

// refresh token
router.post('/api/refreshToken', async (req, res) => {
    const {refreshToken } = req.body
    try {
      const student = await Token.findOne({refreshToken}).select('student')
  
      if(!user) {
        return res.status(401).json({
          message: 'Invalid token'
        })
      }
  
      const existingUser = await Student.findOne({_id: user.student})
  
      if(!existingUser) {
        return res.status(401).json({
          message: 'Invalid token'
        })
      }
  
      const token = generateToken(existingUser)
      return res.json({accessToken: token})
    } catch (err) {
      return res.status(500).json({message: 'Could not refresh token'})
    }
  })

// profile
 router.get('/api/profile-student/:token',attachStudent,async(req,res)=>{
   try{
      const student = req.user.sub
      const studentProfile = await Student.findById(student)
      console.log(studentProfile)
      res.status(200).json({
        studentProfile
      })
   }
   catch(err){
    console.log(err)
    res.status(400).send(`An error ocurred. DETAILS : ${err}`);
   }
 })

module.exports= router