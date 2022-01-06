<!--
 * @Author: XNY
 * @Date: 2021-09-18 15:55:53
 * @LastEditTime: 2021-10-11 11:54:33
 * @LastEditors: XNY
 * @Description:  D:\zrzk\smartCity\scs-ecocity-web\src\views\evaluate\record\index.vue
 * @FilePath: \scs-ecocity-web\src\views\evaluate\record\index.vue
-->
<template>
  <BasicContainer>
    <XForm
      :options="formOptions"
      :form="dataMap.formData"
      @callback="search({index: 1})"
    />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button :disabled="dataMap.multiple" type="danger" plain size="small" @click="handleDelete">删除</el-button>
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
      <el-table-column label="评分类型">
        <template #default="scope">
          <span>{{ scope.row.scoreType == 1 ? '评分':'考核' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分目标">
        <template #default="scope">
          <span>{{ scope.row.scoreTarget == 1 ? '绿地': scope.row.scoreTarget == 2 ?'人员':'租户' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合格分 / 通过率">
        <template #default="scope">
          <span v-if=" scope.row.scoreType == 1">{{ '合格分: ' + scope.row.qualifyScoreNum  + '分' }}</span>
          <span v-if=" scope.row.scoreType == 2">{{ '合格率: ' + scope.row.qualifyScoreNum  + '%' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分结果">
        <template #default="scope">
          <span v-if="scope.row.scoreType===2">{{ '通过率: '+ scope.row.scoreResult + '%' }}</span>
          <span v-if="scope.row.scoreType===1">{{ '得分: '+ scope.row.scoreResult + '分' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合格">
        <template #default="scope">
          <el-tag :type="scope.row.isQualify?'success':'danger'">{{ scope.row.isQualify ? '合格':'不合格' }}</el-tag>
          <!-- <span v-if="scope.row.scoreType===2">{{ scope.row.scoreResult }}</span>
         <span v-if="scope.row.scoreType===1">{{ scope.row.scoreResult + '分' }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template #default="scope">
          <span>{{ scope.row.createTime  }}</span>
          <!-- <span v-if="scope.row.scoreType===2">{{ scope.row.scoreResult }}</span>
         <span v-if="scope.row.scoreType===1">{{ scope.row.scoreResult + '分' }}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="100"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
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
    />
  </BasicContainer>
</template>
<script lang="ts" setup>
import { getList,scoreRecordRemove } from '@/apis/score/scoreRecord'
import { onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { Pager } from '@/dtos'
const options = [
  {
    prop: 'scoreName',
    label: '评分表名称'
  },
  // {
  //   prop: 'scoreType',
  //   label: '评分类型'
  // },
  // {
  //   prop: 'scoreTarget',
  //   label: '评分目标'
  // },
  {
    prop: 'greenlandName',
    label: '绿地名称'
  },
  // {
  //   prop: 'isFinish',
  //   label: '完成评分'
  // },
  // {
  //   prop: 'isQualify',
  //   label: '合格'
  // },
  // {
  //   prop: 'isVeto',
  //   label: '否决项'
  // },
  // {
  //   prop: 'qualifyScoreNum',
  //   label: '合格的评分表总分 / 考核通过率'
  // },

  // {
  //   prop: 'scoreNum',
  //   label: '评分表总分 / 考核通过率'
  // },
  // {
  //   prop: 'scoreResult',
  //   label: '评分结果'
  // }
]
const dataMap = reactive({
  title: '',
  loading: false,
  dialogVisible: false,
  formData: {},
  dialogForm: {},
  tableData: [],
  dialogRules: [],
  pagination: new Pager(),
  ids:[],
  single:true,
  multiple:true
})
const search = async({ index }: any = {}) => {
  if (index) dataMap.pagination.index = index
  const params: any = Object.assign({}, dataMap.formData, {
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  const { rows, total }: any = await getList(params)
  dataMap.tableData = rows
  dataMap.pagination.all = total
}
const handleAdd = () => {}
const handleSelectionChange = (selection : any) => {
  
    dataMap.ids = selection.map((x: any) => x.id)
    console.log(' dataMap.ids', dataMap.ids);
    
    dataMap.single = selection.length !== 1;
    dataMap.multiple = !selection.length;
}
const handleDelete = (row:any) => {
    ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // console.log("delete", ids);
    // return this.$lampInfoDevice.remove({ ids });
    let ids = row.id && [row.id] || dataMap.ids
    
    scoreRecordRemove({ids}).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}

onMounted(() => {
  // console.log('>>>>>>>>', router)

  search()
})
</script>