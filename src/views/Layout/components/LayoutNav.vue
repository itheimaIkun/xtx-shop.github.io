<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
//如果有token 就是登录状态 如果没有token 就是非登录状态 
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const {token , nickname} = userInfo.value
//console.log(typeof(userStore)); object


//定义路由
const router = useRouter()
//退出逻辑
const onConfirm = () => {
  //清空用户信息
  userStore.clearUserinfo()
  //跳转路由
  router.push('/login')
}






</script>

<template>
  <!-- 如果有token 就是登录状态 如果没有token 就是非登录状态 -->
  <nav class="app-topnav">
  
    <div class="container">
      <ul>
        <template v-if="token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ nickname }}</a></li>
          <li>
            <el-popconfirm 
            title="确认退出吗?" 
            confirm-button-text="确认" 
            cancel-button-text="取消"
            @confirm="onConfirm"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><RouterLink to="/member/order">我的订单</RouterLink> </li>
          <li><RouterLink to="/vip">会员中心</RouterLink></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>