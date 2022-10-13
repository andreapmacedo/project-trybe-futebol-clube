// import sequelize from '../models';
import User from '../models/User';
import { IUser, IUserCreate } from '../interfaces/User.interface';
import TokenGenerator from '../../shared/TokenGenerator';
import BcryptService from './utils/BcriptService';

class UserServices {

  validateEmail(value: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const result = value.match(regex);
    return result;
  }

  validatePassword(value: string) {
    if (value.length > 6) return true;
    return false;
  }


  async login(body: IUser) {
    
    const validatedEmail = this.validateEmail(body.email);
    if (!validatedEmail) return { code: 400, message: { message: 'All fields must be filled' } };
    

    const validatedPassword = this.validatePassword(body.password);
    if (!validatedPassword) return { code: 400, message: { message: 'All fields must be filled' } };


    const data = await User.findOne({
      // where: { email: body.email },
      where: { email: validatedEmail },
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

  async getRole(id: number)  {
    console.log(id);
    const { role } = await User.findByPk(id) as User;
    return { code: 200, message: { role } };
    
  }
}




export default UserServices;