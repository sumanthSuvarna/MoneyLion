const features = require("../models/FeatureModel");

function featureController(Features){
    function post(req,res){
        const {feature} = req
        feature.save((err)=>{
            if(err){
                console.log(err);
                return res.status(400).send(err.message);
            }            
            return res.status(201).json(feature)
        });    
    }

    function get(req,res) {

        if(!req.query.featureName){
            return res.status(400).send("Bad request FeatureName parameter Missing  ")
        }
        if(!req.query.email){
            return res.status(400).send("Bad request Email parameter Missing ")
        }
        const email = req.query.email;
        let canAccess=false;
        Features.findOne({"featureName":req.query.featureName},(err,feature)=>{
            if(err){ return res.status(400).json(err);}

            if(!feature){
                return res.status(400).send(`${req.query.featureName} feature does not exist `)
            }else{
                const users = feature.users;
                if(users.indexOf(email) !== -1){
                    canAccess=true;
                    return res.status(200).json({"canAccess":canAccess})
                }else{
                    return res.status(200).json({"canAccess":canAccess})
                }
            }
        })
    }

    function getDetails(req,res){
        console.log(req.params)
        Features.findOne({"featureName":req.params.name},(err,feature)=>{
            if(err){ return res.status(400).json(err);}

            if(!feature){
                return res.status(400).send(`${req.params.name} feature does not exist `)
            }else{
                return res.status(200).json(feature);
            }
        })
    }
    return {post,get,getDetails};
}
module.exports = featureController;