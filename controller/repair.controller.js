const { addRepair, getList } = require("../service/repair.service");

class RepairController {
  async repair(ctx, next) {
    const result = await addRepair(ctx.user.id, ctx.request.body.message);
    ctx.body = { code: 20000, msg: "ζδΊ€ζε" };
  }

  async list(ctx, next) {
    const result = await getList(ctx.query);
    ctx.body = { code: 20000, ...result };
  }
}

module.exports = new RepairController();
