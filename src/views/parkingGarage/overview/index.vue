<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-22 17:58:00
 * @LastEditors: Lx
 * @LastEditTime: 2021-11-05 14:05:03
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
      :options="options"
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
          <el-button size="mini" type="text">一键处理</el-button>
        </template>
      </el-table-column>
    </XTable>

    <XDialog
      ref="dialog"
      :title="dataMap.title"
      :form="dataMap.dialogForm"
      :options="dialogOptions"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @change="dialogChange"
      @focus="dialogFocus"
      @callback="submitForm"
    />
  </BasicContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import { getList } from '@/apis/test'
import { reactive } from 'vue'
import { Pager } from '@/dtos'

const options = [
  {
    prop: 'bizName',
    label: '报警类型'
  },
  { prop: 'bizCode', label: '报警详情' },
  {
    prop: 'deviceName',
    label: '设备名称'
  },
  {
    prop: 'deviceCode',
    label: '设备编号' 
  },
  {
    prop: 'assetPlaceRemark',
    label: '所在位置'
  },
  {
    prop: 'createTime',
    label: '报警时间'
  }
]

const dataMap = reactive({
  title: '',
  loading: false,
  dialogVisible: false,
  formData: {},
  dialogForm: {},
  tableData: [],
  dialogRules: [],
  pagination: new Pager()
})

const search = async () => {
  const res = await getList({
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })

  dataMap.pagination.all = res?.total ?? 0
  dataMap.tableData = res?.rows ?? []
  console.log('tableData', dataMap.tableData)
}
const handleAdd = () => {
  dataMap.title = '新增'
  dataMap.dialogVisible = true
  console.log('dataMap', dataMap)
  reset()
}
const reset = () => {}
const dialogChange = () => {}
const dialogFocus = () => {}
const submitForm = () => {}
const handleSelectionChange = e => {
  console.log('e', e)
}
onMounted(() => {})
</script>
