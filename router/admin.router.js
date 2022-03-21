const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  get,
  delAdmin,
  editAdmin,
  addAdmin,
} = require("../controller/admin.controller");

const AdminRouter = new Router({ prefix: "/admin" });

AdminRouter.get("/", get);
AdminRouter.post("/", delAdmin);
AdminRouter.post("/edit", editAdmin);
AdminRouter.post("/add", addAdmin);

module.exports = AdminRouter;
