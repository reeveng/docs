import { browser } from '$app/environment';
import { CAN_LIKE } from '$lib/utils/constants/localStorage';
import { writable } from 'svelte/store';

let storedCanLike = browser && localStorage.getItem(CAN_LIKE);

const canLike = writable<string[]>(storedCanLike ? JSON.parse(storedCanLike) : []);

canLike.subscribe((value: string[]) => {
    if (browser) {
        localStorage.setItem(CAN_LIKE, JSON.stringify(value));
    }
});

export default canLike;