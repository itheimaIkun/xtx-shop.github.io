import axios from "axios"

//axios实例化
const request = axios.create({
  //基地址
  baseURL: 'http://ajax-api.itheima.net/api',
  //响应时间
  timeout: 5000
})

export default request