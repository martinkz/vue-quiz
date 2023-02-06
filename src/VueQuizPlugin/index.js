import VueQuiz from "./VueQuiz.vue";
import { createPinia } from "pinia";
import "./assets/style.css";

const pinia = createPinia();

const defaultOptions = {
	nextButton: true,
	revealAnswer: true,
	timedQuiz: true,
	timer: 600,
	animation: true,
	imageAspectRatio: "3 / 2",
	file: "quiz2.json",
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
