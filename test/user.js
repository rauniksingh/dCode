let user = require('../model/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

 describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        user.remove({}, (err) => { 
           done();           
        });        
 });

 describe('/POST users', ()=>{
      let obj = {
          "email": "rauniksingh@outlook.com",
          "password": "12345678"
      }

    it('it should add user to database', (done) =>{
      chai.request("http://localhost:8080")
          .post('/api/user/register')
          .send(obj)
          .end((err, res) => {
                    res.should.have.status(200);
                done();
              });  
        });
    });
});

