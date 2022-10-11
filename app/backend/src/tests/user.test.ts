import * as chai from 'chai';
// const { expect } = require('chai');
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
// import app from '../src/app';
import { app } from '../app';
import User from '../database/models/User';


chai.use(chaiHttp);


const dumpUser = {
  name: 'Clinica X',
  address: 'Rua X'
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

describe('/users', () => {
  describe('POST', () => {
    
    // uso do Sinon para mockar o método create do model Clinic
    before(() => {
      Sinon.stub(User, 'create').resolves({  } as User)
    });

    after(() => {
      Sinon.restore();
    });
    
    
    it('should return a list of users', async () => {
      const res = await chai.request(app).post('/users').send(dumpUser);
      chai.expect(res.status).to.equal(201);
    })
  });
}