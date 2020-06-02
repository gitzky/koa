const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const views = require("koa-views");
// const router = require("koa-router");
// const ejs = require("ejs");
// const koaStatic = require("koa-static");
// const staticCache = require("koa-static-cache");
const config = require("./config");

const app = new Koa();

// session 存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig),
  })
);

// 配置静态资源加载中间件
// app.use(koaStatic(path.join(__dirname, "./public")));
// 缓存
// app.use(
//   staticCache(
//     path.join(__dirname, "./public"),
//     { dynamic: true },
//     {
//       maxAge: 365 * 24 * 60 * 60,
//     }
//   )
// );
// app.use(
//   staticCache(
//     path.join(__dirname, "./images"),
//     { dynamic: true },
//     {
//       maxAge: 365 * 24 * 60 * 60,
//     }
//   )
// );

// 配置服务器端模板引擎中间件
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

app.use(
  bodyParser({
    formLimit: "1mb",
  })
);

const register = require("./routers/register");
const login = require("./routers/login");
const logout = require("./routers/logout");
const posts = require("./routers/posts");
const users = require("./routers/users");

// 路由
app.use(register.routes());
app.use(login.routes());
app.use(logout.routes());
app.use(posts.routes());
app.use(users.routes());

app.listen(8888);
console.log("server runing at 127.0.0.1:8888");
