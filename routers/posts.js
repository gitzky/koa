const router = require("koa-router")();
const postModel = require("../lib/sql");

// 文章
router.post("/api/selPostList", async (ctx, next) => {
  console.log(ctx.request.body);
  await postModel.findPostByPage().then((res) => {
    console.log(res);
    var json = { code: "0", data: { list: res }, msg: "success" };
    ctx.body = JSON.stringify(json);
  });
});

module.exports = router;
