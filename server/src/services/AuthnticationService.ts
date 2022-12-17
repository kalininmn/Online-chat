import dbInstance from "../utils/DataBase";

export default class AuthenticationService {
  static async getUserData(data) {
    const { login, password } = data;
    const userData = await dbInstance.execute(
      'SELECT id, username FROM users_data LEFT JOIN users WHERE login = ? AND password = ?',
      [login, password]
    );
    return userData;
  }
}