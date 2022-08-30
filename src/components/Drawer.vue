<template>
  <transition-group appear name="animate__animated animate__bounce" enter-active-class="animate__fadeInLeft"
    leave-active-class="animate__fadeOutLeft">
    <div :key="1" v-if="props.show" class="content">
      <div class="title">
        预警区域
      </div>
      <div class="listBox" ref="roll" @mousemove="testMove" @mouseleave="testMend">
        <div class="list" v-for="(item, index) in listData" :key="index">
          {{ item.name }}
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, defineProps, reactive, onBeforeUnmount, onUnmounted, onMounted, nextTick } from 'vue';
const props = defineProps({
  show: Boolean
})
let timer = ref()
let roll = ref(null)
//列表数据初始化
const listData = reactive([
  { name: '我是dom第一个' },
  { name: '我是dom第二个' },
  { name: '我是dom第三个' },
  { name: '我是dom第四个' },
  { name: '我是dom第六个' },
  { name: '我是dom第七个' },
  { name: '我是dom第八个' },
  { name: '我是dom第九个' },
  { name: '我是dom第十个' },
])

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
onUnmounted(() => {
  clearTimeout(timer.value)
})
function testMove() {
  clearTimeout(timer.value)
}
function testMend() {
  start()
}
//开启定时器方法
function start() {
  clearTimeout(timer.value)
  timer.value = setInterval(MarqueeTest, 100)
}
function MarqueeTest() {
  let domeNode = roll.value
  if (domeNode) {
    //判断组件是否渲染完成
    if (domeNode.offsetHeight == 0) {
      domeNode = roll.value
    } else {
      if (listData.length < 7) {
        clearTimeout(timer.value)
        return;
      }
      //组件进行滚动
      domeNode.scrollTop += 1
      //判断滚动条是否滚动到底部
      if (domeNode.scrollTop == (domeNode.scrollHeight - domeNode.clientHeight)) {
        //获取组件第一个节点
        let a = domeNode.childNodes[0]
        //删除节点
        domeNode.removeChild(a)
        //将该节点拼接到组件最后
        domeNode.append(a)
      }
    }
  }

}
start()
// nextTick(() => {
//   start()
// })



const aaaa = () => {
  console.log(props.show);

}
</script>


<style scoped lang="less">
.content {
  height: 800px;
  width: 500px;
  color: white;
  z-index: 9999;
  position: absolute;
  left: 20px;
  // right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  background: url('@/assets/listBorder.png') no-repeat;
  background-size: 100%;
  padding: 10px 14px 26px 14px;
  box-sizing: border-box;

  .title {
    height: 54px;
    line-height: 54px;
    color: white;
    font-size: 24px;
    text-align: center;
    background: url('@/assets/listTitle.png') no-repeat;
    background-size: 100%;
    margin-top: 30px;
    box-sizing: border-box;
  }

  .listBox {
    border-radius: 10px;
    height: 676px;
    background: url('@/assets/listBg.png') no-repeat;
    background-size: 100%;
    // opacity: .6;
    padding: 0px 20px 20px 20px;
    box-sizing: border-box;
    overflow: hidden;
    .list {
      height: 70px;
      background: url('@/assets/list.png') no-repeat;
      background-size: 100%;
      margin-top: 30px;
      box-sizing: border-box;
    }
  }
}
</style>
