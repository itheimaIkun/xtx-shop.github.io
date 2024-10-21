//获得地址信息的封装
import { useGetAdressService } from "@/api/Address"
import { ref } from 'vue'
import { useRouter } from 'vue-router';



//curAddress就是要显示的地址信息
//checkInfo是所有地址信息以及商品信息
export const getAddressAction = () => {

  const curAddress = ref([]) //地址 要返回
  const checkInfo = ref({}) //订单 要返回
  const router = useRouter()  //跳转路由
  // 地址对象 要返回
  // 订单对象
  //登录失败时候的倒计时
  let time = ref(5) //要返回
  //控制弹层的显示和关闭
  const showFuck = ref(false) //要返回

  //1.获得地址 以及初始化
  const getcurAddress = async (adress, check) => { //要返回
    try {
      const res = await useGetAdressService()
      //这里是找到默认的地址然后直接赋值就行了
      adress.value = res.result.find(item => item.isDefault === 0)
      //拿到全部的地址值做切换的时候进行回显
      check.value.userAddresses = res.result


    } catch {
      //打开跳转的弹层
      showFuck.value = true
      // ElMessage.warning('请先登录呀铁铁')
      //5s的倒计时
      let timeId = setInterval(() => {
        if (time.value > 0)
          time.value--
        if (time.value <= 0) {
          //停止计时器
          clearInterval(timeId)
          showFuck.value = false
          //跳转到登录页面
          router.push('/login')
        }
      }, 1000)
    }
  }




  return {
    curAddress,
    checkInfo,
    time,
    showFuck,
    getcurAddress,

  }
}