//封装用户登录接口
import http from "@/utils/http";
//登录有关
export const getLoginService = ({ account, password }) => http.post('/login', {
  account, password

}

)