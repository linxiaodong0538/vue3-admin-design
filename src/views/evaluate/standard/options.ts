/*
 * @Author: XNY
 * @Date: 2021-09-22 09:52:11
 * @LastEditTime: 2021-09-23 11:42:12
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\standard\options.ts
 */
export const formOptions = [
  {
    prop: 'scoreName',
    label: '评分表名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'scoreType',
    label: '评分类型',
    type: 'select',
    clearable: true,
    
    options: [{label:'评分制',value:'1'},{label:'考核制',value:'2'}]
  }
]
export const dialogOptions = [
  // {
  //   type: 'slot',
  //   labelWidth: '0',
  //   title: '基础信息',
  //   span: 24
  // },
  {
    prop: 'parkId',
    label: '园区名称',
    type: 'select',
    clearable: true,
    options: [{label:'中山公园',value:'1'},{label:'1111',value:'2'}]
  },
 
  {
    prop: 'scoreName',
    label: '评分表名称',
    type: 'text'
  },
  {
    prop: 'scoreNum',
    label: '评分表总分',
    type: 'text'
  },
  {
    prop: 'qualifyScoreNum',
    label: '合格总分',
    type: 'text'
  },
  {
    prop: 'type',
    label: '评分类型',
    type: 'select',
    clearable: true,
    
    options: [{label:'评分制',value:'1'},{label:'考核制',value:'2'}]
  },
  {
    prop: 'isQualify',
    type: 'radio',
    label: '是否合格',
    span: 12,
    options: [{ label: '是', value: 1 }, { label: '否', value: 0 }]
  },
  {
    prop: 'isFinish',
    type: 'radio',
    label: '是否完成评分',
    span: 12,
    options: [{ label: '是', value: 1 }, { label: '否', value: 0 }]
  },
  {
    prop: 'isVeto',
    type: 'radio',
    label: '是否被否决项否决',
    span: 12,
    options: [{ label: '是', value: 1 }, { label: '否', value: 0 }]
  },
  // isQualify
]