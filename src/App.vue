<template>
  <div class="body">
    <kiri-slide-verify
      tolerance=2
      @success="onSuccess"
      backgroundImage="https://kirii.online/kiri/20250819-162636.webp"
    ></kiri-slide-verify>
  </div>
</template>

<script setup>
const onSuccess = (data) => {
  console.log("success", data);
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
