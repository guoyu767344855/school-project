
// 加载四个模块
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs"); // 做文件读写操作

// 创建服务器对象
var app = express();

// 处理上传数据对象
var upload = multer();

// 指定跟目录文件
app.use(express.static("www"));

// 解析 post 请求 content-type = x-www-form-urlencoded 格式的数据
app.use(bodyParser.urlencoded({extended:true}));

// 添加新留言的 add 请求
app.post("/add",upload.array(),function(req,res){
	var message = req.body.message;
	
	// xss （跨站脚本攻击）
	// 跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，
	// 故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中
	// Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。
	message = message.replace(/</g,'&lt;');
	message = message.replace(/>/g,'&gt;');
	
	// 把一个留言信息整合一个小对象（留言、时间、ip）
	var obj = {
		message: message,
		time: new Date(),
		ip: req.ip
	}
	
	// 判断 data 文件是否存在
	fs.exists("data",function(ex){ 
		if (ex) {
			// 文件夹存在（写入文件）
			writeFile();
		} else{
			// 文件夹不存在（创建data文件夹）
			// synchronize: 同步    asynchronize：异步
			// mkdirSync: 同步创建文件 make direction synchronize
			// mkdir: 异步创建文件
			fs.mkdirSync("data");
			// （写入文件）
			writeFile();
		}
	});
	
	// 由于上面两个地方都要写入文件，封装方法
	function writeFile(){
		fs.appendFile("data/message.txt",JSON.stringify(obj)+",",function(error){
			if (error) {
				res.status(200).send({code:0,info:"系统写入文件失败，错误信息：" + error});
			}else{
				// res.status(200).send({code:1,info:"留言成功"});
				res.status(200).json({code:1,info:"留言成功"});
			}
		});
	}
});

// 获取所有的留言
app.get("/message",function(req,res){
	// 获取所有留言（读取 message.txt 文件内容），返回给前端

	// 判断 message.txt 文件是否存在
	fs.exists("data/message.txt",function(ex){
		if (ex) {
			// 如果存在 (读取 message.txt 内容)
			fs.readFile("data/message.txt","utf-8",function(err,data){
				if (!err) {
					// 读取文件内容成功
					if (data.length == 0) {
						res.status(200).send("[]");
					} else{
						// 朝着 JSON 格式数据组装 [{},{},{},{}]（JSON开头和结尾要么{}要么[]）
						var result = "[" + data;
						result = result.substr(0,result.length-1) + "]";
						res.status(200).send(result);
					}
				} else{
					// 读取文件内容失败：返回个 空
					res.status(200).json({code:1,info:"系统错误，读取文件失败"});
				}
			});
		} else{
			// 如果不存在：返回个 空
			res.status(200).json({code:0,info:"还没有足迹，留下你的足迹吧"});
		}
	});			
});

// 监听端口号
app.listen(3000,function(){
	console.log("服务器已启动……");
});
