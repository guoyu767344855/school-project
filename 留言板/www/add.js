
// 找到 form 阻止默认事件
document.forms[0].onsubmit = function(event){
	// 阻止默认事件
	event.preventDefault();
	
	// 拿到表单数据
	var data = new FormData(this);
	// 发送 xhr 请求
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			// JSON.parse 把一个json字符串解析成对象
			var data = JSON.parse(xhr.responseText);
			if (xhr.status == 200 && data.code == 1) {
				// 留言成功
				// alert(data.info);
				// 跳转到首页
				// location.href = "/index.html";
				location.href = "/";
			} else{
				// 留言失败
				alert("留言未能成功，请稍后再试。");
			}
		}
	}
	xhr.open("POST","add");
	xhr.send(data);
};