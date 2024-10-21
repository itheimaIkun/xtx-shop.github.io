<script setup>
//调用api拿到banner图片
import { getBannerService } from '@/api/TestAPI';
import {ref , onMounted} from 'vue'
const bannerList = ref([])
const getbanerList = async() => {
  const res = await getBannerService()
  bannerList.value = res.result
}
onMounted(() => {
  getbanerList()
})


</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>


.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
img {
    width: 100%;
    height: 500px;
  }

 



</style>