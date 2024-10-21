//获取二级分类列表数据
import http from "@/utils/http";
export const getSubCategoryService = (id) => http.get('/category/sub/filter', {
  params: {
    id
  }
})

//获取基本商品列表
export const getGoodsService = (data) => http.post('/category/goods/temporary',
  data
)

