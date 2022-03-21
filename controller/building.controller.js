const {
  buildingInfo,
  delBuildingById,
  addBuilding,
} = require("../service/building.service");

class BuildingController {
  async list(ctx, next) {
    const result = await buildingInfo(ctx.query);
    ctx.body = { code: 20000, data: result.result, total: result.total };
  }

  async del(ctx, next) {
    const result = await delBuildingById(ctx.request.body.id);
    if (result) {
      ctx.body = { code: 20000, msg: "删除成功" };
    }
  }

  async add(ctx, next) {
    const result = await addBuilding(ctx.request.body);
    if (result) {
      ctx.body = { code: 20000, msg: "新增成功" };
    }
  }
}

module.exports = new BuildingController();
