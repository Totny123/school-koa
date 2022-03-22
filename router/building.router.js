const Router = require("koa-router");

const { list, del, add, edit } = require("../controller/building.controller");

const buildingRouter = new Router({ prefix: "/building" });

buildingRouter.get("/", list);
buildingRouter.post("/del", del);
buildingRouter.post("/add", add);
buildingRouter.post("/edit", edit);

module.exports = buildingRouter;
