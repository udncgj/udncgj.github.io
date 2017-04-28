angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('eliteCtrl',function($scope,val,$http,$location,$state,myFac){
	console.log('elite');
	$scope.global.topList = 2;
    myFac.http('get','/carrots-ajax/a/company/search',{size:8}).then(function(res){
		$scope.commendCompany = res.data;console.log($scope.commendCompany);
	});
    $scope.companyGo = function(data){
        console.log(data);
        val.comMes = data;
        $state.go('profession.companyMes');
    }
    $scope.companyMore = function(){
        val.searchTop = 'eliteCom';
        $state.go('profession.search.company');
    }
})