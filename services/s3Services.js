const AWS = require('aws-sdk');
require('dotenv').config();

const uploadToS3 = (data, fileName)=>{
    const Bucket_Name = 'expansetraker';
    const IAMUSER_KEY = process.env.IAMUSER_KEY;
    const IAMUSER_SECRETKEY = process.env.IAMUSER_SECRETKEY;

    let s3bucket = new AWS.S3 ({
        accessKeyId: IAMUSER_KEY,
        secretAccessKey: IAMUSER_SECRETKEY,
    })

  var params ={
     Bucket: Bucket_Name,
      Key: fileName,
     Body: data,
     ACL: 'public-read'
     }

 return new Promise((resolve, reject) =>{

        s3bucket.upload(params, (err, s3response)=>{
            if(err){
             console.log('something went wrong', err)
             reject(err)
            }else {
            console.log('success', s3response);
            resolve(s3response.Location);
          }
       })

        })

}

module.exports ={
    uploadToS3
}