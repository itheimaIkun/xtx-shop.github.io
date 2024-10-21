//这里是跟支付相关的api
import http from "@/utils/http";
//生成订单id
export const useCreatOrderService = (data) => http.post('/member/order', data)
//获得订单信息
export const useGetOrderService = (id) => http.get(`/member/order/${id}`)