const {
  get,
  delById,
  addOne,
  editById,
} = require("../service/dormitory.service");

class DormitoryController {
  async getList(ctx, next) {
    const res = await get(ctx.query);
    ctx.body = { code: 20000, data: res.result, total: res.total };
  }

  async del(ctx, next) {
    const result = await delById(ctx.request.body.id);
    ctx.body = { code: 20000, msg: "删除成功" };
  }

  async add(ctx, next) {
    const result = await addOne(ctx.request.body);
    ctx.body = { code: 20000, mag: "添加成功" };
  }

  async edit(ctx, next) {
    const result = await editById(ctx.request.body);
    ctx.body = { code: 20000, msg: "修改成功" };
  }
}

module.exports = new DormitoryController();
