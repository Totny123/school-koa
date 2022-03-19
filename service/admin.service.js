const conn = require("../app/database");

class AdminService {
  async getAdminByName(name) {
    const statement = "SELECT * FROM admin WHERE name = ?;";
    const [result] = await conn.execute(statement, name);
    return result;
  }
}

module.exports = new AdminService();
