import VueQuiz from "./VueQuiz.vue";
import { createPinia } from "pinia";
import "./assets/style.css";

const pinia = createPinia();

const defaultOptions = {
	nextButton: true,
	revealAnswer: true,
	timedQuiz: true,
	timer: 600,
	imageAspectRatio: "3 / 2",
};

export function VueQuizPlugin(app, options) {
	options = {
		...defaultOptions,
		...options,
	};
	app.provide("pluginUseOptions", options);
	app.use(pinia);
	app.component("VueQuiz", VueQuiz);
}
