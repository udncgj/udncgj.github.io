angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('homeCtrl',function($scope,$http,$location,$state){
	var vm = this;
	console.log('home');
	$scope.topList = 0;
    $scope.$emit('summon', $scope.topList);
	
	$http({
		method:'get',
		url:"/carrots-ajax/a/article/search"
	})
	.success(function(data){
		if(data.message == 'success'){
			console.log('ok111');
			$scope.pic = data.data.articleList;
		}else{
			alert(data.message);
		}
	})
	.error(function(){console.log('错误');
	})
})