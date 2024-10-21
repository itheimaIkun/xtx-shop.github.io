<script setup>
import { getHotGoodService } from '@/api/Detail';
import {ref , onMounted} from 'vue'
import { useRoute } from 'vue-router';
//父传子 判断是24小时榜单还是周榜单
//拿到defineProps里面的数据要在外面赋值 通过props.xxx形式拿到值
const props =  defineProps({
  isWeek:{
    type:Number,
  }
})


const route = useRoute()
const hotGood = ref([])
//查询参数
const hotData = ref({
  id:route.params.id,
  type:props.isWeek,
  limit:3
})

const getHotGood = async() => {
  const res = await getHotGoodService(hotData.value)
  hotGood.value = res.result

}
const title = ref('')
title.value = props.isWeek === 1? '24小时榜单':'周日榜单'




onMounted(() => getHotGood())

</script>


<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotGood" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>