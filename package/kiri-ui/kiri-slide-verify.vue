<template>
  <div
    class="drag-verify-container"
    @mousemove="handleMouseMove"
    @mouseup="handleDragMouseUp"
  >
    <!-- 图形校验区域 -->
    <div
      class="check-container"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    >
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
          :class="`shape-${shape}`"
          :style="{
            left: `${x}px`,
            top: `${y}px`,
          }"
        ></div>
        <!-- 滑块 -->
        <div
          class="check-block"
          :class="`shape-${shape}`"
          ref="checkBlock"
          :style="{
            backgroundPosition: `-${x}px -${y}px`,
            backgroundSize: `${width}px ${height}px`,
            top: `${y}px`,
          }"
        ></div>
      </div>

      <!-- 验证成功遮罩层 -->
      <div
        class="success-mask"
        v-if="isVerified"
        :style="{
          width: `${width}px`,
          height: `${height}px`,
        }"
      >
        <div class="success-content">
          <p class="success-info">
            你只用了
            <span>{{ timeUsed }}</span>
            s完成拼图，成功超越率全国
            <span
              :style="{
                color: successRate < 60 ? 'red' : '#04be02',
                fontSize: '20px'
              }"
              >{{ successRate }}</span
            >%的用户
          </p>
        </div>
      </div>
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
      >
        <span class="slider-icon" ref="sliderIcon"></span>
      </div>
      <!-- 拖动条提示文字 -->
      <div class="drag-tips" ref="dragTips"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

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
  },
  // 缺口形状: square(正方形), triangle(三角形), pentagon(五边形), hexagon(六边形)
  shape: {
    type: String,
    default: "square",
    validator: (value) => {
      return ["square", "triangle", "pentagon", "hexagon"].includes(value);
    },
  },
});

// Emits
const emit = defineEmits(["success"]);

// 获取形状属性
const shape = computed(() => props.shape);

const checkBlock = ref(null);
const drag = ref(null);
const dragBlock = ref(null);
const dragTips = ref(null);
const dragBg = ref(null);
const sliderIcon = ref(null);

// 是否验证成功的标志
const isVerified = ref(false);

// 计时相关变量
const startTime = ref(0);
const endTime = ref(0);
const timeUsed = ref(0);
const successRate = ref(99);

// 确保在组件挂载时初始化状态
onMounted(() => {
  dragBg.value.classList.remove("success");
  dragTips.value.classList.remove("success");
});

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
  if (isVerified.value) return;
  isMouseDown = true;
  startX = event.clientX;
  // 记录开始拖动时间
  startTime.value = Date.now();
  // 每次按下都要清空动画效果，防止造成的延缓
  dragBlock.value.style.transition = "";
  checkBlock.value.style.transition = "";
  dragBg.value.style.transition = "";
};

// 处理鼠标弹起事件
const handleMouseUp = () => {
  if (isVerified.value) return;
  isMouseDown = false;
};

// 处理鼠标移动事件
const handleMouseMove = (event) => {
  if (!isMouseDown || isVerified.value) return;
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
  if (isVerified.value) return;
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
  // 记录结束时间并计算用时
  endTime.value = Date.now();
  timeUsed.value = ((endTime.value - startTime.value) / 1000).toFixed(2);

  // 计算超越率 (默认99%，每多0.5s减少1%，最低1%)
  const baseTime = 0.5; // 基准时间0.5秒
  const timeDiff = Math.max(0, parseFloat(timeUsed.value) - baseTime);
  const rateReduction = Math.floor(timeDiff / 0.5);
  successRate.value = Math.max(1, 99 - rateReduction);

  dragBlock.value.style.backgroundColor = "#78cabd";
  dragBg.value.style.backgroundColor = "#d4f5f1";
  dragBg.value.classList.add("success");
  dragTips.value.classList.add("success");
  sliderIcon.value.classList.add("success");

  emit("success", isVerified.value);
};

const handleFail = () => {
  isVerified.value = false;
  dragBg.value.style.width = 0;
  dragBg.value.style.transition = "all 0.3s ease";
  dragBlock.value.style.transform = "translateX(0px)";
  checkBlock.value.style.transform = "translateX(0px)";
  dragBlock.value.style.transition = "transform 0.3s ease";
  checkBlock.value.style.transition = "transform 0.3s ease";
  dragBg.value.classList.remove("success");
  dragTips.value.classList.remove("success");
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

/* 三角形缺口 */
.shape-triangle.check-content,
.shape-triangle.check-block {
  width: 50px;
  height: 50px;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  background: rgba(0, 0, 0, 0.5);
}

.shape-triangle.check-block {
  background: inherit;
  border: 1px solid #fff;
}

/* 五边形缺口 */
.shape-pentagon.check-content,
.shape-pentagon.check-block {
  width: 50px;
  height: 46px;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* 六边形缺口 */
.shape-hexagon.check-content,
.shape-hexagon.check-block {
  width: 50px;
  height: 58px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

/* 正方形缺口需要保持默认样式 */
.shape-square.check-content,
.shape-square.check-block {
  width: 50px;
  height: 50px;
  border-radius: 0;
  clip-path: none;
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
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.dragBg.success .success-text {
  opacity: 1;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-icon {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.slider-icon::after {
  content: "➡";
  top: 0;
  left: 0;
}

.slider-icon.success::after {
  content: "✔";
}

.drag-block:active {
  cursor: grabbing;
}

.check-container {
  position: relative;
}

.success-mask {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
}

.success-content {
  text-align: center;
  color: white;
  padding: 20px;
}

.success-info {
  font-size: 14px;
  margin: 5px 0;
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

.drag-tips.success::after {
  content: "";
}

.drag-tips::after {
  content: "请拖动滑块完成验证~  ";
}
</style>
