angular.module('myApp')
.directive('dCarousel',function(){
	return function(scope,ele,attrs){
		$('#'+attrs.id).carousel({
			interval: 3000
		});
	}
})
.directive('dSlider',function(){
	return function(scope,ele,attrs){
		$('.autoplay').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows:false
        });
	}
})
//公司详情
.directive('dCommes',function($location,myFac,val){
	return function(scope,ele,attrs){
		scope.search = $location.search();//{id:val.jobMes.id}
        scope.pro.p2sMesList = true;
		if(!scope.search.id){
			$location.search({id:val.comMes.id})
		}
		myFac.http('get','/carrots-ajax/a/company/'+$location.search().id,{}).then(function(res){
			scope.pro.comMes = res.data;
			console.log('comMes');
			console.log(scope.pro.comMes);
		});
        myFac.http('get','/carrots-ajax/a/profession/search',{recommend:0,companyId:$location.search().id,page:1,size:9}).then(function(res){
			scope.pro.comJobMes = res.data;
			scope.pro.comJobNum = res.total;
			console.log('comJobMes');
			console.log(scope.pro.comJobMes);
			if(scope.pro.comJobMes == 0){
				myFac.showHide('proComJobMes2','proComJobMes1');
			}else{myFac.showHide('proComJobMes1','proComJobMes2');}
			//分页
			scope.pro.comMesAllPage = Math.ceil(res.total/res.size);
			var comMesPage = scope.pro.comMesAllPage;
			scope.pro.comMesPage = new Array(comMesPage);
			for(var i=0; i<comMesPage; i++){scope.pro.comMesPage[i] = {'comMesPage':i+1};}
			scope.pro.comMesPageNum = 1;
		});
		/* myFac.http('get','/carrots-ajax/a/profession/search',{recommend:0,id:$location.search().id,page:1,size:9}).then(function(res){
			scope.pro.comJobMes = res.data;
			scope.pro.comJobNum = res.total;
			console.log('comJobMes');
			console.log(scope.pro.comJobMes);
			if(scope.pro.comJobMes == 0){
				myFac.showHide('proComJobMes2','proComJobMes1');
			}else{myFac.showHide('proComJobMes1','proComJobMes2');}
			//分页
			scope.pro.comMesAllPage = Math.ceil(res.total/res.size);
			var comMesPage = scope.pro.comMesAllPage;
			scope.pro.comMesPage = new Array(comMesPage);
			for(var i=0; i<comMesPage; i++){scope.pro.comMesPage[i] = {'comMesPage':i+1};}
			scope.pro.comMesPageNum = 1;
		}); */
	}
})
//职位详情
.directive('dJobmes',function($location,myFac,val){
	return function(scope,ele,attrs){
		scope.search = $location.search();//{id:val.jobMes.id}
		if(!scope.search.id){
			$location.search({id:val.jobMes.id})
		}
		myFac.http('get','/carrots-ajax/a/profession/'+$location.search().id,{}).then(function(res){
			scope.jobMes = res.data;
			console.log(scope.jobMes);
		});
	}
})
.directive('dNewabout',function($location,myFac,val){
	return function(scope){
		var path = $location.path();
		var num = path.charAt(path.length-1);
		scope.about.aboutState = num;
	}
})
.directive('dSearch',function($location,myFac,val){
	return function(scope){
	}
})
//公司搜索列表页初始化
.directive('dSearchcom',function($location,myFac,val,$state){
	return function(scope){
		sessionStorage.setItem('comPageChange',JSON.stringify(scope.pro.comSearchData));
		var searchTop = val.searchTop == ''?$location.search().n : val.searchTop;
	 	switch(searchTop){
			case 'proSeaCom':
				$('.sel').eq(0).css('display','flex');
				scope.pro.comSearchData.name = val.comName;
				val.comName = '';
				break;
			case 'proComCom':
				$('.sel').eq(0).css('display','none');
				break;
			case 'eliteCom':
				$('.sel').eq(0).css('display','none');
				scope.global.topList = 2;
				break;
			default:
				$('.sel').eq(0).css('display','flex');
				break;
		}
		$location.search('n',searchTop);
		scope.pro.p2sTop = true;
		var comSearch = JSON.parse(sessionStorage.getItem('comPageChange'));
		var locSearch = $location.search();
		console.log(comSearch);
		console.log(locSearch);
		if(val.searchTop == ''){
			scope.pro.comSearchData.name = locSearch.name == null?(comSearch.name==null?'':comSearch.name):locSearch.name;
			
			scope.pro.comSearchData.province = locSearch.province == null?(comSearch.province==null?'':comSearch.province):locSearch.province;
			
			scope.pro.comSearchData.industry = locSearch.industry == null?(comSearch.industry==null?'':comSearch.industry):locSearch.industry;
			
			scope.pro.comSearchData.financing = locSearch.financing == null?(comSearch.financing==null?'':comSearch.financing):locSearch.financing;
			
			scope.pro.comSearchData.page = locSearch.page == null?(comSearch.page==null?1:comSearch.page):locSearch.page;
		}
		val.searchTop = '';
		
		
		
		myFac.http('get','/carrots-ajax/a/company/search',scope.pro.comSearchData).then(function(res){
			scope.pro.cList = res.data;
			console.log(scope.pro.cList);
			if(scope.pro.cList == 0){
				myFac.showHide('p2s-companyListNo','p2s-companyList');
			}else{
				myFac.showHide('p2s-companyList','p2s-companyListNo');
			}
			//分页
			scope.pro.cAllPage = Math.ceil(res.total/res.size);
			var cPage = scope.pro.cAllPage;
			scope.pro.cPage = new Array(cPage);
			for(var i=0; i<cPage; i++){scope.pro.cPage[i] = {'cPage':i+1};}
			scope.pro.cPageNum = scope.pro.comSearchData.page;
			
			myFac.comLoSearch(scope.pro.comSearchData);
			sessionStorage.setItem('comPageChange',JSON.stringify(scope.pro.comSearchData));
		});
	}
})
//职位搜索列表页初始化
.directive('dSearchjob',function($location,myFac,val,$state){
	return function(scope){
		//搜索页顶部隐藏和显示
        sessionStorage.setItem('jobPageChange',JSON.stringify(scope.pro.jobSearchData));
		var searchTop = val.searchTop == ''?$location.search().n : val.searchTop;
	 	switch(searchTop){
			case 'hNewJob':
				$('.sel').eq(0).css('display','none');
				break;
			case 'proNewJob':
				$('.sel').eq(0).css('display','none');
				break;
			case 'proComJob':
				$('.sel').eq(0).css('display','none');
				scope.pro.jobSearchData.recommend = 1;
				break;
			case 'proSeaJob':
				$('.sel').eq(0).css('display','flex');
				break;
			default:
				$('.sel').eq(0).css('display','flex');
				break;
		}
		$location.search('n',searchTop);
		
		scope.pro.p2sTop = false;
		var jobSearch = JSON.parse(sessionStorage.getItem('jobPageChange'));
		var locSearch = $location.search();
		console.log(jobSearch);
		console.log(locSearch);
		if(val.searchTop == ''){
			
			scope.pro.jobSearchData.name = locSearch.name == null?(jobSearch.name==null?'':jobSearch.name):locSearch.name;
			
			scope.pro.jobSearchData.province = locSearch.province == null?(jobSearch.province==null?'':jobSearch.province):locSearch.province;
			
			scope.pro.jobSearchData.category = locSearch.category == null?(jobSearch.category==null?'':jobSearch.category):locSearch.category;
			
			scope.pro.jobSearchData.industry = locSearch.industry == null?(jobSearch.industry==null?'':jobSearch.industry):locSearch.industry;
			
			scope.pro.jobSearchData.education = locSearch.education == null?(jobSearch.education==null?'':jobSearch.education):locSearch.education;
			
			scope.pro.jobSearchData.experience = locSearch.experience == null?(jobSearch.experience==null?'':jobSearch.experience):locSearch.experience;
			
			scope.pro.jobSearchData.compensation = locSearch.compensation == null?(jobSearch.compensation==null?'':jobSearch.compensation):locSearch.compensation;
			
			scope.pro.jobSearchData.updateAt = locSearch.updateAt == null?(jobSearch.updateAt==null?'':jobSearch.updateAt):locSearch.updateAt;
			
			scope.pro.jobSearchData.subCategory = locSearch.subCategory == null?(jobSearch.subCategory==null?'':jobSearch.subCategory):locSearch.subCategory;
			
			scope.pro.jobSearchData.page = locSearch.page == null?(jobSearch.name==null?1:jobSearch.page):locSearch.page;
		}
		
		
		
		
		val.searchTop = '';
		
		console.log(scope.pro.jobSearchData);
		myFac.http('get','/carrots-ajax/a/profession/search',scope.pro.jobSearchData).then(function(res){
			scope.pro.jList = res.data;
			console.log(scope.pro.jList);
			if(scope.pro.jList == 0){
				myFac.showHide('p2s-jobListNo','p2s-jobList');
			}else{
				myFac.showHide('p2s-jobList','p2s-jobListNo');
			}
			//分页
			scope.pro.jAllPage = Math.ceil(res.total/res.size);
			var jPage = scope.pro.jAllPage;
			scope.pro.jPage = new Array(jPage);
			for(var i=0; i<jPage; i++){scope.pro.jPage[i] = {'jPage':i+1};}
			scope.pro.jPageNum = scope.pro.jobSearchData.page;
			
			myFac.jobLoSearch(scope.pro.jobSearchData);
			sessionStorage.setItem('jobPageChange',JSON.stringify(scope.pro.jobSearchData));
		});
	}
})
.directive('dElite',function($location,myFac,val,$state){
	return function(scope){
		
	}
})