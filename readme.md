- config 存放默认文件
- lib 存放操作数据库文件
- middlewares 存放判断登录与否文件
- public 存放样式和头像文件
- routes 存放路由文件
- views 存放模板文件
- index 程序主文件
- package.json 包括项目名、作者、依赖等等

$ cnpm i koa koa-bodyparser koa-mysql-session koa-router koa-session-minimal koa-static koa-views md5 moment mysql ejs markdown-it chai mocha koa-static-cache --save-dev

koa node框架
koa-bodyparser 表单解析中间件
koa-mysql-session、koa-session-minimal 处理数据库的中间件
koa-router 路由中间件
koa-static 静态资源加载中间件
ejs 模板引擎
md5 密码加密
moment 时间中间件
mysql 数据库
markdown-it markdown语法
koa-views 模板呈现中间件
chai mocha 测试使用
koa-static-cache 文件缓存





##3个表

users	       posts	    	comment
id	               id	             	id
name	       name	     	name
pass	       title	             	content
avator	       content	     	moment
moment  	md	             	postid

​			uid			avator

​	       		moment 

​      			comments

​        		pv	

​			avator	



- id主键递增
- name: 用户名
- pass：密码
- avator：头像
- title：文章标题
- content：文章内容和评论
- md：markdown语法
- uid：发表文章的用户id
- moment：创建时间
- comments：文章评论数
- pv：文章浏览数
- postid：文章id