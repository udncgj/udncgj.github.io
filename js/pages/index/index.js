//index.js
//获取应用实例
var app = getApp();
var listIndex= [0,0,0,0,0,0];
var allMes;
Page({
    data: {
	  array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    /* array: ['css','js','android','ios','java','op','pm','ui','QA'],
    objectArray: [
      {id:1,name:'css'},
      {id:2,name:'js'},
      {id:3,name:'android'},
      {id:4,name:'ios'},
      {id:5,name:'java'},
      {id:6,name:'op'},
      {id:7,name:'pm'},
      {id:8,name:'ui'},
      {id:9,name:'QA'}
    ], */
	allMes:[
	  {name:'学  历：',ind:0,message:['初中以下','高中','大专','本科','硕士','博士']},
	  {name:'性  别：',ind:0,message:['男','女']},
	  {name:'年  龄：',ind:0,message:['18岁以下','18~24岁','25~30岁','30岁以上']},
	  {name:'基  础：',ind:0,message:['零基础','绘画基础','网络相关','原型设计']},
	  {name:'专  业：',ind:0,message:['无专业','计算机相关','理工科','文科']},
	  {name:'逻  辑：',ind:0,message:['渣渣','普通','卓越']}
	], 
	listIndex : listIndex/* ,
	eduMes:['初中以下','高中','大专','本科','硕士','博士'],
	genMes:['男','女'],
	ageMes:['18岁以下','18~24岁','25~30岁','30岁以上'],
	founMes:['零基础','绘画基础','网络相关','原型设计'],
	speMes:['无专业','计算机相关','理工科','文科'],
	logicMes:['渣渣','普通','卓越'],
 	eduIndex:0,
	genIndex:0,
	ageIndex:0,
	founIndex:0,
	speIndex:0,
	logicIndex:0 */
  },
  //事件处理函数
  mesChange:function(e){
    console.log(e);	 
	var i = e.target.dataset.pindex;//获取特殊的初始值,在html中以data-pindex传入其中
	
	listIndex[i] = e.detail.value;//选择的时候改变数组中对应的值
    this.setData({
        listIndex : listIndex   //每个改变的时候都会改变响应的数据
    })
    console.log(listIndex);     //打印看一下数组
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
	var i = listIndex[0]+listIndex[1]+listIndex[2]+listIndex[3]+listIndex[4]+listIndex[5];
	console.log(i)
	wx.request({
		url:"data.php",
		method:"GET",
		header: {'content-type': 'application/json'},
		success:function(res){
			console.log(res.data)
		},
		fail:function(){console.log('false')}
	})
  },
  onLoad: function () {
    console.log('onLoad')
  }
})