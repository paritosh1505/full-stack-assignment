const path = require('path');
const express = require('express');
//const token= require('jsonwebtoken');
const expenses = require('../models/expense');
const AWS = require('aws-sdk');
const UserServices = require('../services/userservices');
const S3services = require('../services/s3Services');
const downloadedUrls = require('../models/downloadedFiles');


exports.downloadexpenses = async (req,res,next) =>{
    try{
        const expenses = await UserServices.getexpenses(req);
       //console.log("**********&&&&&&&&&&", expenses);
       const Expensesjson = JSON.stringify(expenses);
       const UserId = req.user.id;
       const fileName = `Expenses${UserId}/${new Date()}.txt`;
       const fileUrl = await S3services.uploadToS3( Expensesjson , fileName);
       const Urls = await downloadedUrls.create({ fileUrl:fileUrl , userId: req.user.id});
       res.status(200).json({fileUrl, success: true});
    }catch(err){
         res.status(500).json({fileUrl: '', success: false, error: err});
    }

}

exports.downloadedUrl = async (req,res,next) =>{

    await downloadedUrls.findAll({where :{userId: req.user.id}}).then((response)=>{
        const sqldata=[];
        response.forEach((item)=>{
            sqldata.push({
                id:item.id,
                fileUrl:item.fileUrl,
              
            })
          
        })
        res.status(200).json({newentry:sqldata});
    }).catch((error)=>{
        res.status(404).json({error:error});
    });
}
