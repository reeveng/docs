export async function load({ params }: {
    params: {
        slug: string;
    }
}) {
    const post = await import(`../${params.slug}.md`);

    return {
        content: post.default,
        ...post.metadata
    };
}
