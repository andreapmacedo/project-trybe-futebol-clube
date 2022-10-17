import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app';
import Matches from '../database/models/Matches';
// import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);



// describe('/leaderboard', () => {
//   describe('GET', () => {
		
// 		describe('Testa a rota /leaderboard', () => {
// 			it('Deve retornar o status 200 e um array com os times e suas pontuações', async () => {
// 				// Sinon.stub(Matches, 'findAll').resolves(matchesFinished as MatchIncludesTeams[]);
	
// 				const response = await chai.request(app).get('/leaderboard');
// 				chai.expect(response.status).to.be.equal(200);
// 				// chai.expect(response.body).to.be.eql(fakeLeaderBoard);
	
// 				(Matches.findAll as Sinon.SinonStub).restore();
// 			});
// 		});


// 	});
// });

describe('/leaderboard/home', () => {
  describe('GET', () => {
		
		describe('Testa a rota /leaderboard/home', () => {
			it('Deve retornar o status 200', async () => {
				// Sinon.stub(Matches, 'findAll').resolves(matchesFinished as MatchIncludesTeams[]);
	
				const response = await chai.request(app).get('/leaderboard/home');
				chai.expect(response.status).to.be.equal(200);
				// chai.expect(response.body).to.be.eql(fakeLeaderBoardHome);
	
				// (Matches.findAll as Sinon.SinonStub).restore();
			});
		});


	});
});

describe('/leaderboard/away', () => {
  describe('GET', () => {

		describe('Testa a rota /leaderboard/away', () => {
			it('Deve retornar o status 200', async () => {
				// Sinon.stub(Matches, 'findAll').resolves(matchesFinished as MatchIncludesTeams[]);
	
				const response = await chai.request(app).get('/leaderboard/away');
				chai.expect(response.status).to.be.equal(200);
				// chai.expect(response.body).to.be.eql(faekLeaderBoardAway);
	
				// (Matches.findAll as Sinon.SinonStub).restore();
			});
		});


  });
});