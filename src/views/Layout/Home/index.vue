<script setup>
//先注册组件
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
</script>

<template>
  <div class="container">
    <HomeCategory></HomeCategory>
    <HomeBanner></HomeBanner>
  </div>
  <!-- 新鲜好物 -->
 <HomeNew></HomeNew>
 <!-- 人气推荐 -->
 <HomeHot></HomeHot>
 <!-- 产品列表 -->
 <HomeProduct></HomeProduct>
</template>