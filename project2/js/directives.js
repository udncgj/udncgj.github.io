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
			scope.comSearchData.approved = comSearch.approvedStatus==null?'':comSearch.approvedStatus;
			scope.comSearchData.freezed = comSearch.freezedStatus==null?'':comSearch.freezedStatus;
			scope.comSearchData.page = comSearch.page==null?1:comSearch.page;
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
            //scope.jobSearchData.startAt = jobSearch.startAt==null?'':jobSearch.startAt;
            
            //scope.jobSearchData.endAt = jobSearch.endAt==null?'':jobSearch.endAt;
            
            scope.jobSearchData.compensation = jobSearch.compensation==null?'':jobSearch.compensation;
            scope.jobSearchData.status = jobSearch.status==null?'':jobSearch.status;
            scope.jobSearchData.page = jobSearch.page==null?1:jobSearch.page;
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
            //scope.articleSearchData.startAt = articleSearch.startAt==null?'':articleSearch.startAt;
            //scope.articleSearchData.endAt = articleSearch.endAt==null?'':articleSearch.endAt;
            scope.articleSearchData.status = articleSearch.status==null?'':articleSearch.status;
            scope.articleSearchData.type = articleSearch.type==null?'':articleSearch.type;
            scope.articleSearchData.page = articleSearch.page==null?1:articleSearch.page;
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
        val.comSet = '';
		if(companyId !=null){
			myFac.http('get','/carrots-admin-ajax/a/company/'+companyId,{}).then(function(res){
				console.log(res);
				scope.comSaveData.company.id = res.data.company.id;
				scope.comSaveData.company.name = res.data.company.name;
				scope.comSaveData.company.slogan = res.data.company.slogan;
				scope.comSaveData.company.totalNum = res.data.company.totalNum;
				scope.comSaveData.company.financing = res.data.company.financing.toString();
				scope.comSaveData.industryList = res.data.industryList;
				
                scope.comSaveData.company.province = res.data.company.province.toString();
				scope.city = myFac.area(scope.comSaveData.company.province);
                scope.comSaveData.company.city = res.data.company.city.toString();
				scope.county = myFac.county(scope.comSaveData.company.city);
                scope.comSaveData.company.county = res.data.company.county.toString();
                
                scope.comSaveData.company.logo = res.data.company.logo;
				scope.comSaveData.company.summary = res.data.company.summary;
				scope.comSaveData.company.approved = res.data.company.approved.toString();
				scope.comSaveData.company.freezed = res.data.company.freezed.toString();
				scope.comSaveData.company.phone = res.data.company.phone;
				scope.comSaveData.company.mail = res.data.company.mail;
				scope.comSaveData.company.address = res.data.company.address;
                scope.comSaveData.company.map = res.data.company.map;
				scope.comSaveData.tagList = res.data.tagList;
				scope.comSaveData.productList = res.data.productList;
				console.log(scope.comSaveData);
			});
		}
    }
})
.directive('dJobset',function($location,myFac,val,con){
	return function(scope,ele,attrs){
		
		var companyId = val.jobSet == ''?$location.search().companyId:val.jobSet.companyId;
        var id = val.jobSet == ''?$location.search().id:val.jobSet.id;
		$location.search('companyId',companyId);
        $location.search('id',id);
        val.jobSet = '';
        //console.log(companyId,id);
        scope.tagState = [];
        
        myFac.http('get','/carrots-admin-ajax/a/company/'+companyId).then(function(res){
            //console.log('公司',res);
            scope.jobSaveData.profession.companyName = res.data.company.name;
            scope.jobSaveData.profession.companyId = $location.search().companyId;
            scope.tagList = res.data.tagList;
            for(var i in scope.tagList){
                scope.tagState[i] = false;
            }
            console.log('scope.tagList',scope.tagList);
            
            if(id !=null){
                myFac.http('get','/carrots-admin-ajax/a/profession/'+id,{}).then(function(res){
                    //console.log('职位',res);
                    scope.jobSaveData.tags = res.data.tags;
                    for(var i in scope.tagList){
                        for(var j in scope.jobSaveData.tags){
                            if(scope.tagList[i].tag == scope.jobSaveData.tags[j].tag){
                                scope.tagState[i] = true;
                            }
                        }
                        
                    }
                    console.log('scope.tagState',scope.tagState);
                    
                    scope.jobSaveData.profession.boon = res.data.boon;
                    scope.jobSaveData.profession.companyName = res.data.companyName;
                    scope.jobSaveData.profession.name = res.data.name;
                    scope.jobSaveData.profession.requisite = res.data.requisite;
                    scope.jobSaveData.profession.responsibility = res.data.responsibility;
                    scope.jobSaveData.profession.compensation = res.data.compensation.toString();
                    scope.jobSaveData.profession.education = res.data.education.toString();
                    scope.jobSaveData.profession.experience = res.data.experience.toString();
                    scope.jobSaveData.profession.recommend = res.data.recommend.toString();
                    scope.jobSaveData.profession.category = res.data.category.toString();
                    scope.subCategory = con.categoryData[scope.jobSaveData.profession.category].subCategory;
                    scope.jobSaveData.profession.subCategory = res.data.subCategory.toString();
                    scope.jobSaveData.profession.companyId = res.data.companyId.toString();
                    scope.jobSaveData.profession.id = res.data.id.toString();
                    
                    //console.log(scope.jobSaveData);
                });
            }
        });
        
        
    }
})
.directive('dArticleset',function($location,myFac,val,con){
	return function(scope,ele,attrs){
		
		var id = val.articleSet == ''?$location.search().id:val.articleSet.id;
        $location.search('id',id);
        val.articleSet = '';
        console.log(id);
        if(id !=null){
			myFac.http('GET','/carrots-admin-ajax/a/article/'+id,{}).then(function(res){
				console.log('图片',res);
                scope.articleSaveData = res.data.article;
                scope.articleSaveData.type = scope.articleSaveData.type.toString();
			});
		}
    }
})
/* .directive('dAccountnum',function($location,myFac,val,con){
	return function(scope,ele,attrs){
        myFac.http('get','/carrots-admin-ajax/a/u/manager/',scope.data).then(function(res){
			
			console.log(res);
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
            //console.log(s);
			//分页
			scope.allPage = Math.ceil(res.data.total/res.data.size);
			var page = scope.allPage;
			scope.page = new Array(page);
			for(var i=0; i<page; i++){scope.page[i] = {'page':i+1};}
			scope.pageNum = scope.data.page;
            
            
            myFac.http('get','/carrots-admin-ajax/a/u/multi/manager?'+s).then(function(data){
                //scope.showData = res.data.ids;
                //console.log('data',data);
                scope.showData = data.data.managerList;
                console.log(scope.showData);
            });
		});
    }
}) */
.directive('dAccountnumset',function($location,myFac,val,con){
	return function(scope,ele,attrs){
        
        
		scope.id = scope.dataSet == ''||scope.dataSet == undefined?$location.search().id:scope.dataSet.id;
        $location.search('id',scope.id);
        scope.dataSet = '';
        console.log(scope.id);
        
        if(scope.id!=null){
            myFac.http('get','/carrots-admin-ajax/a/u/multi/manager?ids='+scope.id).then(function(res){
                console.log(res);
                scope.saveData.manager = res.data.managerList[0];
                scope.saveData.manager.roleID = scope.saveData.manager.roleID.toString();
                console.log('scope.accSaveData.manager',scope.saveData.manager);
            });
        }
    }
})
.directive('dModuleset',function($location,myFac,val,con){
	return function(scope,ele,attrs){
        
        
		scope.id = scope.dataSet == ''||scope.dataSet == undefined?$location.search().id:scope.dataSet.id;
        $location.search('id',scope.id);
        scope.dataSet = '';
        console.log(scope.id);
        
        if(scope.id!=null){
            myFac.http('get','/carrots-admin-ajax/a/u/multi/module?ids='+scope.id).then(function(res){
                console.log(res);
                scope.saveData.manager = res.data.moduleList[0];
                console.log('scope.accSaveData.manager',scope.saveData.manager);
            });
        }
    }
})
.directive('dRoleset',function($location,myFac,val,con){
	return function(scope,ele,attrs){
        
		scope.id = scope.dataSet == ''||scope.dataSet == undefined?$location.search().id:scope.dataSet.id;
        $location.search('id',scope.id);
        scope.dataSet = '';
        console.log(scope.id);
        
        
        scope.vm.setList = [];
        scope.childList = [];
        scope.parentList = {};
        myFac.http('get','/carrots-admin-ajax/a/u/module/',{page:1,size:100}).then(function(res){
			
            console.log(res);
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
            if(scope.id!=null){
                myFac.http('get','/carrots-admin-ajax/a/u/role/'+scope.id).then(function(res){
                    //console.log(res);
                    scope.saveData.role = res.data.role;
                    for(var i in scope.saveData.role.permissionsSet){
                        var arr = scope.saveData.role.permissionsSet[i];
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
                        scope.saveData.role.permissionsSet[i] = state;
                    }
                    console.log('scope.saveData.role',scope.saveData.role);
                });
            }
            
            myFac.http('get','/carrots-admin-ajax/a/u/multi/module?'+s).then(function(data){
                scope.moduleList = data.data.moduleList;
                for(var i in scope.moduleList){
                    //console.log(scope.moduleList[i].parentID,scope.moduleList[i].id);
                    if(scope.moduleList[i].parentID == 0 || scope.moduleList[i].parentID == ''){
                        scope.vm.setList.push({parent:scope.moduleList[i],state:false,list:[]});
                        //scope.moduleList.splice(i,1);
                    }/* else{
                        scope.childList.push(scope.moduleList[i]);
                    } */
                }
                //console.log(scope.vm.setList,scope.childList);
                for(var i in scope.moduleList){
                    var parentID = scope.moduleList[i].parentID;
                    var id = scope.moduleList[i].id;
                    //console.log(id);
                    //scope.permission.push({id:[]});
                    for(var j in scope.vm.setList){
                        if(scope.vm.setList[j].parent.id == parentID){
                            scope.moduleList[i].state = false;
                            scope.vm.setList[j].list.push(scope.moduleList[i]);
                        }
                    }
                }
                console.log('scope.vm.setList',scope.vm.setList,'scope.saveData.role.permissionsSet',scope.saveData.role.permissionsSet);
                
                
                /* if((function(){
                    var b = false;
                    for(var i in bool){
                        b = bool[i] == true?true:b;
                    }
                    return b;
                })()){
                    scope.vm.setList[num2].list[num].state = true;
                    scope.vm.setList[num2].state = true;
                    scope.checkAll = true;
                } */
                
            });
        });
    }
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