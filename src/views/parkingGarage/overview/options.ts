/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-09-16 15:10:44
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-18 10:32:39
 */

export const formOptions = [
  {
    prop: 'alarmType',
    label: '报警类型',
    type: 'select',
    clearable: true,
    options: [{label:'zs',value:'1'},{label:'z1',value:'2'}]
  },
  {
    prop: 'deviceCode',
    label: '设备编号',
    clearable: true,
    type: 'text'
  }
]

export const dialogOptions = [
  {
    type: 'slot',
    labelWidth: '0',
    title: '基础信息',
    span: 24
  },
  {
    prop: 'name',
    label: '停车场名称',
    type: 'text'
  },
  {
    prop: 'code',
    label: '停车场编号',
    type: 'text'
  },
  {
    prop: 'regionId',
    label: '管理区域',
    type: 'cascader',
    clearable: true,
    options: [],
    props: {
      expandTrigger: 'hover',
      value: 'id',
      label: 'title',
      emitPath: false
    }
  },
  {
    prop: 'address',
    label: '地址',
    type: 'textarea'
  },
  {
    prop: 'parkingSpaceCount',
    label: '总车位数',
    type: 'number'
  },
  {
    prop: 'remainingCount',
    label: '剩余车位数',
    type: 'number'
  },
  // {
  //   prop: 'lngLatArray',
  //   label: '经纬度',
  //   type: 'text'
  // },

  {
    prop: 'remark',
    label: '备注',
    type: 'textarea'
  },
  // {
  //   prop: 'merchantId',
  //   label: '所属商户',
  //   type: 'select',
  //   options: []
  // },
  {
    type: 'slot',
    labelWidth: '0',
    title: '运营信息',
    span: 24
  },
  // {
  //   prop: 'businessTime',
  //   label: '营业时间',
  //   type: 'timerange',
  //   // isRange: true,
  //   span: 12
  // },
  {
    prop: 'ruleId',
    label: '临时停车收费规则',
    span: 13,
    type: 'select',
    options: []
  },
  {
    prop: 'chargeRemark',
    label: '收费规则备注',
    disabled: true,
    span: 13,
    type: 'textarea'
  },
  {
    prop: 'isMonthlyCardUsed',
    type: 'radio',
    label: '是否启用月卡',
    span: 13,
    options: [{ label: '是', value: true }, { label: '否', value: false }]
  },
  {
    prop: 'monthlyCardList',
    label: '选择月卡',
    multiple: true,
    hide: false,
    span: 12,
    type: 'select',
    options: []
  },
]
