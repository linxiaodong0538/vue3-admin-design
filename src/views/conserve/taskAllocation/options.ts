/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-10-12 16:37:25
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\views\conserve\taskAllocation\options.ts
 */

export const formOptions = [

  {
    prop: 'landName',
    label: '绿地名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'taskName',
    label: '任务名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'taskCode',
    label: '任务编号',
    clearable: true,
    type: 'text'
  }

]
export const dialogOptions = [
  {
    prop: 'landId',
    label: '绿地名称',
    type: 'select',
    clearable: true,
    options: [],
    span:12
  },
  {
    prop: 'taskName',
    label: '任务名称',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'taskCode',
    label: '任务编号',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'type',
    label: '任务分类',
    type: 'select',
    clearable: true,
    options: [],
    span:12
  },
  {
    prop: 'taskType',
    label: '任务类型',
    type: 'select',
    clearable: true,
    options: [],
    span:12
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    clearable: true,
    options: [
      {
        label:"未执行",
        value:'0'
      },
      {
        label:"执行中",
        value:'1'
      },
      {
        label:"已完成",
        value:'2'
      },
    ],
    span:12
  },
  {
    prop: 'workItem',
    label: '工作细项',
    type: 'select',
    clearable: true,
    options: [],
    span:12
  },
  {
    prop: 'totalNumber',
    label: '任务总执行次数',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'timeType',
    label: '时间类型',
    type: 'select',
    clearable: true,
    options: [
      // {
      //   label: '季节',
      //   value: '0'
      // },
      {
        label: '月份',
        value: '1'
      },
      {
        label: '天数',
        value: '2'
      },
      {
        label: '固定时间',
        value: '3'
      }
    ],
    span:12
  },
  {
    prop: 'year',
    label: '年份',
    type:'year',
    format:'YYYY',
    clearable: true,
    hide:false,
    span:12,
  },
  {
    prop: 'monthStr',
    label: '月份',
    type: 'select',
    clearable: true,
    multiple:true,
    collapse:false,
    options: [],
    span:12
  },
  {
    prop: 'stationary',
    label: '固定时间',
    type:'datetimerange',
    clearable: true,
    rangePickerOptions:{},
    span:12
  },
  {
    prop: 'dateRange',
    label: '时间',
    type:'timerange',
    clearable: true,
    span:12
  }
]
