const Lecturer = require('../models/lecturers')
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
    department: Joi.string().required(),
    email: Joi.string().required(),
    college: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).required()
})

const loginSchema = Joi.object({
    email: Joi.string().required().messages({"any.required": "Email is required!"}),
    password: Joi.string().required()
})
const SECRET = process.env.SECRET
//token
const generateToken = lecturer => {
 
    const token = jsonwebtoken.sign({
    sub: lecturer._id,
    email: lecturer.email,
    aud: 'api.example.com',
    iss: 'api.example.com',
  }, SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256'
  })
 
  return token
}


const createRefreshToken = () => randToken.uid(256)
// routes

// registration
router.post('/api/register-lecturer' , async(req,res)=>{
    // validation
    const { error } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try{
        const checkLecturer = await Lecturer.findOne({email: req.body.email})
        if(checkLecturer){
            return res.status(400).send('Registration Failed! Email already exists.')
        }
        else{
            //  hash passwords
            const salt = await bcrypt.genSalt(0)
            const hashedpassword = await bcrypt.hash(req.body.password,salt)
            
            const lecturer = new Lecturer({
                name : req.body.name,
                email : req.body.email,
                password : hashedpassword,
                department : req.body.department,
                college : req.body.college,
                token: req.body.token,

            })
            const newLecturer = await lecturer.save()

            if(newLecturer){
                const accessToken = generateToken(newLecturer);
                const decodedToken = jwtDecode(accessToken);
                const expiresAt = decodedToken.exp;

                res.status(201).json({
                    message: "You have successfully registered",
                    _id: newLecturer.id,
                    department: newLecturer.department,
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
router.post('/api/login-lecturer', async (req,res)=>{
    // validation
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const lecturer = await Lecturer.findOne({email : req.body.email})

    if(!lecturer){
        return res.status(400).send('Incorrect matric number or password')
    }
    // check password validity
    const validPassword = await bcrypt.compare(req.body.password , lecturer.password)
    if(!validPassword){
        return res.status(400).send('Invalid Password')
    }
    else{
        const accessToken = generateToken(lecturer)
        const decodedAccessToken = jwtDecode(accessToken)
        const accessTokenExpiresAt = decodedAccessToken.exp
        const refreshToken = getRefreshToken(lecturer)
    
        const storedRefreshToken = new Token({ refreshToken, user: lecturer._id })
        await storedRefreshToken.save()
        res.status(200).json({
            message: "You have successfully log in",
            _id: lecturer.id,
            department: lecturer.department,
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
      const lecturer = await Token.findOne({refreshToken}).select('lecturer')
  
      if(!user) {
        return res.status(401).json({
          message: 'Invalid token'
        })
      }
  
      const existingUser = await Lecturer.findOne({_id: user.lecturer})
  
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
 router.get('/api/profile-lecturer/:token',attachStudent,async(req,res)=>{
   try{
      const lecturer = req.user.sub
      const lecturerProfile = await Lecturer.findById(lecturer)
      console.log(lecturerProfile)
      res.status(200).json({
        lecturerProfile
      })
   }
   catch(err){
    console.log(err)
    res.status(400).send(`An error ocurred. DETAILS : ${err}`);
   }
 })

module.exports= router