angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('aboutCtrl',function($scope,$http,$location,$state,val,myFac){
	var about = this;
	console.log('about');
	$scope.global.topList = 3;
	$scope.aboutCha = function(num){
		if(num){
			$state.go('about.1');
			about.aboutState = num;
		}else{
			$state.go('about.0');
			about.aboutState = num;
		}
	}
})