import VueQuiz from "./VueQuiz.vue";
import { createPinia } from "pinia";
import "./assets/style.css";
import { useOptionsStore } from "./stores/OptionsStore";

const pinia = createPinia();

export function VueQuizPlugin(app, options) {
	app.use(pinia);
	app.component("VueQuiz", VueQuiz);
	const optionsStore = useOptionsStore();
	optionsStore.update(options);
}
