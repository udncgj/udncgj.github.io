angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('eliteCtrl',function($scope,$http,$location,$state,myFac){
	console.log('elite');
	$scope.global.topList = 2;
    myFac.http('get','/carrots-ajax/a/company/search',{size:8}).then(function(res){
		$scope.commendCompany = res.data;console.log($scope.commendCompany);
	});
})