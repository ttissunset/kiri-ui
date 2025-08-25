<template>
  <div class="color-picker-container">
    <!-- 当前颜色 (左侧) -->
    <div class="color-display left" v-show="showColorDisplay">
      <p class="color-label">当前颜色</p>
      <div
        class="color-circle"
        :style="{
          backgroundColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`,
        }"
      ></div>
      <p class="color-value">RGBA</p>
      <p class="color-rgba">
        {{ currentColor.r }},{{ currentColor.g }},{{ currentColor.b }},{{
          currentColor.a
        }}
      </p>
    </div>

    <!-- 主颜色区域 (圆环) -->
    <div class="color-wheel-container">
      <canvas
        ref="colorCanvas"
        class="color-wheel"
        @mousemove="handleMouseMove"
        @click="handleColorSelect"
        width="300"
        height="300"
      ></canvas>
      <div class="color-wheel-center"></div>
    </div>

    <!-- 选中颜色 (右侧) -->
    <div class="color-display right" v-show="showColorDisplay">
      <p class="color-label">选中颜色</p>
      <div
        class="color-circle"
        :style="{
          backgroundColor: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`,
        }"
      ></div>
      <p class="color-value">RGBA</p>
      <p class="color-rgba">
        {{ selectedColor.r }},{{ selectedColor.g }},{{ selectedColor.b }},{{
          selectedColor.a
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Props
const props = defineProps({
  showColorDisplay: {
    type: Boolean,
    default: true,
  },
});

// Emits
const emit = defineEmits(["picked"]);

// 初始化当前颜色状态
const currentColor = ref({
  r: 222,
  g: 222,
  b: 222,
  a: 1.0,
});

// 初始化选中颜色状态
const selectedColor = ref({
  r: 87,
  g: 87,
  b: 87,
  a: 1.0,
});

// Canvas引用
const colorCanvas = ref(null);

// 处理鼠标移动事件
const handleMouseMove = (event) => {
  if (!colorCanvas.value) return;

  const canvas = colorCanvas.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * 0.8;
  const innerRadius = centerX * 0.4;

  // 计算鼠标到中心的距离
  const distance = Math.sqrt(
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  );

  // 检查是否在圆环区域内
  if (distance >= innerRadius && distance <= radius) {
    const ctx = canvas.getContext("2d");
    try {
      // 获取像素数据
      const pixelData = ctx.getImageData(x, y, 1, 1).data;

      // 更新当前颜色
      currentColor.value = {
        r: pixelData[0],
        g: pixelData[1],
        b: pixelData[2],
        a: pixelData[3] / 255,
      };
    } catch (error) {
      console.error("Error getting pixel data:", error);
    }
  }
};

// 处理颜色选择事件
const handleColorSelect = () => {
  selectedColor.value = { ...currentColor.value };
  const color = `rgba(${selectedColor.value.r}, ${selectedColor.value.g}, ${selectedColor.value.b}, ${selectedColor.value.a})`;
  console.log("Selected color:", color);
  // 选中颜色时返回当前选中的颜色
  emit("picked", color);
};

// 绘制颜色圆环
const drawColorWheel = () => {
  if (!colorCanvas.value) return;

  const canvas = colorCanvas.value;
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * 0.8;
  const innerRadius = centerX * 0.4;

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 创建渐变颜色环
  const gradient = ctx.createConicGradient(0, centerX, centerY);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(1 / 6, "orange");
  gradient.addColorStop(2 / 6, "yellow");
  gradient.addColorStop(3 / 6, "lime");
  gradient.addColorStop(4 / 6, "aqua");
  gradient.addColorStop(5 / 6, "blue");
  gradient.addColorStop(1, "magenta");

  // 绘制外环
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 绘制内环（白色）
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // 添加内环阴影
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 5;
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.shadowColor = "transparent";
};

// 组件挂载时初始化
onMounted(() => {
  drawColorWheel();

  // 监听窗口大小变化，重新绘制颜色环
  window.addEventListener("resize", drawColorWheel);
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener("resize", drawColorWheel);
});
</script>

<script>
export default {
  name: "kiri-color-picker",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.color-picker-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
}

.color-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.color-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.color-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.color-value {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.color-rgba {
  font-size: 12px;
  color: #333;
  text-align: center;
}

.color-wheel-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.color-wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: crosshair;
  display: block;
}

.color-wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: white;
  border: 5px solid white;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
