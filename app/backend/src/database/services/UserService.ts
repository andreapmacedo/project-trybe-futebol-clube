// import sequelize from '../models';
import User from '../models/User';
import { IUser, IUserCreate } from '../interfaces/User.interface';
import Token from '../../shared/TokenGenerator';
import BcryptService from './utils/BcriptService';

class UserServices {

  // TODO: Falta tipar o retorno
  async login(body: IUser) {
    


    if(!body.email) {
      return { code: 400, message: { message: 'All fields must be filled' } }
    }

    if(!body.password) {
      return { code: 400, message: { message: 'All fields must be filled' } }
    }

    const data = await User.findOne({
      where: { email: body.email },
    })
  
    if (!data) return { code: 401, message: { message: 'Incorrect email or password' } };

      // verifica se a senha passada é igual a senha incriptada no banco
    const checkPassword = BcryptService.compare(data?.password as string, body.password);
    
    // if (!checkPassword) throw new CustomError(401, 'Incorrect email or password');

    if (!checkPassword) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }
    
    // const tokenGenerator = new Token();
    // const token = tokenGenerator.generateJWTToken({email: body.email, password: body.password});
    const token =  Token.generateToken(data);
    return { code: 200, message: { token } }; 
  }

  // TODO: Falta tipar o retorno
  async getRole(email: string)  {
    const data = await User.findOne({
      where: { email: email },
    })
    return { code: 200, message: { "role": data?.role as string  } }; 
  }
}

export default UserServices;