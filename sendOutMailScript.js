import { execSync } from 'child_process';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

console.log("start script")

dotenv.config();

const folderPath = "src/lib/blogPosts";

// Function to retrieve newly added files
function getAddedFiles() {
    return execSync("git diff-tree --name-only --diff-filter=A -r HEAD").toString().split('\n');
}

// Function to read and parse frontmatter from a file
function getFrontmatterFromFile(file) {
    const content = fs.readFileSync(file, 'utf8');
    const { data } = matter(content);
    return data;
}

function readHtmlFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function convertFilePathToUrl(filePath) {
    const baseUrl = 'https://juicemitapfelndrin.vercel.app/blog/';

    const fileName = path.basename(filePath, '.md');

    return baseUrl + fileName;
}

function unsubscribeUrl() {
    return "https://juicemitapfelndrin.vercel.app/blog/up-to-date"
}

// Function to send email notification
async function sendEmailNotification(emailAddresses, file) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const frontMatterInfoFromFile = getFrontmatterFromFile(file);
    const { title, publishedOnDate, teaser, description } = frontMatterInfoFromFile;

    let htmlContent = readHtmlFile('emailNotifyTemplate.html');

    const extendedInfoFromFile = { ...frontMatterInfoFromFile, url: convertFilePathToUrl(file), unsubscribeUrl: unsubscribeUrl() }

    Object.entries(extendedInfoFromFile).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'gi');
        htmlContent = htmlContent.replace(regex, value);
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        subject: `J MAD posted: ${title}`,
        bcc: emailAddresses,
        html: htmlContent,
        attachments: [{
            filename: 'mstile-144x144.png',
            path: 'static/mstile-144x144.png',
            cid: 'unique@jmad' //same cid value as in the html img src
        }]
    };

    if (process.env.MONGO_DB_NAME == "production") {
        await transporter.sendMail(mailOptions);
    }
}

async function main() {
    const client = new MongoClient(process.env.MONGO_URL);

    console.log("enter main")

    const addedFiles = getAddedFiles();

    console.log("added files:", addedFiles)

    try {
        await client.connect();


        for (const file of addedFiles) {
            if (file.startsWith(folderPath) && file.endsWith(".md")) {
                console.log("Newly added file:", file);

                const collection = client.db(process.env.MONGO_DB_NAME).collection(process.env.COLLECTION_NOTIFY);
                const result = await collection.find({}, { $project: { _id: 0, emailAddresses: 1 } }).toArray();

                const emailAddresses = result.map(entry => entry.emailAddress);

                await sendEmailNotification(emailAddresses, file);

                console.log("Email notification sent to:", emailAddresses);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

    console.log("exit main")
}


await main();

console.log("end script")
