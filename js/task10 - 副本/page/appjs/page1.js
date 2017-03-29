// JavaScript Document

angular.module('angularJS',[])
.controller('personCtrl',function($scope,$http,$location,$state){
	var vm = this;
	$scope.user = getCookie('testname');
	if($location.path() == "//page1"){$state.go("page1",{user:$scope.user});}
	else{
		$http({
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
		console.log('page1');
	}
})