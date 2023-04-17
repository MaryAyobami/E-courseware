const express = require('express')
const router = express.Router()
const Resource = require('../models/resources')
const AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid').v4;
const path = require('path');

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
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
        // const ext = path.extname(file.originalname)
        // cb(null, `${uuid()}${ext}`);
        // cb(null, Date.now().toString());
      },
    }),
  });

router.post('/api/send-resource',upload.single('file'),async(req,res)=>{
    try{
        const resource = req.file.location;
        console.log(resource)
        const newResource = Resource({
            link: resource,
            name: req.body.name,
            type: req.body.type,
            sender: req.body.sender,
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

module.exports = router