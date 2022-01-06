<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-22 17:58:00
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-09 17:14:35
-->
<template>
  <BasicContainer>
    <XForm :options="formOptions" :form="dataMap.formData" @callback="search" />
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <XTable
      :options="tableOptions"
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
          <el-button size="mini" type="text" @click="rowUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" @click="handleDrawScope(scope.row)">绿地范围标记</el-button>
          <el-button size="mini" type="text" @click="rowDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </XTable>
    <XDialog
      ref="dialog"
      width="60vw"
      :title="dataMap.title"
      :form="dataMap.dialogForm"
      :options="dialogOptions"
      v-model:visible="dataMap.dialogVisible"
      :rules="dataMap.dialogRules"
      @callback="submitForm"
    >
      <div id="map"></div>
    </XDialog>

    <el-dialog title="绿地范围标记" v-model="dataMap.regionDialogVisible" width="60vw" top="10vh">
      <div id="container"></div>
      <template #footer>
        <el-button @click="dataMap.regionDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleRegionSave" size="small">确 定</el-button>
      </template>
    </el-dialog>
  </BasicContainer>
</template>

<script lang="ts" setup>
import { XForm, XTable, XDialog } from "@/components";
import { tableOptions, formOptions, dialogOptions } from "./options";
import {
  defaultModel,
  getList,
  create,
  update,
  removeBatch,
  regionSave
} from "@/apis/geogSys/greenbelt";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { onMounted, reactive, nextTick } from "vue";
import { Pager } from "@/dtos";
import { cloneDeep } from "lodash";

declare const AMap: any;

let map2: any = {};
let polygon;

const dataMap = reactive({
  title: "",
  id: '',
  loading: false,
  dialogVisible: false,
  regionDialogVisible: false,
  center: [115.656198, 34.415168],
  overlays: [],
  regionList: [],
  formData: {
    applyType: 10,
  },
  dialogForm: defaultModel,
  tableData: [],
  dialogRules: [],
  pagination: new Pager(),
});

onMounted(() => {
  search();
});
const initMap = () => {
  const map = new AMap.Map("map", {
    zoom: 14, //级别
    center: dataMap.center, //中心点坐标
  });

  AMap.plugin("AMap.Geocoder", () => {
    const geocoder = new AMap.Geocoder();
    AMap.event.addListener(map, "click", (e: any) => {
      geocoder.getAddress(e.lnglat, (status: string, res: any) => {
        if (status === "complete" && res.regeocode) {
          const addr = res.regeocode.formattedAddress;
          dataMap.dialogForm.addr = addr;
        }
      });
      dataMap.dialogForm.areaId = e.target.getAdcode();
    });
  });
};
const initMap2 = () => {
  map2 = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 16,
    center: dataMap.center
  })
  map2.plugin(['AMap.MouseTool'], () => {
    var mouseTool = new AMap.MouseTool(map2)
    //监听draw事件可获取画好的覆盖物
    mouseTool.on('draw', (e: any) => {
      console.log('e', e)
      dataMap.overlays.push(e.obj)
    })

    map2.on('click', (e: any) => {
      if (dataMap.regionList.length) {
        map2.remove(polygon)
        dataMap.regionList = []
      }
      if (dataMap.overlays.length > 0) {
        map2.remove(dataMap.overlays)
        dataMap.overlays = []
      }
    })

    mouseTool.polygon({
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
    })
  })
}



const search = async () => {
  const res = await getList(
    Object.assign({}, dataMap.formData, {
      pageNum: dataMap.pagination.index,
      pageSize: dataMap.pagination.size,
    })
  );
  dataMap.pagination.all = res?.total ?? 0;
  dataMap.tableData = res?.rows ?? [];
};

const handleAdd = () => {
  dataMap.title = "新增";
  dataMap.dialogVisible = true;
  nextTick(() => {
    reset();
    initMap();
  });
};

const rowUpdate = (row: any) => {
  dataMap.dialogVisible = true;
  dataMap.title = "编辑";
  dataMap.dialogForm = Object.assign(
    {},
    {
      id: row.id,
      name: row.name,
      areaSize: row.areaSize,
      addr: row.addr,
      type: row.type,
      areaId: row.areaId,
      regionStr: row.regionStr,
      situation: row.situation,
      applyType: 10,
    }
  );
  nextTick(() => {
    initMap();
  });
};

const rowDelete = (row: any) => {
  ElMessageBox.confirm("是否删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await removeBatch({ ids: [row.id] });
    ElMessage.success("删除成功");
    search();
  });
};

const handleDrawScope = (row: any) => {
  dataMap.id = row.id
  dataMap.regionDialogVisible = true
  nextTick(() => {
    dataMap.regionList = row.lanAndLatDTOList || []
    if (row.lanAndLatDTOList && row.lanAndLatDTOList.length) {
      const { latitude, longitude } = row.lanAndLatDTOList[0]
      dataMap.center = [longitude, latitude]
      initMap2()
      const path = row.lanAndLatDTOList.map(x => [x.longitude, x.latitude])
      console.log('path', path)
      polygon = new AMap.Polygon({
        path: path,
        // strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50
      })
      map2.add(polygon)
    } else {
      initMap2()
    }
  })
}

const handleRegionSave = async () => {
  const regionList = dataMap.regionList.length
    ? dataMap.regionList
    : dataMap.overlays.length &&
    dataMap.overlays[0].Ce.path.map(x => ({
      latitude: x.lat,
      longitude: x.lng
    }))
  const params = {
    id: dataMap.id,
    lanAndLatVOList: regionList || []
  }
  await regionSave(params)
  ElMessage.success("操作成功");
  dataMap.regionDialogVisible = false
  search()
}

const submitForm = () => {
  if (!dataMap.dialogForm.id) {
    create(dataMap.dialogForm).then(() => {
      ElMessage.success("操作成功");
      dataMap.dialogVisible = false;
      search();
    });
  } else {
    update(dataMap.dialogForm).then(() => {
      ElMessage.success("操作成功");
      dataMap.dialogVisible = false;
      search();
    });
  }
};

const handleSelectionChange = (e: any) => {
  console.log("e", e);
};
const reset = () => {
  dataMap.dialogForm = cloneDeep({ ...defaultModel, applyType: 10 });
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 400px;
}
#container {
  height: 600px;
  width: 100%;
}
</style>
