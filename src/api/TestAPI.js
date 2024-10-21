import http from "@/utils/http";

//获得一级分类
export const getCategoryService = () =>
  http.get('/home/category/head')

//获得轮播图的数据
export const getBannerService = (isHome = '1') =>
  http.get('/home/banner', {
    params: {
      distributionSite: isHome
    }
  })
