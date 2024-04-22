import { NOTIFY, getDB } from '$lib/db/mongo';
import { isValidEmail } from '$lib/utils/emailValidation';
import type { Actions } from './$types';

const TYPES = {
	subscribe: 'subscribe',
	unsubscribe: 'unsubscribe'
};

export const actions = {
	subscribe: async (event) => {
		const data = await event.request.formData();
		const emailToAdd = data.get('email');

		if (!emailToAdd || typeof emailToAdd !== 'string') {
			return {
				type: TYPES.subscribe,
				success: false,
				messages: ["Can't submit an empty input field."]
			};
		}

		if (emailToAdd && !isValidEmail(emailToAdd)) {
			return {
				type: TYPES.subscribe,
				success: false,
				messages: [
					'A non valid email address.',
					"If your email is valid, we don't support this format, send over an email to get it fixed!"
				],
				email: emailToAdd
			};
		}

		try {
			await getDB()
				.collection(NOTIFY)
				.updateOne(
					{ emailAddress: emailToAdd }, // Filter for specific emailaddress
					{ $set: { emailAddress: emailToAdd } },
					{ upsert: true } // Create new if not found
				);
		} catch (error) {
			console.error(error);
			return {
				type: TYPES.subscribe,
				success: false,
				messages: ['Something severely went wrong! Try again laterzzz zzz zzz.']
			};
		}

		return {
			type: TYPES.subscribe,

			success: true,
			messages: ['Added the email to the list, expect to get updates!']
		};
	},

	unsubscribe: async (event) => {
		const data = await event.request.formData();
		const emailToRemove = data.get('email');

		if (!emailToRemove || typeof emailToRemove !== 'string') {
			return {
				type: TYPES.unsubscribe,
				success: false,
				messages: ["Can't submit an empty input field."]
			};
		}

		if (emailToRemove && !isValidEmail(emailToRemove)) {
			return {
				type: TYPES.unsubscribe,
				success: false,
				messages: [
					'A non valid email address.',
					"If your email is valid, we don't support this format, so your email couldn't have been added!?!? If you do get updates, consider email!"
				],
				email: emailToRemove
			};
		}

		try {
			await getDB().collection(NOTIFY).deleteOne(
				{ emailAddress: emailToRemove } // Filter for specific emailaddress
			);
		} catch (error) {
			console.error(error);
			return {
				success: false,
				messages: ['Something severely went wrong! Try again laterzzz zzz zzz.'],
				type: TYPES.unsubscribe
			};
		}

		return {
			type: TYPES.unsubscribe,
			success: true,
			messages: ['Your email has been yeeted and deleted, you can rest assured.']
		};
	}
} satisfies Actions;
