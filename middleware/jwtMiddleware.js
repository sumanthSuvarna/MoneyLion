const jwt = require('jsonwebtoken');


function jwtMiddleware(){
    function verifyToken (req,res,next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader!== "undefined"){
            const bearer =  bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            
            next();
        }else{
            res.sendStatus(403)
        }
    }

    function validateUser(req,res,next){
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                if(authData.user.role==="admin"||authData.user.role==="user"){                    
                    req.user = authData;
                    next();
                }else{
                    res.sendStatus(403)
                }

            }
        })
    }


    function validateAdmin(req,res,next){
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                if(authData.user.role==="admin"){                    
                    req.user = authData;
                    next();
                }else{
                    res.sendStatus(403)
                }
            }
        })
    }
    return {verifyToken,validateUser,validateAdmin}
    
}

module.exports = jwtMiddleware;