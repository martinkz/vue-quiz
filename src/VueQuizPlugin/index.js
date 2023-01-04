import VueQuiz from "./VueQuiz.vue";

export function VueQuizPlugin(app, options) {
	app.component("VueQuiz", VueQuiz);
	console.log(options);
}
