import { defineStore } from "pinia"
import setting from "@/setting"

const { showSettings, fixedHeader, sidebarLogo } = setting

type SettingsKey = 'showSettings' | 'fixedHeader' | 'sidebarLogo'

const useSettingsStore = defineStore('settings', {
  state: () => ({
    showSettings,
    fixedHeader,
    sidebarLogo
  }),
  actions: {
    changeSetting(data: { key: SettingsKey, value: boolean }) {
      this[data.key] = data.value
    }
  }
})

export default useSettingsStore
