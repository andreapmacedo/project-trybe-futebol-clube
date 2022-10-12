
// import Token from '../helpers/Token';
import User from '../models/User';
// import Bcript from '../helpers/Bcrypt';
// import IUserServicesResponse from '../interfaces/UserInterfaces';

interface Response {
  code: number;
  message: object;
}

// const validateEmail = async (email: string): Promise<Response> => {
//   //   const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
// }

class UserServices {
  // static validateEmail(value: string): RegExpMatchArray | IUserServicesResponse {
  //   const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  //   const result = value.match(regex);
  //   if (!result) return { code: 400, message: { message: 'All fields must be filled' } };
  //   return result;
  // }

  // static validatePassword(value: string): string | IUserServicesResponse {
  //   if (value.length > 6) return value;
  //   return { code: 400, message: { message: 'All fields must be filled' } };
  // }

  static async login(email: string, password: string): Promise<Response> {
    // try {
    //   validateEmail(email: string);
    // } catch (error) {
      
    // }
    
    // const analysedEmail = this.validateEmail(email) as IUserServicesResponse;
    // if (analysedEmail.code === 400) return analysedEmail;

    // const invalidPass = this.validatePassword(password) as IUserServicesResponse;
    // if (invalidPass.code === 400) return invalidPass;

    // const data = await User.findOne({ where: { email: analysedEmail as unknown as string } });
    // if (!data) return { code: 401, message: { message: 'Incorrect email or password' } };

    // const checkPassword = await Bcript.decript(password, data?.password as string);
    // if (checkPassword) {
    //   const token = await Token.generateToken(data);
    //   return { code: 200, message: { token } };
    // }

    return { code: 401, message: { message: 'Incorrect email or password' } };
  }

  // static async getRole(id: number): Promise<IUserServicesResponse> {
  //   const { role } = await User.findByPk(id) as User;
  //   return { code: 200, message: { role } };
  // }
}

export default UserServices;