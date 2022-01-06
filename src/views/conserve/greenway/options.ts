/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-09-29 15:34:43
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\greenway\options.ts
 */

export const formOptions = [
  // {
  //   prop: 'landName',
  //   label: '绿地名称',
  //   clearable: true,
  //   type: 'text'
  // },
  {
    prop: 'laneName',
    label: '绿道名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'laneCode',
    label: '绿道编号',
    clearable: true,
    type: 'text'
  },
  // {
  //   prop: 'resType',
  //   label: '资源类型',
  //   type: 'select',
  //   clearable: true,
  //   options:[] 
  // }
  // { prop: 'laneName', label: '绿道名称' },
  // { prop: 'laneCode', label: '绿道编号' },
  // { prop: 'length', label: '长度(m)' },
  // { prop: 'situation', label: '养护情况描述' },
  // { prop: 'curingMethod', label: '养护方式描述' },
  // { prop: 'remark', label: '备注' },
  // { prop: 'updateTime', label: '更新时间' }
]
export const dialogOptions = [
  {
    prop: 'laneName',
    label: '绿道名称',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'laneCode',
    label: '绿道编号',
    clearable: true,
    type: 'text',
    span:12
  },
  {
    prop: 'length',
    label: '长度',
    clearable: true,
    type: 'text',
    span:12
  },

  {
    prop: 'situation',
    label: '养护情况描述',
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
  },
  {
    prop: 'picPathIds',
    label: '图片',
    type: 'file',
    pictureCard:'picture-card',
    resSource:'绿道',
    bizId:'1',
    limit:4,
    fileList:[],
    span:24
  },
]