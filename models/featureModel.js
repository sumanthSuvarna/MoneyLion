const mongoose =  require('mongoose');

const featureModel =  new mongoose.Schema({
    id   : {type:Number},
    featureName: {type:String, unique:true},
    users: [{ type:String}]
});

const features = mongoose.model('Features',featureModel)

module.exports =  features;