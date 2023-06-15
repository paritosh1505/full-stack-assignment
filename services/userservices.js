const getexpenses = (req, where)=>{
    //console.log("%#@#@", getExpenses(where))
    return req.user.getExpenses(where);
}

module.exports = {
    getexpenses
}