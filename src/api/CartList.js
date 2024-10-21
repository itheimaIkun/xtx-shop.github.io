//封装跟购物车有关的接口
import http from "@/utils/http";
//合并购物车
export const useMergeCartService = (data) => http.post('/member/cart/merge', data)

//获取购物车
export const useGetCartService = () => http.get('/member/cart')

//加入购物车
export const useAddCartService = ({ skuId, count }) => http.post('/member/cart', { skuId, count })

//删除购物车
export const useDelCartService = (ids) => http.delete('/member/cart', {
  data: {
    ids
  }
})

//修改-购物车商品
export const useSelectCartService = ({ skuId, selectd, count }) => http.put(`/member/cart/${skuId}`, {
  skuId,
  selected: selectd,
  count
})

//修改-购物车全选/取消
export const useAllSelectCartService = (selected, ids) => http.put('/member/cart/selected', {
  selected, ids
})