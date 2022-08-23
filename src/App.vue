<template>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
// 删除动画,定时器
// onMounted(() => {
//   // @ts-ignore
//   if (animateTimer) clearInterval(animateTimer);
//   if (document.querySelector(".first-loading"))
//     document.querySelector(".first-loading")!.remove();
// });

</script>
<style lang="less">
body {
  margin: 0;
  overflow: hidden;
}
</style>
