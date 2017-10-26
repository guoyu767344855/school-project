
//返回上一页
$("#goBack").click(function(){
	history.go(-1);
});

//回到注册
$("#register").click(function(){
	location.href = "register.html";
});

$("form").submit(function(event){
	//阻止默认事件
	event.preventDefault();
	//获取表单数据 拼接成字符串
	var data = $(this).serialize();
	//发送网络请求
	$.post("/user/login",data,function(resData){
		$(".modal-body").text(resData.msg);
		$("#myModal").modal("show").on("hide.bs.modal",function(){
			if(resData.code == 1){
				location.href = "/index.html";
			}
		});
	});
});

























