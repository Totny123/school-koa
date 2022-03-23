const Router = require("koa-router");

const {
  getStu,
  delStu,
  editStu,
  addStu,
  stuIn,
  stuOut,
} = require("../controller/student.controller");

const studentRouter = new Router({ prefix: "/student" });

studentRouter.get("/", getStu);
studentRouter.post("/del", delStu);
studentRouter.post("/edit", editStu);
studentRouter.post("/add", addStu);
studentRouter.post("/stuIn", stuIn);
studentRouter.post("/stuOut", stuOut);

module.exports = studentRouter;
