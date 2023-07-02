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

const requireAuth = jwt({
    secret: SECRET,
    audience: 'api.example.com',
    issuer: 'api.example.com',
    algorithms: ['HS256']
  });
  
  
router.get('/api/cat',requireAuth, async (req, res) => {
     const response = await axios.get('https://cataas.com/cat', { responseType:"arraybuffer" })
     let raw = Buffer.from(response.data).toString('base64');
     res.send("data:" + response.headers["content-type"] + ";base64,"+raw);
  
  })


module.exports = router