import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = 'jwt_secret';

interface IPayload {
  data: object | string | number | Buffer;
}

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static decodeToken = async (token: string) => {
    try {
      const { data } = jwt.verify(token, secret) as IPayload;
      return data;
    } catch (error) {
      return null;
    }
  };
}
