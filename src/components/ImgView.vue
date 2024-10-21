<!-- 图片预览组件  -->
<!-- 功能：放大镜 预览 小图切大图显示-->
<script setup>
//图片预览逻辑
import { ImgView } from '@/composables/ImgView';
//动态渲染列表
defineProps({
  imageList:{
    type:Array,
    default:() => []
  }
})
// 图片列表
const { targetIndex,target,
    left,
    top,
    Bigleft,
    Bigtop,
    isOutside,mouseBehavior} = ImgView()
</script>


<template>
  <div class="goods-image">
    
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[targetIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ 
        left: `${left}px`, 
        top: `${top}px` }" 
        v-show="!isOutside"
        
      ></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" 
      :key="i" 
      @mouseenter="mouseBehavior(i)"
      :class="{active:i===targetIndex}"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[targetIndex]})`,
        backgroundPositionX: `${Bigleft}px`,
        backgroundPositionY: `${Bigtop}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
