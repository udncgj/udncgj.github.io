angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('professionCtrl',function($scope,$http,$location,$state){
	var vm = this;
	console.log('profession');
    $scope.topList = 1;
    $scope.$emit('summon', $scope.topList);
	
	$http({
		method:'get',
		url:"/carrots-ajax/a/article/search"
	})
	.success(function(data){
		if(data.message == 'success'){
			console.log('ok111');
			$scope.apic = data.data.articleList;
			console.log($scope.apic);
			$scope.pic = [$scope.apic[1],$scope.apic[2],$scope.apic[3]]
		}else{
			alert(data.message);
		}
	})
	.error(function(){console.log('错误');
	})
	
	
    $scope.test = "asdgaera";
})