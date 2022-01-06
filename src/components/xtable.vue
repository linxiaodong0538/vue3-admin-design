<template>
  <div>
    <el-table
      ref="xtable"
      v-loading="loading"
      :data="data"
      :max-height="maxHeight || undefined"
      :stripe="stripe || false"
      :border="border || false"
      :element-loading-text="loadingText"
      :row-key="rowKey"
      :size="size || 'small'"
      :height="height || undefined"
      class="x-table"
      header-cell-class-name="headerStyle"
      @selection-change="selectionChange"
      @select="select"
      @select-all="selectAll"
      @row-click="handleRowClick"
    >
      <slot name="before" />
      <el-table-column
        v-if="isSelectable"
        type="selection"
        width="55"
        :reserve-selection="reserveSelection"
      />
      <el-table-column v-if="isNmu" label="序号" :width="numWidth" align="center">
        <template #default="scope">
          <span v-text="getIndex(scope.$index)"></span>
        </template>
      </el-table-column>

      <template v-for="item in options">
        <el-table-column
          v-if="item.type && item.type === 'index'"
          :key="item.prop"
          type="index"
          :label="item.label"
          :width="item.width"
          :align="item.align"
        />

        <el-table-column
          v-else-if="item.image"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :align="item.align"
          :min-width="item.minWidth"
          :formatter="item.formatter"
        >
          <template slot-scope="scope">
            <svg-icon
              v-if="item.image == 'icon'"
              :icon-class="scope.row[item.prop] || ''"
              :width="item.imageWidth"
              :height="item.imageHeight"
            />
            <el-avatar
              v-if="!item.multiple"
              shape="square"
              :size="80"
              fit="contain"
              :src="scope.row[item.prop]"
            />
            <!-- :preview-src-list="scope.row[item.prop].split()" -->
            <el-image
              v-else
              class="x-table-image"
              :style="{ width: item.imageWidth || '50px', height: item.imageHeight || '50px' }"
              :src="scope.row[item.prop][0] ? scope.row[item.prop][0] : ''"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
        />
      </template>

      <slot />
    </el-table>
    <el-pagination
      v-if="isPaging"
      background
      :layout="layout"
      v-model:total="pagination.all"
      :page-sizes="pageSizes"
      :page-count="pagination.count"
      v-model:page-size="pagination.size"
      v-model:current-page="pagination.index"
      :style="{ textAlign: 'right', marginTop: '20px' }"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { Pager } from '@/dtos'
import SvgIcon from '@/components/SvgIcon'
import { reactive, onMounted, defineProps, defineEmits,PropType } from 'vue'
const props = defineProps({
  isNmu: {
    type: Boolean,
    default: false
  },
  numWidth: {
    type: String,
    default: '120'
  },
  reserveSelection: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'xtable'
  },
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  options: {
    type: Array as PropType<any[]>,
    required: true,
    default: () => []
  },
  rowKey: {
    type: String || Function || undefined,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  stripe: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'small'
  },
  loadingText: {
    type: String,
    default: ''
  },
  height: {
    type: Number || String,
    default: undefined
  },
  maxHeight: {
    type: Number || String,
    default: undefined
  },
  isPaging: {
    type: Boolean,
    default: false
  },
  isSelectable: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Pager,
    default: new Pager()
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next'
  }
})

const emit = defineEmits(['page-change', 'row-click', 'selection-change', 'select', 'select-all'])
const pageSizes = reactive([5, 10, 20, 50, 100])

const handleSizeChange = (size: number) => {
  emit('page-change')
}

const handleCurrentChange = (index: number) => {
  console.log('indexx', props.pagination)
  emit('page-change')
}
const handleRowClick = (row: any, column: any) => {
  emit('row-click', { row, column, event })
}
const selectionChange = (val: any) => {
  emit('selection-change', val)
}
const select = (selection: any, row: any) => {
  emit('select', selection, row)
}
const selectAll = (val: any) => {
  emit('select-all', val)
}
const getIndex = ($index: number) => {
  return (props.pagination.index - 1) * props.pagination.size + $index + 1
}
</script>
<style>
.x-table {
  margin-top: 20px;
  border: 1px solid #ebeef5;
  border-bottom: 0;
}
.x-table-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}
.el-table__body-wrapper {
  max-height: 60vh;
  overflow-y: auto;
}
.headerStyle {
  background-color: #f5f7f9 !important;
}
</style>
