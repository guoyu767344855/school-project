
$(".nav>span").eq(0).mouseenter(function(){
	$(".myBJ").show();
});
$(".nav>span").eq(0).mouseleave(function(){
	$(".myBJ").hide();
});
$(".nav>span").eq(4).mouseenter(function(){
	$(".myJD").show();
});
$(".nav>span").eq(4).mouseleave(function(){
	$(".myJD").hide();
});
$(".nav>span").eq(7).mouseenter(function(){
	$(".myKH").show();
});
$(".nav>span").eq(7).mouseleave(function(){
	$(".myKH").hide();
});
$(".nav>span").eq(8).mouseenter(function(){
	$(".myNAV").show();
});
$(".nav>span").eq(8	).mouseleave(function(){
	$(".myNAV").hide();
});
$(".tab>table").mouseenter(function(){
	$(this).show();
});
$(".tab>table").mouseleave(function(){
	$(this).hide();
});
$("#X").click(function(){
	$("#first").hide();
	$("#topImage").hide();
	$(this).hide();
});
//top滚动监听
window.onscroll = function(){
	var t = document.documentElement.scrollTop || document.body.scrollTop
	var top = document.querySelector(".top");
	if ( t >= 200 ) {
		top.style.display = "inline";
	} else{
		top.style.display = "none";
	}
}

$("#gouwuche").mouseenter(function(){
	$("#none").show();
});
$("#gouwuche").mouseleave(function(){
	$("#none").hide();
});
$("#er").mouseenter(function(){
	$("#ma").show();
});
$("#er").mouseleave(function(){
	$("#ma").hide();
});
$("#phone").mouseenter(function(){
	$("#ma").show();
});
$("#phone").mouseleave(function(){
	$("#ma").hide();
});
$("#ma").mouseenter(function(){
	$(this).show();
});
$("#ma").mouseleave(function(){
	$(this).hide();
});
//上面当地地址
$(".myBJ td").mouseenter(function(){
	$(this).css({
		"background-color":"gray",
		"color":"red"
	});
	var htmlStr = $(this).html();
	$(this).click(function(){
			$(".nav span").eq(0).html("<span class='glyphicon glyphicon-map-marker'></span>" + htmlStr);
			$(this).css({
				"background-color":"red",
				"color":"gray"
			});
	});
  });
$(".myBJ td").mouseleave(function(){
	$(".myBJ td").eq(5).css("background-color","red");
	$(this).css({
		"background-color":"white",
		"color":"gray"
	});
});

//左边的菜单栏
var lis = $(".topLeft>ul>li");
var modas = $(".moda");
$(".topLeft>ul>li").mouseenter(function(){
			var index = $(this).index();
			modas[index].style.display = 'block';
});
$(".topLeft>ul>li").mouseleave(function(){
			var index = $(this).index();
			modas[index].style.display = 'none';
});

//右边菜单栏
$(".images>div").css({
	"width": "50px",
    "height": "52px",
    "border": "1px solid gray",
    "background-image": "url(images/sprite_fs@1x.png)",
    "background-repeat": "no-repeat",
    "float": "left",
    "text-align": "center",
    "line-height": "85px",
    "font-size": "12px",
    "color": "gray",
    "cursor": "pointer"
})

$(".cuxiao span").eq(0).mouseenter(function(){
	$(".gong").show();
	$(".gao").hide();
});
$(".cuxiao span").eq(1).mouseenter(function(){
	$(".gong").hide();
	$(".gao").css("display","block");
});


$(".images>div:lt(3)").mouseenter(function(){
	$(".images").hide();
	$(".huafei").show();
	$(".jiudian").eq(0).show();
	
})
var spans = $(".huafei>span");
var jiudians = $(".jiudian");
$(".huafei>span").mouseenter(function(){
			var index = $(this).index();
			jiudians[index].style.display = 'block';
			$(jiudians[index]).siblings().css('display', 'none');
});
$(".jiudian p").click(function(){
	$(".images").show();
	$(".huafei").hide();
	$(".jiudian").hide();
})

//倒计时
var intDiff = parseInt(100);//倒计时总秒数量
function timer(intDiff){
    window.setInterval(function(){
    var day=0,
        hour=0,
        minute=0,
        second=0;//时间默认值        
    if(intDiff > 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('#hour_show').html("0"+hour);
    $('#minute_show').html(minute);
    $('#second_show').html(second);
    intDiff--;
    }, 1000);
} 
$(function(){
    timer(intDiff);
}); 

//小轮播图1
var prev = $('.box .item').length-1, current = 0, next = 1;
	
	//点击下一张
	$('.indicator .next').click(function(){
		//记录下当前的实参
		var arg = arguments;
		var $this = $(this);
		//解绑方法
		$($this).unbind('click');
		
		$('.box .item').eq(next).css({
		left: 930
		}).finish().animate({
			left: 0
		},1000);
		
		$('.box .item').eq(current).css({
			left: 0
		}).finish().animate({
			left: -930
		},1000,function(){
			$(this).css({
				left: 930
			});
			//重新绑定方法
			$($this).bind('click',arg.callee);
		});
		
		current = next;
		next = next >= $('.box .item').length-1 ? 0 : next+1;
		prev = prev >= $('.box .item').length-1 ? 0 : prev+1;
	});
	
	//点击上一张
	$('.indicator .prev').click(function(){
		//记录下当前的实参
		var arg = arguments;
		var $this = $(this);
		//解绑方法
		$($this).unbind('click');
		
		$('.box .item').eq(prev).css({
		left: -930
		}).finish().animate({
			left: 0
		},1000);
		
		$('.box .item').eq(current).css({
		left: 0
		}).finish().animate({
			left: 930
		},1000,function(){
			$(this).css({
				left: -930
			});
			//重新绑定方法
			$($this).bind('click',arg.callee);
		});
		
		current = prev;
		next = next <= 0 ? $('.box .item').length-1 : next-1;
		prev = prev <= 0 ? $('.box .item').length-1 : prev-1;
	});
	
//小轮播图2
$(".littleMedia span").eq(0).mouseenter(function(){
	$(".littleMedia img").eq(0).show();
	$(".littleMedia img").eq(1).hide();
	$(this).css("background-color","red");
});
$(".littleMedia span").eq(0).mouseleave(function(){
	$(this).css("background-color","black");
});
$(".littleMedia span").eq(1).mouseenter(function(){
	$(".littleMedia img").eq(1).show();
	$(".littleMedia img").eq(0).hide();
	$(this).css("background-color","red");
});
$(".littleMedia span").eq(1).mouseleave(function(){
	$(this).css("background-color","black");
});
//小轮播图3
var prev = $('.box1 .item1').length-1, current = 0, next = 1;
	
	//点击下一张
	$('.indicator1 .next').click(function(){
		//记录下当前的实参
		var arg = arguments;
		var $this = $(this);
		//解绑方法
		$($this).unbind('click');
		
		$('.box1 .item1').eq(next).css({
		left: 930
		}).finish().animate({
			left: 0
		},1000);
		
		$('.box1 .item1').eq(current).css({
			left: 0
		}).finish().animate({
			left: -930
		},1000,function(){
			$(this).css({
				left: 930
			});
			//重新绑定方法
			$($this).bind('click',arg.callee);
		});
		
		current = next;
		next = next >= $('.box1 .item1').length-1 ? 0 : next+1;
		prev = prev >= $('.box1 .item1').length-1 ? 0 : prev+1;
	});
	
	//点击上一张
	$('.indicator1 .prev').click(function(){
		//记录下当前的实参
		var arg = arguments;
		var $this = $(this);
		//解绑方法
		$($this).unbind('click');
		
		$('.box1 .item1').eq(prev).css({
		left: -930
		}).finish().animate({
			left: 0
		},1000);
		
		$('.box1 .item1').eq(current).css({
		left: 0
		}).finish().animate({
			left: 930
		},1000,function(){
			$(this).css({
				left: -930
			});
			//重新绑定方法
			$($this).bind('click',arg.callee);
		});
		
		current = prev;
		next = next <= 0 ? $('.box1 .item1').length-1 : next-1;
		prev = prev <= 0 ? $('.box1 .item1').length-1 : prev-1;
	});	
	
//滚动页面监听