var echarts = require("echarts")
import myMap from "../js/myMap.js"
export default {
    data() {
        return {
            showTime: new Date()
        }
    },
    created() {
    },
    mounted() {
        this.timer = setInterval(() => {
            this.showTime = new Date() // 修改数据date
        }, 1000)
        this.barChart();
        this.barChart2();
        this.lineChart()
        this.lineChart2();
        this.pieChart();
        this.pieChart2();
        this.myMap();
    },
    methods: {
        barChart() {
            var myChart = echarts.init(document.querySelector(".bar .chart"))
            var option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0',
                    top: '10px',
                    right: '0%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ["旅游行业", "教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业"],
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "12px"
                        },
                        axisLine: {
                            show: true
                        }

                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "12px"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '35%',
                        data: [200, 300, 300, 900, 1500, 1200, 600],
                        itemStyle: {
                            barBorderRadius: 5
                        }
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.resize()
            })
        },
        barChart2() {
            var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
            var myChart = echarts.init(document.querySelector('.bar2 .chart'))
            var option = {
                grid: {
                    top: "10%",
                    left: "22%",
                    bottom: "10%",
                },
                xAxis: {
                    show: false
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
                        axisLine: {//y轴线条不显示
                            show: false
                        },
                        axisTick: {//y轴刻度不显示
                            show: false
                        },
                        axisLabel: {
                            color: "#fff"
                        }
                    },
                    {
                        show: true,
                        inverse: true,
                        data: [702, 350, 610, 793, 664],
                        // 不显示y轴的线
                        axisLine: {
                            show: false
                        },
                        // 不显示刻度
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 12,
                                color: "#fff"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "条",
                        type: "bar",
                        data: [70, 34, 60, 78, 69],
                        yAxisIndex: 0,
                        // 柱子之间的距离
                        barCategoryGap: 50,
                        //柱子的宽度
                        barWidth: 10,
                        // 修改第一组柱子的圆角
                        itemStyle: {
                            barBorderRadius: 20,
                            color: function (params) {
                                return myColor[params.dataIndex]
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                color: "#fff",
                                // 图形内显示
                                position: "inside",
                                // 文字的显示格式
                                formatter: "{c}%"
                            }
                        },
                    },
                    {
                        name: "框",
                        type: "bar",
                        barCategoryGap: 50,
                        barWidth: 15,
                        yAxisIndex: 1,
                        data: [100, 100, 100, 100, 100],
                        itemStyle: {
                            color: "none",
                            borderColor: "#00c1de",
                            borderWidth: 3,
                            barBorderRadius: 15
                        },
                    },
                ]
            };

            myChart.setOption(option)
        },
        lineChart() {
            var yearData = [
                {
                    year: "2020", // 年份
                    data: [
                        // 两个数组是因为有两条线
                        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
                    ]
                },
                {
                    year: "2021", // 年份
                    data: [
                        // 两个数组是因为有两条线
                        [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                        [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
                    ]
                }
            ];
            // 1. 实例化对象
            var myChart = echarts.init(document.querySelector(".line .chart"));
            // 2.指定配置
            var option = {
                // 通过这个color修改两条线的颜色
                color: ["#00f2f1", "#ed3f35"],
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    // 如果series 对象有name 值，则 legend可以不用写data
                    // 修改图例组件 文字颜色
                    textStyle: {
                        color: "#4c9bfd"
                    },
                    right: "10%"
                },
                grid: {
                    top: "20%",
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    show: true, // 显示边框
                    borderColor: "#012f4a", // 边框颜色
                    containLabel: true // 包含刻度文字在内
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "1月",
                        "2月",
                        "3月",
                        "4月",
                        "5月",
                        "6月",
                        "7月",
                        "8月",
                        "9月",
                        "10月",
                        "11月",
                        "12月"
                    ],
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        color: "#4c9bfd" // 文本颜色
                    },
                    axisLine: {
                        show: false // 去除轴线
                    }
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        color: "#4c9bfd" // 文本颜色
                    },
                    axisLine: {
                        show: false // 去除轴线
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#012f4a" // 分割线颜色
                        }
                    }
                },
                series: [
                    {
                        name: "新增粉丝",
                        type: "line",
                        // true 可以让我们的折线显示带有弧度
                        smooth: true,
                        data: yearData[0].data[0]
                    },
                    {
                        name: "新增游客",
                        type: "line",
                        smooth: true,
                        data: yearData[0].data[1]
                    }
                ]
            };

            // 3. 把配置给实例对象
            myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });

            // 5.点击切换效果
            for (let i = 0; i < document.querySelectorAll(".line h2 a").length; i++) {
                document.querySelectorAll(".line h2 a")[i].addEventListener("click", function (e) {
                    var obj = yearData[i];
                    option.series[0].data = obj.data[0];
                    option.series[1].data = obj.data[1];
                    myChart.setOption(option);
                })
            }
        },
        lineChart2() {
            var myChart = echarts.init(document.querySelector(".line2 .chart"));
            // 2.指定配置
            var option = {
                // 通过这个color修改两条线的颜色
                color: ["#00f2f1", "#ed3f35"],
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    top: "0%",
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12"
                    }
                },
                grid: {
                    left: "10",
                    top: "30",
                    right: "10",
                    bottom: "10",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12
                        }
                    },
                    // x轴线的颜色为   rgba(255,255,255,.2)
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.2)"
                        }
                    },
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12
                        }
                    },
                    // 修改分割线的颜色
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    }
                },
                series: [
                    {
                        name: '点击量',
                        data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
                        type: 'line',
                        //第一条 线是圆滑
                        smooth: true,
                        // 单独修改线的样式
                        lineStyle: {
                            color: "#0184d5",
                            width: 2
                        },
                        // 填充区域
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(1, 132, 213, 0.8)"   // 渐变色的起始颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: "rgba(1, 132, 213, 0.4)"   // 渐变线的结束颜色
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.6)"
                        },
                        // 设置拐点 小圆点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 8,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "#0184d5",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12
                        },
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: false,
                    },
                    {
                        data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
                        name: "转发量",
                        type: "line",
                        smooth: true,
                        lineStyle: {
                            normal: {
                                color: "#00d887",
                                width: 2
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(0, 216, 135, 0.7)"
                                        },
                                        {
                                            offset: 0.8,
                                            color: "rgba(0, 216, 135, 0.3)"
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: "rgba(0, 0, 0, 0.1)"
                            }
                        },
                        // 设置拐点 小圆点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 5,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "#00d887",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12
                        },
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: false,
                    }
                ]
            };

            // 3. 把配置给实例对象
            myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        pieChart() {
            let myChart = echarts.init(document.querySelector(".pie .chart"))
            let option = {
                color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    right: 0,
                    top: 'bottom',
                    itemWidth: 10,
                    itemHeight: 10,
                    
                    orient: 'vertical',
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: 12,
                    },
                },
                series: [
                    {
                        name: '年龄分布',
                        type: 'pie',
                        center: ["50%", "50%"],
                        radius: ['40%', '80%'],
                        avoidLabelOverlap: true,
                        label: {
                            show: false,
                        },
                        labelLine: { show: false },
                        data: [
                            { value: 10, name: "0岁以下" },
                            { value: 40, name: "20-29岁" },
                            { value: 20, name: "30-39岁" },
                            { value: 20, name: "40-49岁" },
                            { value: 10, name: "50岁以上" }
                        ],
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener("resize", function () {
                myChart.resize();
            })
        },
        pieChart2() {
            let myChart = echarts.init(document.querySelector(".pie2 .chart"))
            let option = {
                color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    right: 0,
                    top: 'bottom',
                    itemWidth: 10,
                    itemHeight: 10,
                    
                    orient: 'vertical',
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: 12,
                    },
                },
                toolbox: {
                    show: true
                },
                series: [
                    {
                        name: '地区分布',
                        type: 'pie',
                        radius: ['20%', '80%'],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        label: {
                            fontSize: 10,
                            color:"#fff"
                        },
                        // labelLine:{
                        //     length:1,
                        //     length2:8
                        // },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: [
                            { value: 20, name: '云南' },
                            { value: 26, name: '北京' },
                            { value: 24, name: '山东' },
                            { value: 25, name: '河北' },
                            { value: 20, name: '江苏' },
                            { value: 25, name: '浙江' },
                            { value: 30, name: '四川' },
                            { value: 42, name: '湖北' }
                        ]
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () {
                myChart.setOption(option)
            })
        },
        myMap

    },
    computed: {}
}