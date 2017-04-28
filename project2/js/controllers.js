angular.module('myApp')

//公司列表
.controller('company',function($location,$scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
	//初始化和清空
	$scope.clear = function(){
		$scope.comSearchData = {
			name:'',
			industry:'',
			province:'',
			city:'',
			county:'',
			financing:'',
			approved:'',
			freezed:'',
			page:1,
			size:10
		}
	}
	$scope.clear();
	$scope.industry = con.industry;//行业
	$scope.financing = con.financing;//融资
	$scope.approvedStatus = ['未认证','已认证'];
	$scope.freezedStatus = ['正常','冻结'];
	$scope.province = PROVINCE;//省
	//省份选择
	$scope.comProvince = function(str){
		$scope.comSearchData.city = '';
		$scope.city = myFac.area(str);
	}
	//搜索
	$scope.searchGo = function(){
		$scope.comSearchData.page = 1;
		myFac.http('get','/carrots-admin-ajax/a/company/search',$scope.comSearchData).then(function(res){
			$scope.comData = res.data;
			console.log($scope.comData);
			//分页
			$scope.allPage = Math.ceil(res.total/res.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = 1;
			
			sessionStorage.setItem('comData',JSON.stringify($scope.comSearchData));
		});
	}
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			//console.log(num);
			var pageChange = JSON.parse(sessionStorage.getItem('comData'));
			pageChange.page = num;
			myFac.http('get','/carrots-admin-ajax/a/company/search',pageChange).then(function(res){
				$scope.comData = res.data;
				console.log($scope.comData);
				$scope.pageNum = num;
				//$location.search('page',num);
                sessionStorage.setItem('comData',JSON.stringify(pageChange));
			});
		}
	}
    //重新搜
    $scope.research = function(){
        var pageChange = JSON.parse(sessionStorage.getItem('comData'));
        myFac.http('get','/carrots-admin-ajax/a/company/search',pageChange).then(function(res){
            $scope.comData = res.data;
            console.log($scope.comData);
            $scope.pageNum = num;
        });
    }
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		$scope.dataSet = data;
		switch($scope.string){
			case 'new'://新增
				$state.go('companySet');
				break;
			case 'job'://职业
				val.jobState = data.id;
				console.log(val.jobState);
				$state.go('job');
				break;
			case 'approved'://解除、认证
				$('#comModal').modal('show');
				if($scope.dataSet.approved){
					$scope.value1 = '解除认证后该公司将不再标记为推荐公司';
					$scope.value2 = '是否执行解除操作';
				}else{
					$scope.value1 = '认证后该公司将被标记为推荐公司';
					$scope.value2 = '是否执行认证操作';
				}	
				break;
			case 'id'://编辑页跳转
				val.comSet = data;
				$state.go('companySet');
				break;
			case 'freezed'://冻结、解冻
				$('#comModal').modal('show');
				if($scope.dataSet.freezed){
					$scope.value1 = '解冻后该公司下的信息将可继续使用';
					$scope.value2 = '是否执行解冻操作';
				}else{
					$scope.value1 = '冻结后该公司下的所有信息将不可用';
					$scope.value2 = '是否执行冻结操作';
				}
				break;
			case 'del'://删除
				$('#comModal').modal('show');
				$scope.value1 = '删除后该公司职位信息将被删除';
				$scope.value2 = '是否执行删除操作';
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
		switch($scope.string){
			//字段 状态类型 type 0-冻结状态 1-认证状态
			//字段 状态 status 0-解冻/解除认证 1-冻结/认证
			case 'approved'://解除、认证
				var bool;
				if($scope.dataSet.approved){
					bool = 0;
				}else{bool = 1;}
				console.log({id:$scope.dataSet.id,type:1,status:bool});
				myFac.http('PUT','/carrots-admin-ajax/a/u/company/status/'/* +$scope.dataSet.id */,{id:$scope.dataSet.id,type:1,status:bool}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.research();
				});
				break;
			case 'freezed'://冻结、解冻
				var bool;
				if($scope.dataSet.freezed){
					bool = 0;
				}else{bool = 1;}
				console.log({id:$scope.dataSet.id,type:0,status:bool});
				myFac.http('PUT','/carrots-admin-ajax/a/u/company/status/'/* +$scope.dataSet.id */,{id:$scope.dataSet.id,type:0,status:bool}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.research();
				});
				break;
			case 'del'://删除
				myFac.http('DELETE','/carrots-admin-ajax/a/u/company/'+$scope.dataSet.id,{}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.research();
				});
				break;
			default:
				break;
		}
	}
})
//公司操作
.controller('companySet',function($scope,con,PROVINCE,CITY,COUNTY,myFac,FileUploader,$state,$http){
	$scope.comSaveData = {
        company:{
            id:'',
            address:'',
            approved:'0',//num
            freezed:'0',
            city:'',//num
            county:'',//num
            financing:'',
            logo:'',
            mail:'',
            map:'',
            name:'',
            phone:'',
            province:'',//num
            slogan:'',
            summary:'',
            totalNum:''//num
        },
        industryList:[],//{industry:''}
        productList:[
            {
                logo:'',
                name:'',
                slogan:'',
                summary:''
            }
        ],
        tagList:[]//{tag:''}
	}
	//$scope.$apply();
	$scope.industry = con.industry;//行业
	$scope.financing = con.financing;//融资
	$scope.approvedStatus = ['未认证','已认证'];
	$scope.freezedStatus = ['正常','冻结'];
	$scope.province = PROVINCE;//省
	//省份选择
	$scope.comProvince = function(str){
		$scope.comSaveData.company.city = '';
		$scope.comSaveData.company.county = '';
		$scope.city = myFac.area(str);
	}
    //市选择
	$scope.comCity = function(str){
		$scope.comSaveData.company.county = '';
		$scope.county = myFac.county(str);
	}
    //industrys添加
    $scope.industryAdd = function(str){
		var bool;
        console.log(str);
		for(var i in $scope.comSaveData.industryList){
			bool = $scope.comSaveData.industryList[i].industry == str? 1 : bool;
		}
		if(bool || str == undefined){
			console.log('已有');
		}else{
			$scope.comSaveData.industryList.push({industry:str});
		}
	}
	$scope.industryDel = function(num){
		$scope.comSaveData.industryList.splice(num,1);
	}
	//tag添加
	$scope.tagsAdd = function(str){
		var bool;
		for(var i in $scope.comSaveData.tagList){
			bool = $scope.comSaveData.tagList[i].tag == str? 1 : bool;
		}
		if(bool){
			console.log('已有');
		}else{
			$scope.comSaveData.tagList.push({tag:str});
		}
	}
	$scope.tagsDel = function(num){
		$scope.comSaveData.tagList.splice(num,1);
	}
    
	$scope.save = function(){
        console.log('请求数据',$scope.comSaveData);
		if($scope.comSaveData.company.id == 0){
            /* Request URL:http://dev.admin.carrots.ptteng.com/a/u/img/3
            Request Method:POST */

			myFac.http('POST','/carrots-admin-ajax/a/u/company',{},$scope.comSaveData).then(function(res){
				console.log(res);
                $state.go('company');
			});
		}else{
			myFac.http('put','/carrots-admin-ajax/a/u/company/'+$scope.comSaveData.company.id,{},$scope.comSaveData).then(function(res){
				console.log(res);
                $state.go('company');
			});
		}
	}
	
	//图片加载
	$scope.picRemove = function(str){
		switch(str){
			case 'first':
				$scope.comSaveData.logo = 'aaa';
				//console.log($scope.comSaveData);
				break;
			case 'second':
				$scope.comSaveData.productList.logo = 'aaa';
				//console.log($scope.comSaveData);
				break;
			case 'third':
				$scope.comSaveData.map = 'aaa';
				//console.log($scope.comSaveData);
				break;
			default:
				break;
		}
	}
	
	
	//图片1
	var uploader = $scope.uploader = new FileUploader({
		url: '/carrots-admin-ajax/a/u/img/test',
		queueLimit: 1
	});

	// FILTERS

	uploader.filters.push({
		name: 'imageFilter',
		fn: function(item /*{File|FileLikeObject}*/, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	// CALLBACKS

	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		//response有链接参数
		$scope.comSaveData.company.logo = response.data.url;
	};
	
	//图片2
	var uploader1 = $scope.uploader1 = new FileUploader({
		url: '/carrots-admin-ajax/a/u/img/test',
		queueLimit: 1
	});

	// FILTERS

	uploader1.filters.push({
		name: 'imageFilter1',
		fn: function(item /*{File|FileLikeObject}*/, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	// CALLBACKS

	
	uploader1.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		$scope.comSaveData.productList[0].logo = response.data.url;
	};

	//console.info('uploader1', uploader1);
	
	//图片3
	var uploader2 = $scope.uploader2 = new FileUploader({
		url: '/carrots-admin-ajax/a/u/img/test',
		queueLimit: 1
	});

	// FILTERS

	uploader2.filters.push({
		name: 'imageFilter2',
		fn: function(item /*{File|FileLikeObject}*/, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	// CALLBACKS

	
	uploader2.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		$scope.comSaveData.company.map = response.data.url;
	};

	//console.info('uploader2', uploader2);
})

//职位列表
.controller('job',function($scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state,$location){
	//日期
	$scope.start = {
		elem: '#start',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00', //设定最小日期为当前日期
		max: '2020-06-16 23:59:59', //最大日期
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.end.min = datas; //开始日选好后，重置结束日的最小日期
			$scope.end.start = datas; //将结束日的初始值设定为开始日
			$scope.jobSearchData.startAt = new Date(datas).valueOf();
			console.log($scope.jobSearchData.startAt);
		}
	};
	$scope.end = {
		elem: '#end',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00',
		max: '2020-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.start.max = datas; //结束日选好后，重置开始日的最大日期
			$scope.jobSearchData.endAt = new Date(datas).valueOf();
			console.log($scope.jobSearchData.endAt);
		}
	};
	
	$scope.laydateStart = function(){
		laydate($scope.start);
	}
	$scope.laydateEnd = function(){
		laydate($scope.end);
	}
    
    $scope.clear = function(){
        $scope.start.max = '2020-06-16 23:59:59'; 
        $scope.end.min = '2000-01-01 00:00:00'; 
        $scope.end.start = '2020-06-16 23:59:59'; 
        $('#start').html('');
        $('#end').html('');
        
        $scope.jobSearchData = {
            companyId:$location.search().id,
            companyName:'',
            name:'',
            category:'',
            subCategory:'',
            education:'',
            experience:'',
            startAt:'',
            endAt:'',
            compensation:'',
            status:'',
            page:1,
            size:10
        }
        
	}
	$scope.clear();
	$scope.category = con.categoryData;
	$scope.education = con.education;
	$scope.experience = con.experience;
	$scope.compensation = con.compensation;
	$scope.status = ['上架','下架'];
	
	
	
	//搜索
	$scope.searchGo = function(){
        $scope.jobSearchData.page = 1;
		console.log($scope.jobSearchData);
		myFac.http('get','/carrots-admin-ajax/a/profession/search',$scope.jobSearchData).then(function(res){
			$scope.jobData = res.data;
			console.log($scope.jobData);
			//分页
			$scope.allPage = Math.ceil(res.total/res.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = 1;
			
			sessionStorage.setItem('jobData',JSON.stringify($scope.jobSearchData));
		});
	}
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			console.log(num);
			var pageChange = JSON.parse(sessionStorage.getItem('jobData'));
			pageChange.page = num;
			myFac.http('get','/carrots-admin-ajax/a/profession/search',pageChange).then(function(res){
				$scope.jobData = res.data;
				console.log($scope.jobData);
				$scope.pageNum = num;
				//$location.search('page',num);
                sessionStorage.setItem('jobData',JSON.stringify(pageChange));
			});
		}
	}
    //重新搜
    $scope.research = function(){
        var pageChange = JSON.parse(sessionStorage.getItem('jobData'));
        myFac.http('get','/carrots-admin-ajax/a/profession/search',pageChange).then(function(res){
            $scope.jobData = res.data;
            console.log($scope.jobData);
            $scope.pageNum = num;
        });
	}
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		$scope.dataSet = data;
		switch($scope.string){
			case 'new'://新增
                val.jobSet = {companyId:$location.search().id};
				$state.go('jobSet');
				break;
			case 'id'://编辑页跳转
				val.jobSet = data;
				$state.go('jobSet');
				break;
			case 'status'://上架、下架
				$('#jobModal').modal('show');
				if(data.status){
					$scope.value1 = '如要上架职位，请先上架职位所属公司';
					$scope.value2 = '';
				}else{
					$scope.value1 = '下架后该职位信息将不再在前台展示';
					$scope.value2 = '是否执行下架操作';
				}	
				break;
			case 'del'://删除
				$('#jobModal').modal('show');
				$scope.value1 = '删除后该职位信息将无法使用及还原';
				$scope.value2 = '是否执行删除操作';
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
		switch($scope.string){
			case 'status'://上架、下架
				var bool;
				if($scope.dataSet.status){
					bool = 0;
				}else{bool = 1;}
				console.log({id:$scope.dataSet.id,type:1,status:bool});
				myFac.http('PUT','/carrots-admin-ajax/a/u/profession/status/'/* +$scope.dataSet.id */,{id:$scope.dataSet.id,status:bool}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.research();
				});
				break;
			case 'del'://删除
				myFac.http('DELETE','/carrots-admin-ajax/a/u/profession/'+$scope.dataSet.id,{}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.research();
				});
				break;
			default:
				break;
		}
	}
})
//职位操作
.controller('jobSet',function($scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	$scope.jobSaveData = {
        profession:{
            boon:'',
            category:'',
            companyId:'',
            companyName:'',
            compensation:'',
            education:'',
            experience:'',
            id:'',
            name:'',
            recommend:'1',
            requisite:'',
            responsibility:'',
            subCategory:''
        },
        tags:[]
	}
    //$scope.tagState = [];
	$scope.experience = con.experience;
	$scope.education = con.education;
	$scope.compensation = con.compensation;
	$scope.category = con.categoryData;
    //职位类别选择
    $scope.jobCateChange = function(num){
        $scope.subCategory = num ===undefined?'':con.categoryData[num].subCategory;
        $scope.jobSaveData.profession.subCategory = '';
    }
    //test
    $scope.test = function(){
        console.log($scope.tagState);
    }
    //保存
    $scope.save = function(){
        $scope.jobSaveData.tags = [];
        for(var i in $scope.tagState){
            if($scope.tagState[i]){
                console.log($scope.tagList[i]);
                $scope.jobSaveData.tags.push($scope.tagList[i]);
            }
        }
        console.log($scope.jobSaveData);
        /*console.log($scope.test); */
		if($scope.jobSaveData.profession.id == 0){
            console.log('新增');
			myFac.http('POST','/carrots-admin-ajax/a/u/profession',{},$scope.jobSaveData).then(function(res){
				console.log(res);
                window.history.back();
			});
		}else{
            console.log('编辑');
			myFac.http('put','/carrots-admin-ajax/a/u/profession/'+$scope.jobSaveData.profession.id,{},$scope.jobSaveData).then(function(res){
				console.log(res);
                window.history.back();
                //$state.go('job');
			});
		}
	}
})
//article列表
.controller('article',function($scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
	//日期
	$scope.start = {
		elem: '#start',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00', //设定最小日期为当前日期
		max: '2020-06-16 23:59:59', //最大日期
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.end.min = datas; //开始日选好后，重置结束日的最小日期
			$scope.end.start = datas; //将结束日的初始值设定为开始日
			$scope.articleSearchData.startAt = new Date(datas).valueOf();
			console.log($scope.articleSearchData.startAt);
		}
	};
	$scope.end = {
		elem: '#end',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00',
		max: '2020-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.start.max = datas; //结束日选好后，重置开始日的最大日期
			$scope.articleSearchData.endAt = new Date(datas).valueOf();
			console.log($scope.articleSearchData.endAt);
		}
	};
	
	$scope.laydateStart = function(){
		laydate($scope.start);
	}
	$scope.laydateEnd = function(){
		laydate($scope.end);
	}
    
    
    $scope.clear = function(){
        $scope.start.max = '2020-06-16 23:59:59'; 
        $scope.end.min = '2000-01-01 00:00:00'; 
        $scope.end.start = '2020-06-16 23:59:59'; 
        $('#start').html('');
        $('#end').html('');
		$scope.articleSearchData = {
			title:'',
			author:'',
			startAt:'',
			endAt:'',
			status:'',
			type:'',
			//industry:'',
			page:1,
			size:10
		}
	}
	$scope.clear();
	$scope.category = con.categoryData;
	$scope.education = con.education;
	$scope.experience = con.experience;
	$scope.compensation = con.compensation;
	$scope.status = con.articleStatus;
	$scope.type = con.articleType;
	
	

	//搜索
	$scope.searchGo = function(){
        $scope.articleSearchData.page = 1;
		console.log($scope.articleSearchData);
		myFac.http('get','/carrots-admin-ajax/a/article/search',$scope.articleSearchData).then(function(res){
			console.log(res);
			var a = res.data;
			$scope.articleData = res.data.articleList;
			console.log($scope.articleData);
			//分页
			$scope.allPage = Math.ceil(a.total/a.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = 1;
			
			//myFac.comLoSearch(scope.comSearchData);
			sessionStorage.setItem('articleData',JSON.stringify($scope.articleSearchData));
		});
	}
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			console.log(num);
			var pageChange = JSON.parse(sessionStorage.getItem('articleData'));
			pageChange.page = num;
			myFac.http('get','/carrots-admin-ajax/a/article/search',pageChange).then(function(res){
				$scope.articleData = res.data.articleList;
				console.log($scope.articleData);
				$scope.pageNum = num;
				//$location.search('page',num);
                sessionStorage.setItem('articleData',JSON.stringify(pageChange));
			});
		}
	}
    //重新搜
    $scope.research = function(){
        var pageChange = JSON.parse(sessionStorage.getItem('articleData'));
        myFac.http('get','/carrots-admin-ajax/a/article/search',pageChange).then(function(res){
            $scope.articleData = res.data.articleList;
            console.log($scope.articleData);
            $scope.pageNum = num;
        });
	}
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		$scope.dataSet = data;
		switch($scope.string){
			case 'new'://新增
				$state.go('articleSet');
				break;
			case 'status'://上线、下线
				$('#artModal').modal('show');
				if(data.status){
					$scope.value1 = '';
					$scope.value2 = '你确定要执行上线操作吗？';
				}else{
					$scope.value1 = '';
					$scope.value2 = '你确定要执行下线操作吗？';
				}	
				break;
			case 'id'://编辑页跳转
				val.articleSet = data;
				$state.go('articleSet');
				break;
			case 'del'://删除
				$('#artModal').modal('show');
				$scope.value1 = '删除后该Articler图将直接下架并在本地删除';
				$scope.value2 = '你确定要执行删除操作吗？';
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		
		switch($scope.string){
			case 'status'://上线、下线
				var bool;
				if($scope.dataSet.status == 2){
					bool = 1;
				}else{bool = 2;}
				console.log({id:$scope.dataSet.id,status:bool});
				myFac.http('PUT','/carrots-admin-ajax/a/u/article/status/'/* +$scope.dataSet.id */,{id:$scope.dataSet.id,status:bool}).then(function(res){
					//$scope.comData = res.message;
					console.log(res);
					$scope.research();
				});
				break;
			case 'del'://删除
				myFac.http('DELETE','/carrots-admin-ajax/a/u/article/'+$scope.dataSet.id,{}).then(function(res){
                    console.log(res);
					$scope.research();
                });
				break;
			default:
				break;
		}
	}
})
.controller('articleSet',function($scope,con,PROVINCE,CITY,COUNTY,$state,FileUploader,myFac){
	
	$scope.articleSaveData = {
		id:'',
        type:'',
        img:'',
        title:'',
        //order:'',
        //author:user,
        //source:,
        url:'',
        content:'',
        status:'',
        industry:''
	}
	$scope.category = con.categoryData;
	$scope.education = con.education;
	$scope.experience = con.experience;
	$scope.compensation = con.compensation;
	$scope.status = con.articleStatus;
	$scope.type = con.articleType;

	$scope.companySearch = function(){//搜索
		console.log($scope.articleSearchData);
	}
	//
    $scope.save = function(num){
        $scope.articleSaveData.status = num;
        console.log($scope.articleSaveData);
		if($scope.articleSaveData.id == 0){
            console.log('新增');
			myFac.http('POST','/carrots-admin-ajax/a/u/article',$scope.articleSaveData).then(function(res){
				console.log(res);
                window.history.back();
                //history.go(-1);
                //$state.go('job');
			});
		}else{
            console.log('编辑');
			myFac.http('put','/carrots-admin-ajax/a/u/article/'+$scope.articleSaveData.id,$scope.articleSaveData).then(function(res){
				console.log(res);
                window.history.back();
                //$state.go('job');
			});
		}
    }
	//图片加载
	var uploader = $scope.uploader = new FileUploader({
		url: '/carrots-admin-ajax/a/u/img/test',
		queueLimit: 1
	});

	// FILTERS

	uploader.filters.push({
		name: 'imageFilter',
		fn: function(item /*{File|FileLikeObject}*/, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	// CALLBACKS

	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		//response有链接参数
		$scope.articleSaveData.img = response.data.url;
	};
})