const {
  NAME_OR_PASSWORD_IS_EMPTY,
  PASSWORD_IS_WRONG,
  USER_IS_NOT_EXISTS,
} = require("../constants/error-types");

const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_EMPTY:
      status = 400;
      message = "用户名或密码为空";
      break;
    case PASSWORD_IS_WRONG:
      status = 400;
      message = "密码不正确";
      break;
    case USER_IS_NOT_EXISTS:
      status = 400;
      message = "用户不存在";
      break;
    default:
      status = 404;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
