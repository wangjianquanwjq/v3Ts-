<template>

  <div class="content">
    <!-- <transition-group appear name="animate__animated animate__bounce" enter-active-class="animate__backInLeft"
      leave-active-class="animate__backOutRight"> -->
      <div v-show="props.show" @click="aaaa">
        苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏苏
      </div>
    <!-- </transition-group> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
  show: Boolean
})
const aaaa = () => {
  console.log(props.show);

}
</script>


<style scoped lang="less">
.content {
  color: white;
  z-index: 9999;
  position: fixed;
}
</style>
