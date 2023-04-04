import useAppStore from "@/store/app"
import { onBeforeMount, onDeactivated, onMounted } from "vue"
import { useRoute } from "vue-router"

const { body } = document
const WIDTH = 992

const useResize = () => {
  const appStore = useAppStore()
  const route = useRoute()

  const isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobileVal = isMobile()
      appStore.toggleDevice(isMobileVal ? 'mobile' : 'desktop')
      if (isMobileVal) {
        appStore.closeSideBar(isMobileVal)
      }
    }
  }

  watch(route, () => {
    if (appStore.device === 'mobile' && appStore.sidebar.opened) {
      appStore.closeSideBar(false)
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    if (isMobile()) {
      appStore.toggleDevice('mobile')
      appStore.closeSideBar(true)
    }
  })
}

export default useResize
