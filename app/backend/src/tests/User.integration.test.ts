// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import * as Sinon from 'sinon';
// // import app from '../src/app';
// import { app } from '../app';
// import User from '../database/models/User';


// chai.use(chaiHttp);


// const loginMock = {
//   "email": "admin@admin.com",
//   "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
// }

// // const dumpCLinicWithDoctors = {
// //   ...dumpClinic,
// //   doctors: [
// //     {
// //       id: 1,
// //       name: 'Doctor X',
// //     },
// //     {
// //       id: 2,
// //       name: 'Doctor Y',
// //     },
// //   ],
// // }

// // sem a criação do controller e sem mockar
// // describe('/login', () => {
// //   describe('POST', () => {
// //     it('Deve cadastrar um usuário com sucesso', async () => {
// //       const res = await chai.request(app).post('/login').send(loginMock);
// //       chai.expect(res.status).to.equal(201);
// //       chai.expect(res.body).to.deep.equal(loginMock);
// //     })
// //   });
// // });

// describe('/users', () => {
//   describe('POST', () => {
    
//     // uso do Sinon para mockar o método create do model User
//     before(() => {
//       Sinon.stub(User, 'create').resolves(loginMock as User)
//     });

//     after(() => {
//       Sinon.restore();
//     });
    
    
//     it('Deve cadastrar um usuário com sucesso', async () => {
//       const res = await chai.request(app).post('/login').send(loginMock);
//       chai.expect(res.status).to.equal(201);
//       chai.expect(res.body).to.deep.equal(loginMock);
//     })
//   });
// });