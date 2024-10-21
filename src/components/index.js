//功能：将components里面的全部组件都进行全局注册
import ImgView from "./ImgView.vue";
import Sku from "@/components/XtxSku/index.vue"
//逻辑构造函数
export const ComponentsPlugin = {
  install(app) {
    app.component('XtxImgView', ImgView)
    app.component('XtxSku', Sku)
  }
}