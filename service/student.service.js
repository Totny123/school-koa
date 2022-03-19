const conn = require("../app/database");

class StudentService {
  async getStudentByName(name) {
    const statement = "SELECT * FROM student WHERE name = ?;";
    const [result] = await conn.execute(statement, name);
    return result;
  }
}

module.exports = new StudentService();
