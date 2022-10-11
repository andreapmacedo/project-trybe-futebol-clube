import * as chai from 'chai';
const { expect } = require('chai');
import chaiHttp = require('chai-http');


chai.use(chaiHttp);


// const { describe } = require('mocha');
// const sinon = require('sinon');






import { app } from '../app';

// import * as sinon from 'sinon';

describe('/users', () => {
  describe('POST', () => {
    it('should return a list of users', async () => {
      const res = await chai.request(app).post('/users').send({ name: 'test' });
      expect(res.status).to.equal(201);
    })
  });
}