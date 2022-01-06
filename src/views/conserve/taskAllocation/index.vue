<!--
 * @Author: XNY
 * @Date: 2021-09-18 16:19:41
 * @LastEditTime: 2021-10-13 14:10:05
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\taskAllocation\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd"> 新增 </el-button>
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
          <el-button size="mini" type="text" @click="handleTasking(scope.row)"> 任务分配 </el-button>
        </template>
      </el-table-column>
    </XTable>

    <el-dialog v-model="dataMap.taskingVisible" :title="'任务分配'" :close-on-click-modal="false" width="700px">
      <el-form ref="tasking" :model="dataMap.taskingForm" :rules="dataMap.taskingRules" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分配项目" prop="projects">
              <el-select
                clearable
                multiple
                collapse-tags
                v-model="dataMap.taskingForm.projects"
                placeholder="请选择"
                size="small"
                style="width: 100%"
              >
                <el-option v-for="item in dataMap.projectOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否分组" prop="isGroup">
              <el-radio-group
                v-model="dataMap.taskingForm.isGroup"
                @change="taskingChange({ category: 'isGroup', value: dataMap.taskingForm.isGroup })"
              >
                <el-radio v-for="item in dataMap.isGroupOption" :key="item.value" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.taskingForm.isGroup === true">
            <el-form-item label="所选分组" prop="workIds">
              <el-select clearable multiple collapse-tags v-model="dataMap.taskingForm.workIds" placeholder="请选择" size="small" style="width: 100%">
                <el-option v-for="item in dataMap.groupOption" :key="item.id" :label="item.groupName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.taskingForm.isGroup === false">
            <el-form-item label="职工人员" prop="staffWorkIds">
              <el-select
                clearable
                multiple
                collapse-tags
                v-model="dataMap.taskingForm.staffWorkIds"
                placeholder="请选择"
                size="small"
                style="width: 100%"
              >
                <el-option v-for="item in dataMap.clerkOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="taskingSubmitForm" size="small">确 定</el-button>
          <el-button size="small" @click="taskingCancel">取 消</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增,修改 -->
    <el-dialog v-model="dataMap.dialogVisible" :title="dataMap.title" :close-on-click-modal="false" width="700px">
      <el-form ref="ruleForm" :model="dataMap.dialogForm" :rules="dataMap.dialogRules" label-width="130px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="绿地名称" prop="landId">
              <el-select
                clearable
                v-model="dataMap.dialogForm.landId"
                placeholder="请选择"
                size="small"
                style="width: 100%"
                @change="
                  dialogChange({
                    category: 'landId',
                    value: dataMap.dialogForm.landId,
                    data: dataMap.land.find(x => x.value === dataMap.dialogForm.landId)
                  })
                "
              >
                <el-option v-for="item in dataMap.land" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="taskName">
              <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.taskName" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.title === '修改'">
            <el-form-item label="任务编号" prop="taskCode">
              <el-input disabled clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.taskCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分类" prop="type">
              <el-select clearable v-model="dataMap.dialogForm.type" placeholder="请选择" size="small" style="width: 100%">
                <el-option v-for="item in dataMap.typeOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型" prop="taskType">
              <el-select clearable v-model="dataMap.dialogForm.taskType" placeholder="请选择" size="small" style="width: 100%">
                <el-option v-for="item in dataMap.taskTypeOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select clearable v-model="dataMap.dialogForm.status" placeholder="请选择" size="small" style="width: 100%">
                <el-option v-for="item in dataMap.statusOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作细项" prop="workItem">
              <el-select clearable v-model="dataMap.dialogForm.workItem" placeholder="请选择" size="small" style="width: 100%">
                <el-option v-for="item in dataMap.workItemOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="任务总执行次数" prop="totalNumber">
              <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.totalNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item clearable label="时间类型" prop="timeType">
              <el-select
                v-model="dataMap.dialogForm.timeType"
                placeholder="请选择"
                size="small"
                style="width: 100%"
                @change="dialogChange({ category: 'timeType', value: dataMap.dialogForm.timeType })"
              >
                <el-option v-for="item in dataMap.timeTypeOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.dialogForm.timeType === 1">
            <el-form-item label="年份" prop="year">
              <el-date-picker
                style="width: 100%"
                v-model="dataMap.dialogForm.year"
                type="year"
                size="small"
                placeholder="请选择"
                @change="dialogChange({ category: 'year', value: dataMap.dialogForm.year })"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="dataMap.dialogForm.timeType === 1">
            <el-form-item label="月份" prop="monthStr">
              <el-select
                clearable
                multiple
                v-model="dataMap.dialogForm.monthStr"
                placeholder="请选择"
                size="small"
                style="width: 100%"
                @change="dialogChange({ category: 'monthStr', value: dataMap.dialogForm.monthStr })"
              >
                <el-option v-for="item in dataMap.monthStrOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.dialogForm.timeType === 1">
            <el-form-item label="时间" prop="dateRange">
              <el-time-picker
                is-range
                v-model="dataMap.dialogForm.dateRange"
                style="width: 100%"
                type="timerange"
                size="small"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择"
                @change="dialogChange({ category: 'dateRange', value: dataMap.dialogForm.dateRange })"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataMap.dialogForm.timeType === 2 || dataMap.dialogForm.timeType === 3">
            <el-form-item label="固定时间" prop="stationary">
              <el-date-picker
                v-model="dataMap.dialogForm.stationary"
                style="width: 100%"
                type="datetimerange"
                size="small"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择"
                @change="dialogChange({ category: 'stationary', value: dataMap.dialogForm.stationary })"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
          <el-button size="small" @click="cancel">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </BasicContainer>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent, reactive, ref, nextTick, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage, ElUpload } from 'element-plus'
import { Pager } from '@/dtos'
import { useStore } from '@/store'
import qs from 'qs'
import { getList, create, update, remove, get, assignmentGet, assignmentsCreate } from '@/apis/conserve/taskDistribute'
import { getAll } from '@/apis/geogSys/greenbelt'
import { getDictionary } from '@/apis/system/dictionary'
import dayjs from 'dayjs'
import { getAll as staffAll } from '@/apis/staff'
import { all as groupAll } from '@/apis/conserve/groupStaff'
import { getAll as greenbeltAll } from '@/apis/geogSys/greenbelt'
import { greenWayAll } from '@/apis/conserve/greenway'
import { all as seedlingAll } from '@/apis/conserve/seedling'
import { all as treeAll } from '@/apis/conserve/tree'
import { all as pestControlAll } from '@/apis/conserve/pestControl'
const options = [
  { prop: 'landName', label: '绿地名称' },
  { prop: 'taskName', label: '任务名称' },
  { prop: 'taskCode', label: '任务编号' },
  { prop: 'type', label: '任务分类' },
  { prop: 'taskType', label: '任务类型' },
  { prop: 'timeType', label: '时间类型' },
  // { prop: 'source', label: '任务分类', formatter:(row:any)=>{
  //   // formatter
  //   return row.source == 0 ? '平台':row.source == 1?'app':'巡查上报'
  // }},
  { prop: 'workItem', label: '工作细项' },
  { prop: 'status', label: '状态' },
  { prop: 'totalNumber', label: '任务总执行次数' },
  { prop: 'finishNumber', label: '任务已执行次数' },
  { prop: 'updateTime', label: '更新时间' }
]

const router = useRouter()

const ruleForm = ref()

const tasking = ref()
const { ctx: _this }: any = getCurrentInstance()

interface nurseryStock {
  id: string
  landId: string
  landName: string
  taskName: string
  taskCode: string
  type: string
  taskType: string
  status: string
  workItem: string
  timeType: number | undefined
  year: string
  day: number | undefined
  totalNumber: number | null
  monthStr: string[]
  stationary: string[]
  dateRange: string[]
  // [x: string]: any
}
const defaultDialogForm: nurseryStock = {
  id: '',
  landId: '',
  landName: '',
  taskName: '',
  taskCode: '',
  type: '',
  taskType: '',
  status: '',
  workItem: '',
  timeType: undefined,
  year: '',
  day: undefined,
  totalNumber: null,
  monthStr: [],
  stationary: [],
  dateRange: []
}

interface assignments {
  id: string
  isGroup: boolean | null
  taskId: string
  taskName: string
  workIds: string[]
  staffWorkIds: string[]
  projects: string[]
}
const defaultTaskingForm: assignments = {
  id: '',
  isGroup: null,
  taskId: '',
  taskName: '',
  workIds: [],
  staffWorkIds: [],
  projects: []
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
        message: '必选',
        trigger: 'change'
      }
    ],
    taskName: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    taskCode: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    totalNumber: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    type: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    taskType: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    status: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    workItem: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    timeType: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    year: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    monthStr: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    stationary: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    dateRange: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ]
  },
  land: [],
  typeOption: [
    {
      label: '日常任务',
      value: 0
    },
    {
      label: '巡查反馈任务',
      value: 1
    },
    {
      label: '特定任务',
      value: 2
    },
    {
      label: '病虫害防治任务',
      value: 3
    }
  ],
  taskTypeOption: [
    {
      label: '绿地养护',
      value: 0
    },
    {
      label: '绿道养护',
      value: 1
    },
    {
      label: '苗木养护',
      value: 2
    },
    {
      label: '古树名木养护',
      value: 3
    },
    {
      label: '病虫害防治',
      value: 4
    }
  ],
  statusOption: [
    {
      label: '未执行',
      value: 0
    },
    {
      label: '执行中',
      value: 1
    },
    {
      label: '已完成',
      value: 2
    }
  ],
  workItemOption: [],
  timeTypeOption: [
    {
      label: '月份',
      value: 1
    },
    {
      label: '天数',
      value: 2
    },
    {
      label: '固定时间',
      value: 3
    }
  ],
  monthStrOption: [
    {
      label: '1月',
      value: '1'
    },
    {
      label: '2月',
      value: '2'
    },
    {
      label: '3月',
      value: '3'
    },
    {
      label: '4月',
      value: '4'
    },
    {
      label: '5月',
      value: '5'
    },
    {
      label: '6月',
      value: '6'
    },
    {
      label: '7月',
      value: '7'
    },
    {
      label: '8月',
      value: '8'
    },
    {
      label: '9月',
      value: '9'
    },
    {
      label: '10月',
      value: '10'
    },
    {
      label: '11月',
      value: '11'
    },
    {
      label: '12月',
      value: '12'
    }
  ],
  taskingVisible: false,
  taskingForm: defaultTaskingForm,
  isGroupOption: [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ],
  clerkOption: [],
  groupOption: [],
  taskingRules: {
    projects: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    isGroup: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    workIds: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    staffWorkIds: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ]
  },
  projectOption: []
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
  rows.map((x: any) => {
    dataMap.typeOption.forEach((y: any) => {
      if (x.type == y.value) {
        x.type = y.label
      }
    })
    dataMap.taskTypeOption.forEach((y: any) => {
      if (x.taskType == y.value) {
        x.taskType = y.label
      }
    })
    dataMap.statusOption.forEach((y: any) => {
      if (x.status == y.value) {
        x.status = y.label
      }
    })
    dataMap.timeTypeOption.forEach((z: any) => {
      if (x.timeType == z.value) {
        x.timeType = z.label
      }
    })
    dataMap.workItemOption.forEach((z: any) => {
      if (x.workItem == z.value) {
        x.workItem = z.label
      }
    })
  })
  dataMap.loading = false
  dataMap.tableData = rows
  dataMap.pagination.all = total
}
const reset = () => {
  dataMap.dialogForm = Object.assign({}, defaultDialogForm)
  dataMap.taskingForm = Object.assign({}, defaultTaskingForm)
}
/** 新增 */
const handleAdd = () => {
  reset()
  nextTick(() => {
    dataMap.dialogVisible = true
    // ruleForm.value.clearValidate()
    console.log(ruleForm.value)

    if (ruleForm.value) {
      ruleForm.value.resetFields()
    }
  })
  dataMap.title = '新增'
}

const handleUpdate = (row: any) => {
  // dataMap.dialogForm = Object.assign({}, row)
  get(row.id).then(({ data }: any) => {
    data.monthStr = data.monthStr.split(',')
    if (data.timeType === 1) {
      data.year = data.year.toString()
      data.dateRange = [
        dayjs(data.startTime, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        dayjs(data.endTime, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      ]
    }
    if (data.timeType !== 1) {
      data.stationary = [data.beginDate, data.endDate]
    }
    dataMap.dialogForm = data
  })
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
/** 任务分配 */
const handleTasking = (row: any) => {
  reset()
  console.log('dataMap.taskingForm', dataMap.taskingForm)

 
  assignmentGet(row.id).then(({ data }: any) => {
    dataMap.taskingForm = data
    dataMap.taskingForm.taskName = row.taskName
    dataMap.taskingForm.projects = []
    dataMap.taskingForm.workIds = []
    dataMap.taskingForm.staffWorkIds = []
    if (data.items) {
      data.items.forEach((x: any) => {
        dataMap.taskingForm.projects.push(x.itemId)
      })
    }

    if (data.taskWorks) {
      if (data.isGroup) {
        data.taskWorks.forEach((x: any) => {
          dataMap.taskingForm.workIds.push(x.workIds)
        })
        groupAll().then(({ data }: any) => {
          dataMap.groupOption = data
        })
      } else {
        staffAll({ type: 0 }).then(({ data }: any) => {
          dataMap.clerkOption = data.map((x: any) => ({
            label: x.name,
            value: x.id
          }))
        })
        data.taskWorks.forEach((x: any) => {
          dataMap.taskingForm.staffWorkIds.push(x.workIds)
        })
      }
    }
    dataMap.taskingVisible = true
  })

  switch (row.taskType) {
    case '绿地养护':
      greenbeltAll().then(({ data }: any) => {
        dataMap.projectOption = data.map((x: any) => ({
          label: x.name,
          value: x.id
        }))
      })
      break
    case '绿道养护':
      greenWayAll().then(({ data }: any) => {
        dataMap.projectOption = data.map((x: any) => ({
          label: x.laneName,
          value: x.id
        }))
      })
      break
    case '苗木养护':
      seedlingAll().then(({ data }: any) => {
        dataMap.projectOption = data.map((x: any) => ({
          label: x.seedlingName,
          value: x.id
        }))
      })
      break
    case '古树名木养护':
      treeAll().then(({ data }: any) => {
        dataMap.projectOption = data.map((x: any) => ({
          label: x.name,
          value: x.id
        }))
      })
      break
    case '病虫害防治':
      pestControlAll().then(({ data }: any) => {
        dataMap.projectOption = data.map((x: any) => ({
          label: x.pestName,
          value: x.id
        }))
      })
      break

    default:
      break
  }
}

const taskingChange = ({ category, value }: any) => {
  if (category === 'isGroup') {
    dataMap.taskingForm.workIds = []
    dataMap.taskingForm.staffWorkIds = []

    // dataMap.groupOption = []
    // dataMap.clerkOption = []
    if (value) {
      groupAll().then(({ data }: any) => {
        dataMap.groupOption = data
      })
    } else {
      staffAll({ type: 0 }).then(({ data }: any) => {
        dataMap.clerkOption = data.map((x: any) => ({
          label: x.name,
          value: x.id
        }))
      })
    }
  }
}

/** 分配提交 */

const taskingSubmitForm = () => {
  tasking.value.validate((valid: any) => {
    if (valid) {
      let itemVOS: any = []
      if (dataMap.taskingForm.projects) {
        dataMap.taskingForm.projects.forEach(x => {
          dataMap.projectOption.forEach((y: any) => {
            if (x == y.value) {
              itemVOS.push({
                itemId: y.value,
                itemName: y.label
              })
            }
          })
        })
      }
      let workIds = dataMap.taskingForm.workIds.length> 0 && dataMap.taskingForm.workIds || dataMap.taskingForm.staffWorkIds.length> 0 &&dataMap.taskingForm.staffWorkIds
      let params = {
        taskId: dataMap.taskingForm.taskId,
        taskName: dataMap.taskingForm.taskName,
        itemVOS,
        isGroup: dataMap.taskingForm.isGroup,
        workIds
      }
      assignmentsCreate(params).then(res => {
        if (res?.code == 200) {
          ElMessage({ message: '任务分配成功', type: 'success' })
          dataMap.taskingVisible = false
          search()
        }
      })
    }
  })
}

const dialogChange = ({ category, value, data }: any) => {
  if (category === 'landId') {
    dataMap.dialogForm.landName = ''
    if (value) {
      dataMap.dialogForm.landName = data.label
    }
  }
  if (category === 'timeType') {
    dataMap.dialogForm.year = ''
    dataMap.dialogForm.monthStr = []
    dataMap.dialogForm.stationary = []
    dataMap.dialogForm.dateRange = []
  }
  if (category === 'year') {
    dataMap.dialogForm.monthStr = []
    dataMap.dialogForm.dateRange = []
    if (value) {
      // dataMap.dialogForm.monthStr = []
    }
  }
}

/** 提交 */
const submitForm = () => {
  ruleForm.value.validate((valid: any) => {
    if (valid) {
      let startTime = ''
      let endTime = ''
      let endDate = ''
      let beginDate = ''
      if (dataMap.dialogForm.stationary) {
        // console.log('2221312121212')

        beginDate = dayjs(dataMap.dialogForm.stationary[0]).format('YYYY-MM-DD HH:mm:ss')
        endDate = dayjs(dataMap.dialogForm.stationary[1]).format('YYYY-MM-DD HH:mm:ss')
      }

      if (dataMap.dialogForm.dateRange) {
        startTime = dayjs(dataMap.dialogForm.dateRange[0]).format('HH:mm:ss')
        endTime = dayjs(dataMap.dialogForm.dateRange[1]).format('HH:mm:ss')
        // console.log('2221312121212')
      }
      if (dataMap.dialogForm.timeType === 2 || dataMap.dialogForm.timeType === 3) {
        startTime = ''
        endTime = ''
        dataMap.dialogForm.year = ''
        dataMap.dialogForm.monthStr = []
        dataMap.dialogForm.day = undefined
        if (dataMap.dialogForm.timeType === 2) {
          dataMap.dialogForm.day = dayjs(dataMap.dialogForm.stationary[1]).diff(dayjs(dataMap.dialogForm.stationary[0]), 'days')
        }
      }
      if (dataMap.dialogForm.timeType === 1) {
        dataMap.dialogForm.day = undefined
        beginDate = ''
        endDate = ''
        dataMap.dialogForm.year = dayjs(dataMap.dialogForm.year).format('YYYY')
      }
      const params = {
        id: dataMap.dialogForm.id,
        landId: dataMap.dialogForm.landId,
        landName: dataMap.dialogForm.landName,
        taskName: dataMap.dialogForm.taskName,
        taskCode: dataMap.dialogForm.taskCode,
        type: dataMap.dialogForm.type,
        taskType: dataMap.dialogForm.taskType,
        status: dataMap.dialogForm.status,
        workItem: dataMap.dialogForm.workItem,
        totalNumber: dataMap.dialogForm.totalNumber,
        timeType: dataMap.dialogForm.timeType,
        year: dataMap.dialogForm.year,
        day: dataMap.dialogForm.day,
        monthStr: dataMap.dialogForm.monthStr.toString(),
        startTime,
        endTime,
        beginDate,
        endDate
      }

      // console.log('养护>>><<>>>>', params, dataMap.dialogForm)
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
  })
}

const cancel = () => {
  dataMap.dialogVisible = false
  reset()
  ruleForm.value.resetFields()
}
const taskingCancel = () => {
  reset()
  dataMap.taskingVisible = false
  tasking.value.resetFields()
  // reset()
}

/** 表格勾选 */
const handleSelectionChange = () => {}

onMounted(() => {
  /** 获取工作细项 workItems*/
  getDictionary({ code: 'workItems' }).then((res: any) => {
    dataMap.workItemOption = res.data.map((x: any) => ({
      label: x.dictValue,
      value: x.dictKey
    }))
    // let none = dataMap.dialogOptions.find((x:any) =>x.prop === 'breed')
    // if(none) none.options = dictionary
  })
  /** 获取所有绿地 */
  getAll(null).then((res: any) => {
    dataMap.land = res.data.map((x: any) => ({
      label: x.name,
      value: x.id
    }))
  })

  search()
})
</script>
<style lang="scss" scoped>
.el-col {
  height: 50px;
}
::v-deep .el-form-item__error {
  padding-top: 0px;
}
</style>