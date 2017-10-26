
//返回上一页
$("#goBack").click(function(){
	history.go(-1);
});

//回到首页
$("#home").click(function(){
	location.href = "index.html";
});

//发送回答问题请求
$("form").submit(function(event){
	event.preventDefault();
	//不仅需要把答案传到后台 还需要把回答问题的时间也传递到后台
	var data = $(this).serialize();
	$.post("/question/answer",data,function(resData){
		$(".modal-body").text(resData.msg);
			$("#myModal").modal("show").on("hide.bs.modal",function(){
				if (resData.code == 1) {
					location.href = "/";
				}
			});
	});
});