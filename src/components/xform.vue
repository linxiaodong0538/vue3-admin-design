<template>
  <el-form
    :inline="inline"
    ref="xform"
    :model="form"
    :status-icon="showStatusIcon"
    :rules="rules"
    label-position="right"
    :label-width="labelWidth || undefined"
    :size="size || 'small'"
    class="x-form"
  >
    <el-row>
      <el-form-item
        :label="opt.label"
        :prop="opt.prop"
        v-for="opt in options"
        :key="opt.prop"
        style="margin-right: 20px"
      >
        <el-date-picker
          v-if="['date', 'year', 'month', 'week', 'dates'].includes(opt.type)"
          v-model="form[opt.prop]"
          :type="opt.type || 'date'"
          :placeholder="opt.placeholder || '选择日期'"
          :picker-options="opt.datePickerOptions || datePickerOptions"
          :format="opt.format || 'YYYY-MM-DD'"
          :value-format="opt.format || 'YYYY-MM-DD'"
          :clearable="opt.clearable || false"
          style="width: 240px"
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
          :value-format="opt.format || 'YYYY-MM-DD'"
          :picker-options="opt.rangePickerOptions || rangePickerOptions"
          :clearable="opt.clearable || false"
          style="width: 240px"
        />
        <el-date-picker
          v-else-if="opt.type === 'datetime'"
          v-model="form[opt.prop]"
          type="datetime"
          :picker-options="opt.datePickerOptions || datePickerOptions"
          :format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
          :value-format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
          :clearable="opt.clearable || false"
          :placeholder="opt.placeholder || '选择日期时间'"
          style="width: 240px"
        />
        <el-date-picker
          v-else-if="opt.type === 'datetimerange'"
          v-model="form[opt.prop]"
          type="datetimerange"
          :picker-options="opt.rangePickerOptions || rangePickerOptions"
          :default-time="['00:00:00', '23:59:59']"
          :format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
          :value-format="opt.format || 'YYYY-MM-DD HH:mm:ss'"
          :clearable="opt.clearable || false"
          range-separator="-"
          :start-placeholder="opt.placeholder ? opt.placeholder[0] : '开始日期时间'"
          :end-placeholder="opt.placeholder ? opt.placeholder[1] : '结束日期时间'"
          style="width: 240px"
        />
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
          style="width: 240px"
        />
        <el-input-number
          v-else-if="opt.type === 'number'"
          v-model="form[opt.prop]"
          controls-position="right"
          :controls="false"
          :placeholder="opt.placeholder || '请输入'"
          clearable
          style="width: 240px"
        >
          <template v-if="opt.append" slot="append">{{ item['append'] }}</template>
        </el-input-number>
        <el-select
          v-else-if="opt.type === 'select'"
          v-model="form[opt.prop]"
          :multiple="opt.multiple || false"
          collapse-tags
          :remote="opt.remote || false"
          :remote-method="opt.remoteMethod"
          :placeholder="opt.placeholder || '请选择'"
          :clearable="opt.clearable !== undefined ? opt.clearable : undefined"
          :filterable="opt.filterable !== undefined ? opt.filterable : undefined"
          :disabled="opt.disabled"
          style="width: 240px"
          @change="
          change({
            category: opt.prop,
            value: form[opt.prop],
            data: opt.options.find(x => x.value === form[opt.prop])
          })
          "
        >
          <el-option
            v-for="(item, index) in opt.options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-cascader
          v-else-if="opt.type === 'cascader'"
          v-model="form[opt.prop]"
          :options="opt.options"
          :props="opt.props"
          :show-all-levels="false"
          :clearable="opt.clearable"
          :placeholder="opt.placeholder"
          @change="
          change({
            category: opt.prop,
            value: form[opt.prop],
            data: opt.options.find(x => x.value === form[opt.prop])
          })
          "
        />
        <!-- <x-input
          v-else-if="opt.type === 'xinput'"
          v-model="form[opt.prop]"
          :options="opt.options"
        />
        <x-date-span
          v-else-if="opt.type === 'xdatespan'"
          v-model="form[opt.prop]"
          style="width: 580px"
        />-->
        <el-input
          v-else-if="opt.type === 'text'"
          v-model="form[opt.prop]"
          :placeholder="opt.placeholder || '请输入'"
          :clearable="opt.clearable !== undefined ? opt.clearable : undefined"
          :disabled="opt.disabled"
          :readonly="opt.readonly || undefined"
          style="width: 240px"
          @change="change({ category: opt.prop, value: form[opt.prop] })"
        ></el-input>
        <el-input
          v-else
          v-model="form[opt.prop]"
          autocomplete="off"
          :placeholder="opt.placeholder || '请输入'"
          :type="opt.type === 'textarea' ? 'textarea' : undefined"
          :clearable="opt.clearable !== undefined ? opt.clearable : undefined"
          :disabled="opt.disabled"
          :readonly="opt.readonly || undefined"
          style="width: 240px"
          @change="change({ category: opt.prop, value: form[opt.prop] })"
        >
          <template v-if="opt.append" slot="append">{{ item['append'] }}</template>
        </el-input>
      </el-form-item>
      <slot />
      <el-form-item>
        <el-button
          v-if="hasSearch"
          type="primary"
          class="button"
          size="small"
          icon="el-icon-search"
          @click.prevent="submitForm"
        >搜索</el-button>
        <el-button
          v-if="hasReset"
          type="primary"
          class="button"
          icon="el-icon-refresh"
          size="small"
          plain
          @click.prevent="resetForm"
        >重置</el-button>
        <slot name="button" />
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref,PropType } from 'vue'
// import { default as XInput } from './xinput.vue'
// import { default as XDateSpan } from './xdatespan.vue'
defineProps({
  inline: {
    type: Boolean
  },
  showStatusIcon: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object,
    required: true,
    default: () => ({})
  },
  size: {
    type: String,
    default: 'small'
  },
  options: {
    type: Array as PropType<any[]>,
    required: true
  },
  rules: {
    type: Object,
    default: () => {
      return {}
    }
  },
  labelWidth: {
    type: String || undefined,
    default: ''
  },
  onQuery: {
    type: Function,
    required: false,
    default: () => { }
  },
  invalid: {
    type: Function,
    default: () => {
      return false
    }
  },
  hasPlaceholder: {
    type: Boolean,
    default: true
  },
  hasSearch: {
    type: Boolean,
    default: true
  },
  hasReset: {
    type: Boolean,
    default: true
  },
  hasExport: {
    type: Boolean,
    default: false
  },
  exportOption: {
    type: Object,
    required: false,
    default: () => {
      return {
        url: '',
        sheetName: '未命名',
        params: { date: '2019-01-01' }
      }
    }
  },
  rangePickerOptions: {
    type: Object,
    required: false,
    default: () => {
      return {
        disabledDate: () => { },
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
    }
  }
})

const emit = defineEmits(['callback', 'change', 'reset'])
const xform = ref(null)
console.log('form', xform)

const state = reactive({
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
  }
})

const submitForm = () => {
  xform.value.validate(valid => {
    if (valid) {
      emit('callback')
    }
  })
}
const change = parameters => {
  emit(`change`, parameters)
}

const resetForm = () => {
  xform.value.resetFields()
  emit(`reset`)
}

</script>
<style>
.x-form {
  margin-bottom: 20px;
}
</style>
