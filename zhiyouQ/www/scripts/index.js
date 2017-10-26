
//取出本地存储cookie中的username
//var username = document.cookie;
//username = window.decodeURIComponent(username);
var username = $.cookie("username");

//判断username有没有值，改变user的样式和行为
if (username) {
	$("#user").find("span").last().text(username);
} else{
	$("#user").find("span").last().text("登录").end().end().removeAttr("data-toggle").click(function(){
		location.href = "login.html";
	});
}



//点击提问按钮 
$("#ask").click(function(){
	if (username) {
		location.href = "ask.html";
	} else{
		location.href = "login.html";
	}
});

//退出登录
$("#logout").click(function(){
	$.post("/user/logout",function(resData){
		//如果正常退出登录，刷新本页面
		if (resData.code == 1) {
			location.reload();
		}
	});
});

//获取首页数据
$.get("/question/all",function(resData){
	//遍历所有的问题
	console.log(resData);
	var htmlStr = "";
	var ip = "";
	var time = "";
	var username = "";
	for (var i = 0; i < resData.length; i++) {
		//这里采用bootstrap里面的媒体对象
		var question = resData[i];
		htmlStr += "<div class='media question' data-time='" + new Date(question.time).getTime() + "'>"
		htmlStr += "<a class='pull-left' href='#'>"
		htmlStr += '<img class="media-object" src="../uploads/' + question.username + '.jpg" onerror="this.src=\'../images/user.png\'">'
		htmlStr += "</a>"
		htmlStr += "<div class='media-body'>"
		htmlStr += "<h4 class='media-heading'>"
		htmlStr += question.username + "(" + "学科" + ")"
		htmlStr += "</h4>"
		htmlStr += "<p>" + question.content + "<input type='submit' class='pull-right' value='回复'>" +"</p>"
		htmlStr += "<div class='media-bottom'>" + formatTime(question.time) + "&#x3000;" + formatIp(question.ip) + "</div>"
		
		
		//判断这个问题是否有答案
		if (question.answers) {
			for (var j = 0; j < question.answers.length; j++) {
			    var answer = question.answers[j];
			    //外层（每个答案的父标签）
			    htmlStr += '<div class="media answer">'
			    htmlStr += '<div class="media-body">'
			    htmlStr += '<h4 class="media-heading">'
			    htmlStr += answer.username
			    htmlStr += '</h4>'
			    htmlStr += "<p>" + answer.content + "</p>"
			    htmlStr += "<div class='media-bottom' >" + formatTime(answer.time) + "&#x3000;" + formatIp(answer.ip) + "</div>"
			    htmlStr += "<a class='pull-right' href='#'>"
				htmlStr += '<img class="media-object" src="../uploads/' + answer.username + '.jpg" onerror="this.src=\'../images/user.png\'">'
				htmlStr += "</a>"
			    htmlStr += '</div>'
			    htmlStr += '</div>'
			}
		}
		
		htmlStr += "</div>"
		htmlStr += "</div>"
		htmlStr += "<hr>"
		
	}
	$("#questions").html(htmlStr);
});

// 时间格式器
function formatTime(time){
	time = new Date(time);
	var y = time.getFullYear();
	var M = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	
	M = M < 10 ? "0"+M : M;
	d = d < 10 ? "0"+d : d;
	h = h < 10 ? "0"+h : h;
	m = m < 10 ? "0"+m : m;
	s = s < 10 ? "0"+s : s;
	
	return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
}

// ip 格式器
function formatIp(ip){
	/*
	if (ip.startsWith("::1")) {
		return "127.0.0.1";
	}else if(ip.startsWith("::ffff:")){
		return ip.substr(7);
	}
	*/
	var regExp = /::1/ig;
	if (ip.match(regExp)) {
		return "127.0.0.1";
	} else{
		return ip.substr(7);
	}
	
}

//点击某个问题跳转到回答问题页面(这里得使用代理事件，因为绑定事件执行的时候 htmlStr还没拼接完毕)
$("#questions").on("click",".question input",function(){
		if (username) {
			location.href = "answer.html";
//			console.log($(this).data("time"));
			//存放到cookie中，目的是下次发送请求时带到后台（找到对应问题文件）
			$.cookie("question",$(this).data("time"));
		} else{
			location.href = "login.html";
		}
});

//如果没有头像 加载默认头像 上面调 defaultHeaderImage(this)
//function defaultHeaderImage(img){
//	img.src = "../images/user.png"
//}



//
//<div class="media">
//	
//	<div>
//		<h4 class="media-heading">媒体标题</h4>
//		这是一些示例文本。这是一些示例文本。
//		这是一些示例文本。这是一些示例文本。
//		这是一些示例文本。这是一些示例文本。
//		这是一些示例文本。这是一些示例文本。
//		这是一些示例文本。这是一些示例文本。
//	</div>
//</div>
//
//
//
//htmlStr += "<span>"
//		htmlStr += question.ip
//		htmlStr += "</span>"
//		htmlStr += "<span>"
//		htmlStr += question.time
//		htmlStr += "</span>"
//		htmlStr += "<span>"
//		htmlStr += question.username
//		htmlStr += "</span>"





















