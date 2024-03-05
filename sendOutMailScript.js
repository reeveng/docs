import { execSync } from 'child_process';
import { MongoClient } from 'mongodb';

const folderPath = "src/lib/blogposts";

// Get list of newly added files
const addedFiles = execSync("git diff-tree --name-only --diff-filter=A -r HEAD").toString().split('\n');
console.log({ addedFiles })

const dbName = process.env.MONGO_DB_NAME;
const dbUrl = process.env.MONGO_URL
const collectionName = process.env.COLLECTION_NOTIFY;

console.log({ collectionName, dbUrl, dbName })

async function main() {
    const client = new MongoClient(dbUrl);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Loop through each newly added file
        for (const file of addedFiles) {
            console.log({ file })
            // Check if the file is in the specified folder
            if (file.startsWith(folderPath)) {
                console.log("Newly added file:", file);

                // Execute MongoDB aggregate query
                const collection = client.db(dbName).collection(collectionName);
                const result = await collection.find({}, {
                    $project: {
                        _id: 0,
                        emailAddresses: 1
                    }
                }).toArray();
                console.log({ result })

                // Extract email addresses from MongoDB query result
                // const emailAddresses = result[0].emailAddresses;

                // Send email notification with email addresses in BCC
                // execSync(`echo "${emailAddresses.join('\n')}" | mail -s "New Blog Post" -b "${emailAddresses.join(',')}" user@example.com`);

                // // Example extension: Send an email notification
                // // Replace with your email sending logic
                // console.log("Sending email notification...");
                // console.log("New blog post added:", file);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}

main();