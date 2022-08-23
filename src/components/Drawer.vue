<template>
  <div class="content">
    <el-drawer v-model="drawer" title="报警" :direction="direction">
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
 import { ref } from 'vue';

const drawer = ref(true)
const direction = ref('ltr')
</script>


<style scoped lang="less">

</style>
