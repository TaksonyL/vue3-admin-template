<template>
  <template v-if="icon">
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
    <SvgIcon v-else :icon-class="icon" />
  </template>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue';

defineProps({
  icon: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
