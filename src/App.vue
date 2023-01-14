<template>
	<div class="app-wrap">
		<VueQuiz
		:options="{
			comment: 'Option set at the component level',
		}" />
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
	max-width: 820px;
	min-height: 100vh;
	place-items: center;
}
</style>