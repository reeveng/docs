import type { Post } from "$lib/types";

export function assignColorClassToPosts(post: Post, oldestDate: number, newestDate: number): string {
    const percentageRank = Math.ceil((new Date(post.metadata.publishedOnDate).getTime() - oldestDate) / (newestDate - oldestDate) * 100);
    let colorClass = '';

    if (percentageRank <= 1) {
        colorClass = "text-fuchsia-950 dark:text-fuchsia-800"
    } else if (percentageRank <= 20) {
        colorClass = "text-fuchsia-900 dark:text-fuchsia-700"
    } else if (percentageRank <= 40) {
        colorClass = 'text-fuchsia-800 dark:text-fuchsia-600';
    } else if (percentageRank <= 60) {
        colorClass = 'text-fuchsia-700 dark:text-fuchsia-500';
    } else if (percentageRank <= 80) {
        colorClass = 'text-fuchsia-600 dark:text-fuchsia-400';
    } else if (percentageRank <= 99) {
        colorClass = 'text-fuchsia-500 dark:text-fuchsia-300';
    } else {
        colorClass = "text-fuchsia-400 dark:text-fuchsia-200"
    }

    return colorClass;
}