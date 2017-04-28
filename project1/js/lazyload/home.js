angular.module('myApp')
.controller('homeCtrl',function($scope,$http,$location,$state,myFac,$filter,val){
	console.log('home');
	$scope.global.topList = 0;
	
	$scope.carLeft = function(id){
		myFac.carLeft(id);
	}
	$scope.carRight = function(id){
		myFac.carRight(id);
	}
	$scope.sliderPrev = function(id){
		$('.autoplay').slickPrev();
	}
    $scope.sliderNext = function(id){
		$('.autoplay').slickNext();
	}
	myFac.http('get','/carrots-ajax/a/article/search',{}).then(function(res){
		$scope.data = res;
		$scope.pic = $scope.data.data.articleList;
		console.log($scope.pic);
	});
	myFac.http('get','/carrots-ajax/a/profession/search',{size:20}).then(function(res){
		$scope.data = res;
		$scope.pos = $filter('fHPos')($scope.data);
		console.log($scope.pos);
	});
	$scope.hJob = function(arr,a,b){
		val.jobMes = arr;
		val.jobMesIndex = a+b*4;
		console.log(val.jobMesIndex);
		$state.go("profession.jobMes");
	}
	$scope.hJobList = function(){
		val.searchTop = 'hNewJob';
		$state.go('profession.search.job');
	}
	/* $scope.topList = 0;
    $scope.$emit('summon', $scope.topList); */
})
