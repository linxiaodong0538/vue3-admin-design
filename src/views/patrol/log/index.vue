<!--
 * @Author: your name
 * @Date: 2021-09-22 10:24:35
 * @LastEditTime: 2021-10-08 14:08:47
 * @LastEditors: Lw
 * @Description: In User Settings Edit
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search" />

    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>

    <el-alert
      class="alert"
      :title="`未处理事件：${dataMap.disposeTotal}`"
      type="warning"
      :closable="false"
    />

    <XTable
      :options="tableOptions"
      :data="dataMap.tableData"
      :loading="dataMap.loading"
      :is-selectable="true"
      :is-paging="true"
      :pagination="dataMap.pagination"
      @page-change="search"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="操作" min-width="100">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除本条数据？" @confirm="handleRemove(scope.row)">
            <template #reference>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </XTable>

    <XDialog
      ref="dialog"
      :title="dataMap.dialogTitle"
      :form="dataMap.dialogForm"
      :options="dataMap.dialogOptions"
      labelWidth="80px"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @change="dialogChange"
      @focus="dialogFocus"
      @callback="submitForm"
    />
  </BasicContainer>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import { XForm, XTable, XDialog } from '@/components'
import { Pager } from '@/dtos'
import { getCount, getList, add, edit, remove } from '@/apis/patrol/log'
import { getAll as eventAll } from '@/apis/patrol/event'
import { getAll as staffAll } from '@/apis/staff'
import { getAll as greenAll } from '@/apis/geogSys/greenbelt'
import { getAll as planAll } from '@/apis/patrol/plan'

let eventList: [] = []
let staffList: [] = []
let greenList: [] = []
let planList: [] = []
const dataMap = reactive({
  disposeTotal: 0,
  loading: false,
  formData: {},
  tableData: [],
  pagination: new Pager(),
  dialogVisible: false,
  dialogTitle: '',
  dialogForm: {},
  dialogRules: [],
  dialogOptions: [
    {
      prop: 'eventId',
      label: '异常事件',
      clearable: true,
      type: 'select',
      filterable: true,
      options: [],
    },
    {
      prop: 'disposeType',
      label: '处理类型',
      clearable: true,
      type: 'select',
      options: [{ label: '巡查人员处理', value: 1 }, { label: '专业人员处理', value: 2 }],
    },
    {
      prop: 'staffId',
      label: '巡查人员',
      clearable: true,
      type: 'select',
      filterable: true,
      options: [],
    },
    {
      prop: 'planId',
      label: '计划',
      clearable: true,
      type: 'select',
      filterable: true,
      options: [],
    },
    {
      prop: 'spaceId',
      label: '绿地',
      clearable: true,
      type: 'select',
      filterable: true,
      options: [],
    },
    // {
    //   prop: 'isAnomalous',
    //   label: '是否异常',
    //   clearable: true,
    //   type: 'select',
    //   filterable: true,
    //   options: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
    // },
    // {
    //   prop: 'isDispose',
    //   label: '是否处理',
    //   clearable: true,
    //   type: 'select',
    //   filterable: true,
    //   options: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
    // },
    {
      prop: 'disposeDetail',
      label: '处理情况',
      clearable: true,
      type: 'textarea',
      span: 24
    },
  ]
})

const tableOptions: any = [
  {
    prop: 'eventName',
    label: '事件名称'
  },
  {
    prop: 'spaceName',
    label: '绿地名称'
  },
  {
    prop: 'staffName',
    label: '巡查人员'
  },
  // {
  //   prop: 'startTime',
  //   label: '开始时间'
  // },
  // {
  //   prop: 'endTime',
  //   label: '结束时间'
  // },
  {
    prop: 'isAnomalous',
    label: '是否异常',
    formatter: (row: any) => {
      return row.isAnomalous == '1' ? '是' : '否'
    }
  },
  {
    prop: 'disposeType	',
    label: '处理类型',
    formatter: (row: any) => {
      return row.disposeType == 1 ? '巡查人员处理' : '专业人员处理'
    }
  },
  {
    prop: 'isDispose',
    label: '是否处理',
    formatter: (row: any) => {
      return row.isDispose == '1' ? '是' : '否'
    }
  },
]

const formOptions: any = [
  {
    prop: 'spaceName',
    label: '绿地名称',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'staffName',
    label: '巡查人员',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'isAnomalous',
    label: '是否异常',
    clearable: true,
    type: 'select',
    options: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
    placeholder: '全部'
  },
  {
    prop: 'isDispose',
    label: '是否处理',
    clearable: true,
    type: 'select',
    options: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
    placeholder: '全部'
  }
]

const search = async () => {
  const res = await getList({
    ...dataMap.formData,
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })

  dataMap.pagination.all = res?.total ?? 0
  dataMap.tableData = res?.rows ?? []

  const resDispose = await getCount({ isDispose: 0 })
  dataMap.disposeTotal = resDispose?.data ?? 0
}

const handleAdd = () => {
  dataMap.dialogTitle = '新增'
  dataMap.dialogForm = {}
  dataMap.dialogVisible = true
}
const handleEdit = (row: any) => {
  dataMap.dialogTitle = '编辑'
  dataMap.dialogForm = Object.assign({}, row)
  dataMap.dialogVisible = true
}
const handleRemove = async (row: any) => {
  dataMap.loading = true
  const res: any = await remove(row.id)
  dataMap.loading = false
  if (res.code == 200) {
    search()
    ElMessage({ message: '删除成功', type: 'success' })
  } else {
    ElMessage({ message: '删除失败' + res.msg, type: 'error' })
  }
}
const dialogChange = () => { }
const dialogFocus = () => { }
const submitForm = async () => {
  dataMap.loading = true
  const data = {
    eventId: (dataMap.dialogForm as any)?.eventId,
    eventName: (eventList.find((item: any) => item.value == (dataMap.dialogForm as any)?.eventId) as any)?.label,
    staffId: (dataMap.dialogForm as any)?.staffId,
    staffName: (staffList.find((item: any) => item.value == (dataMap.dialogForm as any)?.staffId) as any)?.label,
    spaceId: (dataMap.dialogForm as any)?.spaceId,
    spaceName: (greenList.find((item: any) => item.value == (dataMap.dialogForm as any)?.spaceId) as any)?.label,
    planId: (dataMap.dialogForm as any)?.planId,
    // planName: (planList.find((item: any) => item.value == (dataMap.dialogForm as any)?.planId) as any)?.label,
    disposeType: (dataMap.dialogForm as any)?.disposeType,
    disposeDetail: (dataMap.dialogForm as any)?.disposeDetail,
    // isAnomalous: (dataMap.dialogForm as any)?.isAnomalous,
    // isDispose: (dataMap.dialogForm as any)?.isDispose,
  }
  switch (dataMap.dialogTitle) {
    case '新增': {
      const res: any = await add({
        ...data,
        // tenantId: useStore().state.user.userInfo.tenantId,
      })
      if (res.code == 200) {
        dataMap.dialogForm = {}
        dataMap.dialogVisible = false
        search()
        ElMessage({ message: '添加成功', type: 'success' })
      } else {
        ElMessage({ message: '添加失败' + res.msg, type: 'error' })
      }
      break;
    }
    case '编辑': {
      const res: any = await edit({
        id: (dataMap.dialogForm as any).id,
        ...data,
        // tenantId: useStore().state.user.userInfo.tenantId,
      })
      if (res.code == 200) {
        dataMap.dialogForm = {}
        dataMap.dialogVisible = false
        search()
        ElMessage({ message: '编辑成功', type: 'success' })
      } else {
        ElMessage({ message: '编辑失败' + res.msg, type: 'error' })
      }
      break;
    }
  }
  dataMap.loading = false
}
const handleSelectionChange = (e: any) => {
  console.log('e', e)
}
const getSelList = () => {
  const eIndex = dataMap.dialogOptions.findIndex(item => item.prop == 'eventId')
  if (eIndex >= 0) {
    eventAll().then((res: any) => {
      eventList = dataMap.dialogOptions[eIndex].options = res?.data.map((item: { name: any, id: any }) => {
        return { label: item.name, value: item.id }
      }) ?? []
    })
  }
  const sIndex = dataMap.dialogOptions.findIndex(item => item.prop == 'staffId')
  if (sIndex >= 0) {
    staffAll().then((res: any) => {
      staffList = dataMap.dialogOptions[sIndex].options = res?.data.map((item: { name: any, id: any }) => {
        return { label: item.name, value: item.id }
      }) ?? []
    })
  }
  const gIndex = dataMap.dialogOptions.findIndex(item => item.prop == 'spaceId')
  if (gIndex >= 0) {
    greenAll({}).then((res: any) => {
      greenList = dataMap.dialogOptions[gIndex].options = res?.data.map((item: { name: any, id: any }) => {
        return { label: item.name, value: item.id }
      }) ?? []
    })
  }
  const pIndex = dataMap.dialogOptions.findIndex(item => item.prop == 'planId')
  if (pIndex >= 0) {
    planAll({}).then((res: any) => {
      planList = dataMap.dialogOptions[pIndex].options = res?.data.map((item: { taskName: any, id: any }) => {
        return { label: item.taskName, value: item.id }
      }) ?? []
    })
  }
}
const init = () => {
  getSelList()
  search()
}
init()
</script>

<style lang="scss" scoped>
.alert {
  margin-top: 20px;
}
</style>