import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app';
import Matches from '../database/models/Matches';
import * as jwt from 'jsonwebtoken';

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
 
const typeMatchMock = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}


const matcheMock = 	{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Grêmio"
  }
}

const validMatcheMock = {
	"homeTeam": 5,
	"awayTeam": 5,
	"homeTeamGoals": 1,
	"awayTeamGoals": 4,
	"inProgress": true
}

const duplicateTeamMatcheMock = {
	"homeTeam": 2,
	"awayTeam": 2,
	"homeTeamGoals": 1,
	"awayTeamGoals": 0,
	"inProgress": true
}

	const noTeamMatcheMock = {
		"homeTeam": 100,
		"awayTeam": 8,
		"homeTeamGoals": 4,
		"awayTeamGoals": 1,
		"inProgress": true
}

const errorMessageDuplicateTeam = { message: 'It is not possible to create a match with two equal teams' };
	

describe('/matches', () => {
  describe('POST', () => {
		const payload = { id: 1, username: 'Admin'};
    // before(() => {
    //   // Sinon.stub(Matches, 'findAll').resolves(matchesMock as Matches[]);
    //   Sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
    // })

    // after(() => {
    //   (Matches.findAll as Sinon.SinonStub).restore();
    // })

		describe('Verifica o retorno ao criar uma nova partida', () => {
			const returnFindAllOk = [teamsMock[0], teamsMock[1]] as any;
			const returnFindAllFail = [teamsMock[0]] as any;


			before(() => {
				Sinon.stub(jwt, 'verify').resolves(payload);
				Sinon.stub(Matches, 'create').resolves(typeMatchMock as Matches);
			});
	
			after(() => {
				(jwt.verify as Sinon.SinonStub).restore();
				(Matches.create as Sinon.SinonStub).restore();
			});
	
			it('Verifica se ao ser inserido o mesmo time o retorno da requisição deverá ter o status 401 e a mensagem com o erro', async () => {
				// Sinon.stub(ValidateInfosMatch, 'findAll').resolves(returnFindAllOk);
	
				const resp = await chai.request(app).post('/matches').send(validMatcheMock).set('Authorization', 'tokentestes');
				chai.expect(resp.status).to.be.equal(401);
				chai.expect(resp.body).to.be.deep.equal(errorMessageDuplicateTeam);
				// chai.expect(resp.body).to.be.deep.equal(typeMatchMock);
				
				// (ValidateInfosMatch.findAll as Sinon.SinonStub).restore();
			});


			// it('Deve retornar um status 404 e uma mensagem de erro caso não tenha partidas cadastradas', async () => {
			// 	Sinon.stub(Matches, 'findAll').resolves([]);
			// 	const resp = await chai.request(app).get('/matches');
			// 	chai.expect(resp.status).to.be.equal(404);
			// 	chai.expect(resp.body).to.be.have.property('message');
			// 	chai.expect(resp.body.message).to.be.equal('No matches found');
			// 	(Matches.findAll as Sinon.SinonStub).restore();
			// });

    });  

		describe('Verifica o retorno ao finalizar ou atualizar uma partida', () => {
			before(() => {
				Sinon.stub(jwt, 'verify').resolves(payload);
				Sinon.stub(Matches, 'update').resolves();
			});
	
			after(() => {
				(jwt.verify as Sinon.SinonStub).restore();
				(Matches.update as Sinon.SinonStub).restore();
			});
	
			it('Deve retornar um status 200 e uma mensagem de sucesso ao finalizar uma partida', async () => {
				const resp = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'tokentestes');
				chai.expect(resp.status).to.be.equal(200);
				// chai.expect(resp.body).to.be.have.property('message');
				// chai.expect(resp.body.message).to.be.equal('Finished');
			});
	
			it('Deve retornar um status 200 e uma mensagem de sucesso ao atualizar uma partida', async () => {
				const bodyRequest = { "homeTeamGoals": 3, "awayTeamGoals": 1 };
				const resp = await chai.request(app).patch('/matches/1').send(bodyRequest).set('Authorization', 'tokentestes');
				chai.expect(resp.status).to.be.equal(200);
				// chai.expect(resp.body).to.be.have.property('message');
				// chai.expect(resp.body.message).to.be.equal('Updated');
			});
		});
	});
});

describe('/matches', () => {
  describe('GET', () => {
		// let resp: Response;
		// const payload = { id: 1, username: 'Admin'};
	
		describe('Verifica o retorno ao buscar todas as partidas cadastradas no banco de dados ', () => {
			it('Deve retornar um status 200 e um array com todas as partidas cadastradas', async () => {
				// Sinon.stub(Matches, 'findAll').resolves(matchesFake as MatchIncludesTeams[]);
				Sinon.stub(Matches, 'findAll').resolves(matcheMock as any);
				const resp = await chai.request(app).get('/matches');
				chai.expect(resp.status).to.be.equal(200);
				// chai.expect(resp.body).to.be.deep.equal(matchesFake);
				chai.expect(resp.body).to.be.deep.equal(matcheMock);
				(Matches.findAll as Sinon.SinonStub).restore();
			});

		});

  });
});