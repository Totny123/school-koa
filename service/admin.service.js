const conn = require("../app/database");
const md5password = require("../utils/password-handle");

class AdminService {
  async getAdminByName(name) {
    const statement = "SELECT * FROM admin WHERE name = ?;";
    const [result] = await conn.execute(statement, name);
    return result;
  }

  async getAdmins(query) {
    try {
      const { currentPage = 1, pageSize = 99999, fullname = "" } = query;
      const offset = (Number(currentPage) - 1) * Number(pageSize);
      const statement = `
        SELECT
          admin.id,
          admin.name,
          admin.password,
          admin.fullname,
          admin.gender,
          admin.phone_number,
        IF
          (
            COUNT( building.id ),
            JSON_ARRAYAGG(
            JSON_OBJECT( 'id', building.id, 'name', building.name, 'type', building.type )),
          NULL
          ) buildings
        FROM
          admin
        LEFT JOIN building ON admin.id = building.admin_id
        WHERE
          admin.fullname LIKE '%${fullname}%'
        GROUP BY
          admin.id
        LIMIT ?,?;
      `;
      const statement2 = `SELECT COUNT(*) AS total  FROM admin WHERE fullname LIKE '%${fullname}%';`;
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

  async delAdminById(id) {
    const statement = `DELETE FROM admin WHERE id = ?`;
    const [result] = await conn.execute(statement, [id]);
    return result;
  }

  async editAdminById(data) {
    try {
      const { id, name, fullname, gender, phone_number, password } = data;
      const md5pwd = md5password(password);
      const statement = `UPDATE admin SET name = ?, fullname = ?, gender = ?,
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

  async addAdminById(data) {
    const {
      name,
      fullname,
      gender,
      phone_number,
      password,
      role_id = 2,
    } = data;
    const md5pwd = md5password(password);
    const statement = `INSERT INTO admin (name, fullname,gender,phone_number,password,role_id)
    VALUES (?,?,?,?,?,?);`;
    const [result] = await conn.execute(statement, [
      name,
      fullname,
      gender,
      phone_number,
      md5pwd,
      role_id,
    ]);
    return result;
  }
}

module.exports = new AdminService();
