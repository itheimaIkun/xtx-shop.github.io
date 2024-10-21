<script setup>
//这里是新鲜好物和人气推荐的部分
//由于结构相似我们把它封装成一个组件
//标题和副标题用prop 内容用插槽
defineProps({
  title:{
    type:String
  },
  Subtitle:{
    type:String
  }
})
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{title}}<small>{{ Subtitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot name="new"></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>

