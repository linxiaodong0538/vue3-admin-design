/*
 * @Author: XNY
 * @Date: 2021-09-22 09:52:11
 * @LastEditTime: 2021-09-26 16:13:23
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\record\options.ts
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
  {
    type: 'slot',
    labelWidth: '0',
    title: '基础信息',
    span: 24
  },
]