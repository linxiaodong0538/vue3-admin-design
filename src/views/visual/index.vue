<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-09-22 09:36:23
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-11 15:06:11
-->

<template>
  <div class="content">
    <div id="map"></div>
    <div class="background" />
    <Header class="header" />
    <Left class="left" />
    <Right class="right" />
    <Footer class="footer" />
    <!-- <FrostedGlass class="header" title="标题">内容</FrostedGlass> -->
    <div class="marker-info" v-if="dataMap.visibleMarkerWindow">
      <div class="marker-info__title">{{ dataMap.markerInfo.title }}</div>
      <div class="marker-info__content">
        <div class="item" v-for="(item, index) in dataMap.markerInfo.data" :key="index">
          <span class="text">{{ item.key }}：</span>
          <div class="value">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <div class="dialog-camera" v-if="dataMap.visibleCameraDialog">
      <div class="dialog-camera__title">摄像头</div>
      <div class="dialog-camera__body">
        <div class="info">
          <div class="item">
            <span>名称：</span>
            <span>A001摄像</span>
          </div>
          <div class="item">
            <span>范围：</span>
            <span>2km</span>
          </div>
          <div class="item">
            <span>精度：</span>
            <span>600万像素</span>
          </div>
          <div class="item">
            <span>状态：</span>
            <span class="status">正常</span>
          </div>
        </div>
        <div class="video">
          <img src="../../assets/image/zdjk_img_video.png" class="video-img" alt />
          <div class="video__right">
            <div class="tabs">
              <div class="item">实时图像</div>
              <div class="item">历史视频</div>
            </div>
            <div class="slider">
              <div class="text">
                <span>近</span>
                <span>远</span>
              </div>
              <el-slider v-model="dataMap.sliderValue"></el-slider>
            </div>
            <div class="control">
              <img src="../../assets/visual/video_img_yp.png" alt />
              <img class="arrows control-top" src="../../assets/visual/video_icon_top.png" alt />
              <img class="arrows control-bottom" src="../../assets/visual/video_icon_bt.png" alt />
              <img class="arrows control-left" src="../../assets/visual/video_icon_left.png" alt />
              <img class="arrows control-right" src="../../assets/visual/video_icon_right.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from './header.vue'
import Footer from './footer.vue'
import Left from './left.vue'
import Right from './right.vue'
import { getAll } from '@/apis/geogSys/greenbelt'
import { getList } from '@/apis/visual'
import { onMounted, reactive, ref } from 'vue'

declare const AMap: any;

let map: any = {}
const dataMap = reactive<any>({
  markers: [],
  visibleMarkerWindow: false,
  visibleCameraDialog: false,
  markerInfo: [],
  sliderValue: 20
})

onMounted(() => {
  initMap()
  getAllGreenbelt()
})

const initMap = () => {
  map = new AMap.Map('map', {
    zoom: 14, //级别
    center: [115.656198, 34.415168], //中心点坐标
    resizeEnable: true,
    layers: [
      //使用多个图层
      new AMap.TileLayer.Satellite(),
      new AMap.TileLayer.RoadNet()
    ],
    viewMode: '3D' //使用3D视图
  })

  map.on('click', (e: any) => {
    dataMap.visibleMarkerWindow = false
    dataMap.visibleCameraDialog = false
  })

  drawCommunity()
}

const getAllGreenbelt = async () => {
  const res = await getAll()
  console.log('res', res)
}

const drawCommunity = async () => {
  // 设置光照
  // map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5)
  // map.DirectionLight = new AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 1)

  // var object3Dlayer = new AMap.Object3DLayer()
  // console.log('object3Dlayer ',object3Dlayer )
  // map.add(object3Dlayer)

  // const { data } = await getAll()
  // console.log('data', data)
  // const bounds = []

  // data.forEach(x => {

  //   if (x.lanAndLatDTOList && x.lanAndLatDTOList.length) {
  //     const conduct = x.lanAndLatDTOList.map(
  //       j => new AMap.LngLat(j.longitude, j.latitude)
  //     )
  //     bounds.push(conduct)
  //   }
  // })

  // console.log('bounds',bounds)

  // var height = 400
  // var color = '#3758d28c' // rgba
  // var prism = AMap.Object3D.Prism({
  //   path: bounds,
  //   height,
  //   color

  // })
  // // prism.transparent = true
  // object3Dlayer.add(prism)
  const { data } = await getAll()
  const bounds = []
  data.forEach(x => {
    if (x.lanAndLatDTOList && x.lanAndLatDTOList.length) {
      const conduct = x.lanAndLatDTOList.map(
        j => new AMap.LngLat(j.longitude, j.latitude)
      )
      bounds.push(conduct)
    }
  })
  console.log('bounds', bounds)




  // var polygon = new AMap.Polygon({
  //   path: bounds,
  //   strokeColor: "red",
  //   strokeWeight: 2,
  //   strokeOpacity: 1,
  //   fillOpacity: 0.4,
  //   fillColor: '#1791fc',
  //   zIndex: 50,
  // })
  // map.add(polygon)
  // map.setFitView([polygon])

}

getList().then((res: any) => {
  const markers = res.data.array
  let others = [
    {
      type: 1,
      lng: '115.656129',
      lat: '34.413681'
    },
    {
      type: 2,
      lng: '115.653576',
      lat: '34.420556'
    },

    {
      type: 3,
      lng: '115.643641',
      lat: '34.415671'
    },

    {
      type: 4,
      lng: '115.625638',
      lat: '34.411015'
    },


    {
      type: 5,
      lng: '115.61551',
      lat: '34.4062'
    },

    {
      type: 6,
      lng: '115.662803',
      lat: '34.457666'
    },


  ]

  console.log('markers', markers)
  markers.push(...others)
  markers.forEach(x => {
    const marker = new AMap.Marker({
      icon: (() => {
        switch (x.type) {
          case 1:
            return require('@/assets/visual/mark_icon_mm.png')
            break
          case 2:
            return require('@/assets/visual/mark_icon_gs.png')
            break
          case 3:
            return require('@/assets/visual/mark_icon_sxj.png')
            break
          case 4:
            return require('@/assets/visual/mark_icon_xcy.png')
            break
          case 5:
            return require('@/assets/visual/mark_icon_kqjc.png')
            break
          case 6:
            return require('@/assets/visual/mark_icon_trjc.png')
            break
        }
      })(),
      position: new AMap.LngLat(x.lng, x.lat),
      map,
      extData: x
    })

    marker.on('click', (e: any) => {
      const data = e.target.getExtData()
      dataMap.visibleMarkerWindow = true
      dataMap.visibleCameraDialog = false
      switch (data.type) {
        case 1:
        case 2:
          dataMap.markerInfo = {
            title: '名木古树',
            data: [
              {
                key: '学名',
                value: '酸豆'
              },
              {
                key: '编号',
                value: '32143253'
              },
              {
                key: '科属',
                value: '酸豆属，豆科'
              },
              {
                key: '保护等级',
                value: '国家一级'
              }
            ]
          }
          break
        case 3:
          dataMap.visibleCameraDialog = true
          dataMap.visibleMarkerWindow = false

          break
        case 4:
          dataMap.markerInfo = {
            title: '李志巡查员',
            data: [
              {
                key: '姓名',
                value: '李志'
              },
              {
                key: '编号',
                value: 'A13253'
              },
              {
                key: '年龄',
                value: '38'
              },
              {
                key: '性别',
                value: '男'
              },
              {
                key: '联系电话',
                value: '1763728194'
              }
            ]
          }
          break
        case 5:
          dataMap.markerInfo = {
            title: '空气监测点',
            data: [
              {
                key: '名称',
                value: 'A监测点'
              },
              {
                key: '类型',
                value: '空气监测'
              },
              {
                key: 'PM2.5',
                value: '0132'
              },
              {
                key: '状态',
                value: '正常'
              }
            ]
          }
          break
        case 6:
          dataMap.markerInfo = {
            title: '土壤监测点',
            data: [
              {
                key: '名称',
                value: 'B监测点'
              },
              {
                key: '类型',
                value: '土壤监测点'
              },
              {
                key: '湿度',
                value: '43%'
              },
              {
                key: '状态',
                value: '正常'
              }
            ]
          }
          break
      }
    })
  })
})
</script>

<style lang="scss" scoped>
$windowWidth: 2880px;
$windowHeight: 1360px;
#map {
  width: $windowWidth;
  height: $windowHeight;
  overflow: hidden;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.4) 0%, #000000 100%);
  filter: blur(10px);
  width: $windowWidth;
  height: 70px;
  min-height: 80px;
}
.content {
  position: absolute;
  width: $windowWidth;
  height: $windowHeight;
  overflow: hidden;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: $windowWidth;
  }
  .footer {
    position: absolute;
    bottom: 20px;
    left: 476px;
    width: calc(2880px - 40px - 880px - 32px);
    height: 230px;
  }
  .left {
    position: absolute;
    top: 86px;
    left: 20px;
    height: calc(2880px - 86px - 20px);
    overflow: auto;
  }
  .right {
    position: absolute;
    top: 86px;
    right: 20px;
    height: calc(2880px - 86px - 20px);
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: #a1a3a9bb;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: #a1a3a950;
  border-radius: 10px;
}
.marker-info,
.dialog-camera {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(5, 90, 84, 0.5);
  backdrop-filter: blur(10px);
  width: 480px;
  border: 1px solid #00efce;
  z-index: 111;
  &__title {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    color: #fff;
    border-bottom: 1px solid #00efce;
    background: linear-gradient(360deg, #055a54 0%, #0ab9a8 100%);
  }
  &__content {
    padding: 20px 0 20px 20px;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-right: 40px;
      margin-bottom: 16px;
      .text {
        color: #fff;
      }
      .value {
        color: #fcc848;
        border: 1px solid #00efce;
        margin-top: 8px;
        width: 180px;
        height: 32px;
        line-height: 32px;
        padding: 0 12px;
      }
    }
  }
}
.dialog-camera {
  width: 520px;
  &__body {
    padding: 16px;
    .info {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .item {
        margin-right: 14px;
        span {
          &:nth-child(1) {
            color: #fff;
          }
          color: #fcc848;
        }
        .status {
          width: 58px;
          height: 24px;
          line-height: 24px;
          background: rgba($color: #089285, $alpha: 0.7);
          box-shadow: 0px 0px 14px 0px #06ffc4;
          border-radius: 4px;
          color: #fff;
          display: inline-block;
          text-align: center;
          border: 1px solid #06ffc4;
        }
      }
    }
    .video {
      display: flex;
      &-img {
        width: 300px;
        height: 184px;
      }
      &__right {
        padding-left: 12px;
        flex: 1;
        .tabs {
          display: flex;
          justify-content: space-between;
          .item {
            width: 80px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:nth-child(1) {
              color: #fcc848;
              border: 1px solid;
            }
            &:nth-child(2) {
              color: #00eccb;
              border: 1px solid;
            }
          }
        }
        .slider {
          padding-top: 12px;
          .text {
            display: flex;
            justify-content: space-between;
            color: #fff;
          }
        }
      }
    }
    .control {
      width: 98px;
      height: 98px;
      margin: 0 auto;
      position: relative;
      .arrows {
        position: absolute;
        cursor: pointer;
        &.control-top {
          top: 16px;
          left: 43%;
        }
        &.control-bottom {
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
        }
        &.control-left {
          top: 50%;
          transform: translateY(-50%);
          left: 16px;
        }
        &.control-right {
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.dialog-camera .slider {
  .el-slider__bar {
    background: #00ebca !important;
  }
  .el-slider__button {
    border: 2px solid #00ebca;
  }
}
</style>
