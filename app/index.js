const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa-cors");

const loadAllRouter = require("../router");
const errorHandle = require("./error-handle");
require("./database");

const app = new Koa();

app.use(cors());
app.use(bodyParser());
loadAllRouter(app);

app.on("error", errorHandle);

module.exports = app;
