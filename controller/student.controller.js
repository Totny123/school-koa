const {
  getStus,
  delStuById,
  createStu,
  editStuById,
  editStuIn,
  editStuOut,
} = require("../service/student.service");

class StudentController {
  async getStu(ctx, next) {
    const result = await getStus(ctx.query);
    ctx.body = { code: 20000, data: result.data, total: result.total };
  }

  async delStu(ctx, next) {
    const { id } = ctx.request.body;
    const result = await delStuById(id);
    if (result) {
      ctx.body = { code: 20000, msg: "删除成功" };
    } else {
    }
  }

  async editStu(ctx, next) {
    const result = await editStuById(ctx.request.body);
    if (result) {
      ctx.body = { code: 20000, msg: "修改成功" };
    }
  }
  async addStu(ctx, next) {
    const result = await createStu(ctx.request.body);
    if (result) {
      ctx.body = { code: 20000, msg: "添加成功" };
    }
  }
  async stuIn(ctx, next) {
    const result = await editStuIn(ctx.request.body);
    ctx.body = { code: 20000, msg: "入住成功" };
  }

  async stuOut(ctx, next) {
    const result = await editStuOut(ctx.request.body);
    ctx.body = { code: 20000, msg: "迁出成功" };
  }
}

module.exports = new StudentController();
