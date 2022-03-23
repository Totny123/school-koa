const conn = require("../app/database");
const md5 = require("../utils/password-handle");

class AuthService {
  async getUserByName(tableName, name) {
    const statement = `SELECT * FROM ${tableName} WHERE name = ?;`;
    const [result] = await conn.execute(statement, [name]);
    return result[0];
  }

  async editPasswordByUser(tableName, user_id, password) {
    const statement = `UPDATE ${tableName} SET password = ? WHERE id = ?;`;
    const [result] = await conn.execute(statement, [md5(password), user_id]);
    return result[0];
  }
}

module.exports = new AuthService();
