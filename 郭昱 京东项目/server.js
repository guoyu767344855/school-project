//加载模块二
var express = require("express"); //服务器模块
var bodyParser = require("body-parser"); //处理解析post请求数据模块
var multer = require("multer"); //处理formdata格式提交数据模块
var fs = require("fs"); //处理文件写入/读出模块
var CookieParser = require("cookie-parser");//解析cookie模块
//创建服务对象
var app = express();

//指定根陌路文件
app.use(express.static("www"));

//解析请求数据
app.use(bodyParser.urlencoded({extended:true}));

//解析cookie数据
app.use(CookieParser());
/**************注册***************/
app.post("/user/register",function(req,res){
	//先判断用户是否已经被注册
	var filePath = "users/"+req.body.username+".json";
	fs.exists(filePath,function(exi){
		if (exi) {
			//用户存在
			res.status(200).json({code:2,msg:"用户名已存在，请重新填写"});
		} else{
			//用户不存在
			//在body里面添加注册时间和ip
			req.body.ip = req.ip;
			req.body.time = new Date();
				fs.writeFile(filePath,JSON.stringify(req.body),function(err){
			if (err) {
				res.status(200).json({code:0,msg:"系统写入文件失败，请稍后再试"});
			} else{
				res.status(200).json({code:1,msg:"注册成功"});
			}
		});
		}
	});
	//直接把注册等信息写到本地
	
});

/**************登录***************/
app.post("/user/login",function(req,res){
	//判断用户是否存在
	var filePath = "users/" + req.body.username + ".json";
	fs.exists(filePath,function(exi){
		if (exi) {
			//用户名存在，判断是否正确
			fs.readFile(filePath,function(err,data){
				if (err) {
					//读取文件失败
					res.status(200).json({code:1,msg:"系统错误，读取文件失败"});
				} else{
					//注意data是一个字符串
					var user = JSON.parse(data);
					if(req.body.password == user.password){
						//把用户名存到cookie(1.把用户名以cookie的形式保存在前段，可以作为是否登录的一个凭证；
						//                2.发送网络请求的时候，会把cookie带到后台)
						//param1:键
						//param2:值
						//param3:过期时间 对象Object{expires}
						var time = new Date();
						time.setMonth(time.getMonth()+1);
						res.cookie("username",req.body.username,{expires:time});
						res.status(200).json({code:1,msg:"登陆成功"});
					} else{
						res.status(200).json({code:3,msg:"密码错误"});
					}
				}
			});
		} else{
			//用户名不存在
			res.status(200).json({code:0,msg:"用户名不存在"});
		}
	});
});

/**************退出登录***************/
app.post("/user/logout",function(req,res){
	//清楚cookie中的username(access_token,timestamp)
	res.clearCookie("username");
	res.status(200).json({code:1,msg:"退出登录成功"});
});

//监听
app.listen(3000,function(){
	console.log("服务器启动成功......");
});