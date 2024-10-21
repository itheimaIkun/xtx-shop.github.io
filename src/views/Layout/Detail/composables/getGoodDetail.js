//这里封装获得商品详情信息接口函数
import { useCartStore } from '@/stores/CartStore';
import { ElMessage } from 'element-plus';
import { getGoodMoreService } from '@/api/Detail';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
export const AboutGoodDetail = () => {
  //获得路由参数
  const route = useRoute()
  //获得商品详情
  const GoodDetail = ref({})
  const getGoodDetail = async () => {
    const res = await getGoodMoreService(route.params.id)
    GoodDetail.value = res.result
  }
  onMounted(() => getGoodDetail())
  //先拿到sku数据
  let skuObj = {}
  //sku组件
  const doChange = (sku) => {
    console.log(sku);
    skuObj = sku
  }
  //商品数量
  const count = ref(1)
  //修改数量方法
  const handleChange = (amout) => {
    count.value = amout
  }

  //添加购物车
  const CartStore = useCartStore()
  const addCart = () => {
    //先判断有没有选好规格
    if (skuObj.skuId) {
      //添加购物车
      //调用仓库的方法action
      CartStore.addCart({
        id: GoodDetail.value.id,//商品id
        name: GoodDetail.value.name,
        picture: GoodDetail.value.mainPictures[0],//图片
        price: GoodDetail.value.price,//最新价格
        count: count.value,//商品数量
        skuId: skuObj.skuId,//skuId
        attrsText: skuObj.specsText,//商品规格文本
        selectd: true,//是否选中
      })
      ElMessage.success('添加成功')
    }
    else {
      //没有选择规格
      //提示用户选择规格
      ElMessage.warning('请选择规格')
    }
  }
  return {
    GoodDetail,
    count,
    doChange,
    handleChange,
    addCart
  }
}

