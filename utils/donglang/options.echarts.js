// 不符合ADM规范就不能直接通过require异步加载

_toolboxConfiguration = {
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
};

optionEconomy = {
    title: {
        text: '中VS印',
        subtext: '经济'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'center',
        data: ['中国经济', '印度经济']
    },
    toolbox: _toolboxConfiguration,
    calculable: true,
    polar: [{
        indicator: [{
            text: '国产总值', // 万亿美元
            max: 15
        }, {
            text: '国产均值', // 万美元
            max: 2
        }, {
            text: '通胀比率',
            max: 10
        }, {
            text: '外汇储备', // 万亿美元
            max: 10
        }],
        // center: ['25%', 200], // 设置雷达轴位置
        radius: 80
    }],
    series: [{
        type: 'radar',
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
            value: [13.3, 1.2, 8.5, 10],
            name: '中国经济'
        }, {
            value: [4.5, 0.45, 9.5, 1],
            name: '印度经济'
        }]
    }]
};

optionMilitary = {
    title: {
        text: '中VS印',
        subtext: '军事'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'center',
        data: ['中国军事', '印度军事']
    },
    toolbox: _toolboxConfiguration,
    calculable: true,
    polar: [{
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
    }],
    series: [{
        type: 'radar',
        data: [{
            value: [85, 85, 85, 85, 85],
            name: '中国军事'
        }, {
            value: [75, 80, 80, 75, 70],
            name: '印度军事'
        }]
    }]
};

optionDiplomacy = {
    title: {
        text: '中VS印',
        subtext: '外交'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'center',
        data: ['中国外交', '印度外交']
    },
    toolbox: _toolboxConfiguration,
    calculable: true,
    polar: [{
        indicator: [{
            text: '美国',
            max: 10
        }, {
            text: '俄罗斯',
            max: 10
        }, {
            text: '日本',
            max: 10
        }, {
            text: '巴基斯坦',
            max: 10
        }, {
            text: '不丹',
            max: 10
        }, {
            text: '尼泊尔',
            max: 10
        }, {
            text: '孟加拉国',
            max: 10
        }, {
            text: '以色列',
            max: 10
        }],
        // center: ['75%', 200],
        radius: 80
    }],
    series: [{
        type: 'radar',
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [{
            name: '中国外交',
            value: [4.8, 6.3, 3.7, 9.5, 4.9, 7.2, 6.0, 5.5]
        }, {
            name: '印度外交',
            value: [5.5, 5.5, 6.5, 1.5, 7.8, 6.5, 6.9, 5.6]
        }]
    }]
};

optionEquipment = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['中方', '印方']
    },
    toolbox: {
        show: true,
        feature: _toolboxConfiguration
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        data: ['导弹', '战机', '舰船', '潜艇', '卫星']
    }],
    yAxis: [{
        type: 'value',
        splitArea: {
            show: true
        }
    }],
    series: [{
        name: '中方',
        type: 'bar',
        data: [7.5, 7.5, 5.8, 7, 9]
    }, {
        name: '印方',
        type: 'bar',
        data: [5.5, 6.8, 6.5, 5, 5]
    }]
};

optionMap = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}'
    },
    series: [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        selectedMode: 'multiple',
        itemStyle: {
            normal: {
                label: {
                    show: true
                }
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        data: [{
            name: '西藏',
            selected: true
        },
        {
            name: '南海诸岛',
            selected: true
        }]
    }]
};