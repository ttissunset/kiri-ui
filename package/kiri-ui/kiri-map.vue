<template>
  <div
    id="container"
    :style="{ width: width, height: height }"
    v-if="mapKey && securityJsCode"
  ></div>
  <div v-else :style="{ width: width, height: height }">
    <img
      :style="{ width: '100%', height: '100%' }"
      src="https://imgessl.kugou.com/stdmusic/20210317/20210317054603364692.jpg"
    />
  </div>
  <div class="toolbar" v-show="mapKey && securityJsCode && isShowToolbar">
    <div class="toolbar-item">
      <input
        type="checkbox"
        id="box1"
        @click="handleTrafficShow"
        :checked="isTrafficShow"
      />
      <label for="box1">路况图层</label>
    </div>
    <div class="toolbar-item">
      <input
        type="checkbox"
        id="box2"
        @click="handleSatelliteShow"
        :checked="isSatelliteShow"
      />
      <label for="box2">卫星图层</label>
    </div>
    <div class="toolbar-item">
      <input
        type="checkbox"
        id="box3"
        @click="handleRoadNetShow"
        :checked="isRoadNetShow"
      />
      <label for="box3">路线图层</label>
    </div>
    <div class="toolbar-item">
      <input
        type="checkbox"
        id="box4"
        @click="handleAddMarker"
        :checked="isaddMarker"
      />
      <label for="box4">添加地图标点</label>
    </div>
    <div class="toolbar-item">
      <button @click="handleDeleteMarker" :disabled="!markerList.length">
        删除上一个标点
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = defineProps({
  mapKey: {
    type: String,
    default: "",
  },
  securityJsCode: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "800px",
  },
  isShowToolbar: {
    type: Boolean,
    default: true,
  },
});

let map = null;
//图层
let traffic,
  satellite,
  roadNet = null;
let marker = null;
let markerList = ref([]);
let globalAMap = null;

let isTrafficShow = ref(false);
let isSatelliteShow = ref(false);
let isRoadNetShow = ref(false);
let isaddMarker = ref(false);

// 路况图层显示
const handleTrafficShow = () => {
  if (isTrafficShow.value) {
    isTrafficShow.value = false;
    traffic.hide();
  } else {
    isTrafficShow.value = true;
    traffic.show();
  }
};

// 卫星图层显示
const handleSatelliteShow = () => {
  if (isSatelliteShow.value) {
    satellite.hide();
    isSatelliteShow.value = false;
  } else {
    satellite.show();
    isSatelliteShow.value = true;
  }
};

// 路线图层显示
const handleRoadNetShow = () => {
  if (isRoadNetShow.value) {
    roadNet.hide();
    isRoadNetShow.value = false;
  } else {
    roadNet.show();
    isRoadNetShow.value = true;
  }
};

// 点击地图添加 Marker
const addMarker = (e) => {
  marker = new globalAMap.Marker();
  marker.setPosition([e.lnglat.lng, e.lnglat.lat]);
  marker.setTitle("M");
  markerList.value.push(marker);
  map.add(marker);
};

// 添加 Marker
const handleAddMarker = () => {
  isaddMarker.value = !isaddMarker.value;
  //   console.log(isaddMarker.value);
  if (isaddMarker.value) {
    map.on("click", addMarker);
  } else {
    map.off("click", addMarker);
  }
};

// 删除 Marker
const handleDeleteMarker = () => {
  if (!markerList.value.length) return;
  map.remove(markerList.value.pop());
};

onMounted(() => {
  if (!props.mapKey || !props.securityJsCode) return;
  window._AMapSecurityConfig = {
    securityJsCode: props.securityJsCode,
  };
  AMapLoader.load({
    key: props.mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",
    plugins: ["AMap.Scale", "AMap.Marker", "AMap.Geolocation"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      globalAMap = AMap;
      const layer = new AMap.createDefaultLayer({
        zooms: [3, 20], //可见级别
        visible: true, //是否可见
        opacity: 1, //透明度
        zIndex: 0, //叠加层级
      });
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });

      // 加载交通图层
      traffic = new AMap.TileLayer.Traffic({
        visible: false,
        autoRefresh: true, //是否自动刷新，默认为false
        interval: 180, //刷新间隔，默认180s
      });
      map.add(traffic); //通过add方法添加图层

      //创建卫星图层
      satellite = new AMap.TileLayer.Satellite({
        visible: false,
      });
      map.add(satellite);
      //创建路网图层
      roadNet = new AMap.TileLayer.RoadNet({
        visible: false,
      });
      map.add(roadNet);

      map.addControl(new AMap.Scale()); // 添加比例尺控件
    //   map.addControl(
    //     new AMap.Geolocation({
    //       enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //       timeout: 10000, //超过10秒后停止定位，默认：5s
    //       buttonPosition: "RB", //定位按钮的停靠位置
    //       buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //       zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
    //     })
    //   );
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<script>
export default {
  name: "kiri-map",
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 12px;
  height: 12px;
  cursor: pointer;
}

button:disabled {
  border: 1px solid #ccc !important;
  color: #ccc !important;
  background-color: #eee !important;
  cursor: not-allowed !important;
}

#container {
  padding: 0px;
  margin: 0px;
  position: relative;
}

.toolbar {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.toolbar-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  margin: 10px 0;
  color: #4c4d4d;
}

.toolbar-item button {
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #f05454;
  background-color: #fff;
  color: #f05454;
  height: 25px;
  border-radius: 3px;
}

.toolbar-item button:hover {
  background-color: #f05454;
  color: #fff;
  transition: all 0.5s ease;
}
</style>
