//跟分类有关的api
import http from "@/utils/http";

//1.根据id获得分类名称
export const getCateNameService = (id) => http.get('/category', {
  params: { id }
})