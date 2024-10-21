//购物车有关的pinia数据仓库
import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useGetCartService, useMergeCartService, useAddCartService, useDelCartService, useSelectCartService, useAllSelectCartService } from "@/api/CartList";
import { useUserStore } from "./user";


export const useCartStore = defineStore('cart', () => {
  //定义state数据
  const cartList = ref([])
  //导入用户仓库模块
  const userStore = useUserStore()
  //拿到token的值
  //有就是接口购物车 后面的加入购物车操作都要调用接口
  //没有就是本地购物车 直接操作cartList就行啦
  const isLogin = computed(() => userStore.userInfo.token)
  //定义action方法
  const addCart = async (goods) => {
    //添加购物车逻辑
    console.log('添加成功');
    if (isLogin.value) {
      //接口购物车
      await useAddCartService(goods)
      //添加完再更新购物车就好啦
      UpdateCart()

    } else {
      //本地购物车
      // 基础思想：如果已经添加过相同的商品，就在其数量count上加一，
      //如果没有添加过，就直接push到购物车列表中
      const res = cartList.value.find(item => item.skuId === goods.skuId)
      if (res) {
        //原来的数据的数量加上添加的数量
        res.count += goods.count
      } else {
        //没有添加过直接放到列表里面就行了
        cartList.value.push(goods)
      }

    }
  }

  //删除购物车
  //思路：想找到要删除的下标 然后用splice或者用filter也行
  const delCart = async (skuId) => {
    if (isLogin.value) {
      //接口购物车的删除操作
      console.log([skuId]);
      await useDelCartService(
        [skuId]
      )
      //更新列表
      UpdateCart()
    } else {
      //本地购物车的删除操作
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }


  //计算购物车总数量
  const totalcount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))

  //计算购物车总价
  const totalPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0))

  //计算购物车选中的数量
  const selectdCount = computed(() => cartList.value.filter(item => item.selectd === true).reduce((sum, item) => sum + item.count, 0))

  //计算购物车选中的总价
  const selectdPrice = computed(() => cartList.value.filter(item => item.selectd === true).reduce((sum, item) => sum + item.count * item.price, 0))

  //单选逻辑
  const singalCheck = async (selected, skuId) => {
    //本地购物车逻辑
    //找到选中的那一项并且把他的selectd值变成selected的值
    cartList.value.find(item => item.skuId === skuId).selectd = selected
    if (isLogin.value) {
      //接口购物车的单选逻辑
      //先找到选择的那一项
      const target = cartList.value.find(item => item.skuId === skuId)
      await useSelectCartService(target)
      //更新列表

    }


  }

  //是否全选 :modelValue给组件绑定的值
  //遍历每一项的是否选中
  const isAllSelect = computed(() => cartList.value.every(item => item.selectd === true))

  //全选逻辑 @change 组件中:modelValue绑定的值发生变化时所调用的方法
  const allselected = async (selected) => {
    if (isLogin.value) {
      //接口购物车
      const ids = cartList.value.map(item => {
        return item.skuId
      })
      await useAllSelectCartService(selected, ids)


    }
    //本地购物车
    cartList.value.forEach(item => item.selectd = selected)
  }


  //在登录状态

  //1.获得购物车列表
  const UpdateCart = async () => {
    const res = await useGetCartService()
    cartList.value = res.result

  }

  //2.合并购物车列表
  const mergeCart = async () => {
    //先获得对应的请求参数数据
    const data = cartList.value.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selectd,
        count: item.count

      }
    })
    //拿到参数直接发请求就好了
    await useMergeCartService(data)
    //然后获得最新的列表就好咯
    UpdateCart()


  }

  //清空购物车
  const clearCart = () => cartList.value = []










  //返回值
  return {
    cartList,
    totalcount,
    totalPrice,
    selectdCount,
    selectdPrice,
    isAllSelect,
    clearCart,
    mergeCart,
    UpdateCart,
    allselected,
    addCart,
    delCart,
    singalCheck
  }
}, {
  persist: true
})
