<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:19:41
 * @LastEditTime: 2021-10-20 11:18:24
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\greenway\index.vue
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
import { getList, greenWayCreate, greenWayUpdate, greenWayRemove } from '@/apis/conserve/greenway'
import {resourceAll} from '@/apis/score/resource'

const options = [
  { prop: 'laneName', label: '绿道名称' },
  { prop: 'laneCode', label: '绿道编号' },
  { prop: 'length', label: '长度(m)' },
  { prop: 'situation', label: '养护情况描述' },
  { prop: 'curingMethod', label: '养护方式描述' },
  { prop: 'remark', label: '备注' },
  { prop: 'updateTime', label: '更新时间' }
]

const router = useRouter()

interface greenway {
  id: string
  laneName: string
  laneCode: string
  length: number | null
  situation: string
  curingMethod: string
  remark: string
  picPathIds: any
  [x: string]: any
}
const defaultDialogForm: greenway = {
  id: '',
  laneName: '',
  laneCode: '',
  length: null,
  situation: '',
  curingMethod: '',
  remark: '',
  picPathIds: []
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
    laneName: [
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
    situation: [
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
  ids:[],
  single:true,
  multiple:true
})
/** 查询 */
const search = async({ index }: any = {}) => {
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

const handleUpdate = async(row: any) => {
  // .split(",")
  const params = {
    bizId:'1',
    idList: row.picPathIds
  }
 resourceAll(params).then((res:any) =>{
  // let  imgList:any = []
 const imgList =res.data.map(x=>{
     x.url = x.resPath
     return x
  })
  console.log('imgList',imgList);
  
  (dataMap.dialogOptions.find(x => x.prop === 'picPathIds') as any).fileList = imgList
  dataMap.dialogForm= Object.assign({},row)
  dataMap.dialogVisible = true
  dataMap.title = '修改'
 })

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
/** 删除 */
const handleDelete = (row:any) => {
  ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let ids = qs.stringify({ ids: [row.id] }, { arrayFormat: 'brackets' })
    greenWayRemove(ids).then((res: any) => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}

/** 提交 */
const submitForm = () => {
  const params = {
    id: dataMap.dialogForm.id,
    laneName: dataMap.dialogForm.laneName,
    laneCode: dataMap.dialogForm.laneCode,
    length: dataMap.dialogForm.length,
    situation: dataMap.dialogForm.situation,
    curingMethod: dataMap.dialogForm.curingMethod,
    remark: dataMap.dialogForm.remark,
    picPathIds: dataMap.dialogForm.picPathIds.toString()
  }
  if (!dataMap.dialogForm.id) {
    greenWayCreate(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({ message: '新增成功', type: 'success' })
        dataMap.dialogVisible = false
        search()
      }
    })
  } else {
    greenWayUpdate(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({ message: '修改成功', type: 'success' })
        dataMap.dialogVisible = false
        search()
      }
    })
  }
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