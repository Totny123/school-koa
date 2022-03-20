const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, name, role_id } = ctx.user;
    const token = jwt.sign({ id, name, role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.status = 200;
    ctx.body = { code: 20000, data: { id, name, role_id, token } };
  }
}

module.exports = new AuthController();
