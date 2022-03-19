const conn = require("../app/database");

class AuthService {
  async getUserByName(tableName, name) {
    const statement = `SELECT * FROM ${tableName} WHERE name = ?;`;
    const [result] = await conn.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new AuthService();
