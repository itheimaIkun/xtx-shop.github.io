<!-- 跟订单页相关 -->
<script setup>
import {onMounted , ref } from 'vue'
//拿到地址信息
import { getAddressAction } from './composables/getAddress';
//切换地址信息
import { changeAddressAction } from './composables/changeAddress';
//删除地址信息
import { delCartAction } from './composables/delAddress';
//引入添加/编辑地址组件
import Addaddress from './components/Addaddress.vue';
//生成订单
import { useCreatOrderService } from '@/api/Pay';
//商品相关 拿到仓库里的cartList进行渲染
import { useCartStore } from '@/stores/CartStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const {cartList ,selectdCount,selectdPrice } = storeToRefs(useCartStore())
const {clearCart} = useCartStore()

//拿到里面的计算属性


//获得地址信息
const {curAddress , checkInfo , time , showFuck , getcurAddress } = getAddressAction()

//切换地址时的逻辑
const {dialogVisible , activeIndex , getActiveIndex , changeAddress , InitIndex } = changeAddressAction()

//切换地址点击确定之后
const comfirm = () => changeAddress(curAddress , checkInfo)




const goods = ref()

onMounted(() => {
  
  getcurAddress(curAddress , checkInfo)
    goods.value = cartList.value.filter(item => item.selectd === true)
  

}
)

//删除地址
const {loading , delAddress} = delCartAction()

//点击删除按钮执行的函数
const dodelchange = (id) => delAddress(id , curAddress , checkInfo)

//控制添加地址组件显示变量
const showBox = ref()
//更新地址列表
const doUpdate = () =>getcurAddress(curAddress , checkInfo)

const opendig = () => {
  dialogVisible.value=true
  InitIndex(curAddress , checkInfo)
}

//生成订单
const router = useRouter()
const CreateOrder = async() => {
 const res =  await useCreatOrderService({
  "deliveryTimeType": 1,
  "payType": 1,
  "payChannel": 1,
  "buyerMessage": "",
  "goods":goods.value.map(item => {
    return {
      skuId:item.skuId,
      count:item.count
    }
  }),
  "addressId":curAddress.value.id

  })
  console.log(res.result);
  //拿到id跳转就行了
  const orderId = res.result.id
  router.push({
    path:'/Pay',
    query:{
      id:orderId
    }
  })
  //还有一个事情 重置购物车
  clearCart()
  
  
  
}


</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="opendig">切换地址</el-button>
              <el-button size="large" @click="showBox.open({})">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ (i.price*i.count).toFixed(2) }}</td>
                <td>&yen;{{ (i.price*i.count).toFixed(2)  }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ selectdCount}}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ selectdPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ 0.01 }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ (selectdPrice+0.01).toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="CreateOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog 
  v-loading="loading"
  v-model="dialogVisible" 
  title="切换收货地址" width="30%" 
  center>
  <div class="addressWrapper" >
    <div class="text item" v-for="(item , index) in checkInfo.userAddresses"  :key="item.id" @click="getActiveIndex(index)" 
    :class="{active:index === activeIndex}"
    >
      <ul>
      <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
      <li><span>联系方式：</span>{{ item.contact }}</li>
      <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
      </ul>
    
       <div class="editBox">
        <!-- 编辑地址按钮 -->
        <i @click="showBox.open(item)" class="iconfont icon-edit"></i>
        <!-- 删除按钮 -->
        <i class="del iconfont icon-close-new" @click="dodelchange(item.id)"></i>
       </div>
      
    </div>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="comfirm">确定</el-button>
    </span>
  </template>
</el-dialog>
  <!-- 添加地址 -->
  <Addaddress @updateList="doUpdate" ref="showBox"></Addaddress>
   <!-- 温馨提示 -->
    <el-dialog 
    title="温馨提示：你还没有登录喔亲"
    v-model="showFuck">
     
      <div class="fuck">
        
        <h1>
          还有{{time}}秒后就跳转到登录页~
        </h1>
      
        
      </div>
     
    </el-dialog>
    
 
</template>

<style scoped lang="scss">

.fuck {
  background-color: $xtxColor;
  height: 300px;
  text-align: center;
  align-content: center;
  color: $warnColor;
  h1 {
    color: $warnColor;
  }
}
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    position: relative;
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
  
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
      
      
      

    }
    .editBox {
      position: absolute;
      right: 0;
      i {
        color: #626468 !important;
        margin-left: 2px;
        font-size: 20px;
        &:hover {
          color: $warnColor !important;
        }
      }

    }
    &:hover {
      color: $warnColor;
    }
  }
}
</style>