<template>
  <div class="chat-window">
      <simple-message
       v-for="(message, i) in messages"
       :key="i"
       :message="message"
       class="left"
      />
  </div>
</template>

<script lang="ts" setup>
import SimpleMessage from './SimpleMessage.vue';

defineProps<{
    messages: any;
  }>();
</script>
