// JavaScript Document
$(window).on('load',function(){
	/*var user = '',
	    password = '';
	var jqXHR = new XMLHttpRequest();
	$('#user-input').focus(function(){
		var str = $(this).val();
		if(str == '用户名'){
			$(this).val('');
		}
	});
	$('#user-input').bind('input propertychange',function(){
		user = $(this).val();
	})
	$('#user-input').blur(function(){
		if(user == ''){$(this).val('用户名');}
	})
	$('#password-input').focus(function(){
		var str = $(this).val();
		if(str == '密码'){
			$(this).val('');
		}
	});
	$('#password-input').bind('input propertychange',function(){
		password = $(this).val();
	})
	$('#password-input').blur(function(){
		if(password == ''){$(this).val('密码');}
	})*/
	/*$('.logon:first').click(function(){
		$.ajax({ 
		    type: "POST",
			url:"/carrots-admin-ajax/a/login/",//
			dataType: "json",
			data:{
				name:$('#user-input').val(),
				pwd:$('#password-input').val()
			},
			success: function(data) {
				if(data.message == 'success'){
					//jsonSave(data);
				    $('.warning:first').html(data.message);
					//window.location.href='http://dev.admin.carrots.ptteng.com/';
				}else{//'用户不存在'
				    $('.warning:first').html(data.message);
				}
			},
			error: function(jqXHR){
			   $('.warning:first').html("发生错误：" + jqXHR.status);
			},
		});
	})*/
})
/*
function jsonSave(json){
	console.log(json);
	//sessionStorage.setItem('Object',json);
	sessionStorage.removeItem('Object')
}*/