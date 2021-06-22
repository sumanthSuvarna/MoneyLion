const mongoose =  require('mongoose');

const validator = [
    function(val){
        const reMatch = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reMatch.test(val)
    },
    //Custom Text
    'Please enter a valid {PATH}'
]

const userModel =  new mongoose.Schema({
    firstname: {type:String},
    lastname:{type:String},
    email: {type:String,required:true,validate:validator,unique: true},
    role : {type:String,enum:{values: ['admin','user']},  message:'{VALUE} is not supported',default:'user',lowercase:true }
});


const User = mongoose.model('User',userModel)

userModel.pre('findOne', () => console.log('findOne'));


module.exports =  User;