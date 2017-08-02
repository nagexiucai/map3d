// 不符合ADM规范就不能直接通过require异步加载

option = {
    title: {
        text: '中 VS 印',
        subtext: '纸上谈莫当真'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'center',
        data: ['中国经济', '印度经济', '中国军事', '印度军事', '中国外交', '印度外交']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: false
            },
            dataView: {
                show: false,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    polar: [{
        indicator: [{
            text: '国民生产总值',
            max: 100
        }, {
            text: '国民生产均值',
            max: 100
        }, {
            text: '通货膨胀比率',
            max: 100
        }, {
            text: '外汇储备总量',
            max: 100
        }],
        center: ['25%', 200],
        radius: 80
    }, {
        indicator: [{
            text: '导弹',
            max: 100
        }, {
            text: '战机',
            max: 100
        }, {
            text: '舰船',
            max: 100
        }, {
            text: '潜艇',
            max: 100
        }, {
            text: '卫星',
            max: 100
        }],
        radius: 80
    }, {
        indicator: [{
            text: '美国',
            max: 100
        }, {
            text: '俄罗斯',
            max: 100
        }, {
            text: '日本',
            max: 100
        }, {
            text: '巴基斯坦',
            max: 100
        }, {
            text: '不丹',
            max: 100
        }, {
            text: '尼泊尔',
            max: 100
        }, {
            text: '孟加拉国',
            max: 100
        }, {
            text: '以色列',
            max: 100
        }],
        center: ['75%', 200],
        radius: 80
    }],
    series: [{
        type: 'radar',
        polarIndex: 0,
        tooltip: {
            trigger: 'item'
        },
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [{
            value: [60, 73, 85, 40],
            name: '中国经济'
        }, {
            value: [0, 0, 0, 0],
            name: '印度经济'
        }]
    }, {
        type: 'radar',
        polarIndex: 1,
        data: [{
            value: [85, 90, 90, 95, 95],
            name: '中国军事'
        }, {
            value: [95, 80, 95, 90, 93],
            name: '印度军事'
        }]
    }, {
        type: 'radar',
        polarIndex: 2,
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [{
            name: '中国外交',
            value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2]
        }, {
            name: '印度外交',
            value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2]
        }]
    }]
};