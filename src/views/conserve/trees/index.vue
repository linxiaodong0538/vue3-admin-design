<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:19:41
 * @LastEditTime: 2021-10-20 11:29:21
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\trees\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" :disabled="dataMap.single" plain size="small" @click="handleRecord"> 养护记录 </el-button>
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
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"> 修改 </el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"> 删除 </el-button>
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
      @cancel="cancel"
      labelWidth="110px"
    />
  </BasicContainer>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent, reactive, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Pager } from '@/dtos'
import { useStore } from '@/store'
import qs from 'qs'
import { getList, create, update, remove } from '@/apis/conserve/tree'
import { getAll } from '@/apis/geogSys/greenbelt'
import { getDictionary } from '@/apis/system/dictionary'

const options = [
  { prop: 'landName', label: '绿地名称' },
  { prop: 'name', label: '古树名称' },
  { prop: 'treeCode', label: '古树编号' },
  { prop: 'breed', label: '科属' },
  { prop: 'ownership', label: '权属' },
  { prop: 'dbh', label: '胸径(cm)' },
  { prop: 'treeAge', label: '树龄' },
  { prop: 'crownDiameter', label: '冠径(cm)' },
  { prop: 'height', label: '高度(m)' },
  { prop: 'situation', label: '养护情况描述' },
  { prop: 'growingStatus', label: '养护方式描述' },
  { prop: 'curingMethod', label: '养护方式描述' },
  { prop: 'remark', label: '备注' },
  { prop: 'updateTime', label: '更新时间' }
]

const router = useRouter()

interface nurseryStock {
  id: string
  landId: string
  landName: string
  name: string
  treeCode: string
  breed: string
  ownership: string
  dbh: string
  treeAge: string
  crownDiameter: string
  height: string
  situation: string
  growingStatus: string
  curingMethod: string
  remark: string
  updateTime: string
  [x: string]: any
}
const defaultDialogForm: nurseryStock = {
  id: '',
  landId: '',
  landName: '',
  name: '',
  treeCode: '',
  breed: '',
  ownership: '',
  dbh: '',
  treeAge: '',
  crownDiameter: '',
  height: '',
  situation: '',
  growingStatus: '',
  curingMethod: '',
  remark: '',
  updateTime: ''
}

const dataMap = reactive({
  formData: {},
  tableData: [],
  loading: false,
  pagination: new Pager(),
  title: '',
  dialogForm: defaultDialogForm,
  dialogOptions,
  dialogVisible: false,
  dialogRules: {
    landId: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    laneCode: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    length: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    growingStatus: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    curingMethod: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    remark: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  ids: [],
  single: true,
  multiple: true
})
/** 查询 */
const search = async ({ index }: any = {}) => {
  if (index) dataMap.pagination.index = index
  const parsm = Object.assign({}, dataMap.formData, {
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  dataMap.loading = true
  const { rows, total }: any = await getList(parsm)
  dataMap.loading = false
  dataMap.tableData = rows
  dataMap.pagination.all = total
}
const reset = () => {
  dataMap.dialogForm = Object.assign({}, defaultDialogForm)
  // dataMap.dialogOptions.find(x => x.prop === 'picPathIds').fileList = []
}
/** 新增 */
const handleAdd = () => {
  reset()
  nextTick(() => {
    dataMap.dialogVisible = true
    dataMap.title = '新增'
  })
}

const handleUpdate = (row: any) => {
  dataMap.dialogForm = Object.assign({}, row)
  dataMap.dialogVisible = true
  dataMap.title = '修改'
}

/** 删除 */
const handleDelete = (row: any) => {
  ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let ids = qs.stringify({ ids: [row.id] }, { arrayFormat: 'brackets' })
    remove(ids).then((res: any) => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}
/**养护记录 */
const handleRecord = () => {
  router.push({
    path: '/maintenanceRecord',
    query: {
      id: dataMap.ids.toString()
    }
  })
  // router.
}

const dialogChange = ({ category, value, data }: any) => {
  if (category === 'landId') {
    dataMap.dialogForm.landName = ''
    if (value) {
      dataMap.dialogForm.landName = data.label
    }
  }
}

/** 提交 */
const submitForm = () => {
  const params = {
    id: dataMap.dialogForm.id,
    landId: dataMap.dialogForm.landId,
    landName: dataMap.dialogForm.landName,
    name: dataMap.dialogForm.name,
    treeCode: dataMap.dialogForm.treeCode,
    breed: dataMap.dialogForm.breed,
    ownership: dataMap.dialogForm.ownership,
    dbh: dataMap.dialogForm.dbh,
    treeAge: dataMap.dialogForm.treeAge,
    crownDiameter: dataMap.dialogForm.crownDiameter,
    height: dataMap.dialogForm.height,
    situation: dataMap.dialogForm.situation,
    growingStatus: dataMap.dialogForm.growingStatus,
    curingMethod: dataMap.dialogForm.curingMethod,
    remark: dataMap.dialogForm.remark
  }
  if (!dataMap.dialogForm.id) {
    create(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({ message: '新增成功', type: 'success' })
        dataMap.dialogVisible = false
        search()
      }
    })
  } else {
    update(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({ message: '修改成功', type: 'success' })
        dataMap.dialogVisible = false
        search()
      }
    })
  }
}

/** 表格勾选 */
const handleSelectionChange = (selection: any) => {
  dataMap.ids = selection.map((x: any) => x.id)
  console.log(' dataMap.ids', dataMap.ids)

  dataMap.single = selection.length !== 1
  dataMap.multiple = !selection.length
}

onMounted(() => {
  /** 获取所有科属 dictionary*/
  getDictionary({ code: 'plantFamily' }).then((res: any) => {
    const dictionary = res.data.map((x: any) => ({
      label: x.dictValue,
      value: x.dictKey
    }))
    let none = dataMap.dialogOptions.find((x: any) => x.prop === 'breed')
    if (none) none.options = dictionary
  })

  /** 获取所有绿地 */
  getAll(null).then((res: any) => {
    const greenbeltOptions = res.data.map((x: any) => ({
      label: x.name,
      value: x.id
    }))

    let none = dataMap.dialogOptions.find((x: any) => x.prop === 'landId')
    console.log(none)

    if (none) none.options = greenbeltOptions
    console.log(' dataMap.dialogOptions', dataMap.dialogOptions)
  })

  search()
})
</script>