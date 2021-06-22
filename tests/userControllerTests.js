const {request} = require('express')
const request1 = require('request');
const should = require('should');
const sinon =  require('sinon');
const expect =  require('chai').expect()
const userController =  require("../controllers/userController");
const user =  require('../models/UserModel');

describe('User Controller Test',()=>{
    describe('Post',()=>{
        it('should not allow empty email on post',()=>{
             const user =  function(user){ this.save = ()=>{} };
             
             const req = {body:{id:4}};
             const res = {
                 status: sinon.spy(),
                 send :  sinon.spy(),
                 json : sinon.spy()
             };

             const controller =  userController(user);
             controller.post(req,res);

             res.status.calledWith(400).should.equal(true,`Bad Status ${res.status.args[0][0]}`);
             res.send.calledWith("Email is required").should.equal(true);
        });        
  })
  
})