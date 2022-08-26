<template>

  <div style="width:100%;height:100vh" id="container">
    <div class="titleBox">
      <div class="title" @click="aaaaa">
        劳资是天下第一大屏
      </div>
    </div>
    <Drawer :show='show' />
    <!-- 弹幕 -->
    <!-- <vue-danmaku v-model:danmus="danmus" ref="danmakuRef" use-slot loop :fontSize="50" extraStyle="color:red"
      style="height:100vh; width:100wh">
      <template slot="dm" v-slot:dm="{ index, danmu }">
        <div>
          <el-avatar :src="danmu.avatar"> </el-avatar>{{ danmu.text }}
        </div>
      </template>
    </vue-danmaku> -->
  </div>

</template>

<script lang="ts" setup>
import { isConditional } from '@babel/types';
import { onMounted, ref, reactive, defineComponent } from 'vue'
import Drawer from "@/components/Drawer.vue";
import { createSocket } from "@/utils/WebSocket";
import vueDanmaku from 'vue3-danmaku'
let yellow_triangle = require("../assets/yellow_triangle.png")
let red_triangle = require("../assets/red_triangle.png")
let blue_triangle = require("../assets/blue_triangle.png")
let warning = require("../assets/warning.png")
let data = [
  [117.2, 39.13, { type: 1 }],
  [106.27, 38.47, { type: 2 }],
  [117.27, 31.86, { type: 1 }],
  [117, 36.65, { type: 2 }],
  [112.53, 37.87, { type: 3 }],
  [121.48, 31.22, { type: 2 }],
  [102.73, 25.04, { type: 1 }],
  [111.65, 40.82, { type: 2 }],
  [116.46, 39.92, { type: 1 }],
  [125.35, 43.88, { type: 2 }],
  [104.06, 30.67, { type: 1 }],
  [104.94, 30.57, { type: 2 }],
]
// 定义服务中心  小区  和报警三个图
let icon = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: yellow_triangle,
  // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
  imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
});
let icon1 = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: red_triangle,
  imageSize: new AMap.Size(40, 50)
});
let icon2 = new AMap.Icon({
  size: new AMap.Size(60, 60),
  image: blue_triangle,
  imageSize: new AMap.Size(40, 50)
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
    mapStyle: "amap://styles/darkblue",//地图的背景颜色
    // center: [105.34, 36.312316],
  });

  //信息窗口实例
  var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
  //遍历生成多个标记点
  for (var i = 0, marker; i < data.length; i++) {
    let arr: any = [data[i][0], data[i][1]]
    let type = data[i][2].type
    marker = new AMap.Marker({
      icon: type == 1 ? icon : type == 2 ? icon1 : icon2,
      position: arr,
      map: map,
    });

    marker.setLabel({
      offset: new AMap.Pixel(1, 0), //设置文本标注偏移量
      content: `  ${`<div 
      class=${type == 1 ? 'mapYellowTitleBox' : type == 2 ? 'mapRedTitleBox' : 'mapBlueTitleBox'}>`} 
      ${`<div class=${type == 1 ? 'mapYellowTitle' : type == 2 ? 'mapRedTitle' : 'mapBlueTitle'}>`}
      &nbsp;<img src=${warning} class="warning">&nbsp;劳资天下第一&nbsp;
      ${'</div>'}
      </div>`, //设置文本标注内容
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
// 子组件所有的参数
let show = ref(false)
defineComponent({
  Drawer
})
const aaaaa = () => {
  show.value = true
}
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

.titleBox {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 9999;
  background-color: rgba(0, 0, 1, .5);

  .title {
    text-align: center;
    color: white;
    height: 90px;
    line-height: 100px;
    font-size: 32px;
    margin-top: 20px;
    background: url('../assets/titleBg.png');
    background-size: 100%;
  }
}

#container {
  .amap-marker-label {
    border: 0 none;
    padding: 0;
    background: transparent;
    line-height: normal;
    z-index: 9999;
  }

  // 红色报警得
  .mapRedTitleBox {
    border: 0 none;
    background-color: #fff;
    white-space: nowrap;
    border-radius: 5px;
    background: url('@/assets/red.png') no-repeat;
    background-size: 100%;
    background-position: center;
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mapRedTitle {
    background: url('@/assets/redBg.png') no-repeat;
    background-position: center;
    background-size: 100%;
    white-space: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 4px;
    box-sizing: border-box;
  }

  // 蓝色
  .mapBlueTitleBox {
    border: 0 none;
    background-color: #fff;
    white-space: nowrap;
    border-radius: 5px;
    background: url('@/assets/blue.png') no-repeat;
    background-size: 100%;
    background-position: center;
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 0 none;
    // background-color: #fff;
    // white-space: nowrap;
    // border-radius: 5px;
    // background: url('@/assets/blue.png') no-repeat;
    // background-size: 100%;
    // background-position: center;
    // font-size: 20px;
    // padding: 0;
    // color: white;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }

  .mapBlueTitle {
    background: url('@/assets/blueBg.png') no-repeat;
    background-position: center;
    background-size: 100%;
    white-space: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 4px;
    box-sizing: border-box;
    // padding: 30px 14px;
    // background: url('@/assets/blueBg.png') no-repeat;
    // background-position: center;
    // background-size: 100%;
    // white-space: inherit;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }

  // 黄色
  .mapYellowTitleBox {
    border: 0 none;
    background-color: #fff;
    white-space: nowrap;
    border-radius: 5px;
    background: url('@/assets/yellow.png') no-repeat;
    background-size: 100%;
    background-position: center;
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .mapYellowTitle {
    background: url('@/assets/yellowBg.png') no-repeat;
    background-position: center;
    background-size: 100%;
    white-space: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 4px;
    box-sizing: border-box;
  }
}

.warning {
  width: 20px;
  height: 20px;
  -webkit-animation: scaleout 1s infinite ease-in-out;
  animation: scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes scaleout {
  0% {
    -webkit-transform: scale(1.0)
  }

  100% {
    -webkit-transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }

  100% {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    opacity: 0;
  }
}
</style>