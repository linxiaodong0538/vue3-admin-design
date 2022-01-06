<!--
 * @Author: XNY
 * @Date: 2021-09-18 15:55:53
 * @LastEditTime: 2021-10-13 16:10:14
 * @LastEditors: XNY
 * @Description:  D:\zrzk\smartCity\scs-ecocity-web\src\views\evaluate\record\index.vue
 * @FilePath: \scs-ecocity-web\src\views\evaluate\resource\index.vue
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search({ index: 1 })" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" plain size="small" @click="handleAdd"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
         <el-button size="mini" :disabled='dataMap.multiple' plain type="danger"  @click="handleDelete"> 删除 </el-button>
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
          <el-button size="mini" type="text" @click="preview(scope.row)"> 预览 </el-button>
          <el-button size="mini" type="text" @click="download(scope.row)"> 下载 </el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"> 删除 </el-button>
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
    <el-dialog :title="dataMap.title" v-model="dataMap.dialogVisible" :close-on-click-modal="false" width="600px">
      <el-form v-loading="dataMap.dialogLoading" ref="ruleForm" :model="dataMap.dialogForm" :rules="dataMap.dialogRules" class="demo-ruleForm">
        <el-row :gutter="20">
          <!-- <el-col :span="12">
            <el-form-item
              label="资源名称"
              prop="resName"
            >
              <el-input
                size="small"
                v-model="dataMap.dialogForm.resName"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="资源来源" prop="resSource">
              <el-input size="small" v-model="dataMap.dialogForm.resSource" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item
              label="资源类型"
              prop="resType"
            >
              <el-input
                size="small"
                v-model="dataMap.dialogForm.resType"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              :action="dataMap.uploadImgUrl"
              :headers="dataMap.headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="dataMap.fileList"
              :auto-upload="false"
              :before-upload="beforeUpload"
              ref="upload"
              :data="dataMap.dialogForm"
              :on-success="onSuccess"
              :on-error="onError"
            >
              <el-button size="small" type="primary"> 上传资源 </el-button>
              <!-- <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template> -->
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
          <el-button size="small" @click="dataMap.dialogVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="预览" v-model="dataMap.preview" :close-on-click-modal="false" width="600px">
      <img :src="dataMap.previewUrl" alt="" class="preview_img" />
    </el-dialog>
  </BasicContainer>
</template>
<script lang="ts" setup>
import { getList, resourceRemove, resourceCreate } from '@/apis/score/resource'
import { onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { XForm, XTable, XDialog } from '@/components'
import { formOptions, dialogOptions } from './options'
import storage, { StorageType } from '@/utils/storage'
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { Pager } from '@/dtos'
import { useStore } from '@/store'
import Download from './download'
import qs from 'qs'

interface resource {
  resSource: string
  bizId: string
}

const defaultDialogForm: resource = {
  resSource: '',
  bizId: ''
}

const options = [
  {
    prop: 'resName',
    label: '名称'
  },

  {
    prop: 'resSource',
    label: '资源来源'
  },
  {
    prop: 'resType',
    label: '资源类型'
  },
  // {
  //   prop: 'resPath',
  //   label: '文件存放路径'
  // },
  {
    prop: 'resMd5',
    label: '文件md5值 '
  },
  {
    prop: 'resLength',
    label: '文件长度'
  },
  {
    prop: 'createTime',
    label: '创建日期'
  }
]
const store = useStore()
const upload = ref() // 操作ref
// console.log('Download',Download());

const dataMap = reactive({
  title: '',
  loading: false,
  dialogVisible: false,
  formData: {},
  dialogForm: defaultDialogForm,
  tableData: [],
  dialogRules: {
    resSource: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  pagination: new Pager(),
  /** 上传文件 地址 */
  uploadImgUrl: process.env.VUE_APP_BASE_API + '/api-ecocity/v1/system/resource/upload',
  headers: {
    Authorization: 'Bearer ' + store.state.user.token
  },
  fileList: [],
  dialogLoading: false,
  preview: false,
  previewUrl: undefined,
  ids:[],
  single:true,
  multiple:true
})
const search = async ({ index }: any = {}) => {
  if (index) dataMap.pagination.index = index
  const params: any = Object.assign({}, dataMap.formData, {
    pageNum: dataMap.pagination.index,
    pageSize: dataMap.pagination.size
  })
  const { rows, total }: any = await getList(params)
  dataMap.tableData = rows
  dataMap.pagination.all = total
}

const reset = () =>{
  dataMap.dialogForm = Object.assign({},defaultDialogForm)
}

/** 新增 */
const handleAdd = () => {
  reset()
  dataMap.dialogForm.bizId = '1'
  dataMap.title = '新增资源'
  dataMap.dialogVisible = true
}
const handleSelectionChange = (selection: any) => {
    dataMap.ids = selection.map((x: any) => x.id)
    dataMap.single = selection.length !== 1;
    dataMap.multiple = !selection.length;
}
/** 预览 */
const preview = (row: any) => {
  Download(row.resPath,row.resName,row.resType)
  // let base = 'http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc='
  // // fileUrl自己word文档存储的线上地址
  // let fileUrl = row.resPath
  // let url = encodeURIComponent(fileUrl)
  // window.open(base + url, '_blank')
  // dataMap.preview = true
  // console.log('row.resType',row.resType == 'jpg');

  if (row.resType != 'png' && row.resType != 'jpg' && row.resType != 'jpeg' &&  row.resType != 'bmp' &&  row.resType != 'gif') {
    // 微软浏览文件官方前缀
    // let base = 'http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc='
    // // fileUrl自己word文档存储的线上地址
    // let fileUrl = row.resPath
    // let url = encodeURIComponent(fileUrl)
    // window.open(base + url, '_blank')  

    window.open('http://view.officeapps.live.com/op/view.aspx?src='+row.resPath)
  } else {
    dataMap.preview = true
  dataMap.previewUrl = row.resPath

  }
}
/** 下载 */
const download = (row: any) => {
  var link = document.createElement('a')
  link.href = row.resPath
  link.click()
  // Download(row.resPath, row.resName, row.resType)
}
/** 删除 */
const handleDelete = (row: any) => {
  ElMessageBox.confirm('是否确认删除数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let id = row.id && [row.id] || dataMap.ids

    let ids = qs.stringify({ ids:id }, { arrayFormat: 'brackets' })
    resourceRemove(ids).then(res => {
      if (res?.code == 200) {
        search({ index: 1 })
        ElMessage({ message: '删除成功', type: 'success' })
      }
    })
  })
}
const beforeUpload = (file: any) => {
  // file.resSource = (dataMap.dialogForm as any).resSource
  // console.log('file',file);
  dataMap.dialogLoading = true
}
const onSuccess = (res: any, file: any, fileList: any) => {
  dataMap.dialogLoading = false
  console.log('response', res)
  if (res.code == 200) {
    ElMessage({ message: '新增成功', type: 'success' })
    dataMap.dialogVisible = false
    search()
  }
}
const onError = () => {
  dataMap.dialogLoading = false
}
const submitForm = () => {
  upload.value.submit()
}

onMounted(() => {
  search()
})
</script>
<style lang="scss" scoped>
// ::v-deep .el-dialog__body{
//   height: 50vh;
// }
.preview_img {
  width: 560px;
  height: 300px;
}
</style>