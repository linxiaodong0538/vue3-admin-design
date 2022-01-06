<!--
 * @Author: XNY
 * @Date: 2021-09-18 15:55:53
 * @LastEditTime: 2021-10-11 09:12:00
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\gardenCity\index.vue
-->
<template>
  <div class="assessment">
    <el-card class="assessment_search">
      <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    </el-card>
    <div class="assessment_content">
      <el-row :gutter="16">
        <el-col :span="6" v-for="(item, index) in dataMap.tableData" :key="index">
          <el-card style="margin-top: 16px" class="x-d">
            <div class="score">
              <p>
                评价标准
                (<span>{{ item.scoreName }}</span>)
              </p>
              <div class="score_list">
                <el-row>
                  <el-col :span="12">
                    评分类型
                    <span>{{ item.scoreType === 1 ? '评分类型' : '考核类型' }}</span>
                  </el-col>
                  <el-col :span="12" v-if="item.scoreType === 1">
                    总分
                    <span>{{ item.scoreNum }}</span>
                  </el-col>
                  <div style="margin-top: 10px" class="score_list_description">
                    <span>{{ item.description }}</span>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="score_right">
              <button class="list" @click="handleAdd(item)">开始评分</button>
              <button class="right" @click="handleUpdate(item)">编辑上次</button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd">评分</el-button>
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
          <el-button size="mini" type="text">编辑</el-button>
        </template>
      </el-table-column>
    </XTable>-->

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
  </div>
</template>
<script lang="ts" setup>
// import { getList } from '@/apis/score/scoreRecord'
import { onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { reactive } from 'vue'
import { Pager } from '@/dtos'
import { scoreAll, scoreRemove } from '@/apis/score/standard'
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
    formatter: (row: any) => {
      return row.scoreType == 1 ? '评分类型' : '考核类型'
    }
  },
  {
    prop: 'qualifyCoreNum',
    label: '合格线'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '修改时间',
    prop: 'updateTime'
  }
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

const router = useRouter()

const search = async ({ index }: any = {}) => {
  // console.log('>>>>>1');
  const params: any = {
    // pageNum: dataMap.pagination.index,
    // pageSize: dataMap.pagination.size
  }
  const { data }: any = await scoreAll(params)
  dataMap.tableData = data
  // dataMap.pagination.all = total
}
const handleAdd = (row: any) => {
  router.push(
    {
      path: '/score',
      query: {
        id: row.id,
        type: '新增'
      }
    }
  )
}
const handleUpdate = (row: any) => {
  router.push(
    {
      path: '/score',
      query: {
        id: row.id,
        type: "修改"
      }
    }
  )
}
const handleSelectionChange = () => { }
onMounted(() => {
  search()
})
</script>
<style lang="scss" scoped>
.assessment {
  padding: 16px;
  background-color: #f2f3f4;
  height: 100%;
  &_search {
    // padding: 16px;
    background-color: #fff;
  }
  .assessment_content {
    height: 708px;
    overflow-y: scroll;
  }
}
p {
  margin: 0;
}
.score {
  margin-left: 20px;
  p {
    margin-bottom: 10px;
    //  margin: 8px 0;
  }
  .score_list {
    width: 100%;
    margin-bottom: 10px;
    .score_list_description {
      width: 100%;
      // padding: 0 10px;
      padding-right: 20px;
      text-indent: 1em;
      word-break: break-all;
      color: #c9c9c9;
      line-height: 30px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.score_right {
  width: 100%;
  .list,
  .right {
    border: 0;
    width: 50%;
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
    padding: 15px 0;
  }
  .list:hover,
  .right:hover {
    background-color: #66b1ff;
  }
  .list {
    // width: 49.99;
    border-right: 1px solid #ccc;
  }

  // padding-top: 10px;
  // text-align: right;
}

::v-deep .el-card__body {
  padding-bottom: 0;
}
::v-deep .x-d .el-card__body {
  padding: 0;
  padding-top: 20px;
}
.assessment_content::-webkit-scrollbar {
  display: none;
}
</style>