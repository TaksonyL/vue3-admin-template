import request from "@/utils/request";

/**
 * 登录
 * @param params
 * @returns
 */
export function login(params: Api.login.Option) {
  return request<{ token: string }>({
    url: '/api/user/login',
    method: 'post',
    params
  })
}

/**
 * 登出
 * @param params
 * @returns
 */
export function logout(params: Api.logout.Option) {
  return request<string>({
    url: '/api/user/logout',
    method: 'post',
    params
  })
}

/**
 * 获取用户信息
 * @param params
 * @returns
 */
export function getInfo(params: Api.getInfo.Option) {
  return request<Api.getInfo.SuccessResult>({
    url: '/api/user/info',
    method: 'post',
    params
  })
}
