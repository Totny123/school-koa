const {
  NAME_OR_PASSWORD_IS_EMPTY,
  PASSWORD_IS_WRONG,
  USER_IS_NOT_EXISTS,
  TOKEN_IS_WRONG,
} = require("../constants/error-types");

const errorHandle = (error, ctx) => {
  let status = 200,
    message;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_EMPTY:
      message = "用户名或密码为空";
      break;
    case PASSWORD_IS_WRONG:
      message = "密码不正确";
      break;
    case USER_IS_NOT_EXISTS:
      message = "用户不存在";
      break;
    case TOKEN_IS_WRONG:
      message = "token不正确";
      break;
    default:
      status = 404;
  }
  ctx.status = status;
  ctx.body = { code: "fail", message };
};

module.exports = errorHandle;
