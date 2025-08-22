import { defineAsyncComponent as t } from "vue";
const r = /* @__PURE__ */ Object.assign({ "./kiri-ui/kiri-color-picker.vue": () => import("./kiri-color-picker-DktgtOjv.js"), "./kiri-ui/kiri-slide-verify.vue": () => import("./kiri-slide-verify-ObDHobWR.js") }), c = function(o) {
  for (const [e, i] of Object.entries(r)) {
    const n = e.slice(e.lastIndexOf("/") + 1, e.lastIndexOf("."));
    o.component(n, t(i));
  }
};
export {
  c as default
};
