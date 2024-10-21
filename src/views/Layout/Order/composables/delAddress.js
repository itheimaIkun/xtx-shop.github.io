//删除地址相关操作
import { getAddressAction } from "./getAddress"
import { ref } from 'vue'
import { useDelAddressService } from "@/api/Address"
const { getcurAddress } = getAddressAction()
export const delCartAction = () => {
  //删除地址
  //加个loading效果
  const loading = ref(false)
  const delAddress = async (id, adress, check) => {
    loading.value = true
    await useDelAddressService(id)
    //删除完毕再次更新地址列表就行了
    getcurAddress(adress, check)
    loading.value = false
  }
  return {
    loading,
    delAddress
  }
}