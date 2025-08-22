<template>
  <div
    class="drag-verify-container"
    @mousemove="handleMouseMove"
    @mouseup="handleDragMouseUp"
  >
    <!-- 图形校验区域 -->
    <div
      class="check"
      ref="check"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        width: `${width}px`,
        height: `${height}px`,
      }"
    >
      <!-- 缺口 -->
      <div
        class="check-content"
        :style="{
          left: `${x}px`,
          top: `${y}px`,
        }"
      ></div>
      <!-- 滑块 -->
      <div
        class="check-block"
        ref="checkBlock"
        :style="{
          backgroundPosition: `-${x}px -${y}px`,
          backgroundSize: `${width}px ${height}px`,
          top: `${y}px`,
        }"
      ></div>
    </div>

    <!-- 拖动条 -->
    <div
      class="drag"
      :style="{
        width: `${width}px`,
      }"
      ref="drag"
    >
      <!-- 绿色区域 -->
      <div class="dragBg" ref="dragBg"></div>
      <!-- 拖动条滑块 -->
      <div
        class="drag-block"
        ref="dragBlock"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      ></div>
      <!-- 拖动条提示文字 -->
      <div class="drag-tips" ref="dragTips"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  backgroundImage: {
    type: String,
    default: "https://kirii.online/kiri/12.jpg",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 250,
  },
  // 验证误差范围
  tolerance: {
    type: Number,
    default: 2,
  }
});

// Emits
const emit = defineEmits(["success"]);

const checkBlock = ref(null);
const drag = ref(null);
const dragBlock = ref(null);
const dragTips = ref(null);
const dragBg = ref(null);

// 是否验证成功的标志
const isVerified = ref(false);

// 随机生成 x,y坐标
const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let x = random(100, props.width - 50);
let y = random(100, props.height - 50);

console.log(x - props.tolerance);
console.log(x + Number(props.tolerance));

// 鼠标是否按下的状态
let isMouseDown = false;
// 存储鼠标按下时的 x 坐标
let startX = 0;
// 存储鼠标移动的距离
let offsetX = 0;

// 处理鼠标按下事件
const handleMouseDown = (event) => {
  isMouseDown = true;
  startX = event.clientX;
  // 每次按下都要清空动画效果，防止造成的延缓
  dragBlock.value.style.transition = "";
  checkBlock.value.style.transition = "";
  dragBg.value.style.transition = "";
};

// 处理鼠标弹起事件
const handleMouseUp = () => {
  isMouseDown = false;
};

// 处理鼠标移动事件
const handleMouseMove = (event) => {
  if (!isMouseDown) return;
  // 计算鼠标横向移动的距离
  offsetX = event.pageX - startX;
  // 判断滑块位置是否越界
  if (offsetX < 0 || offsetX > props.width - 50) {
    return;
  }
  dragBg.value.style.width = `${offsetX}px`;
  // 更新滑块位置
  dragBlock.value.style.transform = `translateX(${offsetX}px`;
  checkBlock.value.style.transform = `translateX(${offsetX}px`;
};

// 处理拖动的时候鼠标弹起事件
const handleDragMouseUp = (event) => {
  isMouseDown = false;
  const isWithinTolerance =
    offsetX >= x - props.tolerance && offsetX <= x + Number(props.tolerance);
  console.log(isWithinTolerance);
  // 判断是否处于误差范围内
  if (isWithinTolerance) {
    handleSuccess();
  } else {
    handleFail();
  }
};

// 验证成功回调
const handleSuccess = () => {
  isVerified.value = true;
  dragBlock.value.style.backgroundColor = "#78cabd";
  dragBg.value.style.backgroundColor = "#d4f5f1";
  emit("success", isVerified.value);
};

const handleFail = () => {
  dragBlock.value.style.backgroundColor = "#40e0d0";
  dragBg.value.style.width = 0;
  dragBg.value.style.transition = "all 0.3s ease";
  dragBlock.value.style.transform = "translateX(0px)";
  checkBlock.value.style.transform = "translateX(0px)";
  dragBlock.value.style.transition = "transform 0.3s ease";
  checkBlock.value.style.transition = "transform 0.3s ease";
};
</script>

<script>
export default {
  name: "kiri-slide-verify",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.drag-verify-container {
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

/* 图形拼图验证码 */
.check {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.check-content {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
}

.check-block {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  background-image: inherit;
  background-repeat: inherit;
  position: absolute;
  left: 0;
}

/* 拖动条 */
.drag {
  height: 50px;
  margin-top: 10px;
  background-color: #f8fafe;
  position: relative;
  border: 1px solid #cccccc9f;
}

.dragBg {
  position: absolute;
  background-color: #dae4fd;
  width: 0px;
  height: 100%;
  display: flex;
  z-index: 1;
}

/* 可拖动的盒子 */
.drag-block {
  width: 50px;
  height: 50px;
  background-color: #4a8cf7;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}

.drag-block:active {
  cursor: grabbing;
}

.drag-tips {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 95%;
  height: 100%;
  margin: 0 auto;
  font-size: 12px;
  color: #8a8a8a;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
}

.drag-tips::after {
  content: "请拖动滑块完成验证~  ";
}
</style>
