const {
  getUserByName,
  editPasswordByUser,
} = require("../service/auth.service");

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

  async editPassword(ctx, next) {
    const { role_id, id: user_id } = ctx.user;
    const tableName = ["", "sys_admin", "admin", "student"][Number(role_id)];
    const { password } = ctx.request.body;
    const result = await editPasswordByUser(tableName, user_id, password);
    ctx.body = { code: 20000, msg: "修改成功" };
  }
}

module.exports = new UserController();
