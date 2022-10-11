// import IUserServicesResponse from '../interfaces/UserInterfaces';

// export default class UserServices {

//   static validateEmail(value: string): RegExpMatchArray | IUserServicesResponse {
//     const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
//     const result = value.match(regex);
//     if (!result) return { code: 400, message: { message: 'All fields must be filled' } };
//     return result;
//   }

// }