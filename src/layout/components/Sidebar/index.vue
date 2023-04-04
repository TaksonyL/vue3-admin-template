<template>
  <div :class="{'has-logo': sidebarLogo}">
    <Logo v-if="sidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import { useRoute, useRouter } from 'vue-router';
import variables from '@/styles/variables';
import useSettingsStore from '@/store/settings';
import useAppStore from '@/store/app';

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const routes = useRouter().options.routes

const { sidebarLogo } = settingsStore
const { sidebar } = appStore

const isCollapse = computed(() => {
  return !sidebar.opened
})

const activeMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  if (meta.activeMenu) return meta.activeMenu
  return path
})
</script>
