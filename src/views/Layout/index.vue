<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFix from './components/LayoutFix.vue';
import '@/styles/common.scss'
import {onMounted} from 'vue'
//一进主页面先发请求获得分类
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
onMounted(() => {
//先发请求
categoryStore.getcateList()
})



</script>
<template>

  <LayoutNav></LayoutNav>
  <LayoutFix></LayoutFix>
  <LayoutHeader></LayoutHeader>
  <!-- 二级路由出口 -->
  <RouterView></RouterView>
  <LayoutFooter></LayoutFooter>

</template>
<style>
  .el-carousel__arrow--left {
  left: 250px !important;
}
</style>