<template>
    <div class="form">
      <textarea v-model="form.text" />
      <button @click="send">Отправить</button>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ChatFormData, prepareForm, prepareModel } from '@/Data/ChatFormData';

const props = defineProps<{
  formData: ChatFormData;
}>();

const form = reactive(prepareForm(props.formData));

const emit = defineEmits<{(e: 'send', data: ChatFormData): void;
}>();

function send() {
  emit('send', prepareModel(form));
}
</script>
