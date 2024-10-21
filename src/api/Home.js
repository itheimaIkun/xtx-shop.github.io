import http from "@/utils/http";

//获得新鲜好物列表
export const getNewService = () => http.get('/home/new')

//获得人气推荐列表
export const getHotService = () => http.get('/home/hot')

//获得热门品牌列表
export const getBrandService = () => http.get('/home/goods')

