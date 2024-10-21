
//layout页面的分类的获取分类逻辑
import { getCateNameService } from '@/api/Category';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export const useCategory = () => {
  const loading = ref(false)
  const route = useRoute()
  //获得路由参数 route.params.id来进行发请求
  const cateList = ref({})
  const getcateList = async (id = route.params.id) => {
    loading.value = true //开启蒙层
    const res = await getCateNameService(id)
    loading.value = false //关闭蒙层
    cateList.value = res.result
    console.log(cateList.value);

  }
  onMounted(() => getcateList())
  //点击分类立刻跳转
  onBeforeRouteUpdate((to) => getcateList(to.params.id))
  return {
    cateList,
    loading

  }
}




