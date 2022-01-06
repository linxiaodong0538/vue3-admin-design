/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-10-08 17:09:01
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\views\conserve\trees\options.ts
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
    prop: 'name',
    label: '古树名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'treeCode',
    label: '古树编号',
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
    prop: 'name',
    label: '古树名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'treeCode',
    label: '古树编号',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'breed',
    label: '科属',
    clearable: true,
    type: 'select',
    options:[]
  },
  {
    prop: 'ownership',
    label: '权属',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'dbh',
    label: '胸径(cm)',
    clearable: true,
    
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
  },
  {
    prop: 'treeAge',
    label: '树龄',
    clearable: true,
    type: 'number',
    // precision: ,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    // step: 0,
  },
  {
    prop: 'crownDiameter',
    label: '冠径(cm)',
    clearable: true,
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
  },
  // {
  //   prop: 'height',
  //   label: '高度(m)',
  //   clearable: true,
  //   type: 'text'
  // },
  {
    prop: 'height',
    label: '高度(m)',
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
    clearable: true
  },
  {
    prop: 'situation',
    label: '养护情况描述',
    clearable: true,
    type: 'textarea',
    span:24
  },
  {
    prop: 'growingStatus',
    label: '养护方式描述',
    clearable: true,
    type: 'textarea',
    span:24
  },
  {
    prop: 'curingMethod',
    label: '养护方式描述',
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
  }
]
