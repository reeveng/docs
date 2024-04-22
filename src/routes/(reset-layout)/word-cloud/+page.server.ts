import { WORDS, WORDS_SUBMISSIONS, getDB } from '$lib/db/mongo';
import type { Actions } from './$types';

const TYPES = {
	add: 'add',
};

export const actions = {
	add: async (event) => {
		const data = await event.request.formData();
		const word1 = data.get('word1');
		const word2 = data.get('word2');
		const word3 = data.get('word3');

		const validateInput = [word1, word2, word3].map(word => word ? word.toString() : '').filter(word => Boolean((word)) && word && typeof word === "string").map(word => word.toLowerCase().trim()
		)

		const words = Array.from(new Set(
			validateInput
		));

		if (words.filter(Boolean).length < 3) {
			return {
				type: TYPES.add,
				success: false,
				messages: ["Can't submit an empty input field or duplicates."]
			};
		}

		const db = getDB();

		try {

			// Iterate over each word and update its count in the database
			await Promise.all(words.map(async word => {
				await db.collection(WORDS).updateOne(
					{ word }, // Filter by word
					{ $inc: { amount: 1 } }, // Increment the amount field
					{ upsert: true } // Create new document if word does not exist
				);
			}));

			await db.collection(WORDS_SUBMISSIONS).insertOne(
				{
					words
				}
			);


		} catch (error) {
			console.error(error);
			return {
				type: TYPES.add,
				success: false,
				messages: ['Something severely went wrong! Try again laterzzz zzz zzz.']
			};
		}

		return {
			type: TYPES.add,
			success: true,
		};
	},
} satisfies Actions;



export async function load() {
	const db = getDB();

	try {
		const allWords = await db.collection(WORDS).find().toArray();

		const serializedWords = allWords.map(({ word, amount }) => ({ word, amount }));

		return {
			allWords: serializedWords,
		};
	} catch (error) {
		console.error('Error retrieving data from the database:', error);
	}
}