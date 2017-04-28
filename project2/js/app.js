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
    $urlRouterProvider.when("", "/");
    $stateProvider
        .state("wellcome", {//公司列表
            url: "/",
            templateUrl: "page/wellcome.html"
        })
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


app.controller('personCtrl',function($scope,con,$state,myFac,val){
	var ctrl = this;
    $scope.getCookie = function(str){
        var aStr = document.cookie.split(';');
        for(var i=0; i<aStr.length; i++){
            while(aStr[i].indexOf(' ')!=-1){
                aStr[i] = aStr[i].replace(' ','');
            }
            var arr = aStr[i].split('=');
            if(arr[0] == str){
                return arr[1];
            }
        }
    }
    $scope.delCookie = function(str){
        var date = new Date();
        date.setTime(date.getTime()-10000);
        document.cookie = str+"="+";"+"expires="+date.toGMTString();
    }
    $scope.logOut = function(){
        $scope.delCookie('testname');
        $scope.delCookie('testpwd');
        location.href = 'index.html';
    }
    ctrl.user = $scope.getCookie('testname');
	ctrl.password = $scope.getCookie('testpwd');
    myFac.http("POST","/carrots-admin-ajax/a/login/",{name:ctrl.user,pwd:ctrl.password}).then(function(res){
        //console.log('user',res);
        ctrl.id = res.data.role.id;
        myFac.http('get','/carrots-admin-ajax/a/u/role/'+ctrl.id).then(function(data){
            //console.log(data);
            ctrl.role = data.data.role;
            for(var i in ctrl.role.permissionsSet){
                var arr = ctrl.role.permissionsSet[i];
                var state = [];
                for(var j in arr){
                    switch(arr[j]){
                        case 'create':
                            state[0] = true;
                            break;
                        case 'update':
                            state[1] = true;
                            break;
                        case 'delete':
                            state[2] = true;
                            break;
                        case 'sort':
                            state[3] = true;
                            break;
                        default:
                            break;
                    }
                }
                ctrl.role.permissionsSet[i] = state;
            }
            //console.log('ctrl.role',ctrl.role);
            ctrl.userList = [];
            myFac.http('get','/carrots-admin-ajax/a/u/module/',{page:1,size:100}).then(function(res){
                
                var s = (function(){
                    var list = res.data.ids;
                    var arr;
                    for(var i in list){
                        if(i==0){
                            arr = 'ids='+list[i];
                        }else{
                            arr += '&ids='+list[i];
                        }
                    }
                    return arr;
                })();
                myFac.http('get','/carrots-admin-ajax/a/u/multi/module?'+s).then(function(data){
                    ctrl.moduleList = data.data.moduleList;
                    //console.log('ctrl.moduleList',ctrl.moduleList);
                    for(var i in ctrl.moduleList){
                        if(ctrl.moduleList[i].parentID == 0 || ctrl.moduleList[i].parentID == ''){
                            ctrl.userList.push({parent:ctrl.moduleList[i],state:false,list:[]});
                        }else{
                            switch(ctrl.moduleList[i].name){
                                case '模块管理':
                                    ctrl.moduleList[i].url = 'module.1';
                                    break;
                                case '角色管理':
                                    ctrl.moduleList[i].url = 'role.1';
                                    break;
                                case '密码修改':
                                    ctrl.moduleList[i].url = 'password';
                                    break;
                                case '账户管理':
                                    ctrl.moduleList[i].url = 'accountNum.1';
                                    break;
                                case 'Article列表':
                                    ctrl.moduleList[i].url = 'article';
                                    break;
                                case '职位列表':
                                    ctrl.moduleList[i].url = 'job';
                                    break;
                                case '公司列表':
                                    ctrl.moduleList[i].url = 'company';
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    for(var i in ctrl.moduleList){
                        var parentID = ctrl.moduleList[i].parentID;
                        var id = ctrl.moduleList[i].id;
                        for(var j in ctrl.userList){
                            //console.log(i,ctrl.moduleList[i].id,j,ctrl.userList[j].parent.id,parentID,ctrl.moduleList[i].id,ctrl.userList,ctrl.role.permissionsSet)
                            if(ctrl.userList[j].parent.id == parentID){
                                //if(ctrl.role.permissionsSet[ctrl.moduleList[i].id].length>0){
                                //ctrl.moduleList[i].state = ctrl.role.permissionsSet[ctrl.moduleList[i].id].length>0?true:false;
                                //ctrl.userList[j].state = ctrl.role.permissionsSet[ctrl.moduleList[i].id].length>0?true:ctrl.userList[j].state;
                                //}
                                //console.log(j,ctrl.role.permissionsSet[ctrl.moduleList[i].id]);
                                if(ctrl.role.permissionsSet[ctrl.moduleList[i].id] == undefined){
                                    ctrl.moduleList[i].state = false;
                                    ctrl.userList[j].state = ctrl.userList[j].state;
                                }else{
                                    ctrl.moduleList[i].state = ctrl.role.permissionsSet[ctrl.moduleList[i].id].length>0?true:false;
                                    ctrl.userList[j].state = ctrl.role.permissionsSet[ctrl.moduleList[i].id].length>0?true:ctrl.userList[j].state;
                                }
                                ctrl.userList[j].list.push(ctrl.moduleList[i]);
                            }
                        }
                    }
                    
                    //console.log('ctrl.userList',ctrl.userList)
                });
            });
        });
    });
    myFac.http('get','/carrots-admin-ajax/a/u/role/',{page:1,size:100}).then(function(res){
			
        //console.log(res);
        var s = (function(){
            var list = res.data.ids;
            var arr;
            for(var i in list){
                if(i==0){
                    arr = 'ids='+list[i];
                }else{
                    arr += '&ids='+list[i];
                }
            }
            return arr;
        })();
        //console.log('s',s);
        
        myFac.http('get','/carrots-admin-ajax/a/u/multi/role?'+s).then(function(data){
            val.roleList = data.data.roleList;
            //console.log('val.roleList',val.roleList);
        });
    });
    
})