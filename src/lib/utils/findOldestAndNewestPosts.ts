import type { Post } from "$lib/types";

export function findOldestAndNewestPosts(posts: Post[]): { oldestDate: number; newestDate: number } {
    let oldestDate = Infinity;
    let newestDate = -Infinity;

    for (const post of posts) {
        const postDate = new Date(post.metadata.publishedOnDate).getTime();
        if (postDate < oldestDate) {
            oldestDate = postDate;
        }
        if (postDate > newestDate) {
            newestDate = postDate;
        }
    }

    return { oldestDate, newestDate };
}