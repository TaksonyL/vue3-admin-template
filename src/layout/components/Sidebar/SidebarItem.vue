<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && onlyOneChild && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <Item v-if="item.meta" :icon="item.meta && item.meta.icon" />
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import Item from './Item.vue';
import AppLink from './Link.vue';
import { isExternal } from '@/utils/validate';
import { RouteRecordRaw } from 'vue-router';
import path from 'path-browserify';

interface Props {
  item: RouteRecordRaw,
  basePath?: string,
  isNest?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  basePath: '',
  isNest: false
})

const onlyOneChild = ref<RouteRecordRaw | null>(null)
const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) return true

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
