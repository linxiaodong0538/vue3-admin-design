/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-10-12 14:35:11
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\views\conserve\group\options.ts
 */

import { Options } from 'vue-class-component'

export const formOptions = [
  {
    prop: 'name',
    label: '分组名称',
    clearable: true,
    type: 'text'
  }
]
export const dialogOptions = [
  {
    prop: 'groupName',
    label: '分组名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'groupCode',
    label: '分组编号',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'isEnable',
    label: '是否启用',
    type: 'radio',
    options: [
      {
        label: '启用',
        value: true
      },
      {
        label: '停用',
        value: false
      }
    ]
  },
  {
    prop: 'remark',
    label: '备注',
    clearable: true,
    type: 'textarea',
    span: 24
  }
]
