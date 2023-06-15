const AWS = require('aws-sdk');

const uploadToS3 = (data, fileName)=>{
    const Bucket_Name = 'expansetraker';
    const IAMUSER_KEY = 'AKIAYZ3JJBDG7OXDQGUC';
    const IAMUSER_SECRETKEY ='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';

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