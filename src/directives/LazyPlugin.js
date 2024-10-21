//引入这个包是为了获得滑动距离的值
import { useIntersectionObserver } from "@vueuse/core";
//此文件是自定义指令
//构造函数
export const LazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el 就是绑定的元素 img
        //binding 就是指令后面的值 这里就是item.picture
        // console.log(el, binding.value);
        //这里引入vueues的方法来获得鼠标的滑动距离
        const { stop } = useIntersectionObserver(
          //target就是要监测的对象
          el,
          //isIntersecting的值就是监测对象是否在页面内 true就是在 反之就是false
          ([{ isIntersecting }]) => {
            //如果在视口范围内就把item.picture的值赋给图片的src
            if (isIntersecting) {
              //显示图片
              el.src = binding.value
              //性能优化
              //当图片加载完一次了就不需要再发请求加载了进行一次就行了
              stop()

            }

          },
        )

      }
    })
  }
}
//使用的话就在全局main.js里面引入就行了