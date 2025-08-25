<template>
  <div class="body">
    <!-- <kiri-slide-verify
      tolerance="2"
      @success="onSuccess"
      shape="triangle"
      backgroundImage="https://kirii.online/kiri/20250820-175522.webp"
    ></kiri-slide-verify> -->
    <kiri-color-picker :showColorDisplay="true"></kiri-color-picker>
  </div>
</template>

<script setup>
// const onSuccess = (data) => {
//   console.log("success", data);
// };
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
