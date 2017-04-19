angular.module('myApp')

//后台操作
.controller('accountNum',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		switch($scope.string){
			case 'id'://编辑页跳转
				$state.go('accountNum.set');
				break;
			case 'del'://删除
				$('#accModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
	}
})
.controller('role',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		switch($scope.string){
			case 'id'://编辑页跳转
				$state.go('role.set');
				break;
			case 'del'://删除
				$('#accModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
	}
})
.controller('password',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	
})
.controller('module',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		switch($scope.string){
			case 'id'://编辑页跳转
				$state.go('module.set');
				break;
			case 'del'://删除
				$('#accModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
	}
})