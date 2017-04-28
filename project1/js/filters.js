
angular.module('myApp')
.filter('fPicScreen',function(){
	return function(input,sel){
		return input[sel];
	}
})
.filter('fHPos',function(){
	return function(input){
		var aMes = input.data;
		var num = input.size < input.total?input.size:input.total;
		num = Math.floor(num/4)*4;
		var aRet = [];
		for(var i=0; i*4<num; i++){
			aRet[i] = aMes.slice(i*4,i*4+4);
		}
		return aRet;
	}
})
.filter('fMes',function(con){
	return function(input,field,str){
		if(input >= 0){//input != undefined && 
			var name;
			var aMes = con[field];
			angular.forEach(aMes,function(data){
				if(data[str] == input){
					name = data.name;
				}
			})
			return name;
		}else{console.log('false');}
	}
})
//职业子项
/* .filter('fSubMes',function(con){
	return function(input,str,num){
		if(str == 'subCategory'){
			input = input[num]
		}
	}
}) */



.filter('fSymbol',function(con){
	return function(input,num){
		if(num>0){
			return input;
		}else{return ''}
	}
})
.filter('fSearchData',function(myFac){
	return function(input,num,str){
        //console.log(input,num,str);
        if(str == 'province' || str == 'category' || str == 'subCategory')num = num === '' ?'':num+1;;
		return myFac.indexSelect(input,num,false);
	}
})
.filter('provinceFilter', function (PROVINCE) {//省
	return function (id) {
		if (id != undefined && id != '') {
			var name;
			angular.forEach(PROVINCE, function (data) {
				if (data.ProID == id) {
					name = data.ProName;
				}
			});
			return name;
		}
	}
})
.filter('cityFilter', function (CITY) {//市
	return function (id) {
		if (id != undefined && id != '') {
			var name;
			angular.forEach(CITY, function (data) {
				if (data.CityID == id) {
					name = data.CityName;
				}
			});
			return name;
		}
	}
})
.filter('countyFilter', function (COUNTY) {//县
	return function (id) {
		if (id != undefined && id != '') {
			var name;
			angular.forEach(COUNTY, function (data) {
				if (data.Id == id) {
					name = data.countyName;
				}
			});
			return name;
		}
	}
})