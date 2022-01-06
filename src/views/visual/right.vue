<!--
 * @Author: Lw
 * @Date: 2021-09-22 15:20:40
 * @LastEditTime: 2021-09-30 15:20:57
 * @LastEditors: Lw
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\visual\right.vue
-->
<template>
  <div class="__right">
    <FrostedGlass class="card" title="巡检概况" style="height: 160px;">
      <div class="body">
        <div class="col">
          <span class="num">356</span>
          <span class="num">121</span>
          <span class="num">21</span>
        </div>
        <div class="col">
          <span class="text">巡检面积（k㎡）</span>
          <span class="text">巡查问题量</span>
          <span class="text">巡检人数</span>
        </div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="养护情况">
      <div class="body">
        <div id="__echart"></div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="重点监控">
      <div class="body">
        <img :src="require('@/assets/image/zdjk_img_video.png')" />
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="事件动态" style="margin-bottom: 0">
      <div class="body">
        <div class="col">
          <div class="window">
            <div>
              <strong style="line-height: 25px;">11</strong>
            </div>
            <div style="color: #00ECCB;">树木倾倒</div>
          </div>
          <div class="window">
            <div>
              <strong style="line-height: 25px;">11</strong>
            </div>
            <div style="color: #00ECCB;">巡查上报</div>
          </div>
        </div>
        <div class="col" style="margin-bottom: 0px;">
          <table class="table" border="0" cellspacing="0" cellpadding="0">
            <!-- <thead>
                <tr>
                  <th
                    v-for="(item, index) in tableOption.head"
                    :key="index"
                    class="th"
                    style="height: 30px"
                    :style="{ minWidth: item.width }"
                  >{{ item.label }}</th>
                </tr>
            </thead>-->
            <tbody>
              <tr
                v-for="(row, index) in tableOption.body"
                :key="index"
                :style="{ background: Number(index) % 2 == 0 ? 'rgba(5, 90, 84, 0.5)' : 'transparent' }"
              >
                <td
                  v-for="(_item, _index) in tableOption.head"
                  :key="_index"
                  class="td"
                  style="height: 30px"
                >{{ row[_item.key] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FrostedGlass>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import FrostedGlass from './frostedGlass.vue'
import * as echarts from 'echarts'

const tableOption = {
  head: [
    { label: '时间', key: 'time', width: '100px' },
    { label: '事件', key: 'event', width: '100px' },
  ],
  body: [
    { time: '12:09', event: '森林公园122号法桐：发生了倾倒' },
    { time: '1天前', event: '【巡】张三上报问题：树木长势不良' },
    { time: '2天前', event: '【巡】张三上报问题：发生病虫害' },
    { time: '12天前', event: '中原路槐树：发生了异常倾倒' },
  ],
}
const bar = () => {
  const chart = echarts.init((document as any).getElementById('__echart'))

  const yLabel = ['树木补种', '花卉租放', '杀虫打药', '树木移植', '其他']
  const yData = [75, 51, 80, 34, 60]
  const zData = ['75%', '51%', '80%', '34%', '60%']
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
  chart.setOption(option)
  window.addEventListener('resize', () => {
    chart.resize()
  })
}
onMounted(() => {
  bar()
})
</script>

<style lang='scss' scoped>
.__right {
  .card {
    width: 440px;
    font-size: 14px;
    margin-bottom: 16px;
    .body {
      color: #fff;
      #__echart {
        width: 100%;
        height: 14vh;
      }
      .col {
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        align-items: center;
        margin-bottom: 16px;
        .num {
          flex: 1;
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
        }
        .text {
          flex: 1;
          text-align: center;
          font-size: 14px;
          color: #00eccb;
        }
        .window {
          width: 198px;
          height: 48px;
          background: rgba(5, 90, 84, 0.5);
          text-align: center;
        }
        .table {
          width: 100%;
          td {
            padding: 8px 16px;
          }
        }
      }
    }
  }
}
</style>