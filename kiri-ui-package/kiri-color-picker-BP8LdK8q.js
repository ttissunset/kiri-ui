import { ref as p, onMounted as M, onUnmounted as B, createElementBlock as D, openBlock as P, withDirectives as w, createElementVNode as l, normalizeStyle as b, toDisplayString as n, vShow as f } from "vue";
import { _ as R } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const E = { class: "color-picker-container" }, I = { class: "color-display left" }, z = { class: "color-rgba" }, G = { class: "color-wheel-container" }, X = { class: "color-display right" }, Y = { class: "color-rgba" }, q = {
  name: "kiri-color-picker"
}, A = /* @__PURE__ */ Object.assign(q, {
  props: {
    showColorDisplay: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["picked"],
  setup(h, { emit: m }) {
    const y = m, a = p({
      r: 222,
      g: 222,
      b: 222,
      a: 1
    }), e = p({
      r: 87,
      g: 87,
      b: 87,
      a: 1
    }), d = p(null), S = (t) => {
      if (!d.value) return;
      const o = d.value, s = o.getBoundingClientRect(), c = t.clientX - s.left, v = t.clientY - s.top, i = o.width / 2, r = o.height / 2, k = i * 0.8, $ = i * 0.4, C = Math.sqrt(
        Math.pow(c - i, 2) + Math.pow(v - r, 2)
      );
      if (C >= $ && C <= k) {
        const x = o.getContext("2d");
        try {
          const u = x.getImageData(c, v, 1, 1).data;
          a.value = {
            r: u[0],
            g: u[1],
            b: u[2],
            a: u[3] / 255
          };
        } catch {
        }
      }
    }, _ = () => {
      e.value = { ...a.value };
      const t = `rgba(${e.value.r}, ${e.value.g}, ${e.value.b}, ${e.value.a})`;
      y("picked", t);
    }, g = () => {
      if (!d.value) return;
      const t = d.value, o = t.getContext("2d"), s = t.width / 2, c = t.height / 2, v = s * 0.8, i = s * 0.4;
      o.clearRect(0, 0, t.width, t.height);
      const r = o.createConicGradient(0, s, c);
      r.addColorStop(0, "red"), r.addColorStop(1 / 6, "orange"), r.addColorStop(2 / 6, "yellow"), r.addColorStop(3 / 6, "lime"), r.addColorStop(4 / 6, "aqua"), r.addColorStop(5 / 6, "blue"), r.addColorStop(1, "magenta"), o.beginPath(), o.arc(s, c, v, 0, 2 * Math.PI), o.fillStyle = r, o.fill(), o.beginPath(), o.arc(s, c, i, 0, 2 * Math.PI), o.fillStyle = "white", o.fill(), o.beginPath(), o.arc(s, c, i, 0, 2 * Math.PI), o.shadowColor = "rgba(0, 0, 0, 0.2)", o.shadowBlur = 5, o.fillStyle = "white", o.fill(), o.shadowColor = "transparent";
    };
    return M(() => {
      g(), window.addEventListener("resize", g);
    }), B(() => {
      window.removeEventListener("resize", g);
    }), (t, o) => (P(), D("div", E, [
      w(l("div", I, [
        o[0] || (o[0] = l("p", { class: "color-label" }, "当前颜色", -1)),
        l("div", {
          class: "color-circle",
          style: b({
            backgroundColor: `rgba(${a.value.r}, ${a.value.g}, ${a.value.b}, ${a.value.a})`
          })
        }, null, 4),
        o[1] || (o[1] = l("p", { class: "color-value" }, "RGBA", -1)),
        l("p", z, n(a.value.r) + "," + n(a.value.g) + "," + n(a.value.b) + "," + n(a.value.a), 1)
      ], 512), [
        [f, h.showColorDisplay]
      ]),
      l("div", G, [
        l("canvas", {
          ref_key: "colorCanvas",
          ref: d,
          class: "color-wheel",
          onMousemove: S,
          onClick: _,
          width: "300",
          height: "300"
        }, null, 544),
        o[2] || (o[2] = l("div", { class: "color-wheel-center" }, null, -1))
      ]),
      w(l("div", X, [
        o[3] || (o[3] = l("p", { class: "color-label" }, "选中颜色", -1)),
        l("div", {
          class: "color-circle",
          style: b({
            backgroundColor: `rgba(${e.value.r}, ${e.value.g}, ${e.value.b}, ${e.value.a})`
          })
        }, null, 4),
        o[4] || (o[4] = l("p", { class: "color-value" }, "RGBA", -1)),
        l("p", Y, n(e.value.r) + "," + n(e.value.g) + "," + n(e.value.b) + "," + n(e.value.a), 1)
      ], 512), [
        [f, h.showColorDisplay]
      ])
    ]));
  }
}), N = /* @__PURE__ */ R(A, [["__scopeId", "data-v-ac6e146a"]]);
export {
  N as default
};
