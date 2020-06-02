const router = require("koa-router")();
const userModel = require("../lib/mysql");

// 文章
router.post("/api/selUserList", async (ctx, next) => {
  console.log(ctx.request.body);
  await userModel.findUserByPage().then((res) => {
    console.log(res);
    var json = { code: "0", data: { list: res }, msg: "success" };
    ctx.body = JSON.stringify(json);
  });
});

module.exports = router;
