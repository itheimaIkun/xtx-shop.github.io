import { ref } from 'vue'


//切换地址的逻辑
export const changeAddressAction = () => {
  //1.控制弹层显示与隐藏
  //2.获得组件实例是用ref=xxx 但是控制其显示和隐藏用的是v-model或者v-show
  //2.1这个是做切换的时候的弹层变量
  const dialogVisible = ref(false) //要返回

  //3.切换地址的时候鼠标点击哪个哪个就获得激活状态
  //思路：先定义一个activeIndex记录鼠标点击的下标 然后让该下标获得激活状态就行了
  const activeIndex = ref(0) //要返回
  //初始化激活状态


  const getActiveIndex = (index) => activeIndex.value = index //要返回

  const InitIndex = (adress, check) => activeIndex.value = check.value.userAddresses.findIndex(item => item.id === adress.value.id);


  //点了确定之后执行的函数
  const changeAddress = (adress, check) => { //要返回
    //直接把点击了的地址赋值给要显示的地址就行了 
    console.log(check.value.userAddresses.findIndex(item => item.isDefault === 0));


    adress.value = check.value.userAddresses[activeIndex.value]


    //再关闭弹层
    dialogVisible.value = false
  }
  return {
    dialogVisible,
    activeIndex,
    getActiveIndex,
    changeAddress,
    InitIndex

  }
}