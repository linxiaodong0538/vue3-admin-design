e<!--
 * @Author: your name
 * @Date: 2021-09-22 10:24:35
 * @LastEditTime: 2021-09-26 15:47:48
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
import { getList, add, edit, remove } from '@/apis/patrol/plan'
import { getAll as staffAll } from '@/apis/staff'
import { getAll as greenAll } from '@/apis/geogSys/greenbelt'
import { getAll as taskAll } from '@/apis/patrol/task'
import dayjs from 'dayjs'

let staffList: [] = []
let greenList: [] = []
let taskList: [] = []
const dataMap = reactive({
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
      prop: 'staffId',
      label: '巡查人员',
      clearable: true,
      type: 'select',
      filterable: true,
      options: [],
    },
    {
      prop: 'taskId',
      label: '巡查任务',
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
    {
      prop: 'isFinish',
      label: '是否完成',
      clearable: true,
      type: 'switch',
    },
    {
      prop: 'startTime',
      label: '开始时间',
      clearable: true,
      type: 'datetime',
    },
    {
      prop: 'endTime',
      label: '结束时间',
      clearable: true,
      type: 'datetime',
    },
  ]
})

const tableOptions: any = [
  {
    prop: 'startTime',
    label: '开始时间'
  },
  {
    prop: 'endTime',
    label: '结束时间'
  },
  {
    prop: 'taskName',
    label: '任务名称'
  },
  {
    prop: 'spaceName',
    label: '绿地名称'
  },
  {
    prop: 'staffName',
    label: '巡查人员'
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
]

const search = async () => {
  const res = await getList({
    ...dataMap.formData,
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  dataMap.pagination.all = res?.total ?? 0
  dataMap.tableData = res?.rows ?? []
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
    staffId: (dataMap.dialogForm as any)?.staffId,
    staffName: (staffList.find((item: any) => item.value == (dataMap.dialogForm as any)?.staffId) as any)?.label,
    spaceId: (dataMap.dialogForm as any)?.spaceId,
    spaceName: (greenList.find((item: any) => item.value == (dataMap.dialogForm as any)?.spaceId) as any)?.label,
    taskId: (dataMap.dialogForm as any)?.taskId,
    taskName: (taskList.find((item: any) => item.value == (dataMap.dialogForm as any)?.taskId) as any)?.label,
    isFinish: (dataMap.dialogForm as any)?.isFinish,
    startTime: dayjs((dataMap.dialogForm as any)?.startTime).format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs((dataMap.dialogForm as any)?.endTime).format('YYYY-MM-DD HH:mm:ss'),
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
  const tIndex = dataMap.dialogOptions.findIndex(item => item.prop == 'taskId')
  if (tIndex >= 0) {
    taskAll({}).then((res: any) => {
      taskList = dataMap.dialogOptions[tIndex].options = res?.data.map((item: { name: any, id: any }) => {
        return { label: item.name, value: item.id }
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
</style>