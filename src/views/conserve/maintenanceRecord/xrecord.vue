<!--
 * @Author: XNY
 * @Date: 2021-10-14 10:36:54
 * @LastEditTime: 2021-10-20 09:42:11
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\conserve\maintenanceRecord\xrecord.vue
-->
<template>
  <el-dialog
    top="7vh"
    :title="title"
    v-model="visible"
    :width="width"
    :fullscreen="fullscreen"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :show-close="showClose"
    :append-to-body="appendToBody"
    :modal-append-to-body="modalAppendToBody"
    :destroy-on-close="destroyOnClose || false"
    custom-class="dialog-style"
  >
    <el-form ref="ruleForm" :model="dataMap.dialogForm" :rules="dataMap.dialogRules" label-width="120px" class="demo-ruleForm">
      <el-row class="conserve_overall">
        <el-col :span="6">
          <el-form-item label="职员名称" prop="staffName">
            <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.staffName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="任务名称" prop="taskName">
            <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.taskName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分组名称" prop="groupId">
            <el-select
              clearable
              style="width: 100%"
              v-model="dataMap.dialogForm.groupId"
              placeholder="请选择"
              size="small"
              @change="
                dialogChange({
                  category: 'groupId',
                  value: dataMap.dialogForm.groupId,
                  data: dataMap.groupOption.find(x => x.value === dataMap.dialogForm.groupId)
                })
              "
            >
              <el-option v-for="itme in dataMap.groupOption" :key="itme.value" :label="itme.label" :value="itme.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用交通工具" prop="isTraffic">
            <el-radio-group
              v-model="dataMap.dialogForm.isTraffic"
              @change="taskingChange({ category: 'isTraffic', value: dataMap.dialogForm.isGroup })"
            >
              <el-radio v-for="item in dataMap.isTrafficOption" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
            <!-- <el-input placeholder="请输入" size="small" v-model="dataMap.dialogForm.name" /> -->
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="dataMap.dialogForm.isTraffic">
          <el-form-item label="交通工具开始" prop="beginEnergy">
            <el-input
              clearable
              style="width: calc(100% - 80px); margin-right: 13px"
              placeholder="请输入"
              size="small"
              v-model="dataMap.dialogForm.beginEnergy"
            />
            <span>油量/电量</span>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="dataMap.dialogForm.isTraffic">
          <el-form-item label="交通工具结束" prop="endEnergy">
            <el-input
              clearable
              style="width: calc(100% - 80px); margin-right: 13px"
              placeholder="请输入"
              size="small"
              v-model="dataMap.dialogForm.endEnergy"
            />
            <span>油量/电量</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="本次养护经费" prop="fee">
            <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.fee" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工作GPS定位" prop="location">
            <el-input clearable placeholder="请输入" size="small" v-model="dataMap.dialogForm.location" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="本次任务" prop="isCompleted">
            <!-- <el-input placeholder="请输入" size="small" v-model="dataMap.dialogForm.name" /> -->
            <el-radio-group
              v-model="dataMap.dialogForm.isCompleted"
              @change="taskingChange({ category: 'isCompleted', value: dataMap.dialogForm.isCompleted })"
            >
              <el-radio v-for="item in dataMap.isTrafficOption" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工作结束时间" prop="fishTime">
            <el-date-picker style="width: 100%" size="small" v-model="dataMap.dialogForm.fishTime" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 4px">
          <el-form-item label="工作前图片" prop="afWorkPicIds">
            <el-upload
              v-model="dataMap.afWorkPicIds"
              class="avatar-uploader"
              :action="dataMap.uploadImgUrl"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="dataMap.headers"
              :data="{ bizId: '1', resSource: '养护记录' }"
              :disabled="dataMap.disabled"
              list-type="picture-card"
              :limit="dataMap.limit"
              :file-list="dataMap.afWorkPicIdsFileList"
              :class="{ disabledUpload: dataMap.afWorkPicIdsFileList.length === dataMap.limit }"
              accept="image/*"
              ref="upload"
            >
              <i class="el-icon-plus avatar-uploader-icon" />
              <template #file="{ file }">
                <div>
                  <img class="avatar1" :src="file.url" alt />
                  <span class="el-upload-list__item-actions">
                    <span v-if="!dataMap.disabled" class="el-upload-list__item-delete" @click="handleRemove(file, 'afWorkPicIds')">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="工作后图片" prop="beWorkPicIds">
            <el-upload
              ref="uploadFileList"
              v-model="dataMap.beWorkPicIds"
              class="avatar-uploader"
              :action="dataMap.uploadImgUrl"
              :show-file-list="true"
              :on-success="onSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="dataMap.headers"
              :data="{ bizId: '1', resSource: '养护记录' }"
              :disabled="dataMap.disabled"
              :limit="4"
              :file-list="dataMap.beWorkPicIdsFileList"
              accept="image/*"
              list-type="picture-card"
              :class="{ disabledUpload: dataMap.beWorkPicIdsFileList.length == 4 }"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
              <template #file="{ file }">
                <div>
                  <img class="avatar1" :src="file.url" alt />
                  <span class="el-upload-list__item-actions">
                    <span v-if="!dataMap.disabled" class="el-upload-list__item-delete" @click="handleRemove(file, 'beWorkPicIds')">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="本次出勤养护" prop="curingDescription">
            <el-input type="textarea" v-model="dataMap.dialogForm.curingDescription"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="本次生长情况" prop="growingStatus">
            <el-input type="textarea" v-model="dataMap.dialogForm.growingStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="dataMap.dialogForm.isCompleted === false">
          <el-form-item label="未完成任务" prop="reason">
            <el-input type="textarea" v-model="dataMap.dialogForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="工具损耗" prop="toolWearDescr">
            <el-input type="textarea" v-model="dataMap.dialogForm.toolWearDescr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="dataMap.dialogForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
        <el-button size="small" @click="cancel">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, defineProps, defineEmits, reactive, ref, nextTick, watch } from 'vue'
import { useStore } from '@/store'
import { ElMessageBox, ElMessage } from 'element-plus'
import { get, create, update, remove } from '@/apis/conserve/taskLedger'
import { all as groupAll } from '@/apis/conserve/groupStaff'
import dayjs from 'dayjs'
import { resourceRemove } from '@/apis/score/resource'
import { resourceAll } from '@/apis/score/resource'
import qs from 'qs'
const ruleForm = ref()
const uploadFileList = ref()
const upload = ref()

const store = useStore()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  modalAppendToBody: {
    type: Boolean,
    default: false
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '70%'
  },
  // top: {
  //   type: String,
  //   default: '5vh'
  // },
  itemId: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
})

interface nurseryStock {
  itemId: string
  id: string
  afWorkPicIds: string
  beWorkPicIds: string
  beginEnergy: string
  curingDescription: string
  endEnergy: string
  fee: string
  fishTime: string
  groupId: string
  growingStatus: string
  isCompleted: boolean | undefined
  isTraffic: boolean | undefined
  location: string
  reason: string
  remark: string
  staffName: string
  taskName: string
  toolWearDescr: string
  groupName: string
}

const defaultDialogForm: nurseryStock = {
  itemId: '',
  id: '',
  afWorkPicIds: '',
  beWorkPicIds: '',
  beginEnergy: '',
  curingDescription: '',
  endEnergy: '',
  fee: '',
  fishTime: '',
  groupId: '',
  groupName: '',
  growingStatus: '',
  isCompleted: undefined,
  isTraffic: undefined,
  location: '',
  reason: '',
  remark: '',
  staffName: '',
  taskName: '',
  toolWearDescr: ''
}

const dataMap = reactive({
  afWorkPicIds: [] as any[],
  beWorkPicIds: [] as any[],
  dialogForm: defaultDialogForm,
  dialogRules: {
    staffName: [{ required: true, message: '必填', trigger: 'blur' }],
    taskName: [{ required: true, message: '必填', trigger: 'blur' }],
    reason: [{ required: true, message: '必填', trigger: 'blur' }],
    toolWearDescr: [{ required: true, message: '必填', trigger: 'blur' }],
    location: [{ required: true, message: '必填', trigger: 'blur' }],
    isTraffic: [{ required: true, message: '必填', trigger: 'change' }],
    isCompleted: [{ required: true, message: '必选', trigger: 'change' }],
    growingStatus: [{ required: true, message: '必选', trigger: 'blur' }],
    groupId: [{ required: true, message: '必选', trigger: 'change' }],
    fishTime: [{ required: true, message: '必填', trigger: 'blur' }],
    fee: [{ required: true, message: '必填', trigger: 'blur' }],
    endEnergy: [{ required: true, message: '必填', trigger: 'blur' }],
    curingDescription: [{ required: true, message: '必填', trigger: 'blur' }],
    beginEnergy: [{ required: true, message: '必填', trigger: 'blur' }]
    // beWorkPicIds: [{ required: true, message: '必填', trigger: 'blur' }],
    // afWorkPicIds: [{ required: true, message: '必填', trigger: 'blur' }]
  },

  uploadImgUrl: process.env.VUE_APP_BASE_API + '/api-ecocity/v1/system/resource/upload',
  headers: {
    Authorization: 'Bearer ' + store.state.user.token
  },
  files: {},
  limit: 4,
  disabled: false,

  /**交通工具 */
  isTrafficOption: [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ],
  groupOption: [],
  afWorkPicIdsFileList: [] as any[],
  beWorkPicIdsFileList: [] as any[]
})

watch(
  () => props.id,
  val => {
    // console.log('val');
    dataMap.dialogForm = Object.assign({}, defaultDialogForm)
    if (ruleForm.value) {
      ruleForm.value.resetFields()
    }
    if (uploadFileList.value) {
      uploadFileList.value.clearFiles()
    }
    if (upload.value) {
      upload.value.clearFiles()
    }
    if (val) {
      get(val).then(({ data }: any) => {
        const params = {
          bizId: '1',
          idList: data.afWorkPicIds
        }
        dataMap.afWorkPicIds = []
        dataMap.beWorkPicIds = []
        dataMap.afWorkPicIdsFileList = []
        dataMap.beWorkPicIdsFileList = []
        if (data.afWorkPicIds) {
          resourceAll(params).then((res: any) => {
            // let  imgList:any = []
            dataMap.afWorkPicIdsFileList = res.data.map((x: any) => {
              dataMap.afWorkPicIds.push(x.id)
              x.url = x.resPath
              return x
            })
          })
        }
        if (data.beWorkPicIds) {
          resourceAll({ bizId: '1', idList: data.beWorkPicIds }).then((res: any) => {
            // let  imgList:any = []
            dataMap.beWorkPicIdsFileList = res.data.map((x: any) => {
              dataMap.beWorkPicIds.push(x.id)
              x.url = x.resPath
              return x
            })
          })
        }
        dataMap.dialogForm = data
      })
    }
  },
  {
    immediate: true
  }
)

const emit = defineEmits(['input', 'change', 'callback', 'cancel', 'focus', 'update:visible'])
const dialogChange = ({ category, value, data }: any) => {
  if (category === 'groupId') {
    if (value) {
      dataMap.dialogForm.groupName = data.label
    }
  }
}
/** 单选按钮时间 */
const taskingChange = ({ category, value }: any) => {}

const beforeAvatarUpload = (file: any) => {
  const isImage = file.type.includes('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只接受图片格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isImage && isLt2M
}

const handleRemove = (val: any, category: string) => {
  let ids = qs.stringify({ ids: [val.id] }, { arrayFormat: 'brackets' })
  resourceRemove(ids).then(res => {
    if (res?.code == 200) {
      if (category === 'beWorkPicIds') {
        dataMap.beWorkPicIdsFileList.some((x: any, i) => {
          if (val.id === x.id) {
            dataMap.beWorkPicIdsFileList.splice(i, 1)
          }
        })
        dataMap.beWorkPicIds.some((x: any, i) => {
          if (val.id === x) {
            dataMap.beWorkPicIds.splice(i, 1)
          }
        })
      }
      if (category === 'afWorkPicIds') {
        dataMap.afWorkPicIdsFileList.some((x: any, i) => {
          if (val.id === x.id) {
            dataMap.afWorkPicIdsFileList.splice(i, 1)
          }
        })
        dataMap.afWorkPicIds.some((x: any, i) => {
          if (val.id === x) {
            dataMap.afWorkPicIds.splice(i, 1)
          }
        })
      }

      ElMessage({ message: '删除成功', type: 'success' })
    }
  })
}
/** 文件上传成功时的钩子 */
const handleAvatarSuccess = (res: any, file: any, fileList: any) => {
  console.log('res', res)

  const { resPath, id } = res.data
  dataMap.afWorkPicIdsFileList.push({ id: id, url: resPath })
  dataMap.afWorkPicIds.push(id)
  // console.log('file', res, file)
  // props.options.find((x: any) => x.prop === 'picPathIds').fileList.push({ url: resPath })
}
/** 文件上传成功时的钩子 */
const onSuccess = (res: any, file: any, fileList: any) => {
  console.log('res', res)

  const { resPath, id } = res.data
  dataMap.beWorkPicIdsFileList.push({ id: id, url: resPath })
  dataMap.beWorkPicIds.push(id)
  // console.log('file', res, file)
  // props.options.find((x: any) => x.prop === 'picPathIds').fileList.push({ url: resPath })
}

/** 表单提交 */
const submitForm = () => {
  ruleForm.value.validate((valid: any) => {
    if (valid) {
      let parasm = {
        itemId: dataMap.dialogForm.itemId,
        id: dataMap.dialogForm.id,
        afWorkPicIds: dataMap.afWorkPicIds.toString(),
        beWorkPicIds: dataMap.beWorkPicIds.toString(),
        beginEnergy: dataMap.dialogForm.beginEnergy,
        curingDescription: dataMap.dialogForm.curingDescription,
        endEnergy: dataMap.dialogForm.endEnergy,
        fee: dataMap.dialogForm.fee,
        fishTime: dayjs(dataMap.dialogForm.fishTime).format('YYYY-MM-DD HH:ss:mm'),
        groupId: dataMap.dialogForm.groupId,
        groupName: dataMap.dialogForm.groupName,
        growingStatus: dataMap.dialogForm.growingStatus,
        isCompleted: dataMap.dialogForm.isCompleted,
        isTraffic: dataMap.dialogForm.isTraffic,
        location: dataMap.dialogForm.location,
        reason: dataMap.dialogForm.reason,
        remark: dataMap.dialogForm.remark,
        staffName: dataMap.dialogForm.staffName,
        taskName: dataMap.dialogForm.taskName,
        toolWearDescr: dataMap.dialogForm.toolWearDescr
      }
      emit('callback', parasm)
    }
  })

  console.log('aodapdiwusuowei', dataMap.dialogForm)
}

const cancel = () => {
  // resetForm()
  emit('cancel')
  emit('update:visible', false)
  ruleForm.value.resetFields()
  // nextTick(() => {
  //   if (uploadFileList.value) {
  //     uploadFileList.value.clearFiles()
  //   }
  // })
}

/** 重置表单 */
const reset = () => {
  dataMap.dialogForm = Object.assign({}, defaultDialogForm)
}

onMounted(() => {
  reset()
  dataMap.dialogForm.itemId = props.itemId
  groupAll().then(({ data }: any) => {
    dataMap.groupOption = data.map((x: any) => ({
      label: x.groupName,
      value: x.id
    }))
  })
})
</script>
<style lang="scss" scoped>
.conserve_overall {
  height: 600px;
  overflow-y: scroll;
}
.conserve_overall::-webkit-scrollbar {
  display: none;
}
.el-col-6 {
  height: 52px;
  margin: 0;
  padding: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
}

.avatar1 {
  width: 100%;
  height: 148px;
}
::v-deep .el-form-item__error {
  padding-top: 0;
}
::v-deep .disabledUpload .el-upload {
  display: none;
}
</style>

