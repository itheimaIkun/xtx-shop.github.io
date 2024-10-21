//获得分类的详情
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryService } from '@/api/TestAPI'
export const useCategoryStore = defineStore('category', () => {
  //state 数据
  const cateList = ref([])


  //action 方法
  const getcateList = async () => {
    const res = await getCategoryService()
    cateList.value = res.result

  }
  return {

    cateList,
    getcateList
  }
})