//$(document).ready(function(){
	function interfaceTest(){
		$.ajax({ 
		    type: "get",
			url:"/carrots-admin-ajax/a/profession/search",//
			dataType: "json",
			data:{id:127},
			success: function(data) {
				console.log(data);
			},
			error: function(){
			   console.log('error');
			},
		});
	}
//})



var app = angular.module('myApp',['ui.router','oc.lazyLoad','ui.bootstrap','angularFileUpload']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/job");
    $stateProvider
        .state("company", {//公司列表
            url: "/company",
            templateUrl: "page/company.html"/* ,
			resolve:{
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load('js/lazyload/home.js');
				}]
			} */
        })
		.state("companySet", {//公司操作
            url: "/companySet",
            templateUrl: "page/companySet.html"
        })
		.state("job", {//职位列表
            url: "/job?id",
            templateUrl: "page/job.html"
        })
		.state("jobSet", {//职位操作
            url: "/jobSet",
            templateUrl: "page/jobSet.html"
        })
		.state("article", {//article管理
            url: "/article",
            templateUrl: "page/article.html"
        })
		.state("articleSet", {//atticle操作
            url: "/articleSet",
            templateUrl: "page/articleSet.html"
        })
		.state("accountNum", {//账号管理
            url: "/accountNum",
            templateUrl: "page/accountNum.html"
        })
			.state("accountNum.1", {
				url: "/",
				templateUrl: "page/accountNum1.html"
			})
			.state("accountNum.set", {
				url: "/set",
				templateUrl: "page/accountNumSet.html"
			})
		.state("role", {//角色管理
            url: "/role",
            templateUrl: "page/role.html"
        })
			.state("role.1", {
				url: "/",
				templateUrl: "page/role1.html"
			})
			.state("role.set", {
				url: "/set",
				templateUrl: "page/roleSet.html"
			})
		.state("password", {//修改密码
            url: "/password",
            templateUrl: "page/password.html"
        })
		.state("module", {//模块管理
            url: "/module",
            templateUrl: "page/module.html"
        })
			.state("module.1", {
				url: "/",
				templateUrl: "page/module1.html"
			})
			.state("module.set", {
				url: "/set",
				templateUrl: "page/moduleSet.html"
			})
});

/* app.run(['$rootScope', '$window', '$location', '$log','$templateCache', function ($rootScope, $window, $location, $log,$templateCache) {  

  var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);  

  function stateChangeSuccess($rootScope) {  
   $templateCache.removeAll();    
 } 

}]); */


app.controller('personCtrl',function($scope,con,$state){
	var ctrl = this;
})