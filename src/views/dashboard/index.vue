<template>
  <div class="dashboard-container">
    <div class="dashboarrd-text">name: {{ name }}</div>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/user';

const userStore = useUserStore()
const { name } = userStore
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
