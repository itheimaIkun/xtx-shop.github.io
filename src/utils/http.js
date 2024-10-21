//先导入axios
import axios from "axios";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus';
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter()
//基础配置包括 实例化+拦截器

//1.axios实例化 baseURL+timeout
const http = axios.create({
  //基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 20000
})

//2.axios请求拦截器
// axios请求拦截器
http.interceptors.request.use(config => {
  //有token的话我们就把他添加配置 使得请求器携带token
  //基础思想：
  //很多接口如果想要获取数据必须要带着有效的Token信息才可以，拦截器中做一次，
  //用到axios实例的其他都可以拿到
  //1.先拿到token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  //2.配置token
  if (token) {
    //按照后端的拼接token形式来
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  ElMessage.warning(e.response.data.message)
  //401错误以及token失效
  if (e.response.status === 401) {
    const userStore = useUserStore()
    //清空用户信息
    userStore.clearUserinfo()
    //跳转路由
    router.push('/login')
  }

  return Promise.reject(e)

})





export default http



