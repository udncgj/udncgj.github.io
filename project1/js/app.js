var app = angular.module('myApp',['ui.router','oc.lazyLoad','ui.bootstrap', 'ngAnimate']);
app.config(function ($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.when("", "/home");
     $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "page/home.html",
			//controller:'personCtrl',
			//controllerAs:'vm',
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/home.js');
				}]
			}
        })
		
		.state("profession", {
            url: "/profession",
            templateUrl: "page/profession.html",
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
			.state("profession.companyMes", {
				url: "/companyMes",
				templateUrl: "page/companyMes.html",
			}) 
			.state("profession.jobMes", {
				url: "/jobMes",
				templateUrl: "page/jobMes.html",
				//controller:'personCtrl',
			}) 
			
			.state("profession.search", {
				url: "/search",
				templateUrl: "page/search.html",
			}) 
				.state("profession.search.company", {
					url: "/company",
					templateUrl: "page/companyList.html",
				})
				.state("profession.search.companyNo", {
					url: "/companyNo",
					templateUrl: "page/companyListNo.html",
				})
				.state("profession.search.job", {
					url: "/job",
					templateUrl: "page/jobList.html",
				})
				.state("profession.search.jobNo", {
					url: "/jobNo",
					templateUrl: "page/jobListNo.html",
				})
				
		.state("elite", {
            url: "/elite",
            templateUrl: "page/elite.html",
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/elite.js');
				}]
			}
        })
		
		.state("about", {
            url: "/about",
            templateUrl: "page/about.html",
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/about.js');
				}]
			}
        })
			.state("about.0", {
				url: "/0",
				templateUrl: "page/about0.html",
			})
			.state("about.1", {
				url: "/1",
				templateUrl: "page/about1.html",
			})
});

app.controller('personCtrl',function($scope,myFac){
	var global = this;
	myFac.http('get','data.json').then(function(res){
		global.appoint = res;
		//console.log(global.appoint);
	});
})


