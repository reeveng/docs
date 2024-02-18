import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const CAN_LIKE = 'canLike';

const storedCanLike = browser && localStorage.getItem(CAN_LIKE);
const canLike = writable<boolean>(storedCanLike ? JSON.parse(storedCanLike) : true);

canLike.subscribe((value: boolean) => {
    if (browser) {
        localStorage.setItem(CAN_LIKE, JSON.stringify(value));
    }
});

export default canLike;