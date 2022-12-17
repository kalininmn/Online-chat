import env from '../consts/env';
import jwt from 'jsonwebtoken';
const AuthenticationService = require('../services/AuthenticationService.js');
const TokenService = require(`${rootPath}/services/TokenService.js`);

const helpers = {
  randomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  convertToString(data) {
    return data?.toString();
  },
  splitString(data, symbols) {
    // String.prototype.substring.call(accessTokenStr, accessTokenStr.length - 6);
    if (data?.length > symbols) {
      return data.substring(data.length - symbols);
    } else {
      return null;
    }
  },
}

export default class JWT {
  static #secret: string = btoa(env.TOKEN_SECRET);
  static #accessToken: string | null = null;

  // Генерирует access-токен
  static generateAccessToken(userFull) {
    const user = {
      id: userFull.id,
      login: userFull.login,
      // password: userFull.password,
    };
   const payload = btoa(JSON.stringify(user));

    JWT.#accessToken = jwt.sign(
      { user: payload },
      JWT.#secret,
      { expiresIn: '300s' },
    );

    return JWT.#accessToken;
  }

  // Генерирует refresh-токен
  static generateRefreshToken(user) {
    if (JWT.#accessToken) {
      const accessTokenStr = helpers.convertToString(JWT.#accessToken);
      const lastSixSymbols = helpers.splitString(accessTokenStr, 6);
      const refreshToken = helpers.randomString() + lastSixSymbols;
  
      TokenService.setUserRefreshToken(user, refreshToken);
    } else {
      throw Error('Access-token empty');
    }
  }

  // Проверяет токен на валидность
  static async checkToken(accessTokenFromClient) {
    return jwt.verify(accessTokenFromClient, JWT.#secret, async (err, decoded) => {
      // let userFromJson = null;
      const user = JSON.parse(atob(decoded.user));

      if (err) {
        if (err.message === 'jwt expired') {
          // const { user: userInJson } = jwt.decode(accessTokenFromClient);
          // userFromJson = JSON.parse(userInJson);

          const accessTokenStr = helpers.convertToString(accessTokenFromClient);
          const lastSixSymbolsAccess = helpers.splitString(accessTokenStr, 6);

          const userFromDBFull = await AuthenticationService.getUser(user.id);
          const refreshTokenStr = helpers.convertToString(userFromDBFull.refreshToken);
          const lastSixSymbolsRefresh = helpers.splitString(refreshTokenStr, 6);

          if (lastSixSymbolsAccess === lastSixSymbolsRefresh) {
            await JWT.generateAccessToken(user);
            await JWT.generateRefreshToken(user);

            return { token: JWT.#accessToken, user };
          }
        }
        return null;
      }

      return { user };
    });
  }
}