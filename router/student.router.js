const Router = require("koa-router");

const {
  getStu,
  delStu,
  editStu,
  addStu,
} = require("../controller/student.controller");

const studentRouter = new Router({ prefix: "/student" });

studentRouter.get("/", getStu);
studentRouter.post("/del", delStu);
studentRouter.post("/edit", editStu);
studentRouter.post("/add", addStu);

module.exports = studentRouter;
