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
			approvedStatus:'',
			freezedStatus:'',
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
		//console.log($scope.comSearchData);
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
			});
		}
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
					$scope.searchGo();
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
					$scope.searchGo();
				});
				break;
			case 'del'://删除
				myFac.http('DELETE','/carrots-admin-ajax/a/u/company/'+$scope.dataSet.id,{}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.searchGo();
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
		id:'',	//公司ID	Number	是	 
		name:'',	//公司名称	String	是	 
		slogan:'',	//公司标语	String	是	 
		totalNum:'',	//公司人数	Number	是	 
		industry:'',	//行业	Number	是	见约定
		province:'',	//省	Number	是	例：province：340000
		city:'',	//市	Number	是	例：city：340001
		county:'',	//县	Number	是	例：county：340002
		financing:'',	//融资规模	Number	是	见约定
		approvedStatus:'1',	//认证状态	Number	是	见约定
		freezedStatus:'',	//冻结状态	Number	是	见约定
		logo:'',	//公司LOGO	String	是	 
		summary:'',	//公司介绍	String	是	 
		phone:'',	//手机	String	是	 
		mail:'',	//邮箱	String	是	 
		address:'',	//详细地址	String	是	 
		map:'',	//地图	String	是	 
		tags:'',	//公司标签列表	Array	 	 
		//productList:'',	//产品列表	Array	 	 
		//tags
		//tag:'',	//公司标签	String	否	 
		productList:{
			id:'',	//产品ID	Number	是	如果productList仅有产品ID，则为删除此产品。如果存在其他字段则为修改此产品。 
			name:'',	//产品名称	String	否	 
			slogan:'',	//产品标语	String	否	 
			summary:'',	//产品介绍	String	否	 
			logo:''	//产品LOGO	String	否	 
		}
	}
	//$scope.$apply();
	$scope.industry = con.industry;//行业
	$scope.financing = con.financing;//融资
	$scope.approvedStatus = ['未认证','已认证'];
	$scope.freezedStatus = ['正常','冻结'];
	$scope.province = PROVINCE;//省
	//省份选择
	$scope.comProvince = function(str){
		$scope.comSaveData.city = '';
		$scope.city = myFac.area(str);
	}
	//tag添加
	$scope.tagsAdd = function(str){
		var bool;
		for(var i in $scope.comSaveData.tags){
			bool = $scope.comSaveData.tags[i].tag == str? 1 : bool;
		}
		if(bool){
			console.log('已有');
		}else{
			$scope.comSaveData.tags.push({tag:str});
		}
	}
	$scope.tagsDel = function(num){
		$scope.comSaveData.tags.splice(num,1);
	}
	$scope.save = function(){
		if($scope.comSaveData.id == 0){
			//console.log($scope.comSaveData);
			//$state.go('company');
			$scope.test = {
				name:'打发士大夫',	//公司名称	String	是	 
				solgan:'分身大法',	//公司标语	String	是	 
				totalNum:1324,	//公司人数	Number	是	 
				industry:1,	//行业	Number	是	见约定
				province:1,	//省	Number	是	例：province：340000
				city:1,	//市	Number	是	例：city：340001
				county:1,	//县	Number	是	例：county：340002
				financing:1,	//融资规模	Number	是	见约定
				approvedStatus:1,	//认证状态	Number	是	见约定
				freezedStatus:1,	//冻结状态	Number	是	见约定
				logo:'http://carrots.ks3-cn-beijing.ksyun.com/test/8db3ad5a-cec6-4c0e-82d7-f2ebdfd02a49.png',	//公司LOGO	String	是	 
				summary:'多少分',	//公司介绍	String	是	 
				phone:'11111111111',	//手机	String	是	 
				mail:'adw@qq.com',	//邮箱	String	是	 
				address:'放的歌啊',	//详细地址	String	是	 
				map:'http://carrots.ks3-cn-beijing.ksyun.com/test/8db3ad5a-cec6-4c0e-82d7-f2ebdfd02a49.png',	//地图	String	是	 
				//公司标签列表	Array
                productList:[
                    {
                        logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png",
                        name: "请问",
                        slogan: "而且",
                        summary: "这边太阳"
                    }
                ],
                tagList: [{tag: "啊虽然"}, {tag: "问法"}, {tag: "请问"}]
				/* name	产品名称	String	否	 
				solgan	产品标语	String	否	 
				summary	产品介绍	String	否	 
				logo	产品LOGO	String	否 */
			}
			$scope.test2 = {
                company:{
                    /* //address: "的发文发",
                    approved: 0,
                    city: 107,
                    county: 998,
                    financing: "1",
                    logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/f156c611-98e5-4230-a73d-0bb4534bba4c.png",
                    //mail: "asef@qq.com",
                    //map: "http://carrots.ks3-cn-beijing.ksyun.com/3/9935a2d2-5e5d-497c-97e8-74d62913bf1c.jpg",
                    name: "错误添加测试",
                    //phone: "12312312321",
                    province: 13,
                    slogan: "自行车v",
                    summary: "不能一天",
                    totalNum: 321 */
                    approved:0,
                    city:135,
                    county:1264,
                    financing:1,
                    logo:"http://carrots.ks3-cn-beijing.ksyun.com/test/e9dfea5f-5290-423c-9f9c-fbb7104d3dda.png",
                    name:"11111",
                    province:15,
                    slogan:"11111",
                    summary:"111111",
                    totalNum:11

                },
                industryList: [{industry: "4"}],
                //productList:[
                   /*  {
                        logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png",
                        name: "请问",
                        slogan: "而且",
                        summary: "这边太阳"
                    } */
                //]
                /* ,
                tagList: [{tag: "啊虽然"}, {tag: "问法"}, {tag: "请问"}] */
            }
            
            /* Request URL:http://dev.admin.carrots.ptteng.com/a/u/img/3
            Request Method:POST */
            
/*  {company: {approved: 0,…}, productList: [{name: "请问", slogan: "而且",…}],…}
    company: {approved: 0,…}
        address: "额抢人头"
        approved: 0
        city: 202
        county: 1748
        financing: "0"
        logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/f156c611-98e5-4230-a73d-0bb4534bba4c.png"
        mail: "asef@qq.com"
        map: "http://carrots.ks3-cn-beijing.ksyun.com/3/9935a2d2-5e5d-497c-97e8-74d62913bf1c.jpg"
        name: "不过回复你"
        phone: "12312312321"
        province: 19
        slogan: "而天涯好吧"
        summary: "讥突然不"
        totalNum: 321
    industryList: [{industry: "4"}]
        0: {industry: "4"}
        industry: "4"
    productList: [{name: "请问", slogan: "而且",…}]
        0: {name: "请问", slogan: "而且",…}
        logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png"
        name: "请问"
        slogan: "而且"
        summary: "这边太阳"
    tagList: [{tag: "啊虽然"}, {tag: "问法"}, {tag: "请问"}]
        0: {tag: "啊虽然"}
        tag: "啊虽然"
        1: {tag: "问法"}
        tag: "问法"
        2: {tag: "请问"}
        tag: "请问" */
 /* {company: {address: "的发文发", approved: 0, city: 202, county: 1748, financing: "0",…},…}
    company: {address: "的发文发", approved: 0, city: 202, county: 1748, financing: "0",…}
    address: "的发文发"
    approved: 0
    city: 202
    county: 1748
    financing: "0"
    logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/f156c611-98e5-4230-a73d-0bb4534bba4c.png"
    mail: "asef@qq.com"
    map: "http://carrots.ks3-cn-beijing.ksyun.com/3/9935a2d2-5e5d-497c-97e8-74d62913bf1c.jpg"
    name: "而非"
    phone: "12312312321"
    province: 19
    slogan: "自行车v"
    summary: "不能一天"
    totalNum: 321
    industryList: [{industry: "4"}]
        0: {industry: "4"}
        industry: "4"
    productList: [{logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png",…}]
        0: {logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png",…}
        logo: "http://carrots.ks3-cn-beijing.ksyun.com/3/60111211-8afe-4650-afeb-1628bb255a1e.png"
        name: "请问"
        slogan: "而且"
        summary: "这边太阳"
    tagList: [{tag: "啊虽然"}, {tag: "问法"}, {tag: "请问"}]
        0: {tag: "啊虽然"}
        tag: "啊虽然"
        1: {tag: "问法"}
        tag: "问法"
        2: {tag: "请问"}
        tag: "请问" */
			/* myFac.http('POST','/carrots-admin-ajax/a/u/company',{},$scope.test2).then(function(res){
				console.log(res);
			}); */
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/company',
                //params:send,
                headers: {'Content-type': 'Application/json'},
                data: JSON.stringify($scope.test2)
            })
            .success(function(data, status, headers, cfg){
                console.log(data.message);
            })
            .error(function(data, status, headers, cfg){
                console.log(data.message);
            });
		}else{
			console.log($scope.comSaveData);
			myFac.http('put','/carrots-admin-ajax/a/u/company/',$scope.comSaveData).then(function(res){
				console.log(res);
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
		$scope.comSaveData.logo = response.data.url;
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
		$scope.comSaveData.productList.logo = response.data.url;
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
		$scope.comSaveData.map = response.data.url;
	};

	//console.info('uploader2', uploader2);
})
//职位列表
.controller('job',function($scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
	$scope.clear = function(){
		$scope.jobSearchData = {
			companyId:'',
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
	
	//日期
	$scope.start = {
		elem: '#start',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00', //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
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
		max: '2099-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.start.max = datas; //结束日选好后，重置开始日的最大日期
			$scope.jobSearchData.endAt = new Date(datas).valueOf();
			console.log($scope.jobSearchData.endAt);
		}
	};
	/* laydate($scope.start);
	laydate($scope.end); */
	$scope.laydateStart = function(){
		laydate($scope.start);
	}
	$scope.laydateEnd = function(){
		laydate($scope.end);
	}
	
	//搜索
	$scope.searchGo = function(){
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
			});
		}
	}
	//操作
	$scope.operate = function(str,data){
		$scope.string = str;
		$scope.dataSet = data;
		switch($scope.string){
			case 'new'://新增
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
					$scope.searchGo();
				});
				break;
			case 'del'://删除
				myFac.http('DELETE','/carrots-admin-ajax/a/u/profession/'+$scope.dataSet.id,{}).then(function(res){
					//$scope.comData = res.message;
					console.log(res.message);
					$scope.searchGo();
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
		companyName:'',	//公司名称	String	是	 
		name:'',	//职位名称	String	是	 
		category:'',	//职位类别	Number 	是	见约定
		subCategory:'',	//职位子类	Number 	是	见约定
		education:'',	//学历要求	Number 	是	见约定
		experience:'',	///工作经验	Number 	是	见约定
		recommend:'',	//推荐类型	Number 	是	 见约定
		compensation:'',	//薪资	Number 	是	见约定
		responsibility:'',	//岗位职责	String	是	 
		requisite:'',	//必要条件	String	是	 
		boon:'',	//公司福利	String	是	 
		status:'',	//状态	Number	是	见约定
		tags:'',	//职位标签列表	Array 	 	 
		tag:''	//职位标签	String	否
	}
	$scope.experience = con.experience;
	$scope.education = con.education;
	$scope.compensation = con.compensation;
	$scope.category = con.categoryData;
})
//article列表
.controller('article',function($scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
	$scope.clear = function(){
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
	
	//日期
	$scope.start = {
		elem: '#start',
		format: 'YYYY/MM/DD hh:mm:ss',
		min: '2000-01-01 00:00:00', //设定最小日期为当前日期
		max: '2099-06-16 23:59:59', //最大日期
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
		max: '2099-06-16 23:59:59',
		istime: true,
		istoday: false,
		choose: function(datas){
			$scope.start.max = datas; //结束日选好后，重置开始日的最大日期
			$scope.articleSearchData.endAt = new Date(datas).valueOf();
			console.log($scope.articleSearchData.endAt);
		}
	};
	/* laydate($scope.start);
	laydate($scope.end); */
	$scope.laydateStart = function(){
		laydate($scope.start);
	}
	$scope.laydateEnd = function(){
		laydate($scope.end);
	}

	//搜索
	$scope.searchGo = function(){
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
			});
		}
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
				if($scope.dataSet.status){
					bool = 2;
				}else{bool = 1;}
				console.log({id:$scope.dataSet.id,status:bool});
				myFac.http('PUT','/carrots-admin-ajax/a/u/article/status/'/* +$scope.dataSet.id */,{id:$scope.dataSet.id,status:bool}).then(function(res){
					//$scope.comData = res.message;
					console.log(res);
					$scope.searchGo();
				});
				break;
			case 'del'://删除
				
				break;
			default:
				break;
		}
	}
})
.controller('articleSet',function($scope,con,PROVINCE,CITY,COUNTY,$state,FileUploader){
	
	$scope.articleSaveData = {
		category:'',	//类别	Number	是	见约定
		name:'',	//名称	String	是	 
		type:'',	//类型	Number	是	见约定
		subType:'',	//类型子类	Number	type为3时为必填	见约定
		url:'',	//跳转链接	Number	type为0,1,2时为必填	 
		img:'',	//配图	String	是	 
		status:''	//状态	Number	是	见约定
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

	uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function(fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function(addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function(item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function(fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function(progress) {
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
		//response有链接参数
		//$scope.comSaveData.logo = response.data.url;
	};
	uploader.onErrorItem = function(fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function(fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);
		//response有链接参数
	};
	uploader.onCompleteAll = function() {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);
})