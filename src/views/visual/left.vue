<!--
 * @Author: your name
 * @Date: 2021-09-22 15:20:40
 * @LastEditTime: 2021-10-11 09:10:42
 * @LastEditors: XNY
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\visual\left.vue
-->
<template>
  <div class="__left">
    <FrostedGlass class="card one" title="资源概况">
      <div class="body">
        <div style="overflow: hidden">
          <div class="garden_title">
            <img src="../../assets/visual/zygk_icon_yl.png" alt style="margin-left: 10px" />
            <p>
              公园
              <span>24</span> 个
            </p>
          </div>
          <div class="garden_title">
            <img src="../../assets/visual/zygk_icon_lhd.png" alt style="margin-left: 10px" />
            <p>
              绿地
              <span>14</span> 个
            </p>
          </div>
          <div class="garden_title">
            <img src="../../assets/visual/zygk_icon_mmgs.png" alt style="margin-left: 30px" />
            <p>
              名木古树
              <span>452</span> 棵
            </p>
          </div>
        </div>
        <div class="garden_city">
          <p>
            城市绿化面积占比
            <span>64%</span>
          </p>
          <div class="progress_bar">
            <div :style="'width:' + progressWidth + '%'" />
          </div>
        </div>
        <div class="greenbelt">
          <div class="greenbelt_list">
            <img src="../../assets/visual/zygk_icon1.png" alt />
            <div>
              <p>绿化覆盖面积</p>
              <p>209.9km²</p>
            </div>
          </div>
          <div class="greenbelt_list">
            <img src="../../assets/visual/zygk_icon2.png" alt />
            <div>
              <p>规划绿地面积</p>
              <p>209.9km²</p>
            </div>
          </div>
        </div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="绿地检测">
      <div class="body">
        <div class="echarts_title">
          <span class="reach">未达标绿化</span>
          <span class="afforest">达标绿化</span>
          <span class="trees">古树名木</span>
        </div>
        <div id="brokenLine"></div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="园林达标率">
      <div class="body">
        <div id="histogram"></div>
      </div>
    </FrostedGlass>

    <FrostedGlass class="card" title="园林问题" style="margin-bottom: 0">
      <div class="body">
        <div id="pieChart"></div>
      </div>
    </FrostedGlass>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue'
import FrostedGlass from './frostedGlass.vue'
const progressWidth = '64'
import * as echarts from 'echarts'

onMounted(() => {
  line()
  bar()
  pie()
})

const line = () => {
  // console.log('echarts',echarts.init);
  var alaremDevice = echarts.init((document as any).getElementById('brokenLine'))
  let option = {
    color: ['#EC4D41', '#00EFCE', '#FCC848'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
        // lineStyle: {
        //   opacity: 1,
        //   color: '#FA3A4D'
        // }
      }
    },
    legend: {
      data: ['']
    },
    toolbox: {
      feature: {
        // saveAsImage: {},
      }
    },
    dataZoom: [
      {
        type: 'inside',
        realtime: true
      }
    ],
    grid: {
      top: '10%',
      left: '5%',
      right: '2%',
      bottom: '10%',
      containLabel: false
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#fff', //左边线的颜色
            width: '1' //坐标线的宽度
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff' //坐标值得具体的颜色
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            // width: 1,
            type: 'solid'
          }
        },
        axisLine: {
          lineStyle: {
            // color: '#455576'z
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff' //坐标值得具体的颜色
          }
        }
      }
    ],
    series: [
      {
        name: '未达标绿化',
        type: 'line',
        // areaStyle: {},
        smooth: true,
        data: [2, 3, 5, 4, 9, 5, 6, 1, 3, 5, 7, 6],
        itemStyle: {
          normal: {
            lineStyle: {
              width: 1
            }
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //     {
            //       offset: 1,
            //       color: 'rgba(250, 58, 77, 0.2)'
            //     },
            //     {
            //       offset: 0,
            //       color: 'rgba(250, 58, 77, 0)'
            //     }
            //   ])
            // }
          }
        }
      },
      {
        name: '达标绿化',
        type: 'line',
        // areaStyle: {},
        smooth: true,
        data: [10, 20, 10, 3, 50, 21, 11, 50, 56, 44, 10, 61],
        itemStyle: {
          normal: {
            lineStyle: {
              // color: '#00EFCE',
              //  borderColor:'#00EFCE',
              width: 1
            }
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //     {
            //       offset: 1,
            //       color: 'rgba(250, 58, 77, 0.2)'
            //     },
            //     {
            //       offset: 0,
            //       color: 'rgba(250, 58, 77, 0)'
            //     }
            //   ])
            // }
          }
        }
      },
      {
        name: '名木古树',
        type: 'line',
        // areaStyle: {},
        smooth: true,
        data: [5, 6, 4, 8, 3, 2, 1, 5, 6, 7, 3, 2],
        itemStyle: {
          normal: {
            lineStyle: {
              // color: '#FCC848',
              width: 1
            }
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //     {
            //       offset: 1,
            //       color: 'rgba(250, 58, 77, 0.2)'
            //     },
            //     {
            //       offset: 0,
            //       color: 'rgba(250, 58, 77, 0)'
            //     }
            //   ])
            // }
          }
        }
      }
    ]
  }
  alaremDevice.setOption(option)
  window.addEventListener('resize', () => {
    alaremDevice.resize()
  })
}
const bar = () => {
  const histogram = echarts.init((document as any).getElementById('histogram'))

  const yLabel = ['综合管理', '绿地建设', '建设管控', '生态环境', '市政设施', '节能减排', '综合否决项']
  const yData = [75, 51, 80, 34, 60, 42, 0]
  const zData = ['75%', '51%', '80%', '34%', '60%', '42%', '0%']
  const colorList = [
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(17, 242, 243, 0)'
      },
      {
        offset: 1,
        color: 'rgba(17, 242, 243, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(252, 200, 72, 0)'
      },
      {
        offset: 1,
        color: 'rgba(252, 200, 72, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(17, 242, 243, 0)'
      },
      {
        offset: 1,
        color: 'rgba(17, 242, 243, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(252, 200, 72, 0)'
      },
      {
        offset: 1,
        color: 'rgba(252, 200, 72, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(17, 242, 243, 0)'
      },
      {
        offset: 1,
        color: 'rgba(17, 242, 243, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(252, 200, 72, 0)'
      },
      {
        offset: 1,
        color: 'rgba(252, 200, 72, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: 'rgba(17, 242, 243, 0)'
      },
      {
        offset: 1,
        color: 'rgba(17, 242, 243, 1)'
      }
    ])
  ]
  let bgData = []
  for (let i in yData) {
    bgData.push(100)
  }
  const option = {
    grid: {
      top: '5%',
      left: '3%',
      right: '5%',
      bottom: '1%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: (params: any) => {
        console.log('params', params)

        return (
          params[0].name +
          '<br/>' +
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
          params[0].seriesName +
          ' : ' +
          params[0].value +
          '%' +
          ' <br/>'
        )
      }
    },
    // backgroundColor: 'rgb(20,28,52)',
    xAxis: {
      show: false,
      type: 'value'
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLabel: {
          show: true,
          margin: 15,
          textStyle: {
            color: '#00ECCB'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        data: yLabel
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: '12'
          }
        },
        data: zData
      }
    ],
    series: [
      {
        name: '达标',
        type: 'bar',
        zlevel: 1,

        itemStyle: {
          normal: {
            barBorderRadius: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(87,220,222,0.7)',
            color: (params: any) => {
              // console.log('params',params.dataIndex);
              return colorList[params.dataIndex]
            }
          }
        },
        barWidth: 10,
        data: yData
      },
      {
        name: '背景',
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        data: bgData,
        itemStyle: {
          normal: {
            color: '#1A5956',
            barBorderRadius: [0, 0, 0, 0]
          }
        }
      }
    ]
  }
  histogram.setOption(option)
  window.addEventListener('resize', () => {
    histogram.resize()
  })
}
const pie = () => {
  const pieChart = echarts.init((document as any).getElementById('pieChart'))
  const option = {
    color: ['#00EFCE', '#FCC848', '#0097D8', '#94CE1B', '#7248FF'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      textStyle: {
        fontSize: 15
      }
    },
    legend: {
      data: ['园林园区保洁不到位', '异味异色', '园林杂草', '违章种植', '破坏园林生态环境'],
      orient: 'vertical',
      icon: "circle",
      right: '5%',
      top: 'center',
      itemGap: 10,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 16
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        clockwise: false,
        startAngle: 90,
        radius: '80%',
        center: ['30%', '50%'],
        hoverAnimation: false,
        roseType: 'radius', //area

        data: [
          {
            value: 335,
            name: '园林园区保洁不到位'
          },
          {
            value: 310,
            name: '破坏园林生态环境'
          },
          {
            value: 234,
            name: '违章种植'
          },
          {
            value: 135,
            name: '园林杂草'
          },
          {
            value: 148,
            name: '异味异色'
          }
        ],
        itemStyle: {
          normal: {
            // borderColor: '#273454'
            // borderWidth: '5',
          }
        },
        label: {
          show: false,
          position: 'outside'
          // formatter: '{a|{b}：{d}%}\n{hr|}',
          // rich: {
          //     hr: {
          //         backgroundColor: 't',
          //         borderRadius: 100,
          //         width: 0,
          //         height: 10,
          //         padding: [3, 3, 0, -16],
          //         shadowColor: '#1c1b3a',
          //         shadowBlur: 1,
          //         shadowOffsetX: '0',
          //         shadowOffsetY: '2',
          //     },
          //     a: {
          //         padding: [-35, 15, -20, 5],
          //     }
          // }
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          }
        }
      }
    ]
  }
  pieChart.setOption(option)
  window.addEventListener('resize', () => {
    pieChart.resize()
  })
}
</script>

<style lang='scss' scoped>
.__left {
  .card {
    width: 440px;
    font-size: 14px;
    margin-bottom: 16px;
    position: relative;

    .body {
      color: #fff;
      .echarts_title {
        position: absolute;
        top: 28px;
        right: 0;
        span {
          margin-right: 20px;
        }
        .reach::before,
        .afforest::before,
        .trees::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .reach::before {
          background-color: #ec4d41;
        }
        .afforest::before {
          background-color: #00efce;
        }
        .trees::before {
          background-color: #fcc848;
        }
      }
    }
  }
  .one {
    // height: 20vh;
    .garden_title {
      float: left;
      width: 33.33%;
      // text-align: center;
      img {
        width: 58px;
        height: 58px;
      }
      p {
        margin: 0;
        font-size: 14px;
        color: #00eccb;
        span {
          color: #fff;
          font-size: 24px;
        }
      }
    }
    .garden_city {
      color: #fcc848;

      p {
        margin: 15px 0;
        span {
          font-size: 24px;
        }
      }
    }
    .progress_bar {
      width: 100%;
      height: 15px;
      background-color: #1a5956;
      div {
        height: 100%;
        background: linear-gradient(
          270deg,
          #fcc848 0%,
          rgba(252, 200, 72, 0) 100%
        );
      }
    }
    .greenbelt {
      display: flex;
      .greenbelt_list {
        flex: 1;
        display: flex;
        margin-top: 15px;
        align-items: center;
        img {
          width: 38px;
          height: 38px;
        }
        div {
          margin-left: 10px;
          p {
            margin: 0;
            color: #00eccb;
          }
          :nth-child(2) {
            color: #ffffff;
            font-size: 24px;
          }
          // float: left;
        }
      }
    }
  }
}
/** echarts 样式*/
#brokenLine,
#histogram,
#pieChart {
  width: 100%;
  height: 224px;
}
</style>