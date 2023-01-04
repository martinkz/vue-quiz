import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQuizPlugin } from "@/VueQuizPlugin";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueQuizPlugin, { test: 5 });
app.mount("#app");
