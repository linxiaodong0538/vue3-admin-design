<template>
  <div id="mapbox-container"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoibGlud2VpOTIxMjE5IiwiYSI6ImNrb2pwbnM5dTFpZ3UybnB3dHlnc2M3dGsifQ.XbmGjeu_6Fr9qByZQxsvkQ'
onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'mapbox-container',
    // center: [119.324847, 26.080925],
    center: [116.397428, 39.90923],
    zoom: 11,
    // style: 'mapbox://styles/mapbox/streets-v11',
    // style: 'mapbox://styles/mapbox/satellite-streets-v11',
    // style: style1,
    style: style2,
  })
  map.on('click', function (e) {
    console.log('----click----')
    console.log(e.point)
    console.log(e.lngLat)
  })
  map.on('dblclick', function (e) {
    console.log('----dblclick----')
    map.setStyle(style2)
  })
  map.on('wheel', function () {
    console.log('----wheel----')
    console.log(map.getZoom())
  })
})

const style1 = {
  version: 8,
  //添加来源
  sources: {
    vec: {
      //类型为栅格瓦片
      type: 'raster',
      tiles: ['http://t0.tianditu.com/vec_w/wmts?LAYER=vec&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=c837881faa32b209fad23703d36beb0a'],
      //分辨率
      tileSize: 256,
      maxzoom: 18,
    },
    cva: {
      type: 'raster',
      tiles: ['http://t0.tianditu.com/cva_w/wmts?LAYER=cva&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=c837881faa32b209fad23703d36beb0a'],
      tileSize: 256,
      maxzoom: 18,
    },
  },
  layers: [
    {
      //图层id，要保证唯一性
      id: 'tdt-vec-tiles',
      //图层类型
      type: 'raster',
      //数据源
      source: 'vec',
    },
    {
      id: 'tdt-cva-tiles',
      type: 'raster',
      source: 'cva',
    }
  ]
}
const style2 = {
  version: 8,
  //添加来源
  sources: {
    img: {
      type: 'raster',
      tiles: ['http://t0.tianditu.com/img_w/wmts?LAYER=img&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=c837881faa32b209fad23703d36beb0a'],
      tileSize: 256,
      maxzoom: 18,
    },
    cia: {
      type: 'raster',
      tiles: ['http://t0.tianditu.com/cia_w/wmts?LAYER=cia&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=c837881faa32b209fad23703d36beb0a'],
      tileSize: 256,
      maxzoom: 18,
    },
  },
  layers: [
    {
      id: 'tdt-img-tiles',
      type: 'raster',
      source: 'img',
    },
    {
      id: 'tdt-cia-tiles',
      type: 'raster',
      source: 'cia',
    },
  ]
}
</script>
<style lang="scss" scoped>
</style>
