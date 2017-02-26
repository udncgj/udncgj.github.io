// JavaScript Document
$(window).on('load',function(){
	var user = '',
	    password = '';
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
	})
	$('.logon:first').click(function(){
		
	})
})