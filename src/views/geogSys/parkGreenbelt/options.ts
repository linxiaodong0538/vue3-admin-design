/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-16 15:10:44
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-27 15:03:28
 */

const TYPE = {
  10: '综合公园',
  20: '社区公园',
  30: '专类公园',
  40: '带状公园'
}

export const tableOptions = [
  {
    prop: 'name',
    label: '绿地名称'
  },
  {
    prop: 'type',
    label: '绿地类型',
    formatter: ({ type }: { type: keyof typeof TYPE }) => {
      return TYPE[type]
    }
  },
  {
    prop: 'addr',
    label: '地址'
  },
  {
    prop: 'areaSize',
    label: '占地面积km²'
  },
  {
    prop: 'speedNum',
    label: '苗木数量'
  },
  {
    prop: 'famousTreeNum',
    label: '名木古树数量'
  }
]

export const formOptions = [
  {
    prop: 'type',
    label: '绿地类型',
    type: 'select',
    clearable: true,
    options: [
      { label: '综合公园', value: 10 },
      { label: '社区公园', value: 20 },
      { label: '专类公园', value: 30 },
      { label: '带状公园', value: 40 }
    ]
  },
  {
    prop: 'name',
    label: '绿地名称',
    clearable: true,
    type: 'text'
  }
]

export const dialogOptions = [
  {
    prop: 'name',
    label: '绿地名称',
    type: 'text'
  },
  {
    prop: 'type',
    label: '绿地类型',
    type: 'select',
    options: [
      { label: '综合公园', value: 10 },
      { label: '社区公园', value: 20 },
      { label: '专类公园', value: 30 },
      { label: '带状公园', value: 40 }
    ]
  },

  {
    prop: 'areaSize',
    label: '占地面积',
    placeholder: '',
    type: 'text',
    append: 'km²'
  },

  {
    prop: 'situation',
    label: '养护情况',
    type: 'text'
  },
  {
    prop: 'addr',
    label: '地址',
    span: 24,
    type: 'text'
  }
]
