<script setup>
import { action1 } from './composables/action1';
import {onMounted , ref} from 'vue'
import { action2 } from './composables/action2';
import Addaddress from '../Order/components/Addaddress.vue';
import { useGetProviceService , useGetCityService , useGetAreaService} from '@/api/Address';

const {fuck , nmd} = action2()
const {serItem , state } = action1()
//谁的数据谁来修改
const doCkick = () => {
state.value.fuck = 'fuck'
fuck(state)  
}
onMounted(() => serItem())
const dofuck = () => {
  nmd(state)
}

//获得省份
const provinceList = ref([])
//获得城市
const cityList = ref([])
//获得地区
const areaList = ref([])
const getpro = async() => {
 const res = await useGetProviceService()
  provinceList.value= res.data.data
//  console.log(provinceList.value);
 
}
const pname = ref('')
const cname = ref('')
const aname = ref('')
const fuckyou = async(selected) => {
  //拿到省份之后同时开启下一次的城市请求
  pname.value = selected
  //其他选项清空
  cname.value=''
  aname.value=''
  areaList.value=[]
  const res = await useGetCityService(pname.value)
  cityList.value = res.data.data

}
const fuckcity = async(selected) => {
  //拿到城市之后同时发起请求
  cname.value=selected
  aname.value = ''
  const res = await useGetAreaService(pname.value , cname.value)
  areaList.value = res.data.data
  
}
const fuckarea = (fuck) => aname.value = fuck

//在父组件调用子组件的open方法 用到ref获得组件实例
const fuckRef = ref()
const addaction = () => fuckRef.value.open({})
const editaction = () => fuckRef.value.open(bitch.value)




const bitch = ref({
  address: "111",
    addressTags: "111",
    cityCode: "该死的城市编码",
    contact: "1111111111111",
    countyCode: "该死的地区编码",
   
    // id: "880",
    isDefault: 1,
    postalCode: "11",
    provinceCode: "该死的省份编码",
    receiver: "蔡徐坤四号、"
})
const showbitch = () => {
  const fullLocation = `${pname.value}-${cname.value}-${aname.value}`
  bitch.value.fullLocation = fullLocation
  console.log(bitch.value);
  
  console.log(pname.value);
  console.log(cname.value);
  console.log(aname.value);
  
}

const confuck = (select) => {
  console.log(select);
  bitch.value.isDefault = select?0:1
  console.log(bitch.value);
  
  
}


</script>

<template>


  <el-button @click="showbitch">显示变量</el-button>
  <el-button @click="addaction">添加地址</el-button>
  <el-button @click="editaction">编辑地址</el-button>
  <el-button type="primary" @click="doCkick">显示变量</el-button>
  <div>{{ state }}</div>
<el-button @click="dofuck">改值</el-button>
<el-button @click="getpro">获得省份</el-button>


<!-- 测试做的添加组件 -->
 <!-- 除了省之外其他组件每次点了都要清空值 -->
<Addaddress  ref="fuckRef"></Addaddress>
<Addaddress  ref="fuckRef"></Addaddress>
<!-- 选择地区 -->
<el-select 
@change="fuckyou"
v-model="pname"
size="large"
style="width: 200px;"
>
  <el-option v-for="item in provinceList"
  :key="item"
  :value="item"
  >{{item}}</el-option>
</el-select>


<el-select 
@change="fuckcity"
v-model="cname"
size="large"
style="width: 200px;"
>
  <el-option v-for="item in cityList"
  :key="item"
  :value="item"
  >{{item}}</el-option>
</el-select>


<el-select 
@change="fuckarea"
v-model="aname"
size="large"
style="width: 200px;"
>
  <el-option v-for="item in areaList"
  :key="item"
  :value="item"
  >{{item}}</el-option>
</el-select 
>
<el-checkbox @change="confuck"></el-checkbox>

</template>

<style>
.el-form-item__content {
  width: 100px !important;
}
</style>