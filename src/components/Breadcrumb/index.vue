<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='/'||index==levelList.length-1" class="no-redirect">{{ item.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type LevelItem = {
  path: string,
  title: string,
  redirect: string
}

const route = useRoute()
const router = useRouter()
const levelList = ref<LevelItem[]>([])

const getBreadcrumb = () => {
  const matched:LevelItem[] = []
  for (const item of route.matched) {
    if (item.meta && item.meta.title) {
      matched.push({
        path: item.path,
        title: item.meta.title,
        redirect: item.redirect?.toString() || ''
      })
    }
  }
  const first = matched[0]
  if (!isDashboard(first)) {
    matched.unshift({ path: '/dashboard', title: '首页', redirect: '' })
  }
  levelList.value = matched
}
const isDashboard = (level: LevelItem):boolean => {
  return level.path === '/dashboard'
}
// const pathCompile = (path:string) => {
//   const { query } = route
//   const toPath = pathToRegexp.compile(path)
//   return toPath(query)
// }
const handleLink = (level: LevelItem) => {
  const { redirect, path } = level
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(path)
}

watch(route, () => {
  getBreadcrumb()
})

onMounted(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
