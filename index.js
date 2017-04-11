var info = {
	imgIndex : 1,
	index : '',
	width : window.innerWidth,
	position_left : '',
	position_movestar : '',
	position_move : '',
	position_moveend : '',
	imgTime : '',
	cParamOne : '',
	location : '',
	location_length : '',
	community_value : '',
	ComParam : '',
	img_index_now : function(val) {
		if (val!=1) {
			
			val = -(val/info.width) + 1;
			if (val > info.index - 1) {
				val = info.index;
			} else if (val <=1) {
				val = 1
			};
		} else {
			val = $('.img_index_now').html() - 0 + 1;
			if (val > info.index)
				val = 1;
		}
		$('.img_index_now').html(val);
	},
	
	imgMoveTo : function() {
		clearInterval(info.imgTime);
		info.imgTime = setInterval(function() {

			var move = $('#bigImg').position().left - info.width;
			if (move < (-(info.index - 1) * info.width)) {
				move = 0;
			}
			$('#bigImg').css('left', move);

			info.img_index_now(1);
		}, 6000);
	},
	village_request : function() {
		
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/mobileweb/SearchDoorServlet',
			dataType : 'json',
			data : info.ComParam,
			success : function(response) {
				if(response!=''){
				$('.change_box').css('display', 'none');
				$('.recommond_all').css('display', 'block');
				$('.recommond_all>ul').bindData(response);
				
				}else{
					$('.change_box').css('display', 'none');
					$('.cellList-fail').css('display','block');
					$('.recommond_all').css('display','none');
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.change_box').css('display', 'none');
				$('.cellList-fail').css('display','block');
				$('.recommond_all').css('display','none');
			}
		});

	},
	loud : function() {
		info.location = window.location.href;
		info.location = info.location.slice(info.location.indexOf('?') + 1).split('&');

		info.location_length = info.location.length;
		for (var a = 0; a < info.location_length; a++) {
			if (info.location[a].indexOf('zoneID') != -1) {
				info.cParamOne = info.location[a].split('=')[1];
				info.ComParam = {
					cParamOne : info.cParamOne
				};
				if (info.cParamOne.indexOf('#') != -1) {
					info.cParamOne = info.cParamOne.slice(0, -1);
					info.ComParam = {
						cParamOne : info.cParamOne
					};
				}
				info.ComParam = {
					ComParam : JSON.stringify(info.ComParam)
				};

			}
		}
		;
		info.village_request();
		


	},

};
$('.recommond_all').delegate('li','touchstart',function() {

			var inputs = $(this).find('[data-bind=doorID]');
			var input_doorTag = $(this).find('[data-bind=doorTag]');
			var value=$(input_doorTag[0]).attr('value');
		
					info.community_value = $(inputs[0]).attr('value');
				
					window.location.href= 'design.html?doorTag='+value+'&doorID='+ info.community_value;


		});
$(".info_head").delegate("div", "touchstart", function() {

	$(this).addClass('info_active').siblings().removeClass('info_active');
	switch ($(this).html()) {
	case "小区":
		
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/mobileweb/GetZoneServlet',
			dataType : 'json',
			data : info.ComParam,
			success : function(response) {
				
				if(response!=''){
				$('.recommond_all').css('display', 'none');
				$('.change_box').css('display', 'block');
				$('.cellList-fail').css('display','none');
				$('.change_box').bindData(response);
				info.index = response.zoneCarouselFigure.split(',').length;
				}else{
					$('.cellList-fail').css('display','block');
					$('.change_box').css('display','none');
				}

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.cellList-fail').css('display','block');
				$('.change_box').css('display','none');
				$('.recommond_all').css('display', 'none');
			}
		});
		$('.img_index_all').html('/' + info.index);
		
		$("#bigImg").css('width', info.index * info.width);
		
		$("#bigImg img").css('width', info.width);
		
		$('.bigImg_imgbox').mousedown(imgMove);
		
		document.getElementsByClassName('bigImg_imgbox')[0].addEventListener(
				'touchstart', imgMove, false);
		
		document.getElementsByClassName('bigImg_imgbox')[0].addEventListener(
				'touchmove', imgMove, false);
		
		document.getElementsByClassName('bigImg_imgbox')[0].addEventListener(
				'touchend', imgMove, false);
		
		$('.bigImg_imgbox').mousemove(imgMove);
		
		$('body').mouseup(imgMove);
		
		$('.bigImg_imgbox').mouseover(imgMove);
		
		break;
	case "户型":
		info.village_request();

		break;
	}
});

function imgMove(event) {
	var event = event || window.event;
	event.preventDefault();
	switch (event.type) {
	case "mousedown":
		info.position_movestar = event.clientX;
		info.position_left = $('#bigImg').position().left;
		info.position_move = info.position_left;
		info.swit = true;
		clearInterval(info.imgTime);

		break;
	case "touchstart":
		info.position_top = $('body').scrollTop();
		info.position_movestar = event.touches[0].clientX;

		info.position_left = $('#bigImg').position().left;
		info.position_move = info.position_left;
		clearInterval(info.imgTime);
        $('#bigImg').css('-webkit-transition','all 0s ');
       
		break;
	case "mousemove":

		if (info.swit) {
			info.position_move = info.position_left - info.position_movestar
					+ event.clientX;

			$('#bigImg').css('left', info.position_move);

		}
		;
		break;
	case "touchmove":

		info.position_move = info.position_left - info.position_movestar
				+ event.touches[0].clientX;
		info.position_moveY = info.position_top + info.position_movestarY
				- event.touches[0].clientY;
		$('#bigImg').css(
				'left',
				info.position_left - info.position_movestar
						+ event.touches[0].clientX);

		break;

	case "mouseup":
		if (info.swit) {
			info.position_move = (info.position_move / info.width).toFixed();

			info.position_moveend = info.position_move * info.width;
			if (info.position_moveend > 0) {
				info.position_moveend = 0;
			} else if (info.position_moveend < (-(info.index - 1) * info.width)) {
				info.position_moveend = -(info.index - 1) * info.width;
			}
			;

			$('#bigImg').css('left', info.position_moveend);
			info.swit = false;
			info.imgMoveTo();
			info.img_index_now(info.position_move);
		}
		;
		break;
	case "touchend":
        
        
        var now=parseInt(info.position_left / info.width);
       
        var now_move=event.changedTouches[0].clientX ;
       
        var end=(info.position_movestar-now_move)/80;
        if(end>1){
        	end=1;
        }else if(end<-1){
        	end=-1;
        }else{
        	end=0;
        }

        now=now-end;
        
		
		info.position_moveend = now * info.width;
		
		if (info.position_moveend > 0) {
			info.position_moveend = 0;
		} else if (info.position_moveend < (-(info.index - 1) * info.width)) {
			info.position_moveend = -(info.index - 1) * info.width;
		}
		;
		
		$('#bigImg').css('-webkit-transition','all 0.3s');
		$('#bigImg').css('left', info.position_moveend);

		info.imgMoveTo();
		info.img_index_now(info.position_moveend);
		
		

		break;

	case "mouseover":

		if (info.swit) {
			info.position_move = (info.position_move / info.width).toFixed();

			info.position_moveend = info.position_move * info.width;
			if (info.position_moveend > 0) {
				info.position_moveend = 0;
			} else if (info.position_moveend < (-(info.index - 1) * info.width)) {
				info.position_moveend = -(info.index - 1) * info.width;
			}
			$('#bigImg').css('left', info.position_moveend);
			info.swit = false;
			info.imgMoveTo();
			info.img_index_now(info.position_move);
		}
		break;

	}

};

window.onload = function() {
	info.loud();
	info.imgMoveTo();
	$('.info_head p').bind("touchstart",function() {
		history.go(-1);
	});
	$(window).scroll(function(){
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		　　if(scrollTop + windowHeight == scrollHeight){
			if($('.recommond_all').css("display")=="block"){
				console.log("以加载到底部");
			}
		　　　　
		　　}
		});

}
