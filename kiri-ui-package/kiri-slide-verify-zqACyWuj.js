import { ref as c, createElementBlock as N, openBlock as S, createElementVNode as n, normalizeStyle as g, unref as u } from "vue";
const T = (e, h) => {
  const l = e.__vccOpts || e;
  for (const [p, a] of h)
    l[p] = a;
  return l;
}, I = {
  name: "kiri-slide-verify"
}, C = /* @__PURE__ */ Object.assign(I, {
  props: {
    backgroundImage: {
      type: String,
      default: "https://kirii.online/kiri/12.jpg"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 250
    },
    // 验证误差范围
    tolerance: {
      type: Number,
      default: 2
    }
  },
  emits: ["success"],
  setup(e, { emit: h }) {
    const l = e, p = h, a = c(null), b = c(null), o = c(null), x = c(null), r = c(null), v = c(!1), k = (t, i) => (t = Math.ceil(t), i = Math.floor(i), Math.floor(Math.random() * (i - t) + t));
    let d = k(100, l.width - 50), y = k(100, l.height - 50), f = !1, m = 0, s = 0;
    const M = (t) => {
      f = !0, m = t.clientX, o.value.style.transition = "", a.value.style.transition = "", r.value.style.transition = "";
    }, $ = () => {
      f = !1;
    }, w = (t) => {
      f && (s = t.pageX - m, !(s < 0 || s > l.width - 50) && (r.value.style.width = `${s}px`, o.value.style.transform = `translateX(${s}px`, a.value.style.transform = `translateX(${s}px`));
    }, B = (t) => {
      f = !1, s >= d - l.tolerance && s <= d + Number(l.tolerance) ? X() : _();
    }, X = () => {
      v.value = !0, o.value.style.backgroundColor = "#78cabd", r.value.style.backgroundColor = "#d4f5f1", p("success", v.value);
    }, _ = () => {
      o.value.style.backgroundColor = "#40e0d0", r.value.style.width = 0, r.value.style.transition = "all 0.3s ease", o.value.style.transform = "translateX(0px)", a.value.style.transform = "translateX(0px)", o.value.style.transition = "transform 0.3s ease", a.value.style.transition = "transform 0.3s ease";
    };
    return (t, i) => (S(), N("div", {
      class: "drag-verify-container",
      onMousemove: w,
      onMouseup: B
    }, [
      n("div", {
        class: "check",
        ref: "check",
        style: g({
          backgroundImage: `url(${e.backgroundImage})`,
          width: `${e.width}px`,
          height: `${e.height}px`
        })
      }, [
        n("div", {
          class: "check-content",
          style: g({
            left: `${u(d)}px`,
            top: `${u(y)}px`
          })
        }, null, 4),
        n("div", {
          class: "check-block",
          ref_key: "checkBlock",
          ref: a,
          style: g({
            backgroundPosition: `-${u(d)}px -${u(y)}px`,
            backgroundSize: `${e.width}px ${e.height}px`,
            top: `${u(y)}px`
          })
        }, null, 4)
      ], 4),
      n("div", {
        class: "drag",
        style: g({
          width: `${e.width}px`
        }),
        ref_key: "drag",
        ref: b
      }, [
        n("div", {
          class: "dragBg",
          ref_key: "dragBg",
          ref: r
        }, null, 512),
        n("div", {
          class: "drag-block",
          ref_key: "dragBlock",
          ref: o,
          onMousedown: M,
          onMouseup: $
        }, null, 544),
        n("div", {
          class: "drag-tips",
          ref_key: "dragTips",
          ref: x
        }, null, 512)
      ], 4)
    ], 32));
  }
}), V = /* @__PURE__ */ T(C, [["__scopeId", "data-v-e468bb0b"]]);
export {
  V as default
};
