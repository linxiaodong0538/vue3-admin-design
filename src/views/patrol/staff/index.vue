<!--
 * @Author: your name
 * @Date: 2021-09-22 10:24:35
 * @LastEditTime: 2021-09-28 17:25:13
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
      :options="dialogOptions"
      labelWidth="124px"
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
import { getList, add, edit, remove } from '@/apis/staff'

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
    prop: 'name',
    label: '职员姓名'
  },
  {
    prop: 'code',
    label: '职员编号'
  },
  {
    prop: 'phone',
    label: '手机号'
  },
  // {
  //   prop: 'landName',
  //   label: '绿地名称'
  // },
  {
    prop: 'isThirdParty',
    label: '是否是第三方机构',
    formatter: (row: any) => {
      return row.isThirdParty ? '是' : '否'
    }
  },
  {
    prop: 'thirdParty',
    label: '第三方机构名称'
  },
  // {
  //   prop: 'isEnable	',
  //   label: '是否启用'
  // },
  // {
  //   prop: 'isDeleted',
  //   label: '是否删除'
  // },
]

const formOptions: any = [
  {
    prop: 'name',
    label: '职员姓名',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'code',
    label: '职员编号',
    clearable: true,
    type: 'text',
  },
  // {
  //   prop: 'landName',
  //   label: '绿地名称',
  //   clearable: true,
  //   type: 'text',
  // },
  {
    prop: 'isThirdParty',
    label: '是否是第三方机构',
    clearable: true,
    type: 'select',
    options: [{ label: '是', value: true }, { label: '否', value: false }],
    placeholder: '全部'
  },
]

const dialogOptions: any = [
  {
    prop: 'name',
    label: '职员姓名',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'code',
    label: '职员编号',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'phone',
    label: '手机号',
    clearable: true,
    type: 'text',
  },
  // {
  //   prop: 'landName',
  //   label: '绿地名称',
  //   clearable: true,
  //   type: 'text',
  // },
  {
    prop: 'isThirdParty',
    label: '是否是第三方机构',
    clearable: true,
    type: 'select',
    options: [{ label: '是', value: true }, { label: '否', value: false }],
  },
  {
    prop: 'thirdParty',
    label: '第三方机构名称',
    clearable: true,
    type: 'text',
  },
  {
    prop: 'remark',
    label: '备注说明',
    clearable: true,
    type: 'textarea',
    span: 24,
  },
]

const search = async () => {
  const res = await getList({
    type: 1,
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
        type: 1,
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
        type: 1,
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