const sib = require('sib-api-v3-sdk');
require('dotenv').config()

const client = sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const transEmailApi =  new sib.TransactionalEmailsApi()
exports.sendmail = (req,res,next)=>{
    console.log("!!!!!",req.body.email);

const sender = {
    email: 'mhtamta5@gmail.com'
}

const recievers = [
    {
        email:req.body.email
    }
]

transEmailApi
.sendTransacEmail({
    sender,
    to : recievers,
    subject: 'its working fine as of now',
    textContent:'hello i think its working should we move forward then.',

}).then(console.log("success"))
.catch(console.log("it failed"))
}