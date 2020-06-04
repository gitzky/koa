const router = require("koa-router")();
const userModel = require("../lib/sql");
const md5 = require("md5");

const moment = require("moment");
const fs = require("fs");

router.post("/api/register", async (ctx, next) => {
  let user = {
    name: ctx.request.body.name,
    pass: ctx.request.body.pass,
    repeatpass: ctx.request.body.repeatpass,
    avator: ctx.request.body.avator || "",
  };
  console.log("user", user);
  await userModel.findUserData(user.name).then(async (result) => {
    console.log(result);
    if (result.length) {
      try {
        throw Error("用户已经存在");
      } catch (error) {
        console.log("error:", error);
        // 用户存在
        var json = {
          code: "500",
          data: null,
          msg: error.toString(),
        };
        console.log("json", json);
        ctx.body = JSON.stringify(json);
      }
    } else if (user.pass !== user.repeatpass || user.pass === "") {
      console.log("密码输入不一致");
      try {
        throw Error("密码输入不一致");
      } catch (error) {
        console.log(error);
        // 用户存在
        var json = {
          code: "500",
          data: null,
          msg: error.toString(),
        };
        ctx.body = JSON.stringify(json);
      }
    } else {
      // let base64Data = user.avator.replace(/^data:image\/\w+;base64,/, "");
      // let dataBuffer = Buffer.from(base64Data, "base64");
      // let getName =
      //   Number(Math.random().toString().substr(3)).toString(36) + Date.now();
      // await fs.writeFile(
      //   "./public/images/" + getName + ".png",
      //   dataBuffer,
      //   (err) => {
      //     if (err) throw err;
      //     console.log("头像上传成功");
      //   }
      // );

      await userModel
        .insertData([
          user.name,
          md5(user.pass),
          "default.png",
          moment().format("YYYY-MM-DD HH:mm:ss"),
        ])
        .then((res) => {
          var json = { code: "0", data: res, msg: "成功" };
          ctx.body = JSON.stringify(json);
          console.log("注册成功", res);
        })
        .catch((error) => {
          console.log(error);
          // 用户存在
          var json = {
            code: "500",
            data: null,
            msg: error.toString(),
          };
          ctx.body = JSON.stringify(json);
        });
    }
  });
});
module.exports = router;
/**
我们使用md5实现密码加密，长度是32位的
使用我们之前说的bodyParse来解析提交的数据，通过ctx.request.body得到
我们引入了数据库的操作 findDataByName和insertData，因为之前我们在/lib/mysql.js中已经把他们写好，并暴露出来了。意思是先从数据库里面查找注册的用户名，如果找到了证明该用户名已经被注册过了，如果没有找到则使用insertData增加到数据库中
ctx.body 是我们通过ajax提交之后给页面返回的数据，比如提交ajax成功之后msg.data=1的时候就代表用户存在，msg.data出现在后面的signup.ejs模板ajax请求中
上传头像之前要新建好文件夹，我们ajax发送的是base64的格式，然后使用fs.writeFile来生成图片
我们使用ajax来提交数据，方便来做成功错误的处理


*/
