<template>
  <div style="width:100%;height:100vh" id="container"></div>
  <Drawer />
</template>

<script lang="ts" setup>
import { isConditional } from '@babel/types';
import { onMounted, ref, reactive, defineComponent } from 'vue'
import Drawer from "@/components/Drawer.vue";
import { createSocket } from "@/utils/WebSocket";
let data = [
  [102.54, 30.05, { type: 1 }],
  [103.54, 30.95, { type: 2 }],
  [104.54, 31.05, { type: 1 }]
]
let icon = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
  // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  // imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
});
let icon1 = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload2007.cnool.net%2Ffiles2016%2F20200817%2F20200817194829564.gif&refer=http%3A%2F%2Fupload2007.cnool.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663827683&t=82909d7585aa9afb561805849da0c492',
  // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
});

let lnglats = [
  [102.54, 30.05],
  [103.54, 30.95],
  [104.54, 31.05]
];
//初始化地图
const mapInit = () => {
  var map = new AMap.Map("container", {
    zoom: 3.9, //初始化地图级别
    resizeEnable: true,
    mapStyle: "amap://styles/fcfe27bbf3be954fccb642c86081a123",//地图的背景颜色
    // center: [105.34, 36.312316],
  });

  //信息窗口实例
  // var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
  //遍历生成多个标记点
  for (var i = 0, marker; i < data.length; i++) {
    let arr: any = [data[i][0], data[i][1]]
    marker = new AMap.Marker({
      icon: data[i][2].type == 1 ? icon : icon1,
      position: arr,
      map: map,
    });
  }
  var polygon = new AMap.Polygon({
    path: lnglats,  //以5个点的坐标创建一个隐藏的多边形
    map: map,
    strokeOpacity: 0,//透明
    fillOpacity: 0,//透明
    bubble: true,//事件穿透到地图
  });
  var overlaysList = map.getAllOverlays('polygon');//获取多边形图层
  map.setFitView(overlaysList);
}

defineComponent({
  Drawer
})
onMounted(() => {
  mapInit();
  // createSocket('ws://172.18.14.253:8007/dev-server/262/2p50atvb/websocket', (res) => {
  //   console.log(res);

  // })
});
</script>
<style lang="less">
.custom-content-marker {
  position: relative;
  width: 80px;
  height: 40px;
  background: url('https://img1.baidu.com/it/u=724179003,4096104503&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1661360400&t=2a889b9037b484d3de8adfe5c66b3e28');
  background-size: 100% 100%;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}
</style>