<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:19:41
 * @LastEditTime: 2021-10-20 11:04:37
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\maintenanceRecord\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" :disabled="dataMap.multiple" plain size="small" @click="handleDelete"> 删除 </el-button>
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
      <el-table-column label="工作前照片">
        <template #default="scope">
          <el-button v-if="scope.row.afWorkPicIds" size="mini" type="text" @click="handleView(scope.row, 'afWorkPicIds')"> 查看 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="工作后照片">
        <template #default="scope">
          <el-button v-if="scope.row.beWorkPicIds" size="mini" type="text" @click="handleView(scope.row, 'beWorkPicIds')"> 查看 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime"> </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)"> 修改 </el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </XTable>

    <XRecord
      :title="dataMap.title"
      :id="dataMap.dialogForm.id"
      :itemId="router.currentRoute.value.query.id"
      v-model:visible="dataMap.dialogVisible"
      @cancel="cancel"
      @callback="submitForm"
    />
    <el-dialog class="preview" title="查看" v-model="dataMap.preview" :close-on-click-modal="false" width="600px">
      <img v-for="itme in dataMap.beWorkPicIdsFileList" :key="itme.id" :src="itme.url" alt="" class="preview_img" />
    </el-dialog>
  </BasicContainer>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent, reactive, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog  } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Pager } from '@/dtos'
import { useStore } from '@/store'
import qs from 'qs'
import { getList, create, update, remove } from '@/apis/conserve/taskLedger'
import { getAll } from '@/apis/geogSys/greenbelt'

import XRecord from './xrecord.vue'

import { resourceAll } from '@/apis/score/resource'

const options = [
  { prop: 'staffName', label: '职员名称' },
  { prop: 'taskName', label: '任务名称' },
  { prop: 'groupName', label: '分组名称' },
  // { prop: 'itemName', label: '具体养护项目名称' },
  { prop: 'beginEnergy', label: '交通工具开始油量/电量' },
  { prop: 'curingDescription', label: '本次出勤养护描述' },
  { prop: 'endEnergy', label: '交通工具结束油量/电量' },
  { prop: 'fee', label: '当次养护经费' },
  { prop: 'fishTime', label: '工作结束时间' },
  { prop: 'growingStatus', label: '本次生长情况描述' },
  { prop: 'isCompleted', label: '本次出勤是否完成当次任务' },
  { prop: 'isTraffic', label: '是否使用交通工具' },
  { prop: 'location', label: '工作GPS定位' },
  { prop: 'reason', label: '未完成任务原因' },
  { prop: 'remark', label: '备注' },
  { prop: 'toolWearDescr', label: '工具损耗描述' }
]

const router = useRouter()

interface nurseryStock {
  id: string
  landId: string
  landName: string
  seedlingName: string
  seedlingCode: string
  type: number | null
  category: string
  crownDiameter: string
  groundDiameter: string
  ballDiameter: string
  height: string
  dbh: string
  fosterYears: string
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
  seedlingName: '',
  seedlingCode: '',
  type: null,
  category: '',
  crownDiameter: '',
  groundDiameter: '',
  ballDiameter: '',
  height: '',
  dbh: '',
  fosterYears: '',
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
  ids: [],
  single: true,
  multiple: true,
  preview: false,
  beWorkPicIdsFileList: []
})
/** 查询 */
const search = async ({ index }: any = {}) => {
  console.log('router', router.currentRoute.value.query)

  if (index) dataMap.pagination.index = index
  const parsm = Object.assign({}, dataMap.formData, {
    itemId: router.currentRoute.value.query.id,
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

const handleView = (row: any, category: string) => {
  dataMap.preview = true
  switch (category) {
    case 'afWorkPicIds':
      resourceAll({ bizId: '1', idList: row.afWorkPicIds }).then((res: any) => {
        // let  imgList:any = []
        dataMap.beWorkPicIdsFileList = res.data.map((x: any) => {
          x.url = x.resPath
          return x
        })
      })
      break
    case 'beWorkPicIds':
      resourceAll({ bizId: '1', idList: row.beWorkPicIds }).then((res: any) => {
        // let  imgList:any = []
        dataMap.beWorkPicIdsFileList = res.data.map((x: any) => {
          x.url = x.resPath
          return x
        })
      })
      break

    default:
      break
  }
  // console.log('>>>>>>>>', '我是查看')
}

/** 新增 */
const handleAdd = () => {
  reset()
  nextTick(() => {
    dataMap.dialogForm.id = ''
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
    let ids = qs.stringify({ ids: (row.id && [row.id]) || dataMap.ids }, { arrayFormat: 'brackets' })
    remove(ids).then((res: any) => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}

/** 提交 */
const submitForm = (params: any) => {
  if (!params.id) {
    create(params).then(res => {
      if (res?.code == 200) {
        dataMap.dialogVisible = false
        search({ index: 1 })
        ElMessage({ message: `新增成功`, type: 'success' })
      }
    })
  } else {
    update(params).then(res => {
      if (res?.code == 200) {
        dataMap.dialogVisible = false
        search({ index: 1 })
        ElMessage({ message: `修改成功`, type: 'success' })
      }
    })
  }
}

const dialogChange = ({ category, value, data }: any) => {
  if (category === 'landId') {
    dataMap.dialogForm.landName = ''
    if (value) {
      dataMap.dialogForm.landName = data.label
    }
  }
}

/** 表格勾选 */
const handleSelectionChange = selection => {
  dataMap.ids = selection.map((x: any) => x.id)
  console.log(' dataMap.ids', dataMap.ids)

  dataMap.single = selection.length !== 1
  dataMap.multiple = !selection.length
}

onMounted(() => {
  search()
})
</script>
<style lang="scss" scoped>
.preview_img {
  width: 160px;
  height: 160px;
  margin-right: 20px;
}
::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>