import VueQuiz from "./VueQuiz.vue";
import { createPinia } from "pinia";
import "./assets/style.css";

const pinia = createPinia();

export function VueQuizPlugin(app, options) {
	app.use(pinia);
	app.component("VueQuiz", VueQuiz);
	console.log(options.comment);
}
