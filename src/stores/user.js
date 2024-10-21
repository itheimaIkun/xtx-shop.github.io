//跟用户登录相关的pinia仓库管理
//第一步 导包
import { defineStore } from "pinia";
import { ref } from 'vue'
import { getLoginService } from "@/api/user";
import { useCartStore } from "./CartStore";

//第二步 创建实例
export const useUserStore = defineStore('rabbit-user', () => {
  //在这里定义我们的数据state和方法action 
  //3.定义state
  const userInfo = ref({})
  const { mergeCart, clearCart } = useCartStore()


  //4.定义action
  const getuserinfo = async ({ account, password }) => {
    const res = await getLoginService({ account, password })
    userInfo.value = res.result
    console.log(userInfo.value);
    //点击登录之后就可以合并购物车咯
    mergeCart()

  }
  //4.2 清空用户信息
  const clearUserinfo = () => {
    userInfo.value = {}
    //清空购物车
    clearCart()

  }
  //5.别忘了暴露出去 而外面组件可以通过调用action获得数值
  return {
    userInfo,
    getuserinfo,
    clearUserinfo
  }


}, {
  persist: true
})