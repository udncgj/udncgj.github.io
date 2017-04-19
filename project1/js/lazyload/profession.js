angular.module('myApp',['ui.bootstrap', 'ngAnimate'])
.controller('professionCtrl',function($scope,$http,$location,$state,$timeout,myFac,con,val){
	console.log('a');
	var pro = this;
	$scope.global.topList = 1;//top下标
	pro.comSearchData = {
		name:'',
		financing:'',
		industry:'',
		page:1,
		province:'',
		size:6
	}
	pro.jobSearchData = {
		recommend:0,
		category:'',
		compensation:'',
		education:'',
		experience:'',
		financing:'',
		industry:'',
		name:'',
		page:1,
		province:'',
		returnTags:'',
		size:6,
		subCategory:'',
		updateAt:''
	}
	console.log('profession');
	myFac.http('get','/carrots-ajax/a/article/search',{}).then(function(res){
		$scope.pic = [res.data.articleList[1],res.data.articleList[2],res.data.articleList[3]];
	});
	
	$scope.professionCompany = function(str){
		val.searchTop = 'proSeaCom';
		val.comName = str == ''? '':str;
		//console.log("comName:"+val.comName);
		$scope.company(true);
	}
	//职位和等级跳转
	$scope.categoryData = con.categoryData;
	$scope.professionGo = function(id1,id2){
		val.searchTop = 'proSeaJob';
		$scope.jobMes[2] = con.categoryData[id1-1].subCategory;
		pro.jobSearchData.category = id1 >= 1? id1-1:'';
		pro.jobSearchData.subCategory = id2 >= 1? id2-1:'';
		pro.jobSearchData.recommend = 1;
		$scope.job(true);
	}
	//推荐、最新职位列表
	myFac.http('get','/carrots-ajax/a/profession/search',{recommend:0,size:8}).then(function(res){
		pro.newJob = res.data;
		console.log(pro.commendJob);
	});
	myFac.http('get','/carrots-ajax/a/profession/search',{recommend:1,size:8}).then(function(res){
		pro.commendJob = res.data;
		//pro.jobNone = res.data.substr(0,3);//职位搜索没有时候展示
		$scope.proShowChange(true);
	});
	$scope.proShow = true;
	$scope.proShowChange = function(bool){
		$scope.proShow = bool;
		$scope.proShowMes = bool == true ? pro.commendJob:pro.newJob;
		//val.recommend = bool == true ? 1:0;
		//console.log(val.recommend);
	}
	//职位详情跳转
	$scope.proJobMes = function(arr){
		console.log(arr);
		val.jobMes = arr;
		$state.go("profession.jobMes");
	}
	$scope.proMore = function(){
		if($scope.proShow){
			val.searchTop = 'proNewJob';
		}else{
			val.searchTop = 'proComJob';
		}
		$scope.job(true);
	}
	//公司详情跳转
	$scope.proComMes = function(arr){
		console.log(arr);
		val.comMes = arr;
		$state.go("profession.companyMes");
	}
	//公司列表
	myFac.http('get','/carrots-ajax/a/company/search',{size:4}).then(function(res){
		pro.commendCompany = res.data;
		//pro.companyNone = res.data.substr(0,3);//公司搜索没有时候展示
	});
	$scope.comMore = function(){//公司更多执行函数
		val.searchTop = 'proComCom';
		/* pro.comSearchData = {
			name:str,
			financing:'',
			industry:'',
			page:1,
			province:'',
			size:6
		} */
		$scope.company(true);
	}
	
	
	
	$scope.companyList = [
		{title:'province',name:'所在地区：'},
		{title:'industry',name:'所属行业：'},
		{title:'financing',name:'融资规模：'}
	];
	$scope.companyMes = [
		[{name:'北京'}],//province
		con.industry,//industry
		con.financing//financing
	];
	$scope.jobList = [
		{title:'province',name:'所在地区：'},
		{title:'category',name:'职位类别：'},
		{title:'subCategory',name:''},
		{title:'industry',name:'所属行业：'},
		{title:'education',name:'学历要求：'},
		{title:'experience',name:'工作经验：'},
		{title:'compensation',name:'薪资水平：'},
		{title:'updateAt',name:'发布时间：'}
	];
	$scope.jobMes = [
		[{name:'北京'}],//province
		con.categoryData,//category//compensation
		con.categoryData[0].subCategory,
		con.industry,//industry
		con.education,//education
		con.experience,//experience
		con.compensation,//compensation
		[{name:'今天'},{name:'三天内'},{name:'七天内'}]//updateAt
	];
	console.log('pro.test:');
	console.log(pro.test);
	//公司、职业切换
	$scope.company = function(b){
		$scope.professionList = $scope.companyList;
		$scope.professionMes = $scope.companyMes;
		pro.searchData = pro.comSearchData;
		pro.p2sTop = true;
		$scope.inputMes = "IT修真院";
		if(b){$state.go("profession.search.company");}
	}
	$scope.job = function(b){
		$scope.professionList = $scope.jobList;
		$scope.professionMes = $scope.jobMes;
		pro.searchData = pro.jobSearchData;
		pro.p2sTop = false;
		$scope.inputMes = "携程产品经理";
		if(b){$state.go("profession.search.job");}
	}
	$scope.pathChange = function(timer){
		if($location.path().indexOf('job')>=0 ){
			$scope.job();
		}
		else{$scope.company();}
	}
	$scope.pathChange();
	
	
	/* $scope.companyMesPage = function(){
		$state.go("profession.companyMes");
	}
	$scope.jobMesPage = function(){
		$state.go("profession.jobMes");
	} */
	//职业页面切换
	$scope.jLoadPage = function(num){
		if(num>0 && num<=pro.jAllPage){
			console.log(num);
			var pageChange = JSON.parse(sessionStorage.getItem('jobPageChange'));
			pageChange.page = num;
			myFac.http('get','/carrots-ajax/a/profession/search',pageChange).then(function(res){
				pro.jList = res.data;
				console.log(pro.jList);
				pro.jPageNum = num;
				$location.search('jPage',num);
			});
		}
	}
	//公司页面切换
	$scope.cLoadPage = function(num){
		if(num>0 && num<=pro.cAllPage){
			console.log(num);
			var pageChange = JSON.parse(sessionStorage.getItem('comPageChange'));
			pageChange.page = num;
			myFac.http('get','/carrots-ajax/a/company/search',pageChange).then(function(res){
				pro.cList = res.data;
				console.log(pro.cList);
				pro.cPageNum = num;
				$location.search('cPage',num);
			});
		}
	}
	//搜索条件选择
	
	$scope.listSelect = function(str,num){
		console.log(str);
		if(pro.p2sTop){
			pro.comSearchData[str] = myFac.indexSelect(pro.comSearchData[str],num,true,str);
		}else{
			pro.jobSearchData[str] = myFac.indexSelect(pro.jobSearchData[str],num,true,str);
		}
		if(str == 'category'){
			$scope.jobMes[2] = con.categoryData[num].subCategory;
		}
	}
	//清除
	$scope.clearOut = function(){
		if(pro.p2sTop){
			pro.comSearchData.name = '';
			pro.comSearchData.financing = '';
			pro.comSearchData.industry = '';
			pro.comSearchData.province = '';
		}else{
			pro.jobSearchData.name = '';
			pro.jobSearchData.province = '';
			pro.jobSearchData.category = '';
			pro.jobSearchData.industry = '';
			pro.jobSearchData.education = '';
			pro.jobSearchData.experience = '';
			pro.jobSearchData.compensation = '';
			pro.jobSearchData.subCategory = '';
			pro.jobSearchData.updateAt = '';
		}
	}
	//列表页搜索按钮
	$scope.searchGo = function(){
		if(pro.p2sTop){
			myFac.http('get','/carrots-ajax/a/company/search',pro.comSearchData).then(function(res){
				pro.cList = res.data;
				console.log(pro.cList);
				if(pro.cList == 0){
					myFac.showHide('p2s-companyListNo','p2s-companyList');
				}else{
					myFac.showHide('p2s-companyList','p2s-companyListNo');
				}
				/* if(pro.cList == 0){
					$state.go('profession.search.companyNo');
				}else{
					$scope.company(true);
				} */
				//分页
				pro.cAllPage = Math.ceil(res.total/res.size);
				var cPage = pro.cAllPage;
				pro.cPage = new Array(cPage);
				for(var i=0; i<cPage; i++){pro.cPage[i] = {'cPage':i+1};}
				pro.cPageNum = 1;
				
				//$location.search('recommend',0);
				//$location.search('jPage',num);
				//var s = myFac.seaNull(scope.pro.searchData);
				myFac.comLoSearch(pro.comSearchData);
				sessionStorage.setItem('comPageChange',JSON.stringify(pro.comSearchData));
			});
		}else{
			myFac.http('get','/carrots-ajax/a/profession/search',pro.jobSearchData).then(function(res){
				pro.jList = res.data;
				console.log(pro.jList.length);
				if(pro.jList == 0){
					myFac.showHide('p2s-jobListNo','p2s-jobList');
				}else{
					myFac.showHide('p2s-jobList','p2s-jobListNo');
				}
				/* if(pro.jList == 0){
					$state.go('profession.search.jobNo');
				}else{
					$scope.job(true);
				} */
				//分页
				pro.jAllPage = Math.ceil(res.total/res.size);
				var jPage = pro.jAllPage;
				pro.jPage = new Array(jPage);
				for(var i=0; i<jPage; i++){pro.jPage[i] = {'jPage':i+1};}
				pro.jPageNum = 1;
				
				//$location.search('recommend',0);
				//$location.search('jPage',num);
				//var s = myFac.seaNull(scope.pro.searchData);
				myFac.jobLoSearch(pro.jobSearchData);
				sessionStorage.setItem('jobPageChange',JSON.stringify(pro.jobSearchData));
			});
		}
	}
	
	
	
	
	
	//公司信息页
	pro.p2sMesList = true;//公司详情选项初始化
	//公司信息职位列表页面切换
	$scope.comMesLoadPage = function(num){
		if(num>0 && num<=pro.comMesAllPage){
			myFac.http('get','/carrots-ajax/a/profession/search',{recommend:0,id:$location.search().id,page:num,size:9}).then(function(res){
				pro.comJobMes = res.data;
				pro.comMesPageNum = num;
			});
		}
	}
	$scope.p2sMesListChange = function(bool){
		pro.p2sMesList = bool;
		if(bool){myFac.showHide('proComMes','proComJobMes');}
		else{myFac.showHide('proComJobMes','proComMes');}
	}
	console.log('b');
})


/* 
pro.p2sTop 公司true、职位false
 */