var app = angular.module('myApp',['ui.router','oc.lazyLoad','ui.bootstrap', 'ngAnimate']);
app.config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/profession");
     $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "page/home.html",
			controller:'personCtrl',
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/home.js');
				}]
			}
        })
		.state("profession", {
            url: "/profession",
            templateUrl: "page/profession.html",
			controller:'personCtrl',
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/profession.js');
				}]
			}
        })
		.state("elite", {
            url: "/elite",
            templateUrl: "page/elite.html",
			controller:'personCtrl',
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/elite.js');
				}]
			}
        })
		.state("about", {
            url: "/about",
            templateUrl: "page/about.html",
			controller:'personCtrl',
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/about.js');
				}]
			}
        })
});

app.controller('personCtrl',function($scope,$http,$location,$state){
	var vm = this;
	$scope.$on('summon', function(e, newLocation) {
        $scope.topList = newLocation;
    });
})