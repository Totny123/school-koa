const conn = require("../app/database");

class RepairService {
  async addRepair(student_id, message) {
    const statement = `INSERT INTO repair (student_id,message) VALUES (?,?);`;
    const [result] = await conn.execute(statement, [student_id, message]);
    return result;
  }

  async getList(query) {
    console.log(query);
    const { currentPage = 0, pageSize = 99999 } = query;
    const offset = (currentPage - 1) * pageSize;
    const statement = `SELECT repair.id,repair.message,
    JSON_OBJECT('fullname',student.fullname,'dormitory_number',dormitory.dormitory_number) student
     FROM repair LEFT JOIN student ON student.id = repair.student_id 
     LEFT JOIN dormitory ON dormitory.id = student.dormitory_id LIMIT ?,?;`;
    const statement2 = `SELECT COUNT(*) total
      FROM repair LEFT JOIN student ON student.id = repair.student_id 
      LEFT JOIN dormitory ON dormitory.id = student.dormitory_id`;
    const [result] = await conn.execute(statement, [
      String(offset),
      String(pageSize),
    ]);
    const [total] = await conn.execute(statement2);
    return { data: result, total: total[0]["total"] };
  }
}

module.exports = new RepairService();
