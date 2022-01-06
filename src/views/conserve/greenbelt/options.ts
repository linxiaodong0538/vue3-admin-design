/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-10-12 09:31:50
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\greenbelt\options.ts
 */

export const formOptions = [
  // {
  //   prop: 'landName',
  //   label: '绿地名称',
  //   clearable: true,
  //   type: 'text'
  // },
  {
    prop: 'name',
    label: '绿地名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'code',
    label: '绿地编号',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'applyType',
    label: '绿地类型',
    type: 'select',
    clearable: true,
    options:[
      {
        label:'公园绿地',
        value:10
      },
      {
        label:'生产绿地',
        value:20
      },
      {
        label:'防护绿地管理',
        value:30
      },
      {
        label:'附属绿地管理',
        value:40
      },
    ]
  }
]
export const dialogOptions = [
  // {
  //   prop: 'laneName',
  //   label: '绿道名称',
  //   clearable: true,
  //   type: 'text',
  //   span:12
  // },
  // {
  //   prop: 'laneCode',
  //   label: '绿道编号',
  //   clearable: true,
  //   type: 'text',
  //   span:12
  // },
  // {
  //   prop: 'length',
  //   label: '长度(cm)',
  //   clearable: true,
  //   type: 'text',
  //   span:12
  // },
  {
    prop: 'situation',
    label: '养护情况描述',
    clearable: true,
    type: 'textarea',
    span:24
  },
  // {
  //   prop: 'curingMethod',
  //   label: '养护方式描述',
  //   clearable: true,
  //   type: 'textarea',
  //   span:24
  // },
  // {
  //   prop: 'remark',
  //   label: '备注',
  //   clearable: true,
  //   type: 'textarea',
  //   span:24
  // },
]