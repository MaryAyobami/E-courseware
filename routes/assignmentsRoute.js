const express = require('express')
const router = express.Router()
const Assignment = require('../models/assignments')
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
      bucket: "lms-assignments",
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


// send assignment - lecturer
router.post('/api/send-assignment', upload.single('resource'),attachStudent, async(req,res)=>{
    const sender = await Lecturer.findById(req.user.sub)
    console.log(sender)

    const resource = req.file.location
 
    console.log(resource)
      
    const newAssignment = Assignment({
          link: resource,
          title: req.body.title,
          details: req.body.details,
          department: req.body.department,
          level: req.body.level,
          sender: sender
      })
    
    const savedAssignment =  await newResource.save()
    const students = await Student.find({department: savedAssignment.department, levvel: savedAssignment.level})
    
    students.map(
        (student)=>{
            await Student.findByIdAndUpdate(student._id,{})
        }
    )

    
    res.status(200).send('Assignment sent successfully!')
      
})

// get assignment
router.get('/api/get-assignment',attachStudent, async(req,res)=>{
    const student = await Student.findById(req.user.sub)

    // const assignments = await Assignment.find({department: student.department, level: student.level})
   
    const assignments = Student.find()
    res.status(200).send('Assignment sent successfully!')
      
  })

// submit assignments


// submit assignment - student
module.exports =router