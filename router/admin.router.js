const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  get,
  delAdmin,
  editAdmin,
  addAdmin,
} = require("../controller/admin.controller");

const AdminRouter = new Router({ prefix: "/admin" });

AdminRouter.get("/", verifyAuth, get);
AdminRouter.post("/", verifyAuth, delAdmin);
AdminRouter.post("/edit", verifyAuth, editAdmin);
AdminRouter.post("/add", verifyAuth, addAdmin);

module.exports = AdminRouter;
