angular.module('myApp')
.factory('myFac',function($location,$http,$q,val){
	var service = [];
	service.carLeft = function(id){
		$('#'+id).carousel('prev');
	}
	service.carRight = function(id){
		$('#'+id).carousel('next');
	}
	service.showHide = function(id1,id2){
		$('#'+id1).css('display','block');
		$('#'+id2).css('display','none');
	}
	service.comLoSearch = function(input){
		$location.search('name',input.name);
		$location.search('financing',input.financing);
		$location.search('industry',input.industry);
		$location.search('page',input.page);
		$location.search('province',input.province);
		//$location.search('size',input.size);
	}
	service.jobLoSearch = function(input){
		$location.search('recommend',input.recommend);
		$location.search('category',input.category);
		$location.search('compensation',input.compensation);
		$location.search('education',input.education);
		$location.search('experience',input.experience);
		$location.search('financing',input.financing);
		$location.search('industry',input.industry);
		$location.search('name',input.name);
		$location.search('page',input.page);
		$location.search('province',input.province);
		$location.search('returnTags',input.returnTags);
		//$location.search('size',input.size);
		$location.search('subCategory',input.subCategory);
		$location.search('updateAt',input.updateAt);
	}
	service.http = function(met,Url,send){
		// defer()创建延迟对象
		// notify()传递中间过程
		// resolve()成功
		// reject()失败
		// when()传递已有数据不产生延迟
		var ajaxData = $q.defer();
		$http({
			method:met,
			url:Url,
			params:send
		})
		.success(function(data, status, headers, cfg){
			ajaxData.resolve(data);
		})
		.error(function(data, status, headers, cfg){
			ajaxData.reject(data);
		});
		return ajaxData.promise;
	}
	service.indexSelect = function(input,num,bool,str){
		var data;
		if(bool){
			if(num === ''){
				data = '';
			}else if(str == 'updateAt'){
				data = num;
			}else{
				var aStr = input.toString().split(',');
				var j=-1;
				for(var i=0; i<aStr.length; i++){
					j = aStr[i] === num.toString()? i:j;
				}
				if(j===-1){
					aStr.push(num);
					aStr.sort(function(a,b){return a-b;});
				}else{
					aStr.splice(j,1);
				}
				if(aStr[0] === ''){aStr.splice(0,1);}
				data = aStr.join(',');
			}
			console.log(data);
		}else{
			if(num === ''){
				data = false;
			}else{
				var aStr = input.toString().split(',');
				data=false;
				for(var i=0; i<aStr.length; i++){
					data = aStr[i] === num.toString()? true:data;
				}
			}
		}
		return data;
	}
	service.seaNull = function(input){
		for(var i in input){
			input[i] = input[i] === ''? null:input[i];
		}
		return input;
	}
	return service;
})