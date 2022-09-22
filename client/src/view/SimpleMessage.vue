<template>
  <span :class="props.class" :key="props.key">{{ props.message }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
    key: number;
    message: string;
    class: string;
  }>();
</script>
