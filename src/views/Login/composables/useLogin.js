//用户登录有关逻辑
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
export const useLogin = () => {
  //仓库实例化
  const userStore = useUserStore()
  const router = useRouter()
  //获得表单元素方便后面用于校验
  const formRef = ref()
  //先准备数据
  const formModel = ref({
    account: '',
    password: '',
    agree: true
  })
  const rules = {
    account: [
      { required: true, message: '输入值不能为空', trigger: 'blur' },
    ],
    password: [
      //非空判断
      { required: true, message: '输入值不能为空', trigger: 'blur' },
      //长度判断
      { min: 4, max: 14, message: '请输入6-14位字符', trigger: 'blur' },
    ],
    agree: [
      {
        validator: (rules, value, callback) => {
          if (value) {
            //如果勾选同意就行了
            return callback()
          } else {
            return callback(new Error('请勾选同意'))
          }

        }
      }
    ]
  }
  //防止用户一上来就点击提交
  const checkForm = async () => {
    const res = await formRef.value.validate()
    //登录逻辑
    if (res) {
      await userStore.getuserinfo(formModel.value)
      ElMessage.success('登录成功')
      //跳转到首页
      router.replace('/')
    }

  }
  return {
    formRef,
    formModel,
    rules,
    checkForm
  }
}