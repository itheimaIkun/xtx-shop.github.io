import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Layout/Home/index.vue'
import Category from '@/views/Layout/Category/index.vue'
import SubCategory from '@/views/Layout/Category/components/SubCategory.vue'
import Detail from '@/views/Layout/Detail/index.vue'
import CartList from '@/views/Layout/CartList/index.vue'
import Order from '@/views/Layout/Order/index.vue'
import test from '@/views/Layout/test/test.vue'
import Pay from '@/views/Layout/Pay/index.vue'
import Vip from '@/views/Layout/Vip/index.vue'
import User from '@/views/Layout/Vip/components/user.vue'
import UseOrder from '@/views/Layout/Vip/components/order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/category/:id', component: Category },
        { path: '/category/sub/:id', component: SubCategory },
        { path: '/detail/:id', component: Detail },
        { path: '/cartList', component: CartList },
        { path: '/order/', component: Order },
        { path: '/test', component: test },
        { path: '/pay', component: Pay },
        {
          path: '/vip',
          component: Vip,
          // 三级路由
          children: [
            //默认打开链接:path:''
            { path: '', component: User },
            { path: '/member/order', component: UseOrder },
          ]
        },
      ],

    },
    {
      path: '/login',
      component: Login
    }
  ],
  // 跳转路由的时候鼠标自动滑倒顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
