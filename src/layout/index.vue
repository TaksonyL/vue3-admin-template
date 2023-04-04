<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar/index.vue';
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar.vue';
import useAppStore from '@/store/app';
import useSettingsStore from '@/store/settings';
import useResize from '@/hooks/useResize';
import { storeToRefs } from 'pinia';

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { fixedHeader } = settingsStore
const { sidebar, device } = storeToRefs(appStore)

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})

const handleClickOutside = () => {
  appStore.closeSideBar(false)
}

useResize()
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
