<!-- 这里封装的是添加地址的组件 -->
 <!-- 获取form实例做统一校验 -->
<script setup>
import { useAddAddressService , uesEditAddressService , useGetAdressService} from '@/api/Address';
import {ref , defineExpose ,defineEmits} from 'vue'
//拿到选择地区的下拉菜单的初始化数据
import { selAddressAction } from '../composables/selAddress';
import { ElMessage } from 'element-plus';
const {pname , cname , aname , provinceList , cityList , areaList,getpro , selProvince , selCity , selArea } = selAddressAction()
//定义装下拉菜单的数组好方便遍历


const selData = ref([
  { addName:pname , addList:provinceList, 
    action:(selected) => selProvince(selected , pname , cname,aname , areaList , cityList)
  },
  { addName:cname , addList:cityList,  
    action:(selected) =>selCity(selected , cname ,aname , pname , areaList)},
  { addName:aname , addList:areaList, action:(selected) =>selArea(selected , aname)}
])
//省份样式
const fontStyle =ref(['省份' , '城市' , '地区']) 
//先初始化省份
getpro(provinceList)
//定义表单数据
const formModel = ref({})
//默认表单数据
const defultForm = ref({
    receiver: "",
    contact: "",
    address: "",
    addressTags: "",
    postalCode: "",
    isDefault: 1,
    fullLocation: "",
    cityCode:"",
    countyCode:"",
    provinceCode:"",
})
//定义校验规则
const rules = ref({
  //用户名
  receiver:[
    {required:true , message:'输入值不能为空',trigger:'blur'},
  ],
  //手机号
  contact:[
  {validator:(rules , value , callback) => {
     //非空判断
     if(!value)
     callback(new Error('手机号不能为空'))
    else callback()
  } , trigger:'blur'}
  ],
  //地址
  address:[
  {required:true , message:'输入值不能为空',trigger:'blur'},
  ],
  addressTags:[
  {required:true , message:'输入值不能为空',trigger:'blur'},
  ],
  postalCode:[
  {required:true , message:'输入值不能为空',trigger:'blur'},
  ],
  isDefault:[

  ],
  fullLocation:[

  ],
 

})


//这个是标题
const nigger = ref('')
const addressLabel = ['姓名' , '手机号' ,'详细地址','地址标签','邮政编码','是否设为默认地址', '完整地址' ]



//业务1:当用户点击了添加地址就要弹出提示框
//思路：点击时候我门传入一个对象 如果是空对象就就是添加逻辑 反之就是编辑逻辑

//定义点击就弹出函数的open函数暴露出去给父组件使用 用户一点击父组件就可以调用
//控制弹框弹出的变量
const showBox = ref(false)

const open = (obj) => {
  console.log('这是打开盒子时传入的值',obj);
    //打开弹窗
    showBox.value = true
    //赋值给我们定义的表单然后去进行渲染
    formModel.value = obj.address?obj:defultForm.value
    if(!obj.address){
        //先重置表单
        pname.value=''
        cname.value=''
        aname.value=''
        console.log('添加功能');
        nigger.value= '添加地址'
    }else {
      console.log('编辑功能');
      nigger.value='编辑地址'
      //回显地区
      //将fullLocation变成下拉菜单显示的值
      pname.value=obj.provinceCode
      cname.value=obj.cityCode
      aname.value=obj.countyCode
      
      
    }
}

//把定义方法暴露出去供父组件使用
defineExpose({
  open,

})

//业务二:提交前的数据检查
const isDefault = ref()
//提交前的格式化
const getRealdata = (isDefault , pname , cname , aname) => {
  formModel.value.isDefault = isDefault.value?0:1
  formModel.value.fullLocation = '11111'
  formModel.value.provinceCode = `${pname.value}`
  formModel.value.cityCode = `${cname.value}`
  formModel.value.countyCode = `${aname.value}`
  console.log('处理后并且准备提交的数据是：',formModel.value);
  
}

//业务三：添加和编辑之后发送请求
//发送完请求后要通知父组件改值
const emit = defineEmits(['updateList'])

//点击确定之后发送请求要用的函数
//1.先校验
const formRef = ref() //获得组件实例 调用里面的validate方法校验
//2.通过之后才能发起请求
//请求函数
const loading = ref(false)
const docomfirm = async() => {
  if(!aname.value)  return ElMessage.warning('请检查省份/城市/地区是否选择完')
  const res = await formRef.value.validate()
  
  // await useAddAddressService(fuck.value)
  //格式化数据
  getRealdata(isDefault , pname , cname , aname)
  
  //校验数据
  loading.value=true
  if(nigger.value==='添加地址'){
    //添加地址
    await useAddAddressService(formModel.value)
    //思路：通知父组件改值
    emit('updateList')
    ElMessage.success('添加成功')
  }else {
    console.log('发送编辑请求');
    await uesEditAddressService(formModel.value)
    emit('updateList')
    ElMessage.success('修改成功')
    }
  //关闭弹窗
  loading.value=false
  showBox.value = false
}



</script>

<template>
<el-dialog :title="nigger" v-model="showBox" v-loading="loading">
  <el-form 
  label-width="100px"
  :model="formModel"
  :rules="rules"
  ref="formRef"
  >
    <!-- 用户输入结构 -->
  <div class="inputDiv" v-for="(val , key , index) in formModel" :key="index">
    <el-form-item  
    :label="addressLabel[index]+':'" 
    label-position="left"
    :prop="key"
    >
    <el-input v-model="formModel[Object.keys(defultForm)[index]]"></el-input>
  </el-form-item>
  </div>
  <!-- 选择地区 -->
  
    <!-- 下拉菜单 -->
     <div class="selectBox" 
       v-for="(item , index) in selData"
     >
    <el-form-item
     :label="fontStyle[index]"
     label-position="left"
    
    >
    <el-select 
      @change="(selected) => item.action(selected)"
      v-model="item.addName"
   
      style="width: 150px;"
      placeholder="请选择"
      
     
  >
<el-option v-for="i in item.addList"
      :key="i"
      :value="i"
      >{{i}}
</el-option>
</el-select>
    </el-form-item>
     </div>
  

  <!-- 选择是否默认 -->
  <el-form-item label="是否为默认地址" label-width="auto">
    <el-switch v-model="isDefault" @change="isdefaultAction"></el-switch>
  </el-form-item>



</el-form>
<el-button @click="docomfirm">确定</el-button>
</el-dialog>

</template>

<style lang="scss">
/* 直接设计最后三个input高度为0 */
.inputDiv:nth-child(n+6){
 display: none;
}
.selectBox {
  margin-right: 5px;
  span {

    margin-left: 5px;
  }
}

</style>