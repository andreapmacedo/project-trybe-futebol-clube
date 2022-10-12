// import IModel from '../../../../src/interfaces/IModel';
// import Joi from 'joi';
// import Sinon from 'sinon';
// import User from '../../../../src/database/models/user';
// import { UserDTO } from '../../../../src/controllers/user/dto/UserDTO';
// import UserService from '../../../../src/services/user/UserService';

// const userMock: UserDTO = {
//   email: 'teste@teste.com',
//   name: 'Teste Service',
//   password: '123123',
//   phone: '4699944994',
// };

// describe('UserService', () => {
//   const userModel: IModel<User> = {
//     create: Sinon.stub().resolves(new User()),
//   };
//   const service = new UserService(userModel);

//   describe('Create', () => {
//     it('Deve criar um usuário com sucesso', async () => {
//       const user = await service.create(userMock);
//       expect(user).toBeInstanceOf(User);
//     });

//     it('Não deve ser possível criar um usuário com email incorreto', async () => {
//       const userMock2 = { ...userMock, email: 'valorerrado' };
//       await expect(service.create(userMock2))
//         .rejects
//         .toThrow(Joi.ValidationError);
//     });
//   });
// });
