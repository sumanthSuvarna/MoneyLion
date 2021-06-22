const mongoose = require('mongoose');
const User =  require('./models/UserModel');
const Features =  require('./models/FeatureModel');
const jwt = require('jsonwebtoken');
const express =  require('express');
const jwtMiddleware = require('./middleware/jwtMiddleware');
const userRouter = require('./routes/userRouter')(User)
const featureRouter = require('./routes/featureRouter')(Features,User)
require('dotenv').config({path:"./variables.env"})

if(process.env.ENV==='Test'){
    const db =  mongoose.connect('mongodb://localhost/moneylion-test', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(()=> console.log("CONNECTED TO TEST db "))
    .catch((err)=>console.log(err));
}else{
    const db =  mongoose.connect('mongodb://localhost/moneylion-prod', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(()=> console.log("PROD DB CONNECTED"))
    .catch((err)=>console.log(err));
}

const app =  express();
app.use(express.json());

const port =  process.env.PORT ||3000
const JwtMiddleware = jwtMiddleware();

app.get('/',(req,res)=>{
    res.send("Welcome to API");
})

app.post('/login',(req,res)=>{
    console.log("request")
    console.log(req.body.email)
    User.findOne({"email":req.body.email}, (err,user)=>{
        if(err){ return res.status(400).json(err); }
        if(user){
            jwt.sign({user:user},'secretkey',{expiresIn:"1d"},(err,token)=>{
                res.json({
                    token
                })
            })
        }else{
            res.status(401).send("Unauthourised User")
        }
    });
})


app.use('/',JwtMiddleware.verifyToken,userRouter)   
app.use('/',JwtMiddleware.verifyToken,featureRouter)   




app.server = app.listen(port,()=>{
    console.log(`Running on port ${port}`)
});

module.exports =app;