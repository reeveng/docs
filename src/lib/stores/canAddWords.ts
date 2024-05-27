import { browser } from '$app/environment';
import { CAN_ADD_WORDS } from '$lib/utils/constants/localStorage';
import { writable } from 'svelte/store';

const storedCanAddWords = browser && localStorage.getItem(CAN_ADD_WORDS);

const canAddWords = writable(storedCanAddWords ? JSON.parse(storedCanAddWords) : true);

canAddWords.subscribe((value) => {
	if (browser) {
		localStorage.setItem(CAN_ADD_WORDS, JSON.stringify(value));
	}
});

export default canAddWords;
