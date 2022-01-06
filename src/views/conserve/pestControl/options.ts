/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-09-30 15:50:03
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\views\conserve\pestControl\options.ts
 */

export const formOptions = [
  // {
  //   prop: 'landName',
  //   label: '绿地名称',
  //   clearable: true,
  //   type: 'text'
  // },
  {
    prop: 'landName',
    label: '绿地名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'pestName',
    label: '病虫害名称',
    clearable: true,
    type: 'text'
  }
  // {
  //   prop: 'resType',
  //   label: '资源类型',
  //   type: 'select',
  //   clearable: true,
  //   options:[]
  // }
]
export const dialogOptions = [
  {
    prop: 'landId',
    label: '绿地名称',
    type: 'select',
    clearable: true,
    options: []
  },
  {
    prop: 'pestName',
    label: '病虫害名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'pestCode',
    label: '病虫害编号',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'source',
    label: '上报来源',
    clearable: true,
    type: 'select',
    options:[
      {
        label:'平台',
        value:0
      },
      {
        label:'app',
        value:1
      },
      {
        label:'巡查上报',
        value:2
      },
    ]
  },
  {
    prop: 'controlMethod',
    label: '防治方式描述',
    clearable: true,
    type: 'textarea',
    span:24
  },

  {
    prop: 'pestDescr',
    label: '病虫害描述',
    clearable: true,
    type: 'textarea',
    span:24
  },
  {
    prop: 'remark',
    label: '备注',
    clearable: true,
    type: 'textarea',
    span:24
  },
]
