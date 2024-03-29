import {
	MONGO_URL,
	MONGO_DB_NAME,
	COLLECTION_NOTIFY,
	COLLECTION_BLOG_POST
} from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);

export const BLOG_POST = COLLECTION_BLOG_POST;
export const NOTIFY = COLLECTION_NOTIFY;

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
