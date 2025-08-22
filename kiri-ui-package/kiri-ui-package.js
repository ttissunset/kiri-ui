import { defineAsyncComponent as i } from "vue";
const s = /* @__PURE__ */ Object.assign({ "./kiri-ui/kiri-slide-verify.vue": () => import("./kiri-slide-verify-zqACyWuj.js") }), r = function(n) {
  for (const [e, o] of Object.entries(s)) {
    const t = e.slice(e.lastIndexOf("/") + 1, e.lastIndexOf("."));
    n.component(t, i(o));
  }
};
export {
  r as default
};
