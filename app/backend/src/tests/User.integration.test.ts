import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
// import app from '../src/app';
import { app } from '../app';
import User from '../database/models/User';


chai.use(chaiHttp);


// const loginMock = {
//   "email": "admin@admin.com",
//   "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
// }

const loginMock = {
  "email": "user@user.com",
  "password": "secret_user"
}
  
  



describe('/login', () => {
  describe('POST', () => {
    // describe('Caso usuário encontrado', () => {
    // // uso do Sinon para mockar o método create do model User
    //   before(() => {
    //     Sinon.stub(User, 'findOne').resolves(loginMock as User)
    //   });

    //   after(() => {
    //     Sinon.restore();
    //   });
      
      
    //   it('Deve logar com sucesso um usuário', async () => {
    //     const res = await chai.request(app).post('/login').send(loginMock);
    //     chai.expect(res.status).to.equal(201);
    //     chai.expect(res.body).to.deep.equal(loginMock);
    //   })
    // });

    // before(() => {
    //   Sinon.stub(User, 'findOne').resolves(loginMock as User);
    // })

    // after(() => {
    //   // (User.findOne as Sinon.SinonStub).restore();
    //   Sinon.restore();
    // })

    describe('Teste em caso de usuário encontrado', () => {
      it('permita o acesso com dados válidos', async () => {
        const resp = await chai.request(app)
        .post('/login')
        // .send({
        //   email: 'user@user.com',
        //   password: 'secret_user'
        // });
        .send(loginMock);
        chai.expect(resp.status).to.be.eq(200);
        chai.expect(resp.body.token).to.be.an('string')
      });
    });


  
    // describe.skip('Teste em caso de usuário encontrado', () => {
    describe('Teste em caso de usuário encontrado', () => {
      // before(() => {
      //   Sinon.stub(User, 'findOne').resolves(loginMock as User);
      // })

      // after(() => {
      //   // (User.findOne as Sinon.SinonStub).restore();
      //   Sinon.restore();
      // })

      it('Email e password corretos, retorna status 200 e token', async () => {
        const resp = await chai.request(app)
        .post('/login')
        .send(loginMock);
        // .send({ email: 'admin@admin.com', password: 'secret_admin'});

        chai.expect(resp.status).to.equal(200);
        // chai.expect(resp.body).to.deep.equal(loginMock);
        chai.expect(resp.body).to.have.property('token');
      })
    })

    describe('Teste em caso de usuário não encontrado', () => {
      before(() => {
        Sinon.stub(User, 'findOne').resolves(undefined);
      })

      after(() => {
        (User.findOne as Sinon.SinonStub).restore();
      })

      it('Verifica lançamento de erro, caso email incorreto', async () => {
        const resp = await chai.request(app)
        .post('/login')
        .send({ email: 'adminn@admin.com', password: 'secret_admin'});

        chai.expect(resp.status).to.be.equal(401);
        chai.expect(resp.body).to.deep.equal({ message: 'Incorrect email or password'});
      })
    })

    describe('Verifica se o corpo da requisição é válido', () => {
      it('lançamento de erro caso não seja passado email', async () => {
        const resp = await chai.request(app)
        .post('/login')
        .send({ password: 'secret_admin' });

        chai.expect(resp.status).to.be.equal(400);
        chai.expect(resp.body).to.deep.equal({ message: '"email" is required'});
      })

      it('Caso haja um erro no email, verifica se é lançado um erro', async () => {
        const resp = await chai.request(app)
        .post('/login')
        .send({ email: 'admin@admin.com' });

        chai.expect(resp.status).to.be.equal(400);
        chai.expect(resp.body).to.deep.equal({ message: '"password" is required'});
      })

      it('Caso password e/ou email estiverem vazios, verifica se é lançado um erro', async () => {
        const resp = await chai.request(app)
        .post('/login')
        .send({ email: '', password: '' });

        chai.expect(resp.status).to.be.equal(400);
        chai.expect(resp.body).to.deep.equal({ message: 'All fields must be filled'});
      })
    })
  });

  describe.skip('GET', () => {
    // before(() => {
    //   Sinon.stub(User, 'findOne').resolves({
    //     role: 'admin',
    //   } as User)
    // })

    // after(() => {
    //   // (User.findOne as Sinon.SinonStub).restore();
    //   Sinon.restore();
    // })

    it('Verifica se retorna o status de retorno da requisição é 200 e se contém a propriedade role', async () => {
      const resp = await chai.request(app)
      .get('/login/validate')
      .send({ email: 'admin@admin.com' })
      .set({'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDgxNzUwNywiZXhwIjoxNjY0OTAzOTA3fQ.mSEK9ndX-k4i85QDOsk0TSnjgkQM6S-lKKsmstdQJ-8'});

      chai.expect(resp.status).to.be.equal(200);
      chai.expect(resp.body).to.have.property('role');
    })
  })


});


// describe('/login/validate', () => {
//   describe('GET', () => {
    
       
//     it('deve verificar o tipo de usuário', async () => {
//       const res = await chai.request(app).post('/login/validate').send();
//       chai.expect(res.status).to.equal(201);
//       chai.expect(res.body).to.deep.equal(loginMock);
//     })
//   });

// });