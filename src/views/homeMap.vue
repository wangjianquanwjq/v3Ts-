<template>

  <div style="width:100%;height:100vh" id="container">
    <vue-danmaku v-model:danmus="danmus" ref="danmakuRef" use-slot loop :fontSize="50" extraStyle="color:red"
      style="height:100vh; width:100wh">
      <template slot="dm" v-slot:dm="{ index, danmu }">
        <div>
          <el-avatar :src="danmu.avatar"> </el-avatar>{{ danmu.text }}
        </div>
      </template>
    </vue-danmaku>
  </div>
  <!-- <Drawer /> -->

</template>

<script lang="ts" setup>
import { isConditional } from '@babel/types';
import { onMounted, ref, reactive, defineComponent } from 'vue'
import Drawer from "@/components/Drawer.vue";
import { createSocket } from "@/utils/WebSocket";
import vueDanmaku from 'vue3-danmaku'
let data = [
  [117.2, 39.13, { type: 1 }],
  [106.27, 38.47, { type: 2 }],
  [117.27, 31.86, { type: 1 }],
  [117, 36.65, { type: 2 }],
  [112.53, 37.87, { type: 1 }],
  [121.48, 31.22, { type: 2 }],
  [102.73, 25.04, { type: 1 }],
  [111.65, 40.82, { type: 2 }],
  [116.46, 39.92, { type: 1 }],
  [125.35, 43.88, { type: 2 }],
  [104.06, 30.67, { type: 1 }],
  [104.94, 30.57, { type: 2 }],
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
  [117.2, 39.13],
  [106.27, 38.47],
  [117.27, 31.86],
  [117, 36.65],
  [112.53, 37.87],
  [121.48, 31.22],
  [102.73, 25.04],
  [111.65, 40.82],
  [116.46, 39.92],
  [125.35, 43.88],
  [104.06, 30.67],
  [104.94, 30.57],




];
//初始化地图
const mapInit = () => {
  var map = new AMap.Map("container", {
    // zoom: 3.9, //初始化地图级别
    resizeEnable: true,
    mapStyle: "amap://styles/fcfe27bbf3be954fccb642c86081a123",//地图的背景颜色
    // center: [105.34, 36.312316],
  });

  //信息窗口实例
  var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
  //遍历生成多个标记点
  for (var i = 0, marker; i < data.length; i++) {
    let arr: any = [data[i][0], data[i][1]]
    marker = new AMap.Marker({
      icon: data[i][2].type == 1 ? icon : icon1,
      position: arr,
      map: map,
    });
    
    marker.setLabel({
      offset: new AMap.Pixel(1, 0), //设置文本标注偏移量
      content: '<div>' + "劳资天下第一" + '</div>', //设置文本标注内容
      direction: 'top', //设置文本标注方位
    })
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





const danmus = ref([{ avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: 'a', text: 'aaa' }, { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: 'b', text: 'bbb' }])
const danmakuRef = ref(null)
defineComponent({
  Drawer
})
onMounted(() => {
  mapInit();
  // danmakuRef.value.play()
  // createSocket('ws://172.18.14.253:8007/dev-server/262/2p50atvb/websocket', (res) => {
  //   console.log(res);

  // })
});
</script>
<style lang="less">
.vue-danmaku .danmus .dm.move {
  z-index: 9999;
}

.amap-marker-label {
  padding: 2px 6px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  text-align: center;
  font-size: 14px;
  border: 0;
}
</style>