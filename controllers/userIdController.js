function userIdController(User){

    function get(req,res){
        return res.json(req.user)
    }

    function put(req,res){
        const {user} = req
        user.email = req.body.email;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.role = req.body.role;
        if(req.body.role){
            user.role=req.body.role
        } 
        user.save((err)=>{
            if(err){
                console.log(err);
                return res.status(400).send(err);
            }
            return res.status(201).json(user);
        });
      
    }

    function patch(req,res){
        const {user} =  req;
        if(req.body._id){
            delete req.body._id
        }
        Object.entries(req.body).forEach((item)=>{
            const key =  item[0];
            const value = item[1];
            user[key]=value;
        });
        req.user.save((err)=>{
            if(err){ return res.status(400).send(err);}
            return res.status(200).json(user)
        })

    }

    function deleteUser(req,res){
        req.user.remove((err)=>{
            if(err){ return res.send(err);}
            return res.sendStatus(204);
        })
    }

    return {put, patch,deleteUser};
}

module.exports = userIdController;