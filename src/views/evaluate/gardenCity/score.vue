<!--
 * @Author: XNY
 * @Date: 2021-09-18 15:55:53
 * @LastEditTime: 2021-11-09 10:19:38
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\gardenCity\score.vue
-->
<template>
  <div>
    <el-row>
      <el-col :span="19">
        <el-card style="margin: 16px">
          <div class="score_information"> 评分信息 </div>
          <el-row class="score">
            <el-col :span="6">
              评分类型: <span>{{ dataMap.dialogForm.scoreType === 1 ? '评分' : '考核' }}</span>
            </el-col>
            <el-col :span="6">
              评价标准: (<span>{{ dataMap.dialogForm.scoreName }}</span
              >)
            </el-col>
            <el-col :span="6" v-if="dataMap.dialogForm.scoreType === 1">
              评分总分: <span>{{ dataMap.dialogForm.scoreNum }}</span>
            </el-col>
            <el-col :span="6">
              {{ dataMap.dialogForm.scoreType === 1 ? '合格分' : '合格率' }}:
              <span>{{ dataMap.dialogForm.qualifyCoreNum }}</span>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              描述: <span>{{ dataMap.dialogForm.description }}</span>
            </el-col>
          </el-row>
        </el-card>

        <div class="score_project">
          <div class="project_list">
            <el-card style="margin-bottom: 15px" v-for="(itme, index) in dataMap.dialogForm.scoreItemList" :key="index">
              <!-- itme.projectResults >= 0 ? 'rgba(0, 187, 154, 1)' :itme.projectResults < 0 ? 'rgba(230, 87, 49, 1)' : 'rgba(217, 212, 212, 1)'  -->
              <div v-if="dataMap.scoreResult" class="score_points">
                <i v-if="itme.resultScoreNum >= 1" style="font-size: 20px; color: #00bb9a" class="el-icon-circle-check"></i>
                <i v-else-if="itme.resultScoreNum <= 0" style="font-size: 20px; color: #e65731" class="el-icon-circle-close"></i>
                <i v-else class="score_points" style="background-color: #d9d4d4"></i>
                <!-- <i
                  class="el-icon-circle-check"
                  :style="{
                    'color':
                      itme.resultScoreNum >= 1
                        ? 'rgba(0, 187, 154, 1)'
                        : itme.resultScoreNum == 0
                          ? 'rgba(217, 212, 212, 1)'
                          : 'rgba(217, 212, 212, 1)'
                  }"
                /> -->
              </div>
              <div class="score_points_right">
                <div class="project_list_title">
                  <span>{{ itme.scoreName }}</span
                  >(
                  {{ itme.scoreNum == 0 ? '未通过' : itme.scoreNum == 1 ? '通过' : itme.scoreNum || '' }}
                  )

                  <i v-if="!itme.remark" class="el-icon-warning-outline" />
                  <el-tooltip v-if="itme.remark" class="item" effect="dark" :content="itme.remark" placement="bottom">
                    <i class="el-icon-warning-outline" />
                  </el-tooltip>
                </div>
                <div style="color: #808080">
                  {{ itme.description }}
                </div>
                <div style="margin-top: 10px">
                  <!-- scoreNum -->
                  <span v-if="dataMap.dialogForm.scoreType === 1">
                    得分<el-input
                      v-model="itme.resultScoreNum"
                      placeholder="请输入"
                      :disabled="dataMap.scoreResult"
                      style="width: 200px; margin: 0 10px"
                    />
                  </span>
                  <el-radio-group
                    v-if="dataMap.dialogForm.scoreType === 2"
                    v-model="itme.resultScoreNum"
                    size="small"
                    style="margin-right: 20px"
                    :disabled="dataMap.scoreResult"
                  >
                    <el-radio :label="1"> 通过 </el-radio>
                    <el-radio :label="0"> 未通过 </el-radio>
                  </el-radio-group>
                  <span style="margin-left: 10px" v-if="itme.isResRal">
                    资源
                    <el-select
                      v-model="itme.resourceId"
                      multiple
                      placeholder="请选择"
                      style="margin-left: 10px"
                      @change="resourceChange(itme.resourceId, index)"
                      :disabled="dataMap.scoreResult"
                    >
                      <el-option v-for="item in dataMap.resourceOptions" :key="item.id" :label="item.resName" :value="item.id">
                        <span style="margin-right: 20px; float: left">{{ item.resName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px" @click.stop="preview(item)"> <i class="el-icon-view" /></span>
                      </el-option>
                    </el-select>
                  </span>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <BasicContainer class="right">
          <!-- <div>  <span>达标</span>  <span></span></div> -->
          <el-row>
            <el-col :span="8">
              <div class="standard"> <span /> 达标 </div>
            </el-col>
            <el-col :span="8">
              <div class="standard"> <span style="background-color: rgba(230, 87, 49, 1)" /> 未达标 </div>
            </el-col>
            <el-col :span="8">
              <div class="standard"> <span style="background-color: rgba(217, 212, 212, 1)" /> 待评价 </div>
            </el-col>
          </el-row>
          <div
            :style="{
              'background-color': itme.resultScoreNum >= 1 ? '#00BB9A' : itme.resultScoreNum <= 0 ? '#E65731' : '#D9D4D4'
            }"
            class="quantity"
            v-for="(itme, index) in dataMap.dialogForm.scoreItemList"
            :key="index"
          >
            {{ index + 1 }}
          </div>
          <button class="score_button" @click="submitForm" v-if="!dataMap.scoreResult"> 提交 </button>
        </BasicContainer>
      </el-col>
    </el-row>
    <!-- <XDialog
      ref="dialog"
      :title="dataMap.title"
      :form="dataMap.evaluating"
      :options="dialogOptions"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @change="dialogChange"
      @focus="dialogFocus"
      @callback="submitForm"
    /> -->
    <el-dialog v-model="dataMap.dialogVisible" title="评测结果" width="500px" center :close-on-click-modal="false" :show-close="false">
      <div class="appraisal">
        本次测评共：<span>{{ dataMap.formData.scoreItem.length }}</span> 项，已达标：<span style="color: #21b74b">{{
          dataMap.standardItem.length
        }}</span>
        项目，未达标 <span style="color: #df1c1c">{{ dataMap.notQualified.length }}</span> 项。
      </div>
      <div class="reach_standard">
        {{ dataMap.dialogForm.scoreType === 1 ? '当前得分' : '当前达标率：'
        }}<span>{{ dataMap.formData.scoreResult }}{{ dataMap.dialogForm.scoreType === 1 ? '分' : '%' }}</span>
      </div>
      <div class="reach_button">
        <button @click="evaluationDetails"> 查看详情 </button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
// import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { reactive } from 'vue'
import { Pager } from '@/dtos'
import { scoreView, scoreRemove } from '@/apis/score/standard'
import { resourceAll, resourceGet } from '@/apis/score/resource'
import { saveGet, getList } from '@/apis/score/scoreRecord'
import { XForm, XTable, XDialog } from '@/components'
// import { ElIcon } from 'element-plus'
const dataMap = reactive({
  title: '',
  loading: false,
  dialogVisible: false,
  formData: {},
  dialogForm: {},
  tableData: [],
  dialogRules: [],
  resourceOptions: [],
  evaluating: {},
  actualResult: '',
  standardItem: [], //达标项
  notQualified: [], //未达标
  resourceVisible: false,
  scoreResult: false
})

const router = useRouter()

const submitForm = () => {
  let scoreItem = []
  if (dataMap.dialogForm.scoreType == 1) {
    scoreItem = (dataMap.dialogForm as any).scoreItemList.map((x: any) => ({
      id: x.id,
      isResRal: x.isResRal,
      isVeto: x.isVeto,
      description: x.description,
      remark: x.remark,
      // resourceId: x.resourceId.toString(),
      scoreName: x.scoreName,
      scoreNum: x.scoreNum,
      resultScoreNum: x.resultScoreNum,
      scoreId: x.scoreId
    }))
  } else {
    scoreItem = (dataMap.dialogForm as any).scoreItemList.map((x: any) => ({
      id: x.id,
      isResRal: x.isResRal,
      isVeto: x.isVeto,
      description: x.description,
      remark: x.remark,
      resourceId: x.resourceId.toString(),
      scoreName: x.scoreName,
      scoreNum: x.scoreNum,
      resultScoreNum: x.resultScoreNum,
      scoreId: x.scoreId
    }))
  }

  const params: any = {
    // scoreId: (dataMap.dialogForm as any).scoreId || (dataMap.dialogForm as any).id,
    scoreName: (dataMap.dialogForm as any).scoreName,
    scoreType: (dataMap.dialogForm as any).scoreType,
    scoreNum: (dataMap.dialogForm as any).scoreNum,
    scoreTarget: 1,
    qualifyScoreNum: (dataMap.dialogForm as any).qualifyScoreNum,
    scoreItem: JSON.stringify(scoreItem),
    greenlandId: '1',
    greenlandName: '东泰绿地'
  }
  if (router.currentRoute.value.query.type == '修改') {
    params.scoreId = (dataMap.dialogForm as any).scoreId
    params.id = (dataMap.dialogForm as any).id
    console.log('params', params)
  }
  if (router.currentRoute.value.query.type == '新增') {
    params.scoreId = (dataMap.dialogForm as any).id
  }
  saveGet(params).then((res: any) => {
    if (res?.code == 200) {
      dataMap.dialogVisible = true
      dataMap.standardItem = [] //达标项
      dataMap.notQualified = [] //未达标

      res.data.scoreItem.forEach((x: any) => {
        if (x.resultScoreNum) {
          if (x.resultScoreNum == 0) {
            dataMap.notQualified.push(x)
          } else {
            dataMap.standardItem.push(x)
          }
        } else {
          dataMap.notQualified.push(x)
        }
      })
      dataMap.formData = res.data
      let parsms = res.data
      parsms.scoreItemList = parsms.scoreItem.map(x => {
        if (x.resultScoreNum) {
          x.projectResults = x.resultScoreNum - dataMap.dialogForm.qualifyCoreNum
        } else {
          x.projectResults = undefined
          x.resultScoreNum = undefined
        }
        return x
      })
      dataMap.dialogForm.scoreItemList = parsms.scoreItemList
      // console.log('>>>>>>>>>>>>>>',parsms,dataMap.dialogForm);

      // dataMap.dialogForm = res
      // dataMap.dialogForm.scoreItemList = res.scoreItem
    }
  })
}
const evaluationDetails = () => {
  dataMap.dialogVisible = false
  dataMap.scoreResult = true
}

const preview = (row: any) => {
  window.open('http://view.officeapps.live.com/op/view.aspx?src=' + row.resPath)
}

const handleSelectionChange = () => {}
onMounted(() => {
  console.log('router', router.currentRoute.value.query.id)
  if (router.currentRoute.value.query.type == '新增') {
    scoreView((router.currentRoute.value.query as any).id).then(res => {
      dataMap.dialogForm = (res as any).data
    })
  }
  if (router.currentRoute.value.query.type == '修改') {
    getList({ scoreId: (router.currentRoute.value.query as any).id }).then((res: any) => {
      console.log('>>>>>>>>>>123456', res)

      let parsms: any = {}
      parsms = res.rows[0]
      parsms.qualifyCoreNum = parsms.qualifyScoreNum
      parsms.scoreItem.forEach((x: any) => {
        if (x.resourceId) {
          x.resourceId = x.resourceId.split(',')
        }
      })
      console.log('>>>>>>>>>>>>>>>', parsms.scoreItem)

      parsms.scoreItemList = parsms.scoreItem
      dataMap.dialogForm = parsms
    })
  }
  resourceAll().then((res: any) => {
    dataMap.resourceOptions = res.data
  })
})
</script>
<style lang="scss" scoped>
.score {
  margin-left: 16px;
  // padding-left: 16px;
  // padding: 16px;
}
.score_project {
  margin-top: 15px;
  padding: 0 16px;
}
.score_information {
  margin-bottom: 15px;
  font-weight: 600;
}
.project_list {
  height: 680px;
  overflow-y: scroll;
  // background-color: red;
}
.project_list_title {
  margin-bottom: 15px;
  span {
    margin-right: 10px;
  }
  // margin-left: 16px;
  // .left {
  //   margin-bottom: 15px;
  // }
}
.project_list::-webkit-scrollbar {
  display: none;
}
.standard {
  height: 40px;
  font-size: 14px;
  span {
    display: inline-block;
    width: 14px;
    height: 14px;
    // background-color: red;
    background-color: rgba(0, 187, 154, 1);
  }
  border-bottom: 1px solid #e3e3e3;
}

.quantity {
  float: left;
  width: 30px;
  height: 20px;
  text-align: center;
  color: #fff;
  background-color: #e3e3e3;
  margin-left: 11px;
  margin-top: 10px;
}
.right {
  position: relative;
}
.score_button {
  position: absolute;
  height: 40px;
  left: 10%;
  width: 80%;
  bottom: 30px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: #fff;
}
.score_button:hover {
  background-color: #66b1ff;
}
.score_button:active {
  background-color: #0d84ff;
}
.satisfaction {
  color: #e65731;
}
.satisfaction_list {
  font-size: 14px;
  padding-left: 20px;
  margin-top: 15px;
  p {
    margin: 0;
  }
}
.appraisal {
  span {
    font-weight: 700;
    font-size: 28px;
  }
}
.reach_standard {
  margin-top: 10px;
  span {
    font-weight: 700;
    font-size: 28px;
    color: #21b74b;
  }
}
.reach_button {
  text-align: center;
  margin-top: 30px;
  button {
    width: 232px;
    height: 40px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
  }
  button:hover {
    background-color: #66b1ff;
  }
}
.score_points {
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 20px;
  border-radius: 50%;
}

::v-deep .right .el-card {
  margin-left: 0;
}
</style>