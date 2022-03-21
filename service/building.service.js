const conn = require("../app/database");

class BuildingService {
  async buildingInfo(query) {
    const { currentPage, pageSize, name = "" } = query;
    const offset = (currentPage - 1) * pageSize;
    const statement = `
      SELECT
        building.id,
        building.name,
        building.type,
      IF
        ( building.admin_id, JSON_OBJECT( 'fullname', admin.fullname, 'id', admin.id, 'phone_number', admin.phone_number ), NULL ) manager
      FROM
        building
      LEFT JOIN admin ON building.admin_id = admin.id
      WHERE
        building.NAME LIKE '%${name}%'
      LIMIT ?,?;
      `;
    const statement2 = ` SELECT
      building.id,
      building.name,
      building.type,
    IF
      ( building.admin_id, JSON_OBJECT( 'fullname', admin.fullname, 'id', admin.id, 'phone_number', admin.phone_number ), NULL ) manager
    FROM
      building
    LEFT JOIN admin ON building.admin_id = admin.id
    WHERE
      building.NAME LIKE '%${name}%'`;
    const [result] = await conn.execute(statement, [
      String(offset),
      String(pageSize),
    ]);
    const [result2] = await conn.execute(statement2);
    return { result, total: result2.length };
  }

  async delBuildingById(id) {
    const statement = `DELETE from building WHERE id = ?`;
    const [result] = await conn.execute(statement, [id + ""]);
    return result;
  }

  async addBuilding(data) {
    const { name, type, admin_id } = data;
    const statement = `INSERT INTO building (name,type,admin_id) VALUES (?,?,?);`;
    const [result] = await conn.execute(statement, [name, type, admin_id]);
    return result;
  }
}

module.exports = new BuildingService();
