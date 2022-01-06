<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-22 17:58:00
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-08 11:51:05
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
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
          <el-button size="mini" type="text" @click="rowUpdate(scope.row)">修改</el-button>
          <!-- <el-button size="mini" type="text" @click="handleLine(scope.row)">绿地控制线</el-button> -->
          <el-button size="mini" type="text" @click="rowDelete(scope.row)">删除</el-button>
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
      @callback="submitForm"
    ></XDialog>
    <XDialog title="绿地控制线" v-model:visible="dataMap.lineDialogVisible"></XDialog>
  </BasicContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { XForm, XTable, XDialog } from '@/components'
import { tableOptions, formOptions, dialogOptions } from './options'
import { getList, removeBatch, update, create } from '@/apis/geogSys/greenLine'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { reactive, nextTick } from 'vue'
import { Pager } from '@/dtos'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'

declare const AMap: any

interface DialogForm {
  type: number,
  [key: string]: string | number,
}


const defaultDialogForm: DialogForm = {
  type: 10,
  id: '',
  name: '',
  dealingArea: '',
  dealingBatch: '',
  dealingLong: '',
  dealingSituation: '',
  dealingTime: '',
  areaId: '',
  areaStr: "",
}



const dataMap = reactive({
  title: '',
  loading: false,
  dialogVisible: false,
  lineDialogVisible: false,
  formData: {

  },
  dialogForm: defaultDialogForm,
  tableData: [],
  dialogRules: [],
  pagination: new Pager()
})

onMounted(() => {
  search()
})
const initMap = () => {
  const map = new AMap.Map('map', {
    zoom: 14, //级别
    center:[115.656198, 34.415168], //中心点坐标

  })

  AMap.plugin('AMap.Geocoder', () => {
    const geocoder = new AMap.Geocoder();
    AMap.event.addListener(map, 'click', e => {
      geocoder.getAddress(e.lnglat, (status, res) => {
        if (status === 'complete' && res.regeocode) {
          const addr = res.regeocode.formattedAddress;
          dataMap.dialogForm.addr = addr
        }
      })
      dataMap.dialogForm.areaId = e.target.getAdcode()
    })
  });
}

const search = async () => {
  const res = await getList(
    Object.assign({}, dataMap.formData, {
      pageNum: dataMap.pagination.index,
      pageSize: dataMap.pagination.size
    })
  )
  dataMap.pagination.all = res?.total ?? 0
  dataMap.tableData = res?.rows ?? []
}

const handleAdd = () => {
  dataMap.title = '新增'
  dataMap.dialogVisible = true
  nextTick(() => {
    reset()
    initMap()
  })
}

const rowUpdate = (row: any) => {
  dataMap.dialogVisible = true
  dataMap.title = '编辑'
  dataMap.dialogForm = Object.assign(
    {},
    {
      id: row.id,
      name: row.name,
      type: row.type,
      dealingArea: row.dealingArea,
      dealingBatch: row.dealingBatch,
      dealingLong: row.dealingLong,
      dealingSituation: row.dealingSituation,
      dealingTime: row.dealingTime
    }
  )
  nextTick(() => {
    initMap()
  })
}

const rowDelete = (row: any) => {
  ElMessageBox.confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await removeBatch({ ids: [row.id] })
    ElMessage.success('删除成功')
    search()
  })
}
const handleLine = () => {

}

const submitForm = () => {
  dataMap.dialogForm.dealingTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  if (!dataMap.dialogForm.id) {
    create(dataMap.dialogForm).then(() => {
      ElMessage.success('操作成功')
      dataMap.dialogVisible = false
      search()
    })
  } else {
    update(dataMap.dialogForm).then(() => {
      ElMessage.success('操作成功')
      dataMap.dialogVisible = false
      search()
    })
  }
}
const handleSelectionChange = (e: any) => {
  console.log('e', e)
}
const reset = () => {
  dataMap.dialogForm = cloneDeep(defaultDialogForm)
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
