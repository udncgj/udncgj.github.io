angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('professionCtrl',function($scope,$http,$location,$state,$timeout){
	console.log('profession');
    $scope.topList = 1;
    $scope.$emit('summon', $scope.topList);
	$http({
		method:'get',
		url:"/carrots-ajax/a/article/search"
	})
	.success(function(data){
		if(data.message == 'success'){
			$scope.apic = data.data.articleList;
			$scope.pic = [$scope.apic[1],$scope.apic[2],$scope.apic[3]];
		}else{
			alert(data.message);
		}
	})
	.error(function(){console.log('错误');
	})
	$scope.professionCompany = function(){
		$state.go("profession.searchCompany");
		$scope.company();
	}
	
	
	$scope.companyList = ['所在地区：','所属行业：','融资规模：'];
	$scope.companyMes = [
			['不限','北京'],
			['不限','移动互联网','电子商务','O2O','游戏','企业服务','教育','金融'],
			['不限','天使轮','A轮','B轮','C轮','D轮及以上','上市公司','无需融资']
	];
	$scope.jobList = ['所在地区：','所属行业：','学历要求：','工作经验：','薪资水平：','发布时间：'];
	$scope.jobMes = [
			['不限','北京'],
			['不限','移动互联网','电子商务','O2O','游戏','企业服务','教育','金融'],
			['不限','大专','本科','硕士','博士'],
			['不限','应届','1-3','3-5','5-10','10以上'],
			['不限','8K以下','8K-15K','15K-26K','26K以上'],
			['不限','今天','三天内','七天内']
	];
	$scope.company = function(){
		$scope.professionList = $scope.companyList;
		$scope.professionMes = $scope.companyMes;
		$scope.p2sTop = true;
		$scope.inputMes = "IT修真院";
	}
	$scope.job = function(){
		$scope.professionList = $scope.jobList;
		$scope.professionMes = $scope.jobMes;
		$scope.p2sTop = false;
		$scope.inputMes = "携程产品经理";
	}
	$scope.pathChange = function(timer){
		if($location.path() == "/profession/searchJob"){
			$scope.job();
		}
		else{$scope.company();}
	}
	$scope.pathChange();
	//$timeout($scope.pathChange(this),5000);
	//$scope.$watch($location.path(),$scope.pathChange(),true);
})