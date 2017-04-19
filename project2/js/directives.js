angular.module('myApp')
//公司列表
.directive('dCompany',function($location,myFac,val){
	return function(scope,ele,attrs){
		
		var comSearch = JSON.parse(sessionStorage.getItem('comData'));
		console.log(comSearch);
		if(comSearch == null){}
		else{
			scope.comSearchData.name = comSearch.name==null?'':comSearch.name;
			scope.comSearchData.industry = comSearch.industry==null?'':comSearch.industry;
			scope.comSearchData.province = comSearch.province==null?'':comSearch.province;
			scope.comSearchData.city = comSearch.city==null?'':comSearch.city;
			scope.comSearchData.financing = comSearch.financing==null?'':comSearch.financing;
			scope.comSearchData.approvedStatus = comSearch.approvedStatus==null?'':comSearch.approvedStatus;
			scope.comSearchData.freezedStatus = comSearch.freezedStatus==null?'':comSearch.freezedStatus;
			//scope.comSearchData.page = comSearch.page==null?1:comSearch.page;
		}
		scope.comDataList = [1,2,3,4,5,6,7,8,9,10];
		myFac.http('get','/carrots-admin-ajax/a/company/search',scope.comSearchData).then(function(res){
			console.log(res);
			scope.comData = res.data;
			console.log(scope.comData);
			//分页
			scope.allPage = Math.ceil(res.total/res.size);
			var page = scope.allPage;
			scope.page = new Array(page);
			for(var i=0; i<page; i++){scope.page[i] = {'page':i+1};}
			scope.pageNum = scope.comSearchData.page;
			
			//myFac.comLoSearch(scope.comSearchData);
			sessionStorage.setItem('comData',JSON.stringify(scope.comSearchData));
		});
	}
})
.directive('dJob',function($location,myFac,val){
    return function(scope,ele,attrs){
        
        var jobSearch = JSON.parse(sessionStorage.getItem('jobData'));
        console.log(jobSearch);
        if(jobSearch == null){}
        else{
            //scope.jobSearchData.companyId = jobSearch.companyId==null?'':jobSearch.companyId;
            scope.jobSearchData.companyName = jobSearch.companyName==null?'':jobSearch.companyName;
            scope.jobSearchData.name = jobSearch.name==null?'':jobSearch.name;
            scope.jobSearchData.category = jobSearch.category==null?'':jobSearch.category;
            scope.jobSearchData.subCategory = jobSearch.subCategory==null?'':jobSearch.subCategory;
            scope.jobSearchData.education = jobSearch.education==null?'':jobSearch.education;
            scope.jobSearchData.experience = jobSearch.experience==null?'':jobSearch.experience;
            scope.jobSearchData.startAt = jobSearch.startAt==null?'':jobSearch.startAt;
            scope.jobSearchData.endAt = jobSearch.endAt==null?'':jobSearch.endAt;
            scope.jobSearchData.compensation = jobSearch.compensation==null?'':jobSearch.compensation;
            scope.jobSearchData.status = jobSearch.status==null?'':jobSearch.status;
            //scope.jobSearchData.page = jobSearch.page==null?1:jobSearch.page;
        }
        console.log($location.search());
        
        scope.jobSearchData.companyId = val.jobState == ''?$location.search().id:val.jobState;
        $location.search('id',scope.jobSearchData.companyId);
        
        val.jobState = '';
        
        scope.jobDataList = [1,2,3,4,5,6,7,8,9,10];
        
        myFac.http('get','/carrots-admin-ajax/a/profession/search',scope.jobSearchData).then(function(res){
            //console.log(res);
            scope.jobData = res.data;
            console.log(res);
            //分页
            scope.allPage = Math.ceil(res.total/res.size);
            var page = scope.allPage;
            scope.page = new Array(page);
            for(var i=0; i<page; i++){scope.page[i] = {'page':i+1};}
            scope.pageNum = scope.jobSearchData.page;
            
            //myFac.comLoSearch(scope.comSearchData);
            sessionStorage.setItem('jobData',JSON.stringify(scope.jobSearchData));
        });
        if(scope.jobSearchData.companyId == null){
            scope.jobTop = '职位列表';
        }else{
            myFac.http('get','/carrots-admin-ajax/a/company/'+scope.jobSearchData.companyId,{}).then(function(res){
                //console.log(res.data);
                scope.jobTop = res.data.company.name+' 的在招职位';
            });
        }
	}
})
.directive('dArticle',function($location,myFac,val){
    return function(scope,ele,attrs){
        
        var articleSearch = JSON.parse(sessionStorage.getItem('articleData'));
        console.log(articleSearch);
        if(articleSearch == null){}
        else{
            scope.articleSearchData.title = articleSearch.title==null?'':articleSearch.title;
            scope.articleSearchData.author = articleSearch.author==null?'':articleSearch.author;
            scope.articleSearchData.startAt = articleSearch.startAt==null?'':articleSearch.startAt;
            scope.articleSearchData.endAt = articleSearch.endAt==null?'':articleSearch.endAt;
            scope.articleSearchData.status = articleSearch.status==null?'':articleSearch.status;
            scope.articleSearchData.type = articleSearch.type==null?'':articleSearch.type;
            //scope.articleSearchData.page = articleSearch.page==null?1:articleSearch.page;
        }
        scope.articleDataList = [1,2,3,4,5,6,7,8,9,10];
        myFac.http('get','/carrots-admin-ajax/a/article/search',scope.articleSearchData).then(function(res){
            console.log(res);
            var a = res.data;
            scope.articleData = res.data.articleList;
            console.log(scope.articleData);
            //分页
            scope.allPage = Math.ceil(a.total/a.size);
            var page = scope.allPage;
            scope.page = new Array(page);
            for(var i=0; i<page; i++){scope.page[i] = {'page':i+1};}
            scope.pageNum = scope.articleSearchData.page;
            
            //myFac.comLoSearch(scope.comSearchData);
            sessionStorage.setItem('articleData',JSON.stringify(scope.articleSearchData));
        });
    }
})
.directive('dCompanyset',function($location,myFac,val){
	return function(scope,ele,attrs){
		
		var companyId = val.comSet == ''?$location.search().id:val.comSet.id;
		$location.search('id',companyId);
		if(companyId !=null){
			myFac.http('get','/carrots-admin-ajax/a/company/'+companyId,{}).then(function(res){
				console.log(res);
				scope.comSaveData.id = res.data.company.id;
				scope.comSaveData.name = res.data.company.name;
				scope.comSaveData.slogan = res.data.company.slogan;
				scope.comSaveData.totalNum = res.data.company.totalNum;
				scope.comSaveData.financing = res.data.company.financing.toString();
				scope.comSaveData.industry = res.data.industryList[0].industry.toString();
				scope.comSaveData.province = res.data.company.province.toString();
				scope.city = myFac.area(scope.comSaveData.province);
				scope.comSaveData.city = res.data.company.city.toString();
				scope.comSaveData.logo = res.data.company.logo;
				scope.comSaveData.summary = res.data.company.summary;
				scope.comSaveData.approvedStatus = res.data.company.approvedStatus;
				scope.comSaveData.freezedStatus = res.data.company.freezedStatus;
				scope.comSaveData.phone = res.data.company.phone;
				scope.comSaveData.mail = res.data.company.mail;
				scope.comSaveData.address = res.data.company.address;
				scope.comSaveData.tags = res.data.tagList;
				scope.comSaveData.productList.id = res.data.productList.id;
				scope.comSaveData.productList.name = res.data.productList.name;
				scope.comSaveData.productList.slogan = res.data.productList.slogan;
				scope.comSaveData.productList.summary = res.data.productList.summary;
				scope.comSaveData.productList.logo = res.data.productList.logo;
				console.log(scope.comSaveData);
			});
		}
/* 	$scope.comSaveData = {
		id:'',	//公司ID	Number	是	 
		name:'',	//公司名称	String	是	 
		solgan:'',	//公司标语	String	是	 
		totalNum:'',	//公司人数	Number	是	 
		industry:'',	//行业	Number	是	见约定
		province:'',	//省	Number	是	例：province：340000
		city:'',	//市	Number	是	例：city：340001
		county:'',	//县	Number	是	例：county：340002
		financing:'',	//融资规模	Number	是	见约定
		approvedStatus:'',	//认证状态	Number	是	见约定
		freezedStatus:'',	//冻结状态	Number	是	见约定
		logo:'',	//公司LOGO	String	是	 
		summary:'',	//公司介绍	String	是	 
		phone:'',	//手机	String	是	 
		mail:'',	//邮箱	String	是	 
		address:'',	//详细地址	String	是	 
		map:'',	//地图	String	是	 
		tags:['五险一金','点点滴滴'],	//公司标签列表	Array	 	 
		productList:'',	//产品列表	Array	 	 
		//tags
		tag:'',	//公司标签	String	否	 
		productList:{
			id:'',	//产品ID	Number	是	如果productList仅有产品ID，则为删除此产品。如果存在其他字段则为修改此产品。 
			name:'',	//产品名称	String	否	 
			solgan:'',	//产品标语	String	否	 
			summary:'',	//产品介绍	String	否	 
			logo:''	//产品LOGO	String	否	 
		}
	}
 */	}
})



.directive('ngThumb', ['$window', function($window) {
	var helper = {
		support: !!($window.FileReader && $window.CanvasRenderingContext2D),
		isFile: function(item) {
			return angular.isObject(item) && item instanceof $window.File;
		},
		isImage: function(file) {
			var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	};

	return {
		restrict: 'A',
		template: '<canvas/>',
		link: function(scope, element, attributes) {
			if (!helper.support) return;

			var params = scope.$eval(attributes.ngThumb);

			if (!helper.isFile(params.file)) return;
			if (!helper.isImage(params.file)) return;

			var canvas = element.find('canvas');
			var reader = new FileReader();

			reader.onload = onLoadFile;
			reader.readAsDataURL(params.file);

			function onLoadFile(event) {
				var img = new Image();
				img.onload = onLoadImage;
				img.src = event.target.result;
			}

			function onLoadImage() {
				var width = params.width || this.width / this.height * params.height;
				var height = params.height || this.height / this.width * params.width;
				canvas.attr({ width: width, height: height });
				canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
			}
		}
	};
}]);