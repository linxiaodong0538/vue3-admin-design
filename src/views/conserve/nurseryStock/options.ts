/*
 * @Author: XNY
 * @Date: 2021-09-28 15:16:51
 * @LastEditTime: 2021-10-08 16:23:32
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\views\conserve\nurseryStock\options.ts
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
    prop: 'seedlingName',
    label: '苗木名称',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'seedlingCode',
    label: '苗木编号',
    clearable: true,
    type: 'text'
  },
  {
    prop: 'type',
    label: '种类',
    type: 'select',
    clearable: true,
    options: [
      // 实生苗(0)、营养繁殖苗(1)、移植苗(2)、留床苗(3)。
      {
        label: '实生苗',
        value: '0'
      },
      {
        label: '营养繁殖苗',
        value: '1'
      },
      {
        label: '移植苗',
        value: '2'
      },
      {
        label: '留床苗',
        value: '3'
      }
    ]
  },
  {
    prop: 'category',
    label: '品类',
    type: 'select',
    clearable: true,
    options: [
      {
        label: '北方乔木',
        value: '1'
      },
      {
        label: '南方灌木',
        value: '2'
      }
    ]
  }
]
export const dialogOptions = [
  {
    prop: 'landId',
    label: '绿地名称',
    type: 'select',
    clearable: true,
    options: []
  },
  { prop: 'seedlingName', label: '苗木名称', type: 'text', clearable: true },
  { prop: 'seedlingCode', label: '苗木编号', type: 'text', clearable: true },
  {
    prop: 'type',
    label: '种类',
    type: 'select',
    clearable: true,
    options: [
      {
        label: '实生苗',
        value: 0
      },
      {
        label: '营养繁殖苗',
        value: 1
      },
      {
        label: '移植苗',
        value: 2
      },
      {
        label: '留床苗',
        value: 3
      }
    ]
  },
  {
    prop: 'category',
    label: '品类',
    type: 'select',
    clearable: true,
    options: [
      {
        label: '北方乔木',
        value: '1'
      },
      {
        label: '南方灌木',
        value: '2'
      }
    ]
  },
  {
    prop: 'crownDiameter',
    label: '冠径(cm)',
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
    clearable: true
  },
  {
    prop: 'groundDiameter',
    label: '地径(cm)',
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
    clearable: true
  },
  {
    prop: 'ballDiameter',
    label: '球茎(cm)',
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
    clearable: true
  },
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
    prop: 'dbh',
    label: '胸径(cm)',
    type: 'number',
    precision: 2,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 0.01,
    clearable: true
  },
  {
    prop: 'fosterYears',
    label: '培育年数',
    type: 'number',
    precision: 0,
    controlsPosition: 'right',
    controls: true,
    min: 0,
    step: 1,
    clearable: true
  },
  {
    prop: 'growingStatus',
    label: '生长情况描述',
    type: 'textarea',
    clearable: true,
    span: 24
  },
  {
    prop: 'curingMethod',
    label: '养护方式描述',
    type: 'textarea',
    clearable: true,
    span: 24
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'textarea',
    clearable: true,
    span: 24
  }
  // { prop: 'updateTime', label: '更新时间' }
]
