//封装倒计时通用逻辑
import { ref, onUnmounted, computed } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  let timer = null
  //定义响应式时间数据渲染出来
  const time = ref(0)
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //定义开始函数
  const start = (currtime) => {

    time.value = currtime

    //开启倒计时
    timer = setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timer)

    }, 1000)

  }
  //销毁组件的时候同时关闭定时器
  onUnmounted(() => {
    //如果timer为null就不执行后面的语句 此时就没有开启定时器
    //如果timer不为null就是执行后面的语句 此时就关闭了定时器
    timer && clearInterval(timer)


  })
  return {
    time,
    formatTime,
    start

  }

}