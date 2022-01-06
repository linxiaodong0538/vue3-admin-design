/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-16 15:10:44
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-28 15:38:24
 */

const TYPE = {
  10: '现状绿地控制线',
  20: '规划绿地控制线'
}

export const tableOptions = [
  {
    prop: 'name',
    label: '绿地名称'
  },
  {
    prop: 'type',
    label: '绿地类型',
    formatter: ({ type }: { type: keyof typeof TYPE }) => {
      return TYPE[type]
    }
  },
  {
    prop: 'dealingArea',
    label: '办理面积'
  },
  {
    prop: 'dealingBatch',
    label: '办理批次'
  },
  {
    prop: 'dealingLong',
    label: '办理长度'
  },
  {
    prop: 'dealingSituation',
    label: '办理情况'
  },
  {
    prop: 'dealingTime',
    label: '办理时间'
  }
]

export const formOptions = [
  {
    prop: 'type',
    label: '绿线类型',
    type: 'select',
    clearable: true,
    options: [
      { label: '现状绿地控制线', value: 10 },
      { label: '规划绿地控制线', value: 20 }
    ]
  },
  {
    prop: 'name',
    label: '	绿线名称',
    clearable: true,
    type: 'text'
  }
]

export const dialogOptions = [
  {
    prop: 'name',
    label: '绿线名称',
    type: 'text'
  },
  {
    prop: 'type',
    label: '绿线类型',
    type: 'select',
    options: [
      { label: '现状绿地控制线', value: 10 },
      { label: '规划绿地控制线', value: 20 }
    ]
  },
  {
    prop: 'dealingArea',
    label: '办理面积',
    placeholder: '',
    type: 'text',
    append: 'km²'
  },
  {
    prop: 'dealingBatch',
    label: '办理批次',
    type: 'text'
  },
  {
    prop: 'dealingLong',
    label: '办理长度',
    type: 'text'
  },
  {
    prop: 'dealingSituation',
    label: '办理情况',
    type: 'text'
  },  {
    prop: 'dealingTime',
    label: '办理时间',
    type: 'datetime'
  },
]
