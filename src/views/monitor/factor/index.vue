<!--
 * @Author: Lw
 * @Date: 2021-09-27 14:34:16
 * @LastEditors: Lw
 * @LastEditTime: 2021-09-27 14:59:09
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
      :options="dialogOptions"
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
import { getList, add, edit, remove } from '@/apis/monitor/factor'

const dataMap = reactive({
  loading: false,
  formData: {},
  tableData: [],
  pagination: new Pager(),
  dialogVisible: false,
  dialogTitle: '',
  dialogForm: {},
  dialogRules: [],
})

const tableOptions: any = [
  {
    prop: 'monitorSystem',
    label: '类型',
    formatter: (row: any) => {
      return row.monitorSystem == 10 ? '污染源'
        : row.monitorSystem == 20 ? '水质'
          : row.monitorSystem == 30 ? '噪声'
            : row.monitorSystem == 40 ? '空气质量'
              : row.monitorSystem == 50 ? '扬尘'
                : row.monitorSystem == 60 ? '地质灾害点'
                  : row.monitorSystem == 70 ? '土壤质量'
                    : row.monitorSystem == 80 ? '虫情' : row.monitorSystem
    }
  },
  {
    prop: 'factorName',
    label: '名称'
  },
  {
    prop: 'factorUnit',
    label: '单位'
  },
  {
    prop: 'factorCode',
    label: '编码'
  },
  // {
  //   prop: 'isDeleted',
  //   label: '是否删除',
  //   formatter: (row: any) => {
  //     return row.isDeleted ? '是' : '否'
  //   }
  // },
]

const formOptions: any = [
  {
    prop: 'factorName',
    label: '名称',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'monitorSystem',
    label: '类型',
    clearable: true,
    type: 'select',
    options: [
      { label: '污染源', value: '10' },
      { label: '水质', value: '20' },
      { label: '噪声', value: '30' },
      { label: '空气质量', value: '40' },
      { label: '扬尘', value: '50' },
      { label: '地质灾害点', value: '60' },
      { label: '土壤质量', value: '70' },
      { label: '虫情', value: '80' }
    ],
    placeholder: '全部'
  },
]

const dialogOptions: any = [
  {
    prop: 'monitorSystem',
    label: '类型',
    clearable: true,
    type: 'select',
    options: [
      { label: '污染源', value: '10' },
      { label: '水质', value: '20' },
      { label: '噪声', value: '30' },
      { label: '空气质量', value: '40' },
      { label: '扬尘', value: '50' },
      { label: '地质灾害点', value: '60' },
      { label: '土壤质量', value: '70' },
      { label: '虫情', value: '80' }
    ],
    placeholder: '全部'
  },
  {
    prop: 'factorCode',
    label: '编码',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'factorName',
    label: '名称',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'factorUnit',
    label: '单位',
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
    name: (dataMap.dialogForm as any)?.name,
    code: (dataMap.dialogForm as any)?.code,
    phone: (dataMap.dialogForm as any)?.phone,
    isThirdParty: (dataMap.dialogForm as any)?.isThirdParty,
    thirdParty: (dataMap.dialogForm as any)?.thirdParty,
    remark: (dataMap.dialogForm as any)?.remark,
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
const init = () => {
  search()
}
init()
</script>

<style lang="scss" scoped>
</style>