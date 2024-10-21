//封装跟订单有关的接口
/*
params: {
  orderState:0, //订单状态
  page:1,       //当前页数
  pageSize:2    //每页条数
}
*/
import http from "@/utils/http"
export const getUseOrder = (params) => http.get('/member/order', {
  params
})




