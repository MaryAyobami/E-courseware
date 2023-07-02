const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: "AKIAZFURBWXU2W3VTEPM",
    secretAccessKey: "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",
    });
    
const BUCKET = 'lms-academic-resources';


const params = {
    Bucket: BUCKET, 
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "us-east-1"
    }
};

// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

// upload files

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET,
        Key: 'test', // File name you want to save as in S3
        Body: fileContent,
        ACL: "public-read-write",
        
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile("C:\\Users\\user\\Documents\\agile.PNG")