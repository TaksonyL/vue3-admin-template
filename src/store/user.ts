import { login, getInfo, logout } from "@/api/user";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    name: '',
    avatar: ''
  }),
  persist: {
    storage: localStorage,
    paths: ['token']
  },
  actions: {
    // 用户登录
    login(userInfo: { username: string, password: string }) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password }).then(res => {
          this.token = res.data.token
          resolve({})
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo({ token: this.token }).then(res => {
          const { data } = res

          if (!data) return reject('验证失败，请重新登录')
          const { name, avatar } = data
          this.name = name
          this.avatar = avatar
          resolve({})
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 登出
    logout() {
      return new Promise((resolve, reject) => {
        logout({ token: this.token }).then(() => {
          this.resetToken()
          resolve({})
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 清除登录态
    resetToken() {
      this.token = ''
      this.name = ''
      this.avatar = ''
    }
  }
})

export default useUserStore
