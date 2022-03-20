const {
  getAdmins,
  delAdminById,
  editAdminById,
  addAdminById,
} = require("../service/admin.service");

class AdminController {
  async get(ctx, next) {
    const result = await getAdmins(ctx.query);
    ctx.body = { code: 20000, data: result.data, total: result.total };
  }
  async delAdmin(ctx, next) {
    const result = await delAdminById(ctx.query.id);
    if (result) {
      ctx.body = { code: 20000, msg: "删除成功" };
    } else {
    }
  }

  async editAdmin(ctx, next) {
    const result = await editAdminById(ctx.request.body);
    if (result) {
      ctx.body = { code: 20000, msg: "修改成功" };
    }
  }

  async addAdmin(ctx, next) {
    const result = addAdminById(ctx.request.body);
    if (result) {
      ctx.body = { code: 20000, msg: "添加成功" };
    }
  }
}

module.exports = new AdminController();
