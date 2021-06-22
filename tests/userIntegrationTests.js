const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV =  'Test';
const app =  require('../app.js');

const User = mongoose.model('User');
const agent = request.agent(app);

describe('User Crud Test',()=>{
    it('should allow user to be posted and return _id',(done)=>{
        const userPost =  {email:"sumanth.vicky@gmail.com"};

        agent.post('/login')
            .send(userPost)
            .expect(200)
            .end((err,results)=>{
                console.log(results.body.email);
                results.body.should.have.property('token');
                done();
            }) ;         
    });  

    afterEach((done)=>{
        User.deleteMany({}).exec();
        done();
    })

    after((done)=>{
        mongoose.connection.close();
        app.server.close(done());
    })
})
