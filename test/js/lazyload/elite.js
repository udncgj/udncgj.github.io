angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('eliteCtrl',function($scope,$http,$location,$state){
	var vm = this;
	console.log('elite');
    $scope.topList = 2;
    $scope.$emit('summon', $scope.topList);
})