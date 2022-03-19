const {
  NAME_OR_PASSWORD_IS_EMPTY,
  PASSWORD_IS_WRONG,
  USER_IS_NOT_EXISTS,
} = require("../constants/error-types");
const md5password = require("../utils/password-handle");
const { getUserByName } = require("../service/auth.service");

const verifyLogin = async (ctx, next) => {
  //获取参数
  const { name, password, type } = ctx.request.body;
  //判断参数是否为空
  if (!name || !password || !type) {
    const error = new Error(NAME_OR_PASSWORD_IS_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户(sys_admin\admin\student)是否存在
  const tableName = ["", "sys_admin", "admin", "student"][Number(type)];
  const user = await getUserByName(tableName, name);
  if (!user) {
    const error = new Error(USER_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //判断密码是否正确
  if (user.password !== md5password(password)) {
    const error = new Error(PASSWORD_IS_WRONG);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};

module.exports = {
  verifyLogin,
};
