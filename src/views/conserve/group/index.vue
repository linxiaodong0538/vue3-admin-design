<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:22:34
 * @LastEditTime: 2021-10-12 16:20:38
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\group\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />

    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button plain :disabled="dataMap.multiple" size="small" type="danger" @click="handleRemove"> 删除 </el-button>
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
      <el-table-column label="启用">
        <template #default="scope">
          <el-switch v-model="scope.row.isEnable" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"> 编辑 </el-button>
          <el-button size="mini" type="text" @click="handleRemove(scope.row)"> 删除 </el-button>
          <el-button size="mini" type="text" @click="distribution(scope.row)"> 分配人员 </el-button>
        </template>
      </el-table-column>
    </XTable>

    <XDialog
      ref="dialog"
      :title="dataMap.dialogTitle"
      :form="dataMap.dialogForm"
      :options="dataMap.dialogOptions"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @change="dialogChange"
      @focus="dialogFocus"
      @callback="submitForm"
    />

    <el-dialog v-model="dataMap.staffVisible" :close-on-click-modal="false" title="人员分配" width="700px">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="dataMap.staffIds"
          :props="{
            key: 'id',
            label: 'name'
          }"
          filterable
          :titles="['未分配', '已分配']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="dataMap.personnel"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" type="primary" @click="staffSubmitForm">确 定</el-button>
          <el-button size="small" @click="dataMap.staffVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </BasicContainer>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// import { useStore } from '@/store'
import { ElMessageBox, ElMessage } from 'element-plus'
import { XForm, XTable, XDialog } from '@/components'
import { Pager } from '@/dtos'
import { getList, update, create, remove } from '@/apis/conserve/groupStaff'
import { dialogOptions } from './options'
import qs from 'qs'
import { getAll } from '@/apis/staff'
import { update as groupStaffUpdate, all } from '@/apis/conserve/groupStaffRelation'

interface group {
  id: string
  groupName: string
  groupCode: string
  isEnable: boolean
  remark: string
}
const defaultDialogForm: group = {
  id: '',
  groupName: '',
  groupCode: '',
  isEnable: true,
  remark: ''
}
const dataMap = reactive({
  eventLIst: [],
  loading: false,
  formData: {},
  tableData: [],
  pagination: new Pager(),
  dialogVisible: false,
  dialogTitle: '',
  dialogForm: defaultDialogForm,
  dialogOptions,
  dialogRules: {
    groupName: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    groupCode: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  ids: [],
  single: true,
  multiple: true,
  /** 人员分配 */
  staffVisible: false,
  staffIds: [],
  personnel: []
})

const tableOptions: any = [
  {
    prop: 'groupName',
    label: '分组名称'
  },
  {
    prop: 'groupCode',
    label: '分组编号'
  }
]

const formOptions: any = [
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
  }
]

const search = async ({ index }: any = {}) => {
  if (index) dataMap.pagination.index = index
  const res = await getList({
    ...dataMap.formData,
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  dataMap.pagination.all = res?.total ?? 0
  dataMap.tableData = res?.rows ?? []
}
const reset = () => {
  dataMap.dialogForm = Object.assign({}, defaultDialogForm)
  // dataMap.dialogOptions.find(x => x.prop === 'picPathIds').fileList = []
}
const handleAdd = () => {
  reset()
  dataMap.dialogTitle = '新增'
  dataMap.dialogVisible = true
}
const handleEdit = (row: any) => {
  reset()
  dataMap.dialogTitle = '编辑'
  dataMap.dialogForm = row
  dataMap.dialogVisible = true
}
const handleRemove = (row: any) => {
  ElMessageBox.confirm(`是否确认删除该数据?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      let ids = qs.stringify({ ids: (row.id && [row.id]) || dataMap.ids }, { arrayFormat: 'brackets' })
      remove(ids).then((res: any) => {
        if (res?.code == 200) {
          search({ index: 1 })
          ElMessage({ message: `删除成功`, type: 'success' })
        }
      })
    })
    .catch(() => {})
  // dataMap.loading = true
  // const res: any = await remove(row.id)
  // dataMap.loading = false
  // if (res.code == 200) {
  //   search({ index: 1 })
  //   ElMessage({ message: '删除成功', type: 'success' })
  // } else {
  //   ElMessage({ message: '删除失败' + res.msg, type: 'error' })
  // }
}
/** 启用 */
const switchChange = (row: any) => {
  let enable = row.isEnable && row.isEnable ? '启用' : '停用'
  ElMessageBox.confirm(`是否确认${enable}该分组`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      let params = {
        id: row.id,
        isEnable: row.isEnable
      }
      update(params).then((res: any) => {
        if (res?.code == 200) {
          search({ index: 1 })
          ElMessage({ message: `${enable}成功`, type: 'success' })
        }
      })
    })
    .catch(() => {
      row.isEnable = !row.isEnable
    })
}

/** 分配人员 */
const distribution = (row: any) => {
  dataMap.dialogForm = row
  all({ groupId: row.id }).then(({ data }: any) => {
    // console.log('>>>>>>>>',res);
    dataMap.staffIds = []
    if (data) {
      data.forEach((x: any) => {
        dataMap.staffIds.push(x.staffId)
      })
    }
    dataMap.staffVisible = true
  })
}
/**分配人员提交 */
const staffSubmitForm = () => {
  let parmas = {
    groupId: dataMap.dialogForm.id,
    staffIds: dataMap.staffIds
  }
  groupStaffUpdate(parmas).then(res => {
    if (res?.code == 200) {
      search({ index: 1 })
      dataMap.staffVisible = false
      ElMessage({ message: `分配成功`, type: 'success' })
    }
  })
}
const dialogChange = () => {}
const dialogFocus = () => {}
const submitForm = () => {
  let params = {
    id: dataMap.dialogForm.id,
    groupName: dataMap.dialogForm.groupName,
    groupCode: dataMap.dialogForm.groupCode,
    isEnable: dataMap.dialogForm.isEnable,
    remark: dataMap.dialogForm.remark
  }
  if (!dataMap.dialogForm.id) {
    create(params).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        dataMap.dialogVisible = false
        ElMessage({ message: `新增成功`, type: 'success' })
      }
    })
  } else {
    update(params).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        dataMap.dialogVisible = false
        ElMessage({ message: `修改成功`, type: 'success' })
      }
    })
  }
}
const handleSelectionChange = (selection: any) => {
  dataMap.ids = selection.map((x: any) => x.id)
  dataMap.single = selection.length !== 1
  dataMap.multiple = !selection.length
}
const init = () => {
  search()
  getAll({ type: 0 }).then(({ data }: any) => {
    dataMap.personnel = data
  })
}
init()
</script>

<style lang="scss" scoped>
</style>