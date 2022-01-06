<!--
 * @Author: your name
 * @Date: 2021-09-22 10:31:21
 * @LastEditTime: 2021-10-11 14:45:44
 * @LastEditors: Lw
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\monitor\air\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @change="formChange" @callback="search">
      <el-form-item
        :label="dataMap.formData.dateType === 'real-time' ? '时段' : '日期'"
        prop="dateRange"
        size="small"
        style="margin-right: 20px"
      >
        <el-date-picker
          v-if="dataMap.formData.dateType === 'real-time' || dataMap.formData.dateType === 'day'"
          v-model="dataMap.formData.date"
          type="date"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          clearable
          style="width: 140px; margin-right: 6px;"
        />
        <el-time-picker
          v-if="dataMap.formData.dateType === 'real-time'"
          is-range
          v-model="dataMap.formData.dateRange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :clearable="true"
          style="width: 210px"
        />
        <el-date-picker
          v-if="dataMap.formData.dateType !== 'real-time' && dataMap.formData.dateType !== 'day'"
          v-model="dataMap.formData.dateRange"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD HH:mm:ss"
          :clearable="true"
          style="width: 360px"
        />
      </el-form-item>
    </XForm>

    <el-row :gutter="20">
      <el-col :span="8">
        <XTable
          height="70vh"
          :loading="dataMap.loading"
          :options="tableOptions"
          :data="dataMap.tableData"
        >
          <template #before>
            <el-table-column type="expand">
              <template #default="props">
                <el-row>
                  <el-col
                    v-for="(code, index) in Object.keys(props.row).filter(key => key !== 'collectTime' && props.row[key])"
                    :key="index"
                    :span="12"
                  >
                    <big>{{ expandFilter(props.row, code) }}</big>
                    <el-button
                      style="margin-left: 6px; font-size: 16px;"
                      type="text"
                      icon="el-icon-location"
                      @click="showMap(props.row, code)"
                    />
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </template>
        </XTable>
      </el-col>
      <el-col :span="16">
        <el-card style="margin: 20px 0" shadow="hover">
          <template #header>
            <div>
              <small>
                <strong style="color: #606266">历史趋势</strong>
              </small>
            </div>
          </template>
          <div id="__echart" ref="echart" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="监测地址"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      v-model="dataMap.mapVisible"
      @close="() => {
        dataMap.mapVisible = false
      }"
    >
      <div id="__map" />
      <div class="marker-info">
        <div class="marker-info__content">
          <span>{{ dataMap.markerInfo }}</span>
        </div>
      </div>
    </el-dialog>
  </BasicContainer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, toRaw } from 'vue'
import { XForm, XTable } from '@/components'
import { getAll as getFactor } from '@/apis/monitor/factor'
import { getAllDay, getAllHour, getAllMinute } from '@/apis/monitor/history'
import { getById as getDevice } from '@/apis/monitor/device'
import * as echarts from 'echarts'
import dayjs from "dayjs";

let dataCache: [] = []
const dataMap = reactive({
  loading: false,
  factorList: [],
  formData: {
    dateType: "day",
    date: dayjs(),
    dateRange: [
      dayjs()
        .add(-1, "month")
        .startOf("day"),
      dayjs().endOf("day")
    ],
  },
  tableData: [],
  // pagination: new Pager(),
  dialogVisible: false,
  dialogTitle: '',
  dialogForm: {},
  dialogRules: [],
  mapVisible: false,
  markerInfo: null
})

const tableOptions = [
  {
    prop: 'collectTime',
    label: '记录时间',
    minWidth: 130
  }
]

// const formOptions: any = computed(() => {
//   return [
//     {
//       prop: 'factorCode',
//       label: '监测项',
//       clearable: true,
//       type: 'select',
//       multiple: true,
//       options: dataMap.factorList.map(({ name, unit, code }) => {
//         return { label: `${name}(${unit})`, value: code }
//       }),
//       placeholder: '全部'
//     }
//   ]
// })

const formOptions = [
  {
    prop: "dateType",
    label: "查询类型",
    type: "select",
    clearable: false,
    options: [
      { label: "实时", value: "real-time" },
      { label: "分钟", value: "minute" },
      { label: "小时", value: "hour" },
      { label: "日数据", value: "day" }
    ]
  }
]

const showMap = async (row, code) => {
  const item = dataCache.find(item => (item.factorCode == code) && (item.factorValue == row[code]) && (item.collectTime == row.collectTime))
  if (item) {
    const res = await getDevice(item.deviceId)
    const { longitude, latitude, address } = res.data
    dataMap.mapVisible = true
    nextTick(() => {
      initMap(longitude, latitude, address)
    })
  }
}

declare const AMap: any
const initMap = (lng, lat, address) => {
  const map = new AMap.Map('__map', {
    zoom: 18, //级别
    center: [lng, lat], //中心点坐标
    dragEnable: false, // 禁止拖拽
  })
  const marker = new AMap.Marker({
    position: new AMap.LngLat(lng, lat),
    map,
    extData: address
  })
  dataMap.markerInfo = address
}

const expandFilter = (row, code) => {
  const obj: any = toRaw(dataMap.factorList.find(item => item.code == code))
  const name = obj.name
  const unit = row[code] ? obj.unit : ''
  const val = row[code] || '-'
  return `${name}：${val} ${unit}`
}

const formChange = ({ category, value }) => {
  if (category == "dateType") {
    switch (value) {
      case "real-time":
        dataMap.formData.dateRange = [dayjs().add(-1, "hour"), dayjs()];
        break;
      default:
        dataMap.formData.dateRange = [
          dayjs().startOf("day"),
          dayjs().endOf("day")
        ];
        dataMap.formData.date = dayjs();
        break;
    }
  }
}

let echart = ref(null)
let chart: any = null
const initEchart = () => {
  nextTick(() => {
    if (!chart) {
      chart = echarts.init(echart.value || ((document as any).getElementById('__echart')))
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
    const series = []
    toRaw(dataMap.factorList).filter(item => {
      const code = item.code
      const arr = toRaw(dataMap.tableData).map(row => row[code])
      return arr.length > 0
    }).forEach(item => {
      const code = item.code
      series.push({
        name: item.name,
        type: "line",
        data: toRaw(dataMap.tableData).map(row => row[code] || null),
        symbol: 'circle',
        symbolSize: 10
      })
    })
    chart.clear()
    let option = {
      title: {
        show: series.length === 0,
        text: "暂无数据",
        left: "center",
        top: "center",
        extStyle: {
          color: "grey",
          fontSize: 14
        },
      },
      grid: {
        top: '8%',
        bottom: '16%',
        left: '5%',
        right: '5%',
        containLabel: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        icon: "circle",
        data: toRaw(dataMap.factorList).map(item => item.name),
        y: "bottom",
        x: "center"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: toRaw(dataMap.tableData).map(item => item.collectTime),
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: (value, index) => {
            let t = dayjs(value);
            if (toRaw(dataMap.formData.dateType) == 'real-time') {
              return t.format("HH:MM:ss");
            } else if (toRaw(dataMap.formData.dateType) == 'day') {
              return t.format("YYYY-MM-DD");
            } else {
              return t.format("YYYY-MM-DD HH:MM:ss");
            }
          }
        }
      },
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "监测数值",
          splitLine: {
            show: true,
          }
        },
      ],
      series: series
    };
    chart.setOption(option)
  })
}

const getFactorList = async () => {
  const res: any = await getFactor({ monitorSystem: 80 }) // 虫情
  dataMap.factorList = res
    ?.data
    ?.filter(item => !item.isDeleted)
    .map(({ factorName, factorUnit, factorCode }) => {
      return { name: factorName, unit: factorUnit, code: factorCode }
    })
}

const search = async () => {
  const dateType = dataMap.formData.dateType
  let date = dataMap.formData.date
    ? dayjs(dataMap.formData.date).format("YYYY-MM-DD")
    : dayjs().format("YYYY-MM-DD");
  let start =
    dataMap.formData.dateRange && dataMap.formData.dateRange[0]
      ? dayjs(dataMap.formData.dateRange[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      )
      : undefined;
  let end =
    dataMap.formData.dateRange && dataMap.formData.dateRange[1]
      ? dayjs(dataMap.formData.dateRange[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      )
      : undefined;
  if (dateType == "real-time") {
    start = date + start.substr(10);
    end = date + end.substr(10);
  } else if (dateType == "day") {
    start = dayjs(dataMap.formData.date).startOf("day").format(
      "YYYY-MM-DD HH:mm:ss"
    )
    end = dayjs(dataMap.formData.date).endOf("day").format(
      "YYYY-MM-DD HH:mm:ss"
    )
  }
  const factorCodeSelected = (dataMap.formData as any)?.factorCode?.length > 0 ?
    (dataMap.formData as any)?.factorCode :
    dataMap.factorList.map(item => item.code)
  const params = {
    beginTime: start,
    endTime: end,
    // factorCode: factorCodeSelected.length > 0 ? factorCodeSelected.join(',') : undefined,
  };
  let res = null
  switch (dateType) {
    case 'day': {
      res = await getAllDay(params)
      break;
    }
    case 'hour': {
      res = await getAllHour(params)
      break;
    }
    case 'minute': {
      res = await getAllMinute(params)
      break;
    }
    case 'real-time': {
      res = await getAllDay(params)
      break;
    }
  }
  dataCache = res?.data
  const data = res?.data.filter(item => dataMap.factorList.map(f => f.code).includes(item.factorCode)) ?? []
  // 通过时间+监测项枚举重新整合数据
  const timeList = Array.from(new Set(data.map(item => item.collectTime)))
  dataMap.tableData = timeList.map(time => {
    const obj = {
      collectTime: time
    }
    const factorCacheList = data.filter(item => item.collectTime == time)
    factorCodeSelected.forEach(code => {
      const val = factorCacheList.find(item => item.factorCode == code)?.factorValue
      obj[code] = val
    });
    return obj
  })
  initEchart()
}

const init = async () => {
  await getFactorList()
  search()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  height: 40px;
  padding: 8px 16px;
}
#__echart {
  width: 100%;
  height: calc(70vh - 82px);
}
#__map {
  width: 100%;
  height: 500px;
}
.marker-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80px);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid #00efce;
  border-radius: 10px;
  width: 250px;
  z-index: 100;
  &__content {
    display: flex;
    padding: 15px;
  }
}
</style>
