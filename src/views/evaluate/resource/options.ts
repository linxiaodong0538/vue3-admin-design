/*
 * @Author: XNY
 * @Date: 2021-09-22 09:52:11
 * @LastEditTime: 2021-09-28 15:21:33
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\resource\options.ts
 */
export const formOptions = [
  {
    prop: 'resName',
    label: '资源名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'resType',
    label: '资源类型',
    type: 'text',
    clearable: true,
    
    // options: [{label:'评分制',value:'1'},{label:'考核制',value:'2'}]
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
    prop: 'resName',
    label: '资源名称',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'resName',
    label: '资源来源',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'resName',
    label: '资源类型',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'resName',
    label: '上传文件',
    clearable: true,
    type: 'text',
    span:12
  },
]