angular.module('myApp')

//后台操作
.controller('accountNum',function($location,$scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
    $scope.clear = function(){
        $scope.data = {
            page:1,
            size:10,
            status:'',//若status与roleID都为null,则返回所有用户
            roleID:''
        }
    }
    $scope.clear();
    $scope.clearSave = function(){
        $scope.saveData = { 
            manager:{
                id:'',
                name:'',
                mobile:'',
                pwd:'',
                newPwd:'',
                roleID:''
            }
        }
    }
    $scope.clearSave();
    //$scope.dataList = [1,2,3,4,5,6,7,8,9,10];
    //搜索
	$scope.searchGo = function(){
		console.log($scope.data);
        var link = $scope.data.roleID != ''?'role/'+$scope.data.roleID:'';
        console.log('link',link);
		myFac.http('get','/carrots-admin-ajax/a/u/'+link+'/manager/',{page:$scope.data.page,size:$scope.data.size}).then(function(res){
			
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
			$scope.allPage = Math.ceil(res.data.total/res.data.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = $scope.data.page;
            
            
            myFac.http('get','/carrots-admin-ajax/a/u/multi/manager?'+s).then(function(data){
                //$scope.showData = res.data.ids;
                //console.log('data',data);
                $scope.showData = data.data.managerList;
                console.log($scope.showData);
                $scope.roleList = val.roleList;
                console.log('$scope.roleList',$scope.roleList);
            });
		});
	}
    $scope.searchGo();
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			//console.log(num);
			$scope.data.page = num;
			$scope.searchGo();
		}
	}
    //操作
	$scope.operate = function(str,data){
		$scope.string = str;
        $scope.dataSet = data;
		switch($scope.string){
			case 'new'://编辑页跳转
                $scope.dataSet = '';
				$state.go('accountNum.set');
				break;
			case 'id'://编辑页跳转
				$state.go('accountNum.set');
				break;
			case 'del'://删除
				$('#accModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		switch($scope.string){
			case 'del'://删除
                console.log($scope.dataSet);
				myFac.http('Delete','/carrots-admin-ajax/a/u/manager/'+$scope.dataSet.id).then(function(res){
                    console.log('del',res);
                    $scope.searchGo();
                });
				break;
			default:
				break;
		}
	}
    //确认
    $scope.save = function(){
        console.log($scope.saveData.manager);
        console.log($scope.saveData);
        if($scope.saveData.manager.id == 0){
            console.log('新增');
			myFac.http('Post','/carrots-admin-ajax/a/u/manager',$scope.saveData.manager).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                //history.go(-1);
                //$state.go('job');
                $scope.clearSave();
			});
		}else{
            console.log('编辑');
			myFac.http('put','/carrots-admin-ajax/a/u/manager/'+$scope.saveData.manager.id,$scope.saveData.manager).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                //$state.go('job');
                $scope.clearSave();
			});
		}
    }
    $scope.cancel = function(){
        window.history.back();
        $scope.clearSave();
    }
})
.controller('role',function($timeout,$location,$scope,con,val,PROVINCE,CITY,COUNTY,myFac,$state){
    var vm = this;
    $scope.clear = function(){
        $scope.data = {
            page:1,
            size:10
        }
    }
    $scope.clear();
    $scope.clearSave = function(){
        $scope.saveData = { 
            role:{
                id:'',
                name:'',
                permissionsSet:{}
            }
        }
    }
    $scope.clearSave();
    //权限列表
/*     myFac.http('get','/carrots-admin-ajax/a/u/module/',{page:1,size:100}).then(function(res){
			
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
        myFac.http('get','/carrots-admin-ajax/a/u/multi/module?'+s).then(function(data){
            $scope.moduleList = data.data.moduleList;
            for(var i in $scope.moduleList){
                //console.log($scope.moduleList[i].parentID,$scope.moduleList[i].id);
                if($scope.moduleList[i].parentID == 0 || $scope.moduleList[i].parentID == ''){
                    $scope.setList.push({parent:$scope.moduleList[i],list:[]});
                    //$scope.moduleList.splice(i,1);
                }
            }
            //console.log($scope.setList,$scope.moduleList);
            for(var i in $scope.moduleList){
                var id = $scope.moduleList[i].parentID;
                $scope.permission.push({$scope.moduleList[i].id:[]});
                //console.log(id);
                for(var j in $scope.setList){
                    if($scope.setList[j].parent.id == id){
                        $scope.setList[j].list.push($scope.moduleList[i]);
                    }
                }
            }
            console.log($scope.setList,$scope.saveData.role.permissionsSet);
        });
    }); */
    //$scope.roleList = con.role;
    //搜索
	$scope.searchGo = function(){
		console.log($scope.data);
        //var link = $scope.data.roleID != ''?'role/'+$scope.data.roleID:'';
        //console.log('link',link);
		myFac.http('get','/carrots-admin-ajax/a/u/role/',{page:$scope.data.page,size:$scope.data.size}).then(function(res){
			
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
			//分页
			$scope.allPage = Math.ceil(res.data.total/res.data.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = $scope.data.page;
            
            
            myFac.http('get','/carrots-admin-ajax/a/u/multi/role?'+s).then(function(data){
                //$scope.showData = res.data.ids;
                //console.log('data',data);
                $scope.showData = data.data.roleList;
                console.log($scope.showData);
            });
		});
	}
    $scope.searchGo();
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			//console.log(num);
			$scope.data.page = num;
			$scope.searchGo();
		}
	}
    //操作
	$scope.operate = function(str,data){
		$scope.string = str;
        $scope.dataSet = data;
        $scope.clearSave();
		switch($scope.string){
			case 'new'://编辑页跳转
                $scope.dataSet = '';
				$state.go('role.set');
				break;
			case 'id'://编辑页跳转
				$state.go('role.set');
				break;
			case 'del'://删除
				$('#roleModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		switch($scope.string){
			case 'del'://删除
                console.log($scope.dataSet);
				myFac.http('Delete','/carrots-admin-ajax/a/u/role/'+$scope.dataSet.id).then(function(res){
                    console.log('del',res);
                    $scope.searchGo();
                });
				break;
			default:
				break;
		}
	}
    //
    //$scope.setList = $scope.setList;
    $scope.checkChange = function(str,bool,num,num2,data){
        console.log(str,bool,num,num2,data);
        switch(str){
            case 'list':
                /* if((function(){
                    var b = false;
                    for(var i in bool){
                        b = bool[i] == true?true:b;
                    }
                    return b;
                })()){
                    vm.setList[num2].list[num].state = true;
                    vm.setList[num2].state = true;
                    $scope.checkAll = true;
                } */
                break;
            case 'child':
                if(bool == true){
                    //$scope.checkAll = true;
                    //vm.setList[num].state = true;
                    $scope.saveData.role.permissionsSet[data.id] = [true,true,true,true];
                }else{
                    $scope.saveData.role.permissionsSet[data.id] = [false,false,false,false];
                }
                break;
            case 'parent':
                if(bool == true){
                    for(var j in vm.setList[num].list){
                        vm.setList[num].list[j].state = true;
                        $scope.saveData.role.permissionsSet[vm.setList[num].list[j].id] = [true,true,true,true];
                    }
                }else{
                    for(var j in vm.setList[num].list){
                        vm.setList[num].list[j].state = false;
                        $scope.saveData.role.permissionsSet[vm.setList[num].list[j].id] = [false,false,false,false];
                    }
                }
                break;
            case 'all':
                if(bool == true){
                    for(var i in vm.setList){
                        vm.setList[i].state = true;
                        for(var j in vm.setList[i].list){
                            vm.setList[i].list[j].state = true;
                            $scope.saveData.role.permissionsSet[vm.setList[i].list[j].id] = [true,true,true,true];
                        }
                    }
                }else{
                    for(var i in vm.setList){
                        vm.setList[i].state = false;
                        for(var j in vm.setList[i].list){
                            vm.setList[i].list[j].state = false;
                            $scope.saveData.role.permissionsSet[vm.setList[i].list[j].id] = [false,false,false,false];
                        }
                    }
                    
                }
                break;
			default:
				break;
        }
    }
    //确认
    $scope.save = function(){
        //console.log($scope.saveData.role.permissionsSet);
        for(var i in $scope.saveData.role.permissionsSet){
            var arr = $scope.saveData.role.permissionsSet[i];
            //console.log(i,arr);
            var state = [];
            for(var j in arr){
                //console.log(arr[j]);
                console.log(i,arr,arr[j],j);
                if(arr[j] == true){
                    switch(j){
                        case '0':
                            state.push('create');
                            break;
                        case '1':
                            state.push('update');
                            break;
                        case '2':
                            state.push('delete');
                            break;
                        case '3':
                            if(state.length == 0)arr = [];
                            break;
                        default:
                            break;
                    }
                }
            }
            if(state.length>0){state.push('sort');console.log(arr,'add');}
            $scope.saveData.role.permissionsSet[i] = state;
        }
        console.log($scope.saveData.role);
        console.log($scope.saveData);
        if($scope.saveData.role.id == 0){
            console.log('新增');
			myFac.http('Post','/carrots-admin-ajax/a/u/role',{},$scope.saveData.role).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                $scope.clearSave();
			});
		}else{
            console.log('编辑');
			myFac.http('put','/carrots-admin-ajax/a/u/role/'+$scope.saveData.role.id,{},$scope.saveData.role).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                $scope.clearSave();
			});
		}
    }
    $scope.cancel = function(){
        window.history.back();
        $scope.clearSave();
    }
})
.controller('password',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
	$scope.clear = function(){
        $scope.data = {
            oldPwd:'',
            newPwd:'',
            newPwdAgain:''
        }
    }
    $scope.clear();
    
    $scope.save = function(){
        console.log('linkdata',$scope.data);
        myFac.http('Put','/carrots-admin-ajax/a/u/pwd',$scope.data).then(function(res){
            console.log(res);
            $scope.mes = res.message;
            $('#pwdModal').modal('show');
            
            if($scope.mes == 'success')$scope.clear();
        });
    }
})
.controller('module',function($location,$scope,con,PROVINCE,CITY,COUNTY,myFac,$state){
    $scope.clear = function(){
        $scope.data = {
            page:1,
            size:10,
            type:''
        }
    }
    $scope.clear();
    $scope.clearSave = function(){
        $scope.saveData = { 
            manager:{
                id:'',
                name:'',
                menuID:'',
                url:'',
                parentID:'',
                type:''
            }
        }
    }
    $scope.clearSave();
    
    $scope.roleList = con.role;
    //搜索
	$scope.searchGo = function(){
		console.log($scope.data);
        //var link = $scope.data.roleID != ''?'role/'+$scope.data.roleID:'';
        //console.log('link',link);
		myFac.http('get','/carrots-admin-ajax/a/u/module/',{page:$scope.data.page,size:$scope.data.size}).then(function(res){
			
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
            console.log('s',s);
			//分页
			$scope.allPage = Math.ceil(res.data.total/res.data.size);
			var page = $scope.allPage;
			$scope.page = new Array(page);
			for(var i=0; i<page; i++){$scope.page[i] = {'page':i+1};}
			$scope.pageNum = $scope.data.page;
            
            
            myFac.http('get','/carrots-admin-ajax/a/u/multi/module?'+s).then(function(data){
                //$scope.showData = res.data.ids;
                //console.log('data',data);
                $scope.showData = data.data.moduleList;
                console.log($scope.showData);
            });
		});
	}
    $scope.searchGo();
	//页面切换
	$scope.loadPage = function(num){
		if(num>0 && num<=$scope.allPage && num != $scope.pageNum){
			//console.log(num);
			$scope.data.page = num;
			$scope.searchGo();
		}
	}
    //操作
	$scope.operate = function(str,data){
		$scope.string = str;
        $scope.dataSet = data;
		switch($scope.string){
			case 'new'://编辑页跳转
                $scope.dataSet = '';
				$state.go('module.set');
				break;
			case 'id'://编辑页跳转
				$state.go('module.set');
				break;
			case 'del'://删除
				$('#accModal').modal('show');
				break;
			default:
				break;
		}
	}
	//确认操作
	$scope.operateOk = function(){
		switch($scope.string){
			case 'del'://删除
                console.log($scope.dataSet);
				myFac.http('Delete','/carrots-admin-ajax/a/u/module/'+$scope.dataSet.id).then(function(res){
                    console.log('del',res);
                    $scope.searchGo();
                });
				break;
			default:
				break;
		}
	}
    //确认
    $scope.save = function(){
        console.log($scope.saveData.manager);
        console.log($scope.saveData);
        if($scope.saveData.manager.id == 0){
            console.log('新增');
			myFac.http('Post','/carrots-admin-ajax/a/u/module',$scope.saveData.manager).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                $scope.clearSave();
			});
		}else{
            console.log('编辑');
			myFac.http('put','/carrots-admin-ajax/a/u/module/'+$scope.saveData.manager.id,$scope.saveData.manager).then(function(res){
				console.log(res);
                window.history.back();
                $scope.searchGo();
                $scope.clearSave();
			});
		}
    }
    $scope.cancel = function(){
        window.history.back();
        $scope.clearSave();
    }
})