angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('aboutCtrl',function($scope,$http,$location,$state){
	var vm = this;
	console.log('about');
    $scope.topList = 3;
    $scope.$emit('summon', $scope.topList);
	$scope.aboutState = true;
	$scope.aboutTrue = function(){
		$scope.aboutState = true;
		console.log($scope.aboutState);
		$('#p4-about1').css('display','block');
		$('#p4-about2').css('display','none');
	}
	$scope.aboutFalse = function(){
		$scope.aboutState = false;
		$('#p4-about1').css('display','none');
		$('#p4-about2').css('display','block');
	}
})