<template>
  <el-dialog
    :top="top"
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
    @close="cancel"
  >
    <el-form
      ref="myForm"
      :model="form"
      :rules="rules"
      :inline="inline || false"
      :label-width="labelWidth"
      v-loading="loading"
      @submit.native.prevent
    >
      <el-row :gutter="20">
        <template v-for="(opt, idx) in options">
          <el-col
            v-if="!opt.hide"
            :span="opt.span || 12"
            :offset="opt.offset"
            :pull="opt.pull"
            :push="opt.push"
            :key="'col' + idx"
          >
            <el-form-item
              :label="opt.label"
              :prop="opt.prop"
              :size="opt.size || 'small'"
              :rules="opt.rules"
            >
              <el-select
                v-if="opt.type === 'select'"
                v-model="form[opt.prop]"
                :multiple="opt.multiple || false"
                :collapse-tags="opt.collapse"
                :placeholder="opt.placeholder"
                :disabled="opt.disabled"
                :filterable="opt.filterable"
                :remote="opt.remote || false"
                :remote-method="opt.remoteMethod"
                :clearable="opt.clearable === undefined ? false : opt.clearable"
                @change="
                change({
                  category: opt.prop,
                  value: form[opt.prop],
                  data: opt.options.find(x => x.value === form[opt.prop])
                })
                "
              >
                <el-option
                  v-for="item in opt.options"
                  :key="item.key || item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled || undefined"
                />
              </el-select>

              <treeselect
                v-else-if="opt.type === 'tree'"
                v-model="form[opt.prop]"  
                :options="opt.options"
                :placeholder="opt.placeholder"
                :disabled="opt.disabled"
                :clearable="opt.clearable === undefined ? false : opt.clearable"
                @change="
                change({
                  category: opt.prop,
                  value: form[opt.prop],
                  data: opt.options.find(x => x.value === form[opt.prop])
                })
                "
              />

              <el-cascader
                v-else-if="opt.type === 'cascader'"
                v-model="form[opt.prop]"
                :options="opt.options"
                :disabled="typeof opt.disabled == 'function' ? opt.disabled(form) : opt.disabled"
                :clearable="opt.clearable === undefined ? true : opt.clearable"
                :props="opt.props"
                @change="
                change({
                  category: opt.prop,
                  value: form[opt.prop],
                  data: cascaderMapping({ data: opt.options, value: form[opt.prop] })
                })
                "
              />
              <!-- :data="{ prop: opt.prop}" :ref="opt.prop" -->
              <el-upload
                v-else-if="opt.type === 'file'"
                v-model="form[opt.prop]"
                class="avatar-uploader"
                :action="opt.action ? mapping({ category: 'file', data: opt.action }) : dataMap.uploadImgUrl"
                :show-file-list="true"
                :on-success="
                  function (r, f) {
                    handleAvatarSuccess(r, f, opt.prop)
                  }
                "
                :before-upload="beforeAvatarUpload"
                :headers="dataMap.headers"
                :data="{ bizId: opt.bizId, resSource: opt.resSource }"
                :disabled="opt.disabled"
                :list-type="opt.pictureCard"
                :limit="opt.limit || 1"
                :file-list="opt.fileList"
                accept="image/*"
                :class="{ disabledUpload: form[opt.prop].length == opt.limit }"
                ref="uploadFileList"
              >
                <!-- <img v-if="form[opt.prop]" :src="form[opt.prop]" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />-->
                
                <i  class="el-icon-plus avatar-uploader-icon" />
                <template #file="{ file }">
                  <div>
                    <img class="avatar1" :src="file.url" alt />
                  </div>
                </template>
              </el-upload>

              <el-date-picker
                v-if="['date', 'year', 'month', 'week', 'dates'].includes(opt.type)"
                v-model="form[opt.prop]"
                :type="opt.type || 'date'"
                :placeholder="opt.placeholder || '选择日期'"
                :picker-options="opt.datePickerOptions || datePickerOptions"
                :format="opt.format || 'YYYY-MM-DD'"
                :clearable="opt.clearable || false"
                style="width: 100%"
                @change="change({ category: opt.prop, value: form[opt.prop] })"
              />
              <el-date-picker
                v-else-if="['daterange', 'monthrange', 'yearrange'].includes(opt.type)"
                v-model="form[opt.prop]"
                :type="opt.type || 'daterange'"
                unlink-panels
                range-separator="-"
                :start-placeholder="opt.placeholder ? opt.placeholder[0] : '开始日期'"
                :end-placeholder="opt.placeholder ? opt.placeholder[1] : '结束日期'"
                :format="opt.format || 'YYYY-MM-DD'"
                :picker-options="opt.rangePickerOptions || rangePickerOptions"
                :clearable="opt.clearable || false"
                style="width: 100%"
              />
              <el-date-picker
                v-else-if="opt.type === 'datetime'"
                v-model="form[opt.prop]"
                type="datetime"
                :picker-options="opt.datePickerOptions || datePickerOptions"
                :format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
                :clearable="opt.clearable || false"
                :placeholder="opt.placeholder || '选择日期时间'"
                style="width: 100%"
              />
              <!-- :default-time="['00:00:00', '23:59:59']" -->
              <el-date-picker
                v-else-if="opt.type === 'datetimerange'"
                v-model="form[opt.prop]"
                type="datetimerange"
                :picker-options="opt.rangePickerOptions || rangePickerOptions"
                :format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
                :clearable="opt.clearable || false"
                range-separator="-"
                :start-placeholder="opt.placeholder ? opt.placeholder[0] : '开始日期时间'"
                :end-placeholder="opt.placeholder ? opt.placeholder[1] : '结束日期时间'"
                style="width: 100%"
              />

              <el-time-picker
                v-else-if="opt.type === 'time'"
                v-model="form[opt.prop]"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                :value-format="opt.format || 'HH:mm:ss'"
                placeholder="请选择时间"
              ></el-time-picker>
              <el-time-picker
                v-else-if="opt.type === 'timerange'"
                v-model="form[opt.prop]"
                is-range
                range-separator="-"
                :start-placeholder="opt.placeholder ? opt.placeholder[0] : '开始时间'"
                :end-placeholder="opt.placeholder ? opt.placeholder[1] : '开始时间'"
                :format="opt.format || 'HH:mm:ss'"
                :value-format="opt.format || 'HH:mm:ss'"
                :picker-options="{ start: '00:00', step: '01:00', end: '24:00' }"
                :clearable="opt.clearable || false"
                style="width: 100%"
              />

              <el-switch
                v-else-if="opt.type === 'switch'"
                v-model="form[opt.prop]"
                :disabled="opt.disabled"
              />

              <el-radio-group
                v-else-if="opt.type === 'radio'"
                v-model="form[opt.prop]"
                :disabled="opt.disabled"
              >
                <el-radio
                  v-for="item in opt.options"
                  :key="item.value"
                  :label="item.value"
                  :disabled="item.disabled || undefined"
                >
                  {{
                    item.label
                  }}
                </el-radio>
              </el-radio-group>

              <el-checkbox-group v-else-if="opt.type === 'checkbox'" v-model="form[opt.prop]">
                <el-checkbox v-for="item in opt.options" :key="item" :label="item" />
              </el-checkbox-group>
              <slot v-else-if="opt.type == 'slot'">
                <div style="font-weight: bold; color: #222">{{ opt.title }}</div>
              </slot>
              <el-input-number
                v-else-if="opt.type === 'number'"
                v-model="form[opt.prop]"
                :disabled="opt.disabled"
                :controls="opt.controls || false"
                :readonly="opt.readonly"
                :precision="opt.precision"
                :controls-position="opt.controlsPosition"
                :min="opt.min"
                :max="opt.max"
                :step="opt.step || 1"
                :clearable="opt.clearable === undefined ? false : opt.clearable"
                @focus="
                focus({
                  category: opt.prop,
                  value: form[opt.prop],
                  data: form[opt.prop]
                })
                "
              />
              <span v-else-if="opt.type == 'detail'">{{ form[opt.prop] }}</span>
              <el-input
                v-else-if="['textarea', 'text', 'email', 'password'].includes(opt.type)"
                v-model="form[opt.prop]"
                :suffix-icon="opt.icon"
                :type="opt.type"
                :show-password="opt.type == 'password'"
                :autosize="opt.autosize || undefined"
                :placeholder="opt.placeholder || undefined"
                :disabled="opt.disabled"
                :readonly="opt.readonly"
                :maxlength="opt.maxlength || 20"
                :oninput="opt.oninput"
                :clearable="opt.clearable === undefined ? false : opt.clearable"
                @focus="
                focus({
                  category: opt.prop,
                  value: form[opt.prop],
                  data: form[opt.prop]
                })
                "
                @input="
                trigger({
                  category: opt.prop
                })
                "
              >
                <el-button
                  v-if="opt.append && opt.append.startsWith('el-icon')"
                  slot="append"
                  :icon="opt.append || 'el-icon-search'"
                  @click="
                  focus({
                    category: opt.prop,
                    value: form[opt.prop],
                    data: form[opt.prop]
                  })
                  "
                />
                <template v-if="opt.append" #append>{{ opt.append }}</template>
              </el-input>
            </el-form-item>
          </el-col>
        </template>
        <slot name="appendItem" />
        <slot :data="form" />
      </el-row>
    </el-form>
    <template #footer>
      <div v-if="isShowBtn" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitForm">确 定</el-button>
        <el-button size="small" @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { Pager } from '@/dtos'
import { reactive, defineProps, defineEmits, ref, nextTick, PropType } from 'vue'
import { useStore } from '@/store'
import { ElForm, ElMessage, ElUpload } from 'element-plus'
// import Treeselect from '@riophae/vue-treeselect'
// import { getToken } from '@/utils/auth'

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
  showClose: {
    type: Boolean,
    default: true
  },
  inline: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object,
    required: true,
    default: () => ({})
  },
  options: {
    type: Array as PropType<any[]>,
    required: true,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  isShowBtn: {
    type: Boolean,
    default: true
  },
  labelWidth: {
    type: String,
    default: 'auto'
  },
  width: {
    type: String,
    default: '720px'
  },
  top: {
    type: String,
    default: '15vh'
  },

})

const emit = defineEmits(['input', 'change', 'callback', 'cancel', 'focus', 'update:visible'])
const myForm = ref(ElForm)
const dataMap = reactive({
  hide: false,
  isShowing: false,
  pager: new Pager(),
  uploadImgUrl: process.env.VUE_APP_BASE_API + '/api-ecocity/v1/system/resource/upload',
  headers: {
    Authorization: 'Bearer ' + store.state.user.token
  },
  files: {},
  datePickerOptions: {
    disabledDate: time => {
      return time.getTime() > Date.now()
    },
    shortcuts: [
      {
        text: '今天',
        onClick: picker => {
          picker.$emit('pick', new Date())
        }
      },
      {
        text: '昨天',
        onClick: picker => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
        text: '一周前',
        onClick: picker => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }
    ]
  },
  rangePickerOptions: {
    disabledDate: time => { },
    shortcuts: [
      {
        text: '最近一周',
        onClick: picker => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick: picker => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick: picker => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  }
})


const submitForm = () => {
  myForm.value.validate((valid: boolean) => {
    if (valid) {
      myForm.value.clearValidate()
      emit('callback')
    }
  })
}
const trigger = ({ event, category }: any) => {
  emit('input', { category, data: props.form[category] })
}
const resetForm = () => {
  nextTick(() => {
    myForm.value.resetFields()
  })
}
const clearValidate = () => {
  nextTick(() => { })
}
const uploadFileList = ref(ElForm)

const cancel = () => {
  resetForm()
  emit('cancel')
  emit('update:visible', false)
  nextTick(() => {
    if (uploadFileList.value) {
      uploadFileList.value.clearFiles()
    }
  })
}
const change = (parameters: any) => {
  console.log('props.options', props.options)
  emit(`change`, parameters)
}
const focus = (parameters: any) => {
  emit(`focus`, parameters)
}
const handleAvatarSuccess = (res: any, file: any, prop: any) => {
  const { resPath, id } = res.data
  console.log('file', res, file)
  props.options.find((x: any) => x.prop === 'picPathIds').fileList.push({ url: resPath })
  props.form[prop].push(id)

  // props.form[fileList].push({url:resPath})

  // dataMap.files[prop] = resPath

}
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
const mapping = ({ category, data }: any) => {
  if (category === 'file') {
    return process.env.VUE_APP_BASE_API + data
  }
}
const cascaderMapping = ({ data, value }: any): any => {
  for (const item of data) {
    if (item.value === value) {
      return item
    }
    if (item.children && item.children.length) {
      return cascaderMapping({ data: item.children, value })
    }
  }
}
</script>
<style scoped>
.dialog-style {
  border-radius: 4px;
}
.el-input-number .el-input__inner {
  text-align: left !important;
}
.el-input-number,
.el-select,
.el-cascader {
  width: 100%;
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
.avatar {
  width: 85px;
  height: 85px;
  display: block;
}
.avatar1 {
  width: 100%;
  height: 148px;
}
::v-deep .disabledUpload .el-upload {
  display: none;
}
</style>
