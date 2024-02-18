export const prerender = false

export async function load({ params, data }: {
    params: {
        slug: string;
    },
    data: { amount: number }
}) {
    // amount of likes
    const { amount } = data;

    const post = await import(`../${params.slug}.md`);

    return {
        amount,
        content: post.default,
        ...post.metadata
    };
}