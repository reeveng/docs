import type { Post, PostLink } from "$lib/types";

function generateIsPost<T>(keys: (keyof T)[]): (data: any) => data is T {
    return function isPost(data: any): data is T {
        return keys.every(key => key in data);
    };
}

const isPost = generateIsPost<Post>(['metadata']);

export const load: () => Promise<{ posts: PostLink[] }> = async () => {
    const fileTypes = '../../lib/blogposts/*.md'
    const posts = import.meta.glob('../../lib/blogposts/*.md');


    const postEntries = Object.entries(posts);

    const mappedPosts: PostLink[] = (await Promise.all(
        postEntries.map(async ([path, post]) => {
            const loadedPost = await post();

            if (!isPost(loadedPost)) {
                console.error(`Invalid post data for ${path}`);
                return null;
            }

            const [removeBeginning, removeEnd] = fileTypes.split("*")
            const slug = path.slice(removeBeginning.length, -removeEnd.length); // Remove the './' prefix and '.md' extension

            return { slug, post: loadedPost };
        })
    )).filter((post): post is PostLink => post !== null).sort((a, b) => new Date(b.post.metadata.publishedOnDate).getTime() - new Date(a.post.metadata.publishedOnDate).getTime());

    return {
        posts: mappedPosts
    };
};