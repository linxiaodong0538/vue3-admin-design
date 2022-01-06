<!--
 * @Author: XNY
 * @Date: 2021-09-18 15:55:53
 * @LastEditTime: 2021-10-09 10:50:07
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\standard\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <!-- <el-button type="primary" plain size="small" @click="handleAdd">新增</el-button> -->
        <el-dropdown trigger="click" @command="handleAdd">
          <el-button type="primary">
            新增
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">评分制</el-dropdown-item>
              <el-dropdown-item command="2">考核制</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
          <el-button size="mini" type="text" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </XTable>

    <!-- <XDialog
      ref="dialog"
      :title="dataMap.title"
      :form="dataMap.dialogForm"
      :options="dialogOptions"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @change="dialogChange"
      @focus="dialogFocus"
      @callback="submitForm"
    /> -->
  </BasicContainer>
</template>
<script lang="ts" setup>
import { getList, scoreRemove } from '@/apis/score/standard'
import { onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { reactive } from 'vue'
import { Pager } from '@/dtos'
import { ElMessageBox, ElMessage } from 'element-plus'
const router = useRouter()

const options = [
  {
    prop: 'scoreName',
    label: '评分表名称'
  },
  // {
  //   prop: 'scoreNum',
  //   label: '评分表总分'
  // },
  {
    prop: 'scoreType',
    label: '评分类型',
    formatter:(row:any)=>{
      return row.scoreType == 1 ? '评分类型':'考核类型'
    }
  },
  {
    prop: 'qualifyCoreNum',
    label: '合格线'
  },
  {
     label: '创建时间',
     prop:'createTime'
  },
  {
     label: '修改时间',
     prop:'updateTime'
  },
  // {
  //   prop: 'qualifyCoreNum',
  //   label: '描述'
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
  pagination: new Pager()
})
const search = async ({ index }: any = {}) => {
  // console.log('>>>>>1');
  if(index) dataMap.pagination.index = index
  const params: any = Object.assign({}, dataMap.formData, {
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  const { rows, total }: any = await getList(params)
  dataMap.tableData = rows
  dataMap.pagination.all = total
}
const handleAdd = (command:string) => {
  // console.log('>>>>>>>>>>',command);
  
  router.push(
    { 
      path: '/add' ,
      query:{
        scoreType:command
      }
    }
    
    )
  // console.log('>>>>>>>>12455', router.push('/error/401'))
}
const handleUpdate = (row: any) => {
  router.push({ 
    path: '/add',
    query:{
      id:row.id,
      scoreType:row.scoreType
    }
    
    })
}
const handleDelete = (row: any) => {
  // router.push({path: '/standard/add'})
  // const ids = row.id ;
  //  ids = qs.stringify(ids,{ arrayFormat: 'brackets'});
  ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // console.log("delete", ids);
    // return this.$lampInfoDevice.remove({ ids });
    scoreRemove(row.id).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
  // .then(() => {
  //   this.search();
  //   this.msgSuccess("删除成功");
  // });
}
const handleSelectionChange = () => {}
onMounted(() => {
  // console.log('>>>>>>>>', router)

  search()
})
</script>