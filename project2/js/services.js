angular.module('myApp')
.factory('myFac',function($location,$http,$q,val,CITY,COUNTY){
	var service = [];
	service.area = function(str){
		var arr = [];
		if(str ===''){
			arr='';
		}else{
			var num = parseInt(str);
			console.log(num);
			angular.forEach(CITY, function (data) {
				if (data.ProID == num) {
					arr.push(data);
				}
			});
		}
		return arr;
	}
    service.county = function(str){
		var arr = [];
		if(str ===''){
			arr='';
		}else{
			var num = parseInt(str);
			console.log(num);
			angular.forEach(COUNTY, function (data) {
				if (data.CityID == num) {
					arr.push(data);
				}
			});
		}
		return arr;
	}
	/* service.date = function(scope){
		scope.start = {
			elem: '#start',
			format: 'YYYY/MM/DD hh:mm:ss',
			min: laydate.now(), //设定最小日期为当前日期
			max: '2099-06-16 23:59:59', //最大日期
			istime: true,
			istoday: false,
			choose: function(datas){
				console.log(datas);
				end.min = datas; //开始日选好后，重置结束日的最小日期
				end.start = datas //将结束日的初始值设定为开始日
			}
		};
		scope.end = {
			elem: '#end',
			format: 'YYYY/MM/DD hh:mm:ss',
			min: laydate.now(),
			max: '2099-06-16 23:59:59',
			istime: true,
			istoday: false,
			choose: function(datas){
				console.log(datas);
				start.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		laydate(scope.start);
		laydate(scope.end);
	} */
	service.http = function(met,Url,send,data){
		// defer()创建延迟对象
		// notify()传递中间过程
		// resolve()成功
		// reject()失败
		// when()传递已有数据不产生延迟
		var ajaxData = $q.defer();
		$http({
			method:met,
			url:Url,
			params:send,
            headers: {'Content-type': 'Application/json'},
            data: JSON.stringify(data)
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