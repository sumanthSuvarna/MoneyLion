
function userIdMiddleWare(User){
      function getUser(req,res,next){     
        //console.log(req.user.user.email)
        if(req.user.user.email === req.params.emailId){
            return next()
        }else{
            res.sendStatus(403)
        }
    }

     return {getUser};
}

module.exports = userIdMiddleWare;
