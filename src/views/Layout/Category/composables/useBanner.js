////layout页面的轮播图的获取分类逻辑
//获得轮播图
import { getBannerService } from '@/api/TestAPI';
import { ref, onMounted } from 'vue'
export const useBanner = () => {
  //获得轮播图图片参数
  const bannerList = ref([])
  const getbannerList = async () => {
    const res = await getBannerService('2')
    bannerList.value = res.result
  }
  onMounted(() => getbannerList())
  return {
    bannerList
  }

}
