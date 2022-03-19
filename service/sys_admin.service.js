const conn = require("../app/database");
class SysAdminService {
  async getSysAdminByName(name) {
    const statement = "SELECT * FROM sys_admin WHERE name = ?;";
    const [result] = await conn.execute(statement, name);
    return result;
  }
}

module.exports = new SysAdminService();
