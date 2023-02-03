import { createApp } from "vue";
import App from "./App.vue";
import { VueQuizPlugin } from "@/VueQuizPlugin";

const app = createApp(App);

app.use(VueQuizPlugin, {
	nextButton: true,
	revealAnswer: false,
});
app.mount("#app");
