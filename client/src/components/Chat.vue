<template>
  <div class="chat">
    <chat-window-view :messages="data"/>
    <chat-form :formData="form" @send="sendForm"/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ChatMessages, ChatMessage } from '@/Models/ChatMessages';

import ChatForm from './ChatForm.vue';
import ChatWindowView from '../view/ChatWindowView.vue';
// import socket from '@/utils/SocketManager';

const data: ChatMessages = reactive([]);
const form: ChatMessage = reactive({ text: '' });

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
