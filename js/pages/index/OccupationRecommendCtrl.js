angular.module('skillApp')
    .controller('OccupationRecommendCtrl', ['$scope','positionService','commonUtil','$rootScope',OccupationRecommendCtrl]);
        function OccupationRecommendCtrl($scope, positionService, commonUtil,$rootScope) {
        var vm = this;

        vm.selectIndex = 0;
        // 初始化状态和推荐职位
        vm.status = 0;
        vm.occupation = 'css';
        // 数据-描述和推荐理由
        vm.description = [
            {
                description: '从未接触过编程，从其他行业转来，对IT一无所知',
                reason: '对于零基础，而又希望进入IT工程师行列的人，css最适合，毕竟css工程师是最容易上手的IT职业，并且现在整个市场也存在巨大的缺口。'
            }, {
                description: '接触过硬件设备，对软件了解不多',
                reason: '一般来说。从网管出身的话，转运维几乎是无缝的。网管的发展空间很容易受限，但是如果转做运维，就不一样了。两到三年的运维，薪水在12~20K之间。'
            }, {
                description: '基础知识牢固，思维敏捷已有一定的基础',
                reason: '对于科班出身的学霸来说，你拥有很好的基础，但是这并不意味着IT修真这条路就是一帆风顺。确切的说，毕业才算是真正修行的开始，所以，欢迎你挑战一些高难度的职业。'
            }
        ];

        // 职业推荐分数计算表
        // 1css 2js 3android 4ios 5java 6op 7pm 8ui  id需与后台数据对上号
        vm.score = [
            {
                option: [
                    {1: 10, 2: 10, 3: -50, 4: -50, 5: -100, 6: -50, 7: 30, 8: 50, name: '初中以下'},
                    {1: 20, 2: 20, 3: 0, 4: 0, 5: -50, 6: 10, 7: 30, 8: 50, name: '高中'},
                    {1: 30, 2: 30, 3: 30, 4: 30, 5: 30, 6: 30, 7: 30, 8: 30, name: '大专'},
                    {1: 30, 2: 30, 3: 40, 4: 40, 5: 40, 6: 40, 7: 40, 8: 40, name: '本科', select: true},
                    {1: 30, 2: 30, 3: 50, 4: 50, 5: 50, 6: 50, 7: 50, 8: 50, name: '硕士'},
                    {1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 50, 8: 50, name: '博士'}
                ],
                name: '学　　历：'
            },
            {
                option: [
                    {1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 50, 8: 50, name: '男', select: true},
                    {1: 50, 2: 50, 3: 30, 4: 30, 5: 10, 6: -30, 7: 50, 8: 50, name: '女'}
                ],
                name: '性　　别：'
            },
            {
                option: [
                    {1: 5, 2: 5, 3: 0, 4: 0, 5: -50, 6: 15, 7: 20, 8: 30, name: '18岁以下'},
                    {1: 20, 2: 20, 3: 20, 4: 20, 5: 20, 6: 20, 7: 20, 8: 20, name: '18~24岁'},
                    {1: 20, 2: 20, 3: 20, 4: 20, 5: 20, 6: 20, 7: 20, 8: 20, name: '25~30岁', select: true},
                    {1: 10, 2: 10, 3: 10, 4: 10, 5: 0, 6: 10, 7: 40, 8: 0, name: '30岁以上'}
                ],
                name: '年　　龄：'
            },
            {
                option: [
                    {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 10, 8: 20, name: '零基础', select: true},
                    {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 50, 8: 50, name: '绘画基础'},
                    {1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 50, 7: 0, 8: 0, name: '网络相关'},
                    {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 50, 8: 50, name: '原型设计'}
                ],
                name: '基　　础：'
            },
            {
                option: [
                    {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 10, 8: 20, name: '无专业'},
                    {1: 40, 2: 40, 3: 40, 4: 40, 5: 50, 6: 40, 7: 40, 8: 40, name: '计算机相关'},
                    {1: 30, 2: 30, 3: 35, 4: 35, 5: 40, 6: 30, 7: 30, 8: 30, name: '理工科', select: true},
                    {1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 50, 8: 50, name: '文科'}
                ],
                name: '专　　业：'
            },
            {
                option: [
                    {1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 50, 8: 50, name: '渣渣'},
                    {1: 30, 2: 30, 3: 30, 4: 30, 5: 30, 6: 30, 7: 30, 8: 30, name: '普通', select: true},
                    {1: 40, 2: 40, 3: 40, 4: 40, 5: 50, 6: 40, 7: 30, 8: 30, name: '卓越'}
                ],
                name: '逻　　辑：'
            }
        ];

        //数据求和
        vm.scoreCalculate = function () {
            var score = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
            angular.forEach(vm.score, function (items) {
                angular.forEach(items.option, function (item) {
                    if (item.select) {
                        for (var i = 1; i <= 8; i++) {
                            score[i] += item[i];
                        }
                    }
                });
            });
            return score;
        };
        //分数加入数据中
        vm.scoreBackData = function (sum) {
            angular.forEach(vm.data.occupations, function (items) {
                var id = items.id;
                items.score = sum[id];
            })
        };
        //选择选项
        vm.optionSelect = function (parentIndex, index) {
            vm.score[parentIndex].option.forEach(function (item) {
                item.select = false
            });
            vm.score[parentIndex].option[index].select = true;

            vm.sum = vm.scoreCalculate();
            vm.scoreBackData(vm.sum);
        };
        //选择推荐职业
        vm.select = function (index) {
            vm.selectIndex = index
        };

        // 数据-职业详细
        vm.promise = positionService.positionList();
        vm.promise.then(function (res) {
            if (res.data.code == 0) {
                vm.data = res.data.data;
                //salary str转json
                angular.forEach(vm.data.occupations, function (detail) {
                    if (detail.salary != "" && detail.salary != undefined)
                        detail.salary = angular.fromJson(detail.salary);
                });
                // default score
                vm.sum = vm.scoreCalculate();
                vm.scoreBackData(vm.sum);
            }else {
                $rootScope.alert(res.data.message);
            }
        });
    }
