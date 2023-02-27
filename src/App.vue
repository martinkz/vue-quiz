<template>
	<div class="app-wrap">
		<div style="display:flex; align-items: flex-start; gap: 30px">
			<VueQuiz :options="{ file: '../quizzes/quiz1.json', nextButton: true, revealAnswer: false, timedQuiz: false	}">
				<template #currentStatus="{ status: { currentQuestion, max } }">
					Question {{ currentQuestion }} of {{ max }}
				</template>
				<template #intro="{ slotProps: { title, image, text } }">
					<div class="quiz-copy-wrap">
						<h2 class="quiz-slide-title">{{ title }}</h2>
						<p v-if="text">{{ text }}</p>
					</div>
					<img class="quiz-slide-img" :src="image" alt="">
				</template>

				<template #question="{ slotProps: { question, image, text } }">
					<div class="quiz-copy-wrap">
						<h2 class="quiz-slide-title">{{ question }}</h2>
						<p v-if="text">{{ text }}</p>
					</div>
					<img class="quiz-slide-img" :src="image" alt="">
				</template>

				<template #nextBtn>Next question</template>

				<template #answerContent="{ slotProps: { answer } }">
					{{ answer }}
				</template>

				<template #result="{ slotProps: { type, result } }">
					<div class="quiz-copy-wrap">
						<h2 v-if="type==='scored'" class="quiz-slide-title">Congratulations, you scored {{ result.score }} out of {{ result.scoreMax }}!</h2>
						<h2 v-if="type==='personality'" class="quiz-slide-title">{{ result.title }}</h2>
						<p v-if="result.text">{{ result.text }}</p>
					</div>
					<img v-if="type==='personality'" class="quiz-slide-img" :src="result.image">
				</template>

				<template #playAgainBtn>Play quiz again</template>
			</VueQuiz>

		<VueQuiz :options="{ file: '../quizzes/quiz2.json', nextButton: true, revealAnswer: true, timedQuiz: true }" />
		</div>
	</div>
</template>

<style>
@keyframes background-shift {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%;	}
}

:root {
	color-scheme: light dark;
	color: rgba(255, 255, 255, 0.87);
	background-color: #242424;
}

html,
body {
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body {
	margin: 0;
	min-width: 320px;
	scrollbar-gutter: stable;
	overflow-y: scroll;
	background-size: 300% 300%;
	background-image: linear-gradient(-45deg, #e33b3b 0%, #ff357f 25%, #9844b7 50%, #576fe6 100%);
	animation: background-shift 50s ease infinite;
}

.app-wrap {
	padding: 10px;
	margin: 0 auto;
	display: grid;
	/* max-width: 820px; */
	/* max-width: 1220px; */
	min-height: 100vh;
	place-items: center;
}
</style>