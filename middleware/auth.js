const jwt = require('jsonwebtoken');
const userTable = require('../models/user');
const authorisation = (req,res,next)=>{
    try{
        const token = req.header('Authorisation');
        console.log("^^^^^^^^^^^^^",token);
        const user = jwt.verify(token, '45$545778%576565');
        console.log(user);
        userTable.findByPk(user.userId).then(user=>{
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch((err) => {throw new Error(err)} )
       }catch(err){
        console.log(err);
        return res.status(401).json({success: false})
       }
}

module.exports= {
    authorisation
};