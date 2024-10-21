//收获地址相关的接口
import http from "@/utils/http";
//获得省份相关的接口
import request from "@/utils/request";

//获得收获地址
export const useGetAdressService = () => http.get('/member/address')

//删除购物地址
export const useDelAddressService = (id) => http.delete(`/member/address/${id}`)

//添加地址
export const useAddAddressService = (data) => http.post('/member/address',
  data
)

//修改地址
export const uesEditAddressService = (data) => http.put(`/member/address/${data.id}`, data)

//获得省份
export const useGetProviceService = () => request.get('/province')

//获得城市
export const useGetCityService = (pname) => request.get('/city', {
  params: {
    pname
  }
})

//获得地区
export const useGetAreaService = (pname, cname) => request.get('/area', {
  params: {
    pname,
    cname
  }
})




