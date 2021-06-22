const jwt = require('jsonwebtoken');

function userController(User){
    function post(req,res){
        const user =  new User(req.body);
        if(!req.body.email){
            res.status(400);
            return res.send('Email is required');
        }
        user.save((err)=>{
            if(err){                
                return res.status(400).send(err.message);
            }
            return res.status(201).json(user)
        });
    }

    function get(req,res) {

        User.find((err,users)=>{
            if(err){return err;}                    
            return res.json(users)
        });

    }

    function deleteAll(req,res){
        User.deleteMany((err,results)=>{
            if(err){return err;}
            return res.json(results)
        })
    }
    return {post,get,deleteAll};
}
module.exports = userController;