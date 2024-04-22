import {
	MONGO_URL,
	MONGO_DB_NAME,
	COLLECTION_NOTIFY,
	COLLECTION_WORDS,
	COLLECTION_BLOG_POST,
	COLLECTION_WORDS_SUBMISSIONS,
} from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);

export const BLOG_POST = COLLECTION_BLOG_POST;
export const NOTIFY = COLLECTION_NOTIFY;
export const WORDS = COLLECTION_WORDS;
export const WORDS_SUBMISSIONS = COLLECTION_WORDS_SUBMISSIONS

// connect to the database
export async function connect(): Promise<void> {
	await client.connect();
}

// disconnect from the database
export async function disconnect(): Promise<void> {
	await client.close();
}

// get the database
export function getDB() {
	return client.db(MONGO_DB_NAME);
}
