import { ref as v, onMounted as b, createElementBlock as _, openBlock as f, createElementVNode as l, normalizeStyle as p, toDisplayString as n } from "vue";
import { _ as w } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const m = { class: "color-picker-container" }, y = { class: "main-content" }, S = { class: "color-display left" }, k = { class: "color-rgba" }, x = { class: "color-wheel-container" }, $ = { class: "color-display right" }, M = { class: "color-rgba" }, P = {
  name: "kiri-color-picker"
}, B = /* @__PURE__ */ Object.assign(P, {
  setup(I) {
    const t = v({
      r: 222,
      g: 222,
      b: 222,
      a: 1
    }), a = v({
      r: 87,
      g: 87,
      b: 87,
      a: 1
    }), i = v(null), h = (r) => {
      if (!i.value) return;
      const o = i.value, s = o.getBoundingClientRect(), c = r.clientX - s.left, u = r.clientY - s.top, d = o.getContext("2d");
      try {
        const e = d.getImageData(c, u, 1, 1).data;
        t.value = {
          r: e[0],
          g: e[1],
          b: e[2],
          a: e[3] / 255
        };
      } catch {
      }
    }, C = () => {
      a.value = { ...t.value };
    }, g = () => {
      if (!i.value) return;
      const r = i.value, o = r.getContext("2d"), s = r.width / 2, c = r.height / 2, u = s * 0.8, d = s * 0.4;
      o.clearRect(0, 0, r.width, r.height);
      const e = o.createConicGradient(0, s, c);
      e.addColorStop(0, "red"), e.addColorStop(1 / 6, "orange"), e.addColorStop(2 / 6, "yellow"), e.addColorStop(3 / 6, "lime"), e.addColorStop(4 / 6, "aqua"), e.addColorStop(5 / 6, "blue"), e.addColorStop(1, "magenta"), o.beginPath(), o.arc(s, c, u, 0, 2 * Math.PI), o.fillStyle = e, o.fill(), o.beginPath(), o.arc(s, c, d, 0, 2 * Math.PI), o.fillStyle = "white", o.fill(), o.beginPath(), o.arc(s, c, d, 0, 2 * Math.PI), o.shadowColor = "rgba(0, 0, 0, 0.2)", o.shadowBlur = 5, o.fillStyle = "white", o.fill(), o.shadowColor = "transparent";
    };
    return b(() => {
      g(), window.addEventListener("resize", g);
    }), (r, o) => (f(), _("div", m, [
      l("div", y, [
        l("div", S, [
          o[0] || (o[0] = l("p", { class: "color-label" }, "当前颜色", -1)),
          l("div", {
            class: "color-circle",
            style: p({
              backgroundColor: `rgba(${t.value.r}, ${t.value.g}, ${t.value.b}, ${t.value.a})`
            })
          }, null, 4),
          o[1] || (o[1] = l("p", { class: "color-value" }, "RGBA", -1)),
          l("p", k, n(t.value.r) + "," + n(t.value.g) + "," + n(t.value.b) + "," + n(t.value.a), 1)
        ]),
        l("div", x, [
          l("canvas", {
            ref_key: "colorCanvas",
            ref: i,
            class: "color-wheel",
            onMousemove: h,
            onClick: C,
            width: "300",
            height: "300"
          }, null, 544),
          o[2] || (o[2] = l("div", { class: "color-wheel-center" }, null, -1))
        ]),
        l("div", $, [
          o[3] || (o[3] = l("p", { class: "color-label" }, "选中颜色", -1)),
          l("div", {
            class: "color-circle",
            style: p({
              backgroundColor: `rgba(${a.value.r}, ${a.value.g}, ${a.value.b}, ${a.value.a})`
            })
          }, null, 4),
          o[4] || (o[4] = l("p", { class: "color-value" }, "RGBA", -1)),
          l("p", M, n(a.value.r) + "," + n(a.value.g) + "," + n(a.value.b) + "," + n(a.value.a), 1)
        ])
      ])
    ]));
  }
}), D = /* @__PURE__ */ w(B, [["__scopeId", "data-v-7b8372e3"]]);
export {
  D as default
};
