<!--
 * @Author: XNY
 * @Date: 2021-09-22 11:07:38
 * @LastEditTime: 2021-09-28 17:32:07
 * @LastEditors: Lx
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\views\evaluate\standard\add.vue
-->
<template>
  <BasicContainer>
    <div style="position: relative; float: left; width: 83%">
      <el-form ref="form" :model="dataMap.dialogForm" class="score" :rules="dataMap.rules">
        <el-row>
          <el-col :span="24" style="margin-bottom: 16px">评分信息</el-col>
          <el-col :span="6" class="score_list">
            <el-form-item label="类型" prop="scoreType">
              <el-select disabled v-model="dataMap.dialogForm.scoreType" placeholder="请选择活动区域">
                <el-option label="评分制" :value="1" />
                <el-option label="考核制" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="score_list">
            <el-form-item label="名称" prop="scoreName">
              <el-input v-model="dataMap.dialogForm.scoreName" />
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            class="score_list"
            v-if="dataMap.dialogForm.scoreType === 1 ? true : false"
          >
            <el-form-item label="总分" prop="scoreNum">
              <el-input v-model="dataMap.dialogForm.scoreNum" />
            </el-form-item>
          </el-col>

          <el-col :span="6" class="score_list">
            <el-form-item
              :label="dataMap.dialogForm.scoreType === 1 ? '合格分' : '合格率'"
              prop="qualifyCoreNum"
            >
              <el-input v-model="dataMap.dialogForm.qualifyCoreNum" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="score_list">
            <el-form-item label="描述" prop="description" label-width="50px">
              <el-input type="textarea" v-model="dataMap.dialogForm.description" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- <el-col :span="20"> 项目信息</el-col> -->
            <el-col :span="4">
              <el-button style="margin-bottom: 16px" type="primary" @click="addProject">新增项目</el-button>
            </el-col>
          </el-col>
          <el-col :span="24" class="project">
            <el-col
              :span="24"
              v-for="(domain, index) in dataMap.dialogForm.scoreItemList"
              :key="index"
              style="width: 100%"
            >
              <div
                class="project_title"
              >{{ dataMap.dialogForm.scoreType === 1 ? '评分' : '考核' }}项目{{ index + 1 }}</div>
              <div class="project_list">
                <el-form-item
                  label="名称"
                  :prop="'scoreItemList.' + index + '.scoreName'"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                >
                  <el-input v-model="domain.scoreName" />
                </el-form-item>
              </div>
              <div class="project_list" v-if="dataMap.dialogForm.scoreType === 1 ? true : false">
                <el-form-item
                  label="分数"
                  :prop="'scoreItemList.' + index + '.scoreNum'"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                >
                  <el-input v-model="domain.scoreNum" @blur="blur" />
                </el-form-item>
              </div>

              <div class="project_list" v-if="dataMap.dialogForm.scoreType === 1 ? false : true">
                <el-form-item
                  label="否决项"
                  :prop="'scoreItemList.' + index + '.isVeto'"
                  :rules="{ required: true, message: '必选', trigger: 'change' }"
                >
                  <!-- <el-input v-model="domain.isVeto"></el-input> -->
                  <el-radio-group v-model="domain.isVeto" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="project_list">
                <el-form-item
                  label="关联资源"
                  :prop="'scoreItemList.' + index + '.isResRal'"
                  :rules="{ required: true, message: '必选', trigger: 'blur' }"
                >
                  <!-- <el-input v-model="domain.value"></el-input> -->
                  <el-radio-group v-model="domain.isResRal" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="project_list" style="width: 100%">
                <!-- describe -->
                <el-form-item
                  label="描述"
                  :prop="'scoreItemList.' + index + '.description'"
                  :rules="{ required: true, message: '必填', trigger: 'blur' }"
                >
                  <el-input type="textarea" v-model="domain.description" />
                </el-form-item>
              </div>
              <div class="project_right" style="width: 90%">
                <!-- :rules="{ required: true, message: '域名不能为空', trigger: 'blur' }" -->
                <el-form-item
                  label="备注"
                  :prop="'scoreItemList.' + index + '.remark'"
                  label-width="50px"
                >
                  <el-input type="textarea" v-model="domain.remark" />
                </el-form-item>
              </div>
              <div class="project_right" style="width: 10%">
                <el-button
                  type="danger"
                  style="float: right"
                  @click.prevent="removeDomain(domain)"
                >删除</el-button>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <div class="confirm">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form>
    </div>
    <div style>
      <div class="scoring_details">
        评分表名称:
        <span>{{ dataMap.dialogForm.scoreName }}</span>
      </div>
      <div class="scoring_details">
        评分表总分:
        <span>{{ dataMap.dialogForm.scoreNum }}</span>
      </div>
      <div class="scoring_details">
        评分类型:
        <span>{{ dataMap.dialogForm.scoreType === 1 ? '评分制' : '考核制' }}</span>
      </div>
      <div class="scoring_details">
        {{ dataMap.dialogForm.scoreType === 1 ? '合格的评分表总分' : '合格率' }}:
        <span>
          {{ dataMap.dialogForm.qualifyCoreNum }}
          {{ dataMap.dialogForm.scoreType === 1 ? '' : ' %' }}
        </span>
      </div>
      <!-- <div class="scoring_details"> 描述: '' </div> -->
      <div class="scoring_details">
        项目总数:
        <span>{{ dataMap.dialogForm.scoreItemList.length || '-' }}</span>
      </div>
      <div class="scoring_details">
        项目总分:
        <span>{{ dataMap.total || '' }}</span>
      </div>
    </div>
  </BasicContainer>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent, reactive, ref } from 'vue'
import { scoreAdd, scoreView, scoreUpdate } from '@/apis/score/standard'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

interface DialogForm {

  scoreItemList:[]
}

const defaultModel: DialogForm = {
  scoreItemList:[]
}

const dataMap = reactive({
  dialogForm: defaultModel,

  rules: {
    scoreName: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    scoreNum: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    scoreType: [
      {
        required: true,
        message: '必选',
        trigger: 'change'
      }
    ],
    describe: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ],
    qualifyCoreNum: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  total: 0,
  id: undefined
})
const form = ref()
const router = useRouter()

onMounted(() => {
  (dataMap.dialogForm as any).scoreType = parseInt(
    (router.currentRoute.value.query as any).scoreType
  )
  if (router.currentRoute.value.query.id) {
    // console.log('router.currentRoute.value.query.id',router.currentRoute.value.query.id);
    scoreView((router.currentRoute.value.query as any).id).then(res => {
      // if (!res.data.scoreItemList) {
      // }
      dataMap.dialogForm = (res as any).data
      console.log('>>>>>>>>145555', dataMap.dialogForm)
    })
  }
  // console.log('router',router.currentRoute.value.query);

  // console.log('>>>>>>>>', router)
})

const addProject = () => {
  (dataMap.dialogForm.scoreItemList as any).push({ isVeto: undefined, isResRal: undefined })
}
const removeDomain = (item: never) => {
  const index = dataMap.dialogForm.scoreItemList.indexOf(item)
  if (index !== -1) {
    dataMap.dialogForm.scoreItemList.splice(index, 1)
  }
}
const blur = () => {
  dataMap.total = 0
  dataMap.dialogForm.scoreItemList.forEach((x: any) => {
    dataMap.total += parseInt(x.scoreNum)
  })
}
const submitForm = () => {
  form.value.validate((valid: any) => {
    if (valid) {
      // alert('submit!')
      if (dataMap.total > 0) {
        if (dataMap.total != (dataMap.dialogForm as any).scoreNum) {
          return ElMessage.error('评分总数要和项目总数相等')
        }
      }

      const parmas = {
        id: dataMap.dialogForm.id,
        scoreNum: dataMap.dialogForm.scoreNum,
        scoreType: dataMap.dialogForm.scoreType,
        scoreName: dataMap.dialogForm.scoreName,
        description: dataMap.dialogForm.description,
        qualifyCoreNum: dataMap.dialogForm.qualifyCoreNum,
        scoreItemList: dataMap.dialogForm.scoreItemList
      }
      if (!(dataMap.dialogForm as any).id) {
        scoreAdd(parmas).then(res => {
          if (res?.code == 200) {
            ElMessage({ message: '新增成功', type: 'success' })
            router.push({
              path: '/evaluate/standard'
            })
          }
        })
      } else {
        console.log('>>>>>>>>>>', parmas)

        scoreUpdate(parmas).then(res => {
          if (res?.code == 200) {
            ElMessage({ message: '修改成功', type: 'success' })
            router.push({
              path: '/evaluate/standard'
            })
          }
        })
      }
    }
  })
}
const cancel = () => {
  router.push({ path: '/evaluate/standard' })
}
</script>

<style lang="scss" scoped>
.score_list {
  padding-right: 20px;
  // position: relative;
  // padding: 16px;
  // margin: 16px;
  // height: 100%;
  // border: 1px solid #000;
}
.project {
  width: 100%;
  height: 540px;
  // overflow: hidden;
  overflow-y: scroll;
  .project_title {
    padding-bottom: 16px;
    // height: 40px;
    // line-height: 40px;
  }
  .project_list {
    float: left;
    width: 25%;
    padding-right: 20px;
  }
  .project_right {
    float: left;
    padding-right: 20px;
  }
}
.project::-webkit-scrollbar {
  display: none;
}
.confirm {
  position: absolute;
  right: 20px;
  bottom: -20px;
}
.scoring_details {
  margin: 16px 0;
}
::v-deep .el-select--medium {
  width: 100%;
}
</style>
