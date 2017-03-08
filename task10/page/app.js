// JavaScript Document
var app = angular.module('angularJS',['ui.router']);//,'tm.pagination'
var aMes;
var mesLength;
var aSelect;
var fileReady = false;
var jSubmit;
var numIndex;
var addState = false;
var submitState = false;
var nType = null,nTalent = null,nLevel = null,nPage = 1;

function pageNum(num,arr){
	arr = arr.slice(10*(num-1),10*num);
	return arr;
}
function myFilter(item,str,num){
	var arr = [];
	if(num>=1){
		for(var i=0; i<item.length; i++){
			if(item[i][str] == num){
				arr.push(item[i]);
			}
		}
	}else{arr = item}
	return arr;
}
function timeStr(str){
	var arr = new Date(str);
	return arr.getTime();
}
function strTime(time){
	var arr = new Date(time);
	var str = arr.getYear() + "." + arr.getMonth() + '.' + arr.getDay();
	return str;
}

app.config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/admin/page1");
     $stateProvider
        .state("page1", {
            url: "/admin/page1",
            templateUrl: "page1.html",
			controller:'personCtrl',
			controllerAs:'vm'
        })
        .state("page2", {
            url:"/admin/page2",
            templateUrl: "page2.html",
			controller:'personCtrl',
			controllerAs:'vm'
        })
        .state("page3", {
            url:"/admin/page3",
            templateUrl: "page3.html",
			controller:'personCtrl',
			controllerAs:'vm'
        })
});

app.controller('personCtrl',function($scope,$http,$location){
	var vm = this;
	//数据筛选和分页
//	if($location.path() == "/admin/page1"){
	$scope.mesSelect = function(){
		aSelect = myFilter(aMes,'type',nType);
		aSelect = myFilter(aSelect,'talent',nTalent);
		aSelect = myFilter(aSelect,'level',nLevel);
		$scope.listMes = aSelect;
		mesLength = Math.ceil(aSelect.length/10);
		if(aSelect.length>10){
			$scope.listPage = false;
			$scope.pageNum = $location.hash() == ''? nPage:$location.hash();
			$location.hash($location.path()=='/admin/page1'?$scope.pageNum:'');
			$scope.listMes = pageNum($scope.pageNum,aSelect);
		}else{
			$scope.listPage = true;
			$scope.listMes = aSelect;
		}
	}
	
	//数据读取
	var promise = function(){$http({
		method:'get',
		url:"/student-ajax/students"
	})
	.success(function(data){
		if(data.message == '查询成功'){
			//alert(data.message);
			aMes = data.data;
			$scope.mesSelect();
		}else{
			alert(data.message);
		}
	})
	.error(function(data){alert(data.message);})}
	promise();
	$scope.previousPage = function(){
		$scope.pageNum <= 1 ? $scope.pageNum : $scope.pageNum--;
		nPage = $scope.pageNum;
		$scope.listMes = pageNum(nPage,aSelect);
		$location.hash($scope.pageNum);
	}
	$scope.nextPage = function(){
		$scope.pageNum >= mesLength ? $scope.pageNum : $scope.pageNum++;
		nPage = $scope.pageNum;
		$scope.listMes = pageNum(nPage,aSelect);
		$location.hash($scope.pageNum);
	}

    //下拉框
	$scope.select1 = {全部:null,java:1,web:2};
	//$scope.select1 = [{type:null,name:'全部'},{type:1,name:'java'},{type:2,name:'web'}];
	$scope.select2 = {全部:null,学渣:1,学霸:2};
	$scope.select3 = {全部:null,无基础:1,修行3个月:2,修行6个月:3,修行1年以上:4};
	var urlSearch = $location.search();
	
	vm.type = urlSearch.type >=1?parseInt(urlSearch.type):null;
	vm.talent = urlSearch.talent >=1?parseInt(urlSearch.talent):null;
	vm.level = urlSearch.level >=1?parseInt(urlSearch.level):null;
	nType = vm.type;
	nTalent = vm.talent;
	nLevel = vm.level;
	
	$location.search({"type":vm.type,"talent":vm.talent,"level":vm.level});
	
	//搜索
	$scope.mesSearch = function(){
		$scope.listMes = [];
		$location.hash('');
		nPage = 1;
		nType = vm.type;
		nTalent = vm.talent;
		nLevel = vm.level;
		$location.search({"type":nType,"talent":nTalent,"level":nLevel});
		$scope.mesSelect();
	}
//	}
	//图片显示
	$scope.reader = new FileReader();
	$scope.imgUpload = function(files){
		fileReady = false;
		$scope.reader.readAsDataURL(files[0]);
		$scope.reader.onload = function(){
			$('.selectPic:first').attr('src',$scope.reader.result);
			fileReady = true;
		}
	}
	//上传
	$scope.upload = function(){
		if(fileReady){
			var data = new FormData();
			data.append('file',$('#selectFile')[0].files[0]);
			$http({
				method:'post',
				url:"/carrots-admin-ajax/a/u/img/test",
				data:data,
				cache: false,
				headers: {'Content-Type': undefined},
				//transformRequest: angular.identity
			})
			.success(function(data){
				$('#picLink').html(data.data.url);
				$('.uploadPic:first').attr('src',$scope.reader.result);
			})
			.error(function(data){alert(data.message);})
		}else{
			alert('请先选择一张图片');
		}
	}
	
	$scope.lisType = 1;
	$scope.lisTalent = 1;
	$scope.lisLevel = 1;
	
	$scope.lisSubmit = function(){
		console.log('ok');
	}
	$scope.lisEdit = function(abc){
		var i = ($scope.pageNum-1)*10 < 0? 0:($scope.pageNum-1)*10;
		numIndex = $('.list-view-mes').index(abc.parentNode.parentNode)-1+i;
		addState = true;
		console.log(aSelect[numIndex]);
		$location.url('/admin/page2');
		$scope.$apply();
	}
	
	$scope.lisDel = function(abc){
		var i = ($scope.pageNum-1)*10 < 0? 0:($scope.pageNum-1)*10;
		numIndex = $('.list-view-mes').index(abc.parentNode.parentNode)-1+i;
		console.log(aSelect[numIndex]);
		$http({
			method:'post',
			url:"/student-ajax/students/",
			params:{"id":aSelect[numIndex].id}
		})
		.success(function(data){
			if(data.message == '删除成功'){
				alert(data.message);
				promise();
				//aMes = data.data;
				//$scope.mesSelect();
			}else{
				alert('删除失败');
			}
		})
		.error(function(){alert('删除失败')})
	}
	
	$scope.lisSubmit = function(){
		var jMes;
		var urlSubmit;
		var methodSubmit;
		if(submitState){
			jMes = {"name":$scope.vm.lisName,
					"qq":$scope.vm.lisQQ,
					"type":$scope.lisType,
					"school":$scope.vm.lisSchool,
					"talent":$scope.lisTalent,
					"level":$scope.lisLevel,
					"joinTime":$scope.vm.lisTime,
					"wish":$scope.vm.lisText};
			urlSubmit = "/student-ajax/student";
			methodSubmit = "post";
		}else{
			jMes = {"id":aSelect[numIndex].id,
					"name":$scope.vm.lisName,
					"qq":$scope.vm.lisQQ,
					"type":$scope.lisType,
					"school":$scope.vm.lisSchool,
					"talent":$scope.lisTalent,
					"level":$scope.lisLevel,
					"joinTime":$scope.vm.lisTime,
					"wish":$scope.vm.lisText};
			urlSubmit = "/student-ajax/student/"+aSelect[numIndex].id;
			methodSubmit = "put";
		}
		console.log(jMes);
		console.log(urlSubmit);
		console.log(methodSubmit);
		$http({
			method:methodSubmit,
			url:urlSubmit,
			params:jMes
		})
		.success(function(data){
			if(data.code == 200){
				alert(data.message);
				promise();
			}else{
				alert(data.message);
			}
		})
		.error(function(){alert('失败')})
	}
	
});
/*app.directive('newPage1',function(){
	return function(scope,ele,attrs,location,http){
		var promise = function(){http({
			method:'get',
			url:"/student-ajax/students"
		})
		.success(function(data){
			if(data.message == '查询成功'){
				//alert(data.message);
				aMes = data.data;
		console.log('page1');
				//$scope.mesSelect();
			}else{
				alert(data.message);
			}
		})
		.error(function(data){alert(data.message);})}
		promise();
	}
})
*/
app.directive('testD',function(){
	return function(scope,ele,attrs){
		submitState = false;
		var ue = UE.getEditor('editor', {
		toolbars: [
			[
			  'undo', //撤销
			  'redo', //重做
			  'bold', //加粗
			  'indent', //首行缩进
			  'italic', //斜体
			  'underline', //下划线
			  'strikethrough', //删除线
			  'subscript', //下标
			  'fontborder', //字符边框
			  'superscript', //上标
			  'formatmatch', //格式刷
			  'source', //源代码
			  'blockquote', //引用
			  'pasteplain', //纯文本粘贴模式
			  'selectall', //全选
			  'horizontal', //分隔线
			  'removeformat', //清除格式
			  'unlink', //取消链接
			  'cleardoc', //清空文档
			  'insertcode', //代码语言
			  'fontfamily', //字体
			  'fontsize', //字号
			  'paragraph', //段落格式
			  'link', //超链接
			  'emotion', //表情
			  'searchreplace', //查询替换
			  'justifyleft', //居左对齐
			  'justifyright', //居右对齐
			  'justifycenter', //居中对齐
			  'justifyjustify', //两端对齐
			  'forecolor', //字体颜色
			  'imagenone', //默认
			  'imageleft', //左浮动
			  'imageright', //右浮动
			  'imagecenter', //居中
			  'lineheight', //行间距
			  'autotypeset', //自动排版
			  'webapp', //百度应用
			  ]
		],
		autoHeightEnabled: false,
		autoFloatEnabled: true
		});
		ue.addListener('selectionchange',function(){
			var arr = [];
			arr.push(ue.getContentTxt());
			var text = arr.join('\n');
			while(text.indexOf(' ')!=-1){
				text = text.replace(' ','');
			}
			scope.$apply(scope.vm.lisText = text);
			var arrLen = text.length;
			if(arrLen == 0){
				$('#lisWish').css('display','inline-block');
				scope.vm.textState = false;
			}else{
				$('#lisWish').css('display','none');
				scope.vm.textState = true;
			}
		})
		if(addState){
			addState = false;
			scope.lisType = aSelect[numIndex].type;
			scope.lisTalent = aSelect[numIndex].talent;
			scope.lisLevel = aSelect[numIndex].level;
			scope.vm.lisName = aSelect[numIndex].name;
			scope.vm.lisQQ = parseInt(aSelect[numIndex].qq);
			scope.vm.lisSchool = aSelect[numIndex].school;
			scope.vm.lisTime = aSelect[numIndex].joinTime;
			scope.vm.lisText = aSelect[numIndex].wish;
			ue.addListener("ready", function () {
				ue.setContent(scope.vm.lisText);
			});
			submitState = false;
		}else{
			scope.lisType = 1;
			scope.lisTalent = 1;
			scope.lisLevel = 1;
			scope.vm.lisName = '';
			scope.vm.lisQQ = '';
			scope.vm.lisSchool = '';
			scope.vm.lisTime = '';
			scope.vm.lisText = '';
			console.log('ok');
			submitState = true;
		}
}})