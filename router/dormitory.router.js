const Router = require("koa-router");

const {
  getList,
  del,
  add,
  edit,
} = require("../controller/dormitory.controller");

const dormitoryRouter = new Router({ prefix: "/dormitory" });

dormitoryRouter.get("/", getList);
dormitoryRouter.post("/del", del);
dormitoryRouter.post("/add", add);
dormitoryRouter.post("/edit", edit);

module.exports = dormitoryRouter;
