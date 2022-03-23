const conn = require("../app/database");

class DormitoryService {
  async get(query) {
    const { currentPage = 1, pageSize = 99999, dormitory_number = "" } = query;
    const offset = (currentPage - 1) * pageSize;
    const statement = `
        SELECT
      dormitory.id,
      dormitory.dormitory_number,
      dormitory.type,
      JSON_OBJECT('id',building_id,'name',name) building
    FROM
      dormitory
      LEFT JOIN building ON dormitory.building_id = building.id
    WHERE
      dormitory_number LIKE '%${dormitory_number}%'
      LIMIT ?,
      ?;
    `;
    const statement2 = ` SELECT
    COUNT(*) total
  FROM
    dormitory
    LEFT JOIN building ON dormitory.building_id = building.id
  WHERE
    dormitory_number LIKE '%${dormitory_number}%'
    ;`;
    const [result] = await conn.execute(statement, [
      String(offset),
      String(pageSize),
    ]);
    const [total] = await conn.execute(statement2);
    return { result, total: total[0]["total"] };
  }

  async delById(id) {
    const statement = `DELETE FROM dormitory WHERE id = ?;`;
    const [result] = await conn.execute(statement, [id]);
    return result;
  }

  async addOne(data) {
    const { dormitory_number, type, building_id } = data;
    console.log(data);
    const statement = `INSERT INTO dormitory (dormitory_number,type,building_id) VALUES(?,?,?)`;
    const [result] = await conn.execute(statement, [
      dormitory_number,
      type,
      Number(building_id),
    ]);
    return result;
  }

  async editById(data) {
    const { id, dormitory_number, type, building_id } = data;
    const statement = `UPDATE dormitory SET dormitory_number = ?,type = ?,building_id = ? WHERE id = ?;`;
    const [result] = await conn.execute(statement, [
      dormitory_number,
      type,
      building_id,
      id,
    ]);
    return result;
  }
}

module.exports = new DormitoryService();
