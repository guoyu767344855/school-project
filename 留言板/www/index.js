// 去留言界面
document.getElementsByTagName("button")[0].onclick = function(){
	location.href = "/add.html";
}


// 发送 get 请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if (xhr.readyState == 4) {
		// console.log(xhr.responseText);
		console.log(JSON.parse(xhr.responseText));
		var arr = JSON.parse(xhr.responseText);
		// 倒序遍历：最新的留言显示在最上面
		var htmlStr = "";
		for (var i = arr.length-1; i > -1; i--) {
			var msg = arr[i];
			htmlStr += "<section>";
			htmlStr += "<p>" + msg.message + "</p>";
			htmlStr += "<span>" + formatTime(msg.time) + "</span>";
			htmlStr += "<span>" + formatIp(msg.ip) + "</span>";
			htmlStr += "</section>";
		}
		document.querySelector("article").innerHTML = htmlStr;
		
	}
}
xhr.open("GET","message");
xhr.send();


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
	if (ip.startsWith("::1")) {
		return "127.0.0.1";
	}else if(ip.startsWith("::ffff:")){
		return ip.substr(7);
	}
}





