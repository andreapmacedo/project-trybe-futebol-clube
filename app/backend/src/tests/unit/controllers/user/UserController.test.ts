// import { Request, Response } from 'express';

// // import IUser from '../../../../src/interfaces/IUser';
// import Sinon from 'sinon';
// import User, { IUser } from '../../../../database/models/User';

// import UserController from '../../../../database/controllers/User';
// // import { UserDTO } from '../../../../src/controllers/user/dto/UserDTO';

// const userMock: UserDTO = {
//   email: 'teste@teste.com',
//   name: 'Teste Controller',
//   password: '123123',
//   phone: '4699944994',
// };

// describe('UserController', () => {
//   // TODO: mudar para stub.
//   const service: IUser = {
//     create: jest.fn((obj: UserDTO): Promise<User> => Promise.resolve(new User())),
//   };
//   const controller = new UserController(service);
//   // Nosso req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
//   const req = {} as Request;
//   // Mesma coisa com o segundo parâmetro
//   const res = {} as Response;

//   beforeAll(() => {
//     res.status = Sinon.stub().returns(res);
//     res.json = Sinon.stub().returns(res);
//   });

//   afterAll(() => {
//     Sinon.restore();
//   });

//   describe('Create User', () => {
//     it('Success', async () => {
//       req.body = userMock;
//       await controller.create(req, res);

//       expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy();
//       expect((res.json as sinon.SinonStub).calledWith(new User())).toBeTruthy();
//     });
//   });
// });
