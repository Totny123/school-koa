const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { repair, list } = require("../controller/repair.controller");

const repairRouter = new Router({ prefix: "/repair" });

repairRouter.post("/", verifyAuth, repair);
repairRouter.get("/", list);

module.exports = repairRouter;
