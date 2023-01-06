import { defineStore, acceptHMRUpdate } from "pinia"

export const useOptionsStore = defineStore("optionsStore", {
	state: () => ({
		comment: "Initial State",
		nextButton: true,
	}),

	actions: {
		update(options) {
			Object.assign(this, options)
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}