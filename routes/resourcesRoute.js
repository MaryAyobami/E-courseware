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
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("3d8ded321f6009b48d30e82f287a0b2f23389ac006db4744f67df42aa45548fc");
const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");

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
// push notifications
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


router.post('/api/send-resource',upload.single('resource'),attachStudent,async(req,res)=>{
    try{

      const checkResource = Resource.find({name: req.file.originalname})
      if(checkResource){
        res.status(400).send('The file already exists.')
      }

      const sender = await Student.findById(req.user.sub)
      console.log(sender)
      // console.log(req.file)
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
            level: req.body.level,
            sender: req.body.sender
        })
        await newResource.save()

        // res.status(201).json({
        //   message: 'Resource uploaded successfully'
        // })
       
        const relatedStudents = await Student.find({department: sender.department, pushnotification: true})

        const tokens = []
        relatedStudents.map(item=>{
          if(item.token != undefined){
            tokens.push(item.token)
          }

        })
        console.log(tokens)
        

        // const notification_options = {
        //   priority: "high",
        //   timeToLive: 60 * 60 * 24
        // }

        // await admin.messaging().sendMulticast({
        //   tokens,
        //   notification:{
        //     title:'courseware notification',
        //     body: 'testing application'
        //   },
        //   notification_options
        // });

        const notificationToAll = (title, body, tokens) => {
          var notibody = {
            notification: {
              title: title,
              body: body,
            },
            tokens: tokens,
          };
          return new Promise((resolve, reject) => {
            admin
              .messaging()
              .sendMulticast(notibody)
              .then((response) => {
                console.log(response.responses);
                if (response.responses[0].error != undefined) {
                  console.log(JSON.stringify(response.responses[0].error));
                }
                resolve(response);
              })
              .catch((error) => {
                console.log(JSON.stringify(error));
                reject(error);
              });
          });
          };

          notificationToAll(
            "This is a string",
            `This is another string`,
            ['dmqOpwHJSBGvP4lzP4vAK-:APA91bGox4HkVNQbkNCT5iX1ZLpu1tvAU3NySGi-TE_m05o0qvBSnb_WkIMmOFkCDHWBx7xDvC3Yv-YpfRiRYQtmOUO105_NMqXoy_HDYb9krGrVmIm4RjQHGHIa5DwleX6CY_1YfIvC']
          )
        // res.status(200).json({ message: "Successfully sent notifications!" });

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

//search 
router.get('/api/search-personal',attachStudent, async(req,res)=>{
  try{
    const student = req.user.sub
    const studentProfile = await Student.findById(student)
    const searchterm  = req.query.searchterm
    let resources = await Resource.find({name : {$regex: `(?i)${searchterm}`}, department: studentProfile.department, level:studentProfile.level})
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
// router.put('/api/save-resource',attachStudent, async(req,res) => {
//   try{
    
//     const resource_id = req.body.resourceId
//     console.log(req.body)
//     const lecturer = await Student.findByIdAndUpdate(req.user.sub,{bookmarks: resource_id })
//     res.status(200).send('Resourses saved sucessfully')
//   }
//   catch(e){
//     console.log(e)
//     res.status(404).send(`An error occured`)
//   }
// })

// external api
// serp- google scholar apu

router.get('/api/search-googlescholar' , async(req,res)=>{
  try{
    console.log(req.query.searchterm)
    const params = {
      engine: "google_scholar",
      q: `${req.query.searchterm}`
    };
    
    const callback = await function(data) {
      console.log(data["organic_results"]);
    };
    
    // Show result as JSON
    const resultdata = await search.json(params, callback)
    res.status(200).send(resultdata)
    console.log('testing')
    console.log(resultdata)
  }
  catch(e){
    console.log(e)
    res.status(404).send(`An error occured`)
  }
})

module.exports = router