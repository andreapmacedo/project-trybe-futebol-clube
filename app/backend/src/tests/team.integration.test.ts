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
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	{
		"id": 4,
		"teamName": "Corinthians"
	},
	{
		"id": 5,
		"teamName": "Cruzeiro"
	},
	{
		"id": 6,
		"teamName": "Ferroviária"
	},
	{
		"id": 7,
		"teamName": "Flamengo"
	},
	{
		"id": 8,
		"teamName": "Grêmio"
	},
	{
		"id": 9,
		"teamName": "Internacional"
	},
	{
		"id": 10,
		"teamName": "Minas Brasília"
	},
	{
		"id": 11,
		"teamName": "Napoli-SC"
	},
	{
		"id": 12,
		"teamName": "Palmeiras"
	},
	{
		"id": 13,
		"teamName": "Real Brasília"
	},
	{
		"id": 14,
		"teamName": "Santos"
	},
	{
		"id": 15,
		"teamName": "São José-SP"
	},
	{
		"id": 16,
		"teamName": "São Paulo"
	}
]
 

const teamMock = {
  "id": 1,
  "teamName": 'Avaí/Kindermann'
}


describe('/teams', () => {
  describe('GET', () => {

    describe('Verifica se é possível consultar times', () => {
      it('Verifica se a requisição retorna com status 200 e exibe uma lista de times.', async () => {
        const resp = await chai.request(app)
        .get('/teams')
        // .send(teamsMock);
        chai.expect(resp.status).to.be.equal(200);
        chai.expect(resp.body).to.be.an('array')
        chai.expect(resp.body).to.deep.equal(teamsMock);
      });
      
      it('Verifica se é possível retornar dados de um time específico', async () => {
        // const token = await Token.generateToken(data)
        const response = await chai.request(app).get('/teams/2');
        chai.expect(response.status).to.be.eq(200);
        chai.expect(response.body).to.have.a.property('teamName', 'Bahia');      
      });
    
    });
    
  });

});

describe('/teams/:id', () => {
  describe('GET', () => {

    before(() => {
      Sinon.stub(Teams, 'findByPk').resolves(teamMock as Teams);
    })

    after(() => {
      (Teams.findByPk as Sinon.SinonStub).restore();
    })


    describe('Verifica se é possível pesquisar por um time', () => {
      it('Verifica se a requisição retorna com status 200 e exibe um time.', async () => {
        const resp = await chai.request(app)
        .get('/teams/:id')
        // .send(teamsMock);
        chai.expect(resp.status).to.be.equal(200);
        chai.expect(resp.body).to.be.an('object')
        chai.expect(resp.body).to.deep.equal(teamMock);
      });
       
    });

  });
  
});