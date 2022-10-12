// import sequelize from '../models';
import User from '../models/User';
import { IUser } from '../interfaces/User.interface';
import { userInfo } from 'os';
import TokenGenerator from '../../shared/TokenGenerator';
import BcryptService from './utils/BcriptService';

class UserServices {
  async login(body: IUser) {
    
    const data = await User.findOne({
      where: { email: body.email },
    })
  
    if (!data) return { code: 401, message: { message: 'Incorrect email or password' } };

      // verifica se a senha passada é igual a senha incriptada no banco
    const checkPassword = BcryptService.compare(data?.password as string, body.password);
    
    if (!checkPassword) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }
    const tokenGenerator = new TokenGenerator();
    const token = tokenGenerator.generateJWTToken({email: body.email, password: body.password});
    // console.log(token);
    // return { token };
    return { code: 200, message: { token } };
    
  }
}

export default UserServices;