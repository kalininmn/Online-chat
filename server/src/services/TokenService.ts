import dbInstance from '../utils/DataBase';

export default class TokenService {
  static setUserRefreshToken(user, refreshToken) {
    dbInstance.execute(
      'UPDATE users SET refreshToken = ? WHERE id = ?',
      [refreshToken, user.id]
    );
  }
}