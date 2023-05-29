const path = require('path');
const express = require('express');
const table= require('../models/user');
const expensetable= require('../models/expense');
const bcrypt = require('bcrypt');
const token= require('jsonwebtoken');

exports.loginsend=(req,res,next)=>{
  const file= path.join(__dirname,'../view/loginpage.html');
  res.sendFile(file);
}

exports.postfile= (req,res,next)=>{
    const filepath = path.join(__dirname,'../view/signup.html');
    res.sendFile(filepath);
}
exports.expensepagesend=(req,res,next)=>{
  const expensefile= path.join(__dirname,'../view/expensepage.html');
  res.sendFile(expensefile);
}

exports.adduser= async(req,res,next)=>{
    console.log(req.body);
    try{
    const name = req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const saltrounds=10;
    bcrypt.hash (password, saltrounds , async(err,hash)=>{
      const data = await table.create({
        name:name,
        emailid:email,
        password:hash,
        userId: req.user
    });
    res.status(200).json({newdata: data})
    })   
}
catch(err){
console.log(err);
}
}
function generateToken(id,name){
  return token.sign({userId:id,name:name}, '45$545778%576565');
}
exports.login= async(req,res,next)=>{
        try {
            const email= req.body.email;
            const password= req.body.password;
            const emailCheck = await table.findOne({
                where: {
                  emailid: email                }
              });
        if(!emailCheck){
            res.status(404).json({success:false, message:"User not found"})
        }

        else{
            const entry = await table.findOne({
                where: {
                  emailid: email,
                  password: password
                }
              });
              console.log("###",emailCheck)
             bcrypt.compare( password,emailCheck.password, (err,result)=>{
              console.log("#$#$#", result);
              if (result==true) {
                 res.status(200).json({success: true ,message:"User logged in successfully",token: generateToken(emailCheck.id,emailCheck.name)})
               // return;
                  }
            else 
                  {
                    res.status(401).json({success: false , message: "Password incorrect"})
                  }
             })
       
        }
          
        } catch (error) {
          console.error('Error retrieving entry:', error);
        }
      }

      exports.addexpense= async(req,res,next)=>{
        try{
          console.log("***",req.body)
          const idval= req.user;
          const price = req.body.price;
          const description= req.body.description;
          const category = req.body.category;
            const data = await expensetable.create({
             price:price,
             description:description,
             category:category,
             userId:req.user.id
          });
          res.status(200).json({newdata: data}) 
      }
      catch(err){
      console.log(err);
      }
      }

      exports.getdata= async (req,res,next)=>{
        console.log("***")
        const ordertable = await table.findOne({where: {id: req.user.id}})
        
       await expensetable.findAll({where :{userId: req.user.id}}).then((response)=>{
        const sqldata=[];
        response.forEach((item)=>{
            sqldata.push({
                id:item.id,
                price:item.price,
                description:item.description,
                category:item.category,  
            })
          
        })
        res.status(201).json({newentry:sqldata, ispremiumuser: ordertable.ispremiumuser});
        }).catch((error)=>{
            res.status(404).json({error:error});
        });
        
       
    }

    exports.deleteentry = async(req,res,next)=>{
       const id= req.params.id;
       expensetable.destroy({
        where:{
          "id": id,
          userId: req.user.id
        }
       }).then((noofrows)=>{
        if(noofrows===0){
          return res.status(404).json({success: false, message: 'Expense dosent belongs to the user'})
        }
       return res.status(200).json({success: true, message:'Deleted successfully'})
       }).catch((err)=>{
        console.log(err);
        res.status(500).json({success:true, message:'failed'});
       })
    }


  