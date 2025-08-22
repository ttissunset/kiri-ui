import { createApp } from "vue";
import App from "./App.vue";
import registerGlobalComponent from "../package/index";    

const app = createApp(App);
registerGlobalComponent(app);
app.mount("#app");
