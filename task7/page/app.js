// JavaScript Document

/*var myApp = angular.module('angularJS',['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/page1',{templateUrl:'page1.html'})
	.when('/page2',{templateUrl:'page2.html'})
	.when('/page3',{templateUrl:'page3.html'})
	.otherwise({redirectTo:'/page1'});
}]);*/

var app = angular.module('angularJS',[]);
app.controller('personCtrl',function($scope,$http){
	var promise = $http({
		method:'get',
		url:"/student-ajax/students"
	})
	.success(function(data){
		if(data.message == '查询成功'){
			alert(data.message);
			$scope.listMes = data.data;
		}else{
			alert(data.message);
		}
	})
	.error(function(data){alert(data.message);})
});