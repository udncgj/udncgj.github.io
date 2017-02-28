// JavaScript Document

var myApp = angular.module('angularJS',['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{templateUrl:'page/index.html'})
	.when('/page1',{templateUrl:'page/page1.html'})
	.when('/page2',{templateUrl:'page/page2.html'})
	.when('/page3',{templateUrl:'page/page3.html'})
	.otherwise({redirectTo:'/'});
}]);