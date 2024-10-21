//方法1
import { ref } from 'vue'
export const action1 = () => {
  const state = ref({})
  const serItem = () => {
    state.value.cart = 111
  }
  const show = (x1) => console.log(x1.value);

  return {
    serItem,
    show,
    state
  }
}