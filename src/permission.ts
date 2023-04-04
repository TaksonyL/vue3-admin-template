import router from '@/router'
import { ElMessage } from 'element-plus'
import useUserStore from './store/user'
import getPageTitle from './utils/getPageTitle'

const whiteList = ['/login'] // 检查登录态 白名单

router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore()

  // set page title
  document.title = getPageTitle(to.meta?.title || '')

  // determine whether the user has logged in
  const { token } = userStore

  if (token) {
    if (to.path === '/login') {
      // 已有登录态重定向至首页
      next({ path: '/' })
    } else {
      const { name } = userStore
      if (name) {
        next()
      } else {
        try {
          // 获取用户信息
          await userStore.getInfo()
          next()
        } catch (err) {
          // 清除登录态
          await userStore.resetToken()
          ElMessage.error(err || '登录态异常')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单直接跳转
      next()
    } else {
      // 其他页面未登录重定向回登录页面
      next(`login?redirect=${to.path}`)
    }
  }
})
