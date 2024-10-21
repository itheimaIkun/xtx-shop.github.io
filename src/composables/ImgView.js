//图片预览以及放大镜有关的逻辑
import { ref, watch } from 'vue'
//获得鼠标在左侧大图的相对坐标
import { useMouseInElement } from '@vueuse/core';
export const ImgView = () => {
  //功能一：在小列表里面滑倒哪张图片就显示哪张 拿到index就赋值src就行了 并且获得激活状态
  //鼠标滑动的小标
  const targetIndex = ref(0)
  //鼠标滑倒哪里就获得对应的下标值并且赋值给targetIndex
  const mouseBehavior = (i) => {
    targetIndex.value = i
  }
  //获得鼠标在左侧大图的相对坐标
  const target = ref()
  //左侧滑块的坐标
  const left = ref(0)
  const top = ref(0)
  //右侧大图的坐标
  const Bigleft = ref(0)
  const Bigtop = ref(0)

  //拿到鼠标的坐标值
  const { elementX: x, elementY: y, isOutside } = useMouseInElement(target)
  watch([x, y, isOutside], () => {
    //如果鼠标没有滑入左侧图片就不开始监听咯
    if (isOutside.value) return
    //1.控制滑块移动的逻辑
    //100<x<300滑块才开始移动 移动距离为 x-宽度一半
    if (x.value > 100 && x.value < 300) left.value = x.value - 100
    //y同理
    if (y.value > 100 && y.value < 300) top.value = y.value - 100
    //左右移动的极限距离
    //x<100就是0 X>300就是200
    if (x.value <= 100) left.value = 0
    if (x.value >= 300) left.value = 200
    //y同理
    if (y.value <= 100) top.value = 0
    if (y.value >= 300) top.value = 200

    //2.放大镜原理 滑块移动1px 大图要向相反方向移动两倍距离
    Bigleft.value = -2 * left.value
    Bigtop.value = -2 * top.value
  })
  return {
    targetIndex,
    left,
    top,
    Bigleft,
    Bigtop,
    isOutside,
    target,
    mouseBehavior
  }
}