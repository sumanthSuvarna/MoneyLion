function featureMiddleware(Feature,User){
    function getUserFeature(req,res,next){



        User.findOne({"email":req.body.email}, (err,user)=>{
            if(err){ return res.send(err); }
            if(!user){
                let json = {}
                json["email"]=req.body.email
                const user =  new User(json);
                user.save((err)=>{
                    if(err){
                        console.log(err);                        
                        return res.status(304).json(err.message);
                    }
                }); 
            }
        });

        Feature.findOne({"featureName":req.body.featureName},(err,feature)=>{
            if(err){ return res.send(err); } 
            if(!feature){
                
                const users = [];
                let json = {}
                json["featureName"]= req.body.featureName;
                if(req.body.enable){
                    users.push( req.body.email);
                    console.log("adding users")
                }
                json["users"]= users;
                const newFeature = new Feature(json)
                console.log(newFeature)
                req.feature= newFeature;
                //req.feature = json;
                return next()

            }else{
   
                if(req.body.enable){
                    if(feature.users.indexOf(req.body.email) == -1){
                        feature.users.push(req.body.email)
                    }else{
                        return res.status(304)
                            .json({"message":`${req.body.email} User already has permission for ${req.body.featureName} feature`})
                    }
                    
                }else if((!req.body.enable)){           
                    if(feature.users.indexOf(req.body.email) !== -1){
                        feature.users.pull(req.body.email)
                    }else{
                        return res.status(304).json({"message":`Cannot disable when ${req.body.email} does not have access for ${req.body.featureName} feature`})
                    }             
                }
                
                const newFeature = new Feature(feature)
                req.feature= newFeature;
                //req.feature = feature;
                return next()

            }
        })
        
    }

    return { getUserFeature};


}

module.exports = featureMiddleware;