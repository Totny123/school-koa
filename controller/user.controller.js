const { getUserByName } = require("../service/auth.service");

class UserController {
  async getInfo(ctx, next) {
    const { name, role_id } = ctx.user;
    const tableName = ["", "sys_admin", "admin", "student"][Number(role_id)];
    const result = await getUserByName(tableName, name);
    ctx.body = {
      code: 20000,
      data: result,
    };
  }
}

module.exports = new UserController();
