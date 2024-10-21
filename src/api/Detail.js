//获得商品详情数据
import http from "@/utils/http";
export const getGoodMoreService = (id) => http.get('/goods', {
  params: { id }
})

//获得热榜数据
export const getHotGoodService = (data) => http.get('/goods/hot', {
  params: data
})

//获得猜你喜欢商品
// limit的默认值是4
export const getLikeGoodService = ({ limit = 4 }) => http.get('/goods/relevant', {
  params: {
    limit
  }
})
