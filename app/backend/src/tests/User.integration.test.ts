import * as chai from 'chai';
// const { expect } = require('chai');
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
// import app from '../src/app';
import { app } from '../app';
import User from '../database/models/User';


chai.use(chaiHttp);


const dumpLogin = {
  // "email": "user@user.com",
  // "password": "secret_user"
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

// const dumpCLinicWithDoctors = {
//   ...dumpClinic,
//   doctors: [
//     {
//       id: 1,
//       name: 'Doctor X',
//     },
//     {
//       id: 2,
//       name: 'Doctor Y',
//     },
//   ],
// }

// sem a criação do controller
describe('/login', () => {
  describe('POST', () => {
    it('Deve cadastrar um usuário com sucesso', async () => {
      const res = await chai.request(app).post('/login').send(dumpLogin);
      chai.expect(res.status).to.equal(201);
      chai.expect(res.body).to.deep.equal(dumpLogin);
    })
  });
});

// describe('/users', () => {
//   describe('POST', () => {
    
//     // uso do Sinon para mockar o método create do model Clinic
//     before(() => {
//       Sinon.stub(User, 'create').resolves({  } as User)
//     });

//     after(() => {
//       Sinon.restore();
//     });
    
    
//     it('should return a list of users', async () => {
//       const res = await chai.request(app).post('/users').send(dumpUser);
//       chai.expect(res.status).to.equal(201);
//     })
//   });
// }