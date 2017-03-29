var app = angular.module('myApp',['ui.router','oc.lazyLoad','ui.bootstrap', 'ngAnimate']);
app.config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/profession/searchCompany");
     $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "page/home.html",
			//controller:'personCtrl',
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
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/profession.js');
				}]
			}
        })
		.state("profession.page1", {
            url: "/",
            templateUrl: "page/profession1.html",
        }) 
		.state("profession.searchCompany", {
            url: "/searchCompany",
            templateUrl: "page/profession2.html",
        }) 
		.state("profession.searchJob", {
            url: "/searchJob",
            templateUrl: "page/profession2.html",
        }) 
		.state("elite", {
            url: "/elite",
            templateUrl: "page/elite.html",
			controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/elite.js');
				}]
			}
        })
		/* .state("elite", {
            url: "/elite",
            templateUrl: "page/elite.html",
        }) */
		.state("about", {
            url: "/about",
            templateUrl: "page/about.html",
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
	vm.test = "abcd";
	$scope.vm.test="aaaaaaaaa";
	$scope.$on('summon', function(e, newLocation) {
        $scope.topList = newLocation;
    });
})