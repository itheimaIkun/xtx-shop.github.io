import { action1 } from "./action1"


export const action2 = () => {
  const fuck = (x) => {
    const { show } = action1()
    x.value.fuck2 = 'fuckMo'

    show(x)



  }
  const nmd = (x) => {
    x.value.mother = 5646
  }


  return {
    fuck,
    nmd
  }
}