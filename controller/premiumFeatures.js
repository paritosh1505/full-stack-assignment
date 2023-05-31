const dbinfo = require('../util/userdatabase');
const expenses = require('../models/expense');
const users = require('../models/user');
const Sequelize = require('sequelize');

exports.showleaderboard = async (req,res)=>{
    try{
        const userId = req.user.id;
        const updatecol = await users.update(
            {total_expense: req.body.totalSum},
            {where :{ id: userId}}
        )
    }
    catch(err){
        console.log(err);
    }
   // console.log("######", req.user.id);
}
