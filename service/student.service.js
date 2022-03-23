const conn = require("../app/database");
const md5password = require("../utils/password-handle");

class StudentService {
  async getStudentByName(name) {
    const statement = "SELECT * FROM student WHERE name = ?;";
    const [result] = await conn.execute(statement, name);
    return result;
  }

  async getStus(query) {
    try {
      const { currentPage, pageSize, fullname = "" } = query;
      const offset = (Number(currentPage) - 1) * Number(pageSize);
      const statement = `SELECT student.id, student.student_id,student.name,student.password,student.fullname,student.gender,student.phone_number,
      dormitory.dormitory_number  FROM student LEFT JOIN dormitory ON student.dormitory_id = dormitory.id WHERE fullname LIKE '%${fullname}%' LIMIT ?,?;`;
      const statement2 = `SELECT COUNT(*) AS total  FROM student LEFT JOIN dormitory ON student.dormitory_id = dormitory.id WHERE fullname LIKE '%${fullname}%';`;
      const [result] = await conn.execute(statement, [
        String(offset),
        String(pageSize),
      ]);
      const [total] = await conn.execute(statement2);
      return { data: result, total: total[0]["total"] };
    } catch (err) {
      console.log(err);
    }
  }

  async delStuById(id) {
    const statement = `DELETE FROM student WHERE id = ?`;
    const [result] = await conn.execute(statement, [id]);
    return result;
  }

  async createStu(data) {
    const {
      name,
      fullname,
      gender,
      phone_number,
      password,
      student_id,
      role_id = 3,
    } = data;
    const md5pwd = md5password(password);
    const statement = `INSERT INTO student (name, fullname,gender,phone_number,password,role_id,student_id) 
    VALUES (?,?,?,?,?,?,?);`;
    try {
      const [result] = await conn.execute(statement, [
        name,
        fullname,
        gender,
        phone_number,
        md5pwd,
        role_id,
        student_id,
      ]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async editStuById(data) {
    try {
      const { id, name, fullname, gender, phone_number, password } = data;
      const md5pwd = md5password(password);
      const statement = `UPDATE student SET name = ?, fullname = ?, gender = ?,
    phone_number = ?,password = ? WHERE id = ?;`;
      const [result] = await conn.execute(statement, [
        name,
        fullname,
        gender,
        phone_number,
        md5pwd,
        id,
      ]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async editStuIn(data) {
    try {
      const { student_id, dormitory_id } = data;
      const statement = `UPDATE student SET dormitory_id = ? WHERE id = ?;`;
      const [result] = await conn.execute(statement, [
        dormitory_id,
        student_id,
      ]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async editStuOut(data) {
    try {
      const { student_id, dormitory_id } = data;
      const statement = `UPDATE student SET dormitory_id = ? WHERE id = ?;`;
      const [result] = await conn.execute(statement, [null, student_id]);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new StudentService();
