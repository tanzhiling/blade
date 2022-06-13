<template>
  <v-editor :value="text"></v-editor>
</template>
<script>
import { onMounted, ref } from 'vue';
export default {
  setup() {
    const text = ref();
    onMounted(() => {
      const json = localStorage.getItem('json');
      text.value = json;
    });
    return {
      text,
    };
  },
};
</script>
