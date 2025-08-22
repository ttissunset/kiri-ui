import { computed as q, ref as l, onMounted as E, createElementBlock as B, openBlock as N, createElementVNode as t, normalizeStyle as c, createCommentVNode as R, normalizeClass as S, unref as v, createTextVNode as k, toDisplayString as X } from "vue";
import { _ as O } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const P = { class: "success-content" }, A = { class: "success-info" }, G = {
  name: "kiri-slide-verify"
}, H = /* @__PURE__ */ Object.assign(G, {
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
    },
    // 缺口形状: square(正方形), triangle(三角形), pentagon(五边形), hexagon(六边形)
    shape: {
      type: String,
      default: "square",
      validator: (e) => ["square", "triangle", "pentagon", "hexagon"].includes(e)
    }
  },
  emits: ["success"],
  setup(e, { emit: D }) {
    const i = e, L = D, x = q(() => i.shape), d = l(null), I = l(null), u = l(null), f = l(null), n = l(null), b = l(null), o = l(!1), $ = l(0), w = l(0), p = l(0), m = l(99);
    E(() => {
      n.value.classList.remove("success"), f.value.classList.remove("success");
    });
    const M = (a, s) => (a = Math.ceil(a), s = Math.floor(s), Math.floor(Math.random() * (s - a) + a));
    let h = M(100, i.width - 50), y = M(100, i.height - 50), g = !1, T = 0, r = 0;
    const V = (a) => {
      o.value || (g = !0, T = a.clientX, $.value = Date.now(), u.value.style.transition = "", d.value.style.transition = "", n.value.style.transition = "");
    }, z = () => {
      o.value || (g = !1);
    }, C = (a) => {
      !g || o.value || (r = a.pageX - T, !(r < 0 || r > i.width - 50) && (n.value.style.width = `${r}px`, u.value.style.transform = `translateX(${r}px`, d.value.style.transform = `translateX(${r}px`));
    }, F = (a) => {
      if (o.value) return;
      g = !1, r >= h - i.tolerance && r <= h + Number(i.tolerance) ? U() : W();
    }, U = () => {
      o.value = !0, w.value = Date.now(), p.value = ((w.value - $.value) / 1e3).toFixed(2);
      const s = Math.max(0, parseFloat(p.value) - 0.5), j = Math.floor(s / 0.5);
      m.value = Math.max(1, 99 - j), u.value.style.backgroundColor = "#78cabd", n.value.style.backgroundColor = "#d4f5f1", n.value.classList.add("success"), f.value.classList.add("success"), b.value.classList.add("success"), L("success", o.value);
    }, W = () => {
      o.value = !1, n.value.style.width = 0, n.value.style.transition = "all 0.3s ease", u.value.style.transform = "translateX(0px)", d.value.style.transform = "translateX(0px)", u.value.style.transition = "transform 0.3s ease", d.value.style.transition = "transform 0.3s ease", n.value.classList.remove("success"), f.value.classList.remove("success");
    };
    return (a, s) => (N(), B("div", {
      class: "drag-verify-container",
      onMousemove: C,
      onMouseup: F
    }, [
      t("div", {
        class: "check-container",
        style: c({
          width: `${e.width}px`,
          height: `${e.height}px`
        })
      }, [
        t("div", {
          class: "check",
          ref: "check",
          style: c({
            backgroundImage: `url(${e.backgroundImage})`,
            width: `${e.width}px`,
            height: `${e.height}px`
          })
        }, [
          t("div", {
            class: S(["check-content", `shape-${x.value}`]),
            style: c({
              left: `${v(h)}px`,
              top: `${v(y)}px`
            })
          }, null, 6),
          t("div", {
            class: S(["check-block", `shape-${x.value}`]),
            ref_key: "checkBlock",
            ref: d,
            style: c({
              backgroundPosition: `-${v(h)}px -${v(y)}px`,
              backgroundSize: `${e.width}px ${e.height}px`,
              top: `${v(y)}px`
            })
          }, null, 6)
        ], 4),
        o.value ? (N(), B("div", {
          key: 0,
          class: "success-mask",
          style: c({
            width: `${e.width}px`,
            height: `${e.height}px`
          })
        }, [
          t("div", P, [
            t("p", A, [
              s[0] || (s[0] = k(" 你只用了 ", -1)),
              t("span", null, X(p.value), 1),
              s[1] || (s[1] = k(" s完成拼图，成功超越率全国 ", -1)),
              t("span", {
                style: c({
                  color: m.value < 60 ? "red" : "#04be02",
                  fontSize: "20px"
                })
              }, X(m.value), 5),
              s[2] || (s[2] = k("%的用户 ", -1))
            ])
          ])
        ], 4)) : R("", !0)
      ], 4),
      t("div", {
        class: "drag",
        style: c({
          width: `${e.width}px`
        }),
        ref_key: "drag",
        ref: I
      }, [
        t("div", {
          class: "dragBg",
          ref_key: "dragBg",
          ref: n
        }, null, 512),
        t("div", {
          class: "drag-block",
          ref_key: "dragBlock",
          ref: u,
          onMousedown: V,
          onMouseup: z
        }, [
          t("span", {
            class: "slider-icon",
            ref_key: "sliderIcon",
            ref: b
          }, null, 512)
        ], 544),
        t("div", {
          class: "drag-tips",
          ref_key: "dragTips",
          ref: f
        }, null, 512)
      ], 4)
    ], 32));
  }
}), Q = /* @__PURE__ */ O(H, [["__scopeId", "data-v-be40c0b6"]]);
export {
  Q as default
};
