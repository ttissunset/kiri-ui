import { defineAsyncComponent } from "vue";

const components = import.meta.glob("./kiri-ui/*.vue");

const registerGlobalComponent = function (app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value));
  }
};

export default registerGlobalComponent;
