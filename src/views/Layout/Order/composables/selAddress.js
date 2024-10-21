//这里封装的是跟选择地址有关的逻辑
import { ref } from 'vue'
import { useGetProviceService, useGetCityService, useGetAreaService } from '@/api/Address'
export const selAddressAction = () => {
  //获得省份
  const provinceList = ref([])
  //获得城市
  const cityList = ref([])
  //获得地区
  const areaList = ref([])
  //初始化省份列表
  const getpro = async (p) => {
    const res = await useGetProviceService()
    p.value = res.data.data
  }


  //定义跟option绑定的值
  const pname = ref('')
  const cname = ref('')
  const aname = ref('')
  //选择省份执行的函数
  const selProvince = async (selected, pn, cn, an, al, cl) => {
    //拿到省份之后同时开启下一次的城市请求
    pn.value = selected
    //其他选项清空
    cn.value = ''
    an.value = ''
    al.value = []
    const res = await useGetCityService(pn.value)
    cl.value = res.data.data
  }
  //选择城市执行的函数
  const selCity = async (selected, cn, an, pn, al) => {
    //拿到城市之后同时发起请求
    cn.value = selected
    an.value = ''
    const res = await useGetAreaService(pn.value, cn.value)
    al.value = res.data.data
  }

  //选择地区执行的函数
  const selArea = (fuck, an) => an.value = fuck

  //暴露出去提供给父组件
  return {
    pname,
    cname,
    aname,
    provinceList,
    cityList,
    areaList,
    selProvince,
    selCity,
    selArea,
    getpro


  }


}