const express = require('express')
const router = express.Router()
const Resource = require('../models/resources')
const AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid').v4;
const path = require('path');
const attachStudent = require('../auth/attachStudent');
const Student = require('../models/student')
const Lecturer = require('../models/lecturers')

// aws credentials
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "AKIAZFURBWXU2W3VTEPM",
    secretAccessKey: "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"
    });

const s3 = new AWS.S3();
    
// upload
const upload = multer({
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: "lms-academic-resources",
      metadata: function (req, file , cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
        // const ext = path.extname(file.originalname)
        // cb(null, `${uuid()}${ext}`);
        // cb(null, Date.now().toString());
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
   
    }),
  });


//uupload
router.post('/api/send-resource',upload.single('resource'),async(req,res)=>{
    try{
      console.log(req.file)
      const resource = req.file.location
        //console.log(req.body.resource)
      console.log(resource)
        // const lecturer = req.user.sub
        // const lecturerProfile = await Lecturer.findById(lecturer)
        const newResource = Resource({
            link: resource,
            name: req.file.originalname,
            type: req.body.type,
            department: req.body.department,
            level: req.body.level
        })
        await newResource.save()
        res.status(201).json({
          message: 'Resource uploaded successfully'
        })
    }
    catch(e){
        console.log(e)
        res.status(404).send(`An error occured`)
    }
})

//search 
router.get('/api/search', async(req,res)=>{
  try{
    const searchterm  = req.query.searchterm
    let resources = await Resource.find({name : {$regex: `(?i)${searchterm}`}})
    console.log(resources)
    res.status(200).send(
      resources
    )
  }
  catch(e){
    console.log(e)
    res.status(404).send(`An error occured`)
}
})

// filter
router.get('/api/filter', async(req,res)=>{
  try{
    const filterdepartment  = req.query.filterdepartment
    const filterlevel = req.query.filterlevel
    const filtertype =  req.query.filtertype

    let resources = await Resource.find({department: filterdepartment, level:filterlevel, type: filtertype})
    console.log(resources)
    res.status(200).send(
      resources
    )
  }
  catch(e){
    console.log(e)
    res.status(404).send(`An error occured`)
}
})

//save resource
router.put('/api/save-resource',attachStudent, async(req,res) => {
  try{
    
    const resource_id = req.body.resourceId
    console.log(req.body)
    const lecturer = await Student.findByIdAndUpdate(req.user.sub,{bookmarks: resource_id })
    res.status(200).send('Resourses saved sucessfully')
  }
  catch(e){
    console.log(e)
    res.status(404).send(`An error occured`)
  }
})
module.exports = router