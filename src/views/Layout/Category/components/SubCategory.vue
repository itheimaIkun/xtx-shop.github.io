<script setup>
//这是二级分类页面
//获得面包屑导航数据
import { getSubCategoryService } from '@/api/SubCategory';
import { useRoute } from 'vue-router';
import {ref , onMounted} from 'vue'
//获得二级商品列表
import { getGoodsService } from '@/api/SubCategory';
import GoodItem from '../../Home/components/GoodItem.vue';
import { useScroll } from '@vueuse/core';

//加个加载效果
const loading = ref(false)
const SubCategoryList =ref([])
//获得路由参数
const route = useRoute()
const getSubCategoryList = async() => {
  const res = await getSubCategoryService(route.params.id)
  SubCategoryList.value=res.result
}
onMounted(() => getSubCategoryList())
//获得商品列表
//查询参数
const GoodData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField: 'publishTime'
})
const goodList = ref([])
const getgoodList = async() => {
  //一进来先开启蒙层
  loading.value=true
  const res = await getGoodsService(GoodData.value)
  goodList.value=res.result.items
  //发送完停止蒙层
  loading.value=false
}
onMounted(() => getgoodList())

//业务二：点击tab栏切换
//点击筛选之后再发一次请求
const tabChange = () => {
  //首先要回到第一页
  GoodData.value.page = 1
  //因为开启了双向绑定 直接开始发送请求就行了
  console.log(GoodData.value.sortField);
  
  getgoodList()
}

//业务三：无限滚动
//定义判断鼠标是否滑倒了底部的变量
//滑动完一页page就++ 当page页的内容为空的时候就给false停止继续滑动就行了
const isFullData = ref(false)
const {y} =  useScroll(window)
//鼠标滑倒底部的时候会触发load函数 
const load = async() => {
   //加载下一页的商品信息
   GoodData.value.page++
   //发请求
   const res = await getGoodsService(GoodData.value)
   //添加到goodList后面 ...展开运算符的妙用
  goodList.value  = [...goodList.value,...res.result.items]
  //当下一页商品信息的长度为0的时候就停止加载咯
  //加载完毕 停止监听
  if(res.result.items.length === 0) {
    isFullData.value = true
  }

}





</script>


<template>
  <div class="container " v-loading="loading">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${SubCategoryList.parentId}` }">{{SubCategoryList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{SubCategoryList.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="GoodData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load"  :infinite-scroll-disabled="isFullData">
         <!-- 商品列表-->
         <GoodItem v-for="item in goodList" :key="item.id" :good="item"></GoodItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>