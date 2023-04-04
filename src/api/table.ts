import request from "@/utils/request";

/**
 * 登录
 * @param params
 * @returns
 */
export function getList() {
  return request<API.getList.SuccessResult>({
    url: '/api/table/list',
    method: 'post',
    params: {}
  })
}
