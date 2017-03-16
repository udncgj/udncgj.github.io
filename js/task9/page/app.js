// JavaScript Document
var app = angular.module('angularJS',['ui.router']);//,'tm.pagination'
var aMes;
var mesLength;
var aSelect;
var fileReady = false;

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

app.config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/admin/page2");
     $stateProvider
        .state("page1", {
            url: "/admin/page1",
            templateUrl: "page1.html"
        })
        .state("page2", {
            url:"/admin/page2",
            templateUrl: "page2.html"
        })
        .state("page3", {
            url:"/admin/page3",
            templateUrl: "page3.html"
        })
});

app.controller('personCtrl',function($scope,$http,$location){
	//数据筛选和分页
	$scope.mesSelect = function(){
		aSelect = myFilter(aMes,'type',$scope.type);
		aSelect = myFilter(aSelect,'talent',$scope.talent);
		aSelect = myFilter(aSelect,'level',$scope.level);
		$scope.listMes = aSelect;
		mesLength = Math.ceil(aSelect.length/10);
		if(aSelect.length>10){
			$scope.listPage = false;
			$scope.pageNum = $location.hash() == 0? 1:$location.hash();
			$location.hash($scope.pageNum);
			$scope.listMes = pageNum($scope.pageNum,aSelect);
		}else{
			$scope.listPage = true;
			$scope.listMes = aSelect;
		}
	}
	
	//数据读取
	var promise = $http({
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
	.error(function(data){alert(data.message);})
	$scope.previousPage = function(){
		$scope.pageNum <= 1 ? $scope.pageNum : $scope.pageNum--;
		$scope.listMes = pageNum($scope.pageNum,aSelect);
		$location.hash($scope.pageNum);
	}
	$scope.nextPage = function(){
		$scope.pageNum >= mesLength ? $scope.pageNum : $scope.pageNum++;
		$scope.listMes = pageNum($scope.pageNum,aSelect);
		$location.hash($scope.pageNum);
	}

    //下拉框
	$scope.select1 = {全部:null,java:1,web:2};
	$scope.select2 = {全部:null,学渣:1,学霸:2};
	$scope.select3 = {全部:null,无基础:1,修行3个月:2,修行6个月:3,修行1年以上:4};
	var urlSearch = $location.search();
	
	$scope.type = urlSearch.type >=1?parseInt(urlSearch.type):null;
	$scope.talent = urlSearch.talent >=1?parseInt(urlSearch.talent):null;
	$scope.level = urlSearch.level >=1?parseInt(urlSearch.level):null;
	$scope.typeChange = function(data){$scope.type=data}
	$scope.talentChange = function(data){$scope.talent=data}
	$scope.levelChange = function(data){$scope.level=data}
	$location.search({"type":$scope.type,"talent":$scope.talent,"level":$scope.level});
	
	//搜索
	$scope.mesSearch = function(){
		$scope.listMes = [];
		$location.hash('');
		$location.search({"type":$scope.type,"talent":$scope.talent,"level":$scope.level});
		$scope.mesSelect();
	}
	
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
});
