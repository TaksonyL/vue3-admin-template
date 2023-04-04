<template>
  <component :is="type" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate';

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const type = computed(() => {
  if (isExternal(props.to)) return 'a'
  return 'router-link'
})

const linkProps = computed(() => {
  if (isExternal(props.to)) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return { to: props.to }
})
</script>
