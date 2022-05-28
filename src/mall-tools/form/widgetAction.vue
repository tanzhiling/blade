<template>
  <div class="widget-action">
    <div class="item" @click="onEvent('copy')">
      <v-icon type="icon-file-copy" />
    </div>
    <div class="item" @click="onEvent('remove')">
      <v-icon type="icon-delete" />
    </div>
  </div>
</template>
<script>
export default {
  setup(props, { emit }) {
    const onEvent = (event) => {
      emit(event);
    };
    return {
      onEvent,
    };
  },
};
</script>
