<template>
	<div class="app-wrap">
		<div style="display:flex; align-items: flex-start; gap: 30px">
		<VueQuiz :options="{ file: 'quiz1.json', nextButton: true, revealAnswer: false, timer: 300 }">
			<template #intro="{ slotProps: { title, image } }">
				<h1>{{ title }}</h1>
				<img class="slide-img" :src="image" alt="">
			</template>

			<template #question="{ slotProps: { question, image } }">
				<h1>{{ question }}</h1>
				<img class="slide-img" :src="image" alt="">
			</template>

			<template #nextBtn>Next question</template>

			<template #result="{ slotProps: { type, result } }">
				<h1 v-if="type==='scored'">Congratulations, you scored {{ result.score }} out of {{ result.scoreMax }}!</h1>
				<h1 v-if="type==='personality'">{{ result.title }}</h1>
				<img v-if="type==='personality'" class="slide-img" :src="result.image">
			</template>

			<template #playAgainBtn>Play quiz again</template>
		</VueQuiz>

		<VueQuiz />
		</div>
	</div>
</template>

<style>
@keyframes background-shift {
	0% {
		background-position: 0% 50%;
	}

	50% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0% 50%;
	}
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
	max-width: 1220px;
	min-height: 100vh;
	place-items: center;
}
</style>