import { computed as q, ref as l, onMounted as E, createElementBlock as S, openBlock as X, createElementVNode as t, normalizeStyle as i, createCommentVNode as O, normalizeClass as D, unref as v, createTextVNode as $, toDisplayString as L } from "vue";
const R = (e, y) => {
  const n = e.__vccOpts || e;
  for (const [m, f] of y)
    n[m] = f;
  return n;
}, P = { class: "success-content" }, A = { class: "success-info" }, G = {
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
  setup(e, { emit: y }) {
    const n = e, m = y, f = q(() => n.shape), d = l(null), I = l(null), u = l(null), h = l(null), o = l(null), w = l(null), r = l(!1), M = l(0), T = l(0), k = l(0), x = l(99);
    E(() => {
      o.value.classList.remove("success"), h.value.classList.remove("success");
    });
    const B = (a, s) => (a = Math.ceil(a), s = Math.floor(s), Math.floor(Math.random() * (s - a) + a));
    let g = B(100, n.width - 50), b = B(100, n.height - 50), p = !1, N = 0, c = 0;
    const V = (a) => {
      r.value || (p = !0, N = a.clientX, M.value = Date.now(), u.value.style.transition = "", d.value.style.transition = "", o.value.style.transition = "");
    }, z = () => {
      r.value || (p = !1);
    }, C = (a) => {
      !p || r.value || (c = a.pageX - N, !(c < 0 || c > n.width - 50) && (o.value.style.width = `${c}px`, u.value.style.transform = `translateX(${c}px`, d.value.style.transform = `translateX(${c}px`));
    }, F = (a) => {
      if (r.value) return;
      p = !1, c >= g - n.tolerance && c <= g + Number(n.tolerance) ? U() : W();
    }, U = () => {
      r.value = !0, T.value = Date.now(), k.value = ((T.value - M.value) / 1e3).toFixed(2);
      const s = Math.max(0, parseFloat(k.value) - 0.5), j = Math.floor(s / 0.5);
      x.value = Math.max(1, 99 - j), u.value.style.backgroundColor = "#78cabd", o.value.style.backgroundColor = "#d4f5f1", o.value.classList.add("success"), h.value.classList.add("success"), w.value.classList.add("success"), m("success", r.value);
    }, W = () => {
      r.value = !1, o.value.style.width = 0, o.value.style.transition = "all 0.3s ease", u.value.style.transform = "translateX(0px)", d.value.style.transform = "translateX(0px)", u.value.style.transition = "transform 0.3s ease", d.value.style.transition = "transform 0.3s ease", o.value.classList.remove("success"), h.value.classList.remove("success");
    };
    return (a, s) => (X(), S("div", {
      class: "drag-verify-container",
      onMousemove: C,
      onMouseup: F
    }, [
      t("div", {
        class: "check-container",
        style: i({
          width: `${e.width}px`,
          height: `${e.height}px`
        })
      }, [
        t("div", {
          class: "check",
          ref: "check",
          style: i({
            backgroundImage: `url(${e.backgroundImage})`,
            width: `${e.width}px`,
            height: `${e.height}px`
          })
        }, [
          t("div", {
            class: D(["check-content", `shape-${f.value}`]),
            style: i({
              left: `${v(g)}px`,
              top: `${v(b)}px`
            })
          }, null, 6),
          t("div", {
            class: D(["check-block", `shape-${f.value}`]),
            ref_key: "checkBlock",
            ref: d,
            style: i({
              backgroundPosition: `-${v(g)}px -${v(b)}px`,
              backgroundSize: `${e.width}px ${e.height}px`,
              top: `${v(b)}px`
            })
          }, null, 6)
        ], 4),
        r.value ? (X(), S("div", {
          key: 0,
          class: "success-mask",
          style: i({
            width: `${e.width}px`,
            height: `${e.height}px`
          })
        }, [
          t("div", P, [
            t("p", A, [
              s[0] || (s[0] = $(" 你只用了 ", -1)),
              t("span", null, L(k.value), 1),
              s[1] || (s[1] = $(" s完成拼图，成功超越率全国 ", -1)),
              t("span", {
                style: i({
                  color: x.value < 60 ? "red" : "#04be02",
                  fontSize: "20px"
                })
              }, L(x.value), 5),
              s[2] || (s[2] = $("%的用户 ", -1))
            ])
          ])
        ], 4)) : O("", !0)
      ], 4),
      t("div", {
        class: "drag",
        style: i({
          width: `${e.width}px`
        }),
        ref_key: "drag",
        ref: I
      }, [
        t("div", {
          class: "dragBg",
          ref_key: "dragBg",
          ref: o
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
            ref: w
          }, null, 512)
        ], 544),
        t("div", {
          class: "drag-tips",
          ref_key: "dragTips",
          ref: h
        }, null, 512)
      ], 4)
    ], 32));
  }
}), K = /* @__PURE__ */ R(H, [["__scopeId", "data-v-be40c0b6"]]);
export {
  K as default
};
