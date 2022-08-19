<template>
  <div style="width:100%;height:100vh" id="container"></div>
  <div class="aaa" @click="dome">
    我是
  </div>
</template>

<script lang="ts" setup>
import { isConditional } from '@babel/types';
import { onMounted, ref, reactive, defineProps } from 'vue'
let icon = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
  // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  // imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
});
let lnglats = [[120.439915, 36.160679], [116.39, 39.9], [102.54, 30.05], [103.54, 30.95], [104.54, 31.05]];

const mapInit = () => {
  var map = new AMap.Map("container", { resizeEnable: true });//初始化地图
  //信息窗口实例
  // var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
  //遍历生成多个标记点
  for (var i = 0, marker; i < lnglats.length; i++) {
    marker = new AMap.Marker({
      icon: icon,
      position: lnglats[i],//不同标记点的经纬度
      map: map
    });
  }
  var polygon = new AMap.Polygon({
    path: lnglats,  //以5个点的坐标创建一个隐藏的多边形
    map: map,
    strokeOpacity: 0,//透明
    fillOpacity: 0,//透明
    bubble: true//事件穿透到地图
  });
  var overlaysList = map.getAllOverlays('polygon');//获取多边形图层
  map.setFitView(overlaysList);
}
const dome=()=>{
  console.log(123);
  
}
onMounted(() => {
  mapInit();
});
</script>
<style lang="less">
.aaa {
  position: fixed;
  top: 0;
  left: 10px;
  height: 200px;
  border: 1px solid;
}
</style>