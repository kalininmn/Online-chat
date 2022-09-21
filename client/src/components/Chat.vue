<template>
  <div class="chat">
    <chat-form :formData="form" @send="sendForm"/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ChatMessage } from '@/Models/ChatMessage';
import ChatForm from './ChatForm.vue';
// import socket from '@/utils/SocketManager';

const form = reactive({ message: '' });

function sendForm(model: ChatMessage) {
  console.log(model);
  // socket.send(model);
}

</script>

<style scoped>
  .chat {
    width: 600px;
    height: 50vh;
    max-height: 500px;
  }
</style>
