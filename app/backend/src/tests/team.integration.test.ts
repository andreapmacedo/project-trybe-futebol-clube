import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const teamsMock = [
  {
    "id": 1,
    "teamName": 'Avaí/Kindermann'
  },
  {
    "id": 2,
    "teamName": 'Bahia'
  },
  {
    "id": 3,
    "teamName": 'Botafogo'
  }
]
 
describe('/teams', () => {
  describe('GET', () => {

    before(() => {
      Sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);
    })

    after(() => {
      (Teams.findAll as Sinon.SinonStub).restore();
    })


    describe.only('Teste se é possível consultar times', () => {
      it('Verifica se a requisição retorna com status 200 e exibe uma lista de times.', async () => {
        const resp = await chai.request(app)
        .get('/teams')
        // .send(teamsMock);
        chai.expect(resp.status).to.be.equal(200);
        chai.expect(resp.body).to.be.an('array')
        chai.expect(resp.body).to.deep.equal(teamsMock);
      });
      
      // it('Verifica se a requisição retorna uma lista times.', async () => {
      //   const resp = await chai.request(app)
      //   .get('/teams')
      //   // chai.expect(resp.status).to.be.equal(200);
      //   chai.expect(resp.body).to.deep.equal(teamsMock);
      // });
    
  
    });
  
  
  
  });
});