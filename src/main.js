import { createApp } from "vue";
import App from "./App.vue";
import { VueQuizPlugin } from "@/VueQuizPlugin";

const app = createApp(App);

app.use(VueQuizPlugin, {
	comment: "This is the VueQuiz plugin project",
	nextButton: true,
});
app.mount("#app");
