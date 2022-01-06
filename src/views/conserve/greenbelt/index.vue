<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:19:41
 * @LastEditTime: 2021-10-19 10:36:37
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\greenbelt\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
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
import { onMounted, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Pager } from '@/dtos'
import { useStore } from '@/store'
import { getList, update,removeBatch } from '@/apis/geogSys/greenbelt'
import qs from 'qs'

const options = [
  { prop: 'name', label: '绿地名称' },
  { prop: 'code', label: '绿地编号' },
  {
    prop: 'applyType',
    label: '绿地类型',
    formatter: (row: any) => {
      return row.applyType == 10 ? '公园绿地' : row.applyType == 20 ? '生产绿地' : row.applyType == 30 ? '防护绿地管理' : '附属绿地管理'
    }
  },
  { prop: 'areaSize', label: '占地面积( ㎡)' },
  { prop: 'speedNum', label: '苗木数量' },
  { prop: 'famousTreeNum', label: '名木古树数量' },
  { prop: 'situation', label: '养护情况' },
  { prop: 'addr', label: '地址' },
  { prop: 'updateTime', label: '更新时间' }
]

const router = useRouter()

const dialog = ref()

interface greenbelt {
  id: string
  addr: string
  areaSize: string
  updateTime: string
  code: string
  name: string
  situation: string
  speedNum: Number
  famousTreeNum: Number
  applyType: Number
}

const defaultDialogForm: greenbelt = {
  id: '',
  addr: '',
  areaSize: '',
  updateTime: '',
  code: '',
  name: '',
  situation: '',
  speedNum: 0,
  famousTreeNum: 0,
  applyType: 0
}
const dataMap = reactive({
  formData: {},
  tableData: [],
  loading: false,
  pagination: new Pager(),
  /** 弹框 */
  title: '',
  dialogForm: defaultDialogForm,
  dialogOptions,
  dialogVisible: false,
  dialogRules: {
    situation: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  ids:[],
  single:true,
  multiple:true
})
/** 查询 */
const search = async ({ index }: any = {}) => {
  if (index) dataMap.pagination.index = index
  const params: any = Object.assign({}, dataMap.formData, {
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  dataMap.loading = true
  const { rows, total }: any = await getList(params)

  dataMap.tableData = rows
  dataMap.pagination.all = total
  dataMap.loading = false

  //  console.log('>>>>>',rows,total);
}

const reset = ()=>{
  dataMap.dialogForm = Object.assign({},defaultDialogForm) 
}
/** 新增 */
const handleAdd = () => {
  reset()
  dataMap.dialogVisible = true
  dataMap.title = '新增'
}
/**养护记录 */
const handleRecord = ()=>{
    router.push(
    {
      path: '/maintenanceRecord',
      query: {
        id: dataMap.ids.toString(),
      }
    }
  )
  // router.
}
/** 修改 */
const handleUpdate = (row: any) => {
  dataMap.dialogVisible = true
  dataMap.title = '修改养护'
  dataMap.dialogForm = Object.assign({}, row)
}

const cancel = () => {
  // search()
  // console.log(14444);
  // dataMap.dialogForm = {}
}

/** 删除 */
const handleDelete = (row: any) => {
  ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let ids = [row.id]
    // let ids = qs.stringify({ ids: [row.id] }, { arrayFormat: 'brackets' })
    removeBatch({ids}).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}
/** 弹框选择器 change 事件 */
const dialogChange = (e: any) => {}
/** 弹框输入框 focus 事件*/
const dialogFocus = () => {}
/** 提交*/
const submitForm = () => {
  let parms: any = {
    id: dataMap.dialogForm.id,
    situation: dataMap.dialogForm.situation
  }
  update(parms).then((res: any) => {
    if (res.code == 200) {
      ElMessage({ message: '修改成功', type: 'success' })
      dataMap.dialogVisible = false
      search()
    }
  })
}
/** 表格勾选 */
const handleSelectionChange = (selection:any) => {
      dataMap.ids = selection.map((x: any) => x.id)
    console.log(' dataMap.ids', dataMap.ids);
    
    dataMap.single = selection.length !== 1;
    dataMap.multiple = !selection.length;
}

onMounted(() => {
  search()
})
</script>