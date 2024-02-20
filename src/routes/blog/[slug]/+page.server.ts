import { BLOGPOST, getDB } from "$lib/db/mongo";
import type { Actions } from "./$types";

export const actions = {
    default: async (event: { params: { slug: string; }; }) => {
        const slugId = event.params.slug

        try {
            await getDB().collection(BLOGPOST).updateOne(
                { slug: slugId }, // Filter for specific blogpost
                { $inc: { amount: 1 } }, // Increment amount field by 1
                { upsert: true } // Create new if not found
            )
        } catch {
            return { success: false }
        }

        return { success: true, slug: slugId }
    }
} satisfies Actions;

export async function load(event: { params: { slug: string; }; }) {
    const slugId = event.params.slug

    try {
        const currentOponedBlogpost = await getDB().collection(BLOGPOST).findOne(
            { slug: slugId },
            { projection: { amount: 1, _id: 0 } }
        )

        return {
            amount: currentOponedBlogpost?.amount ?? 0,
        }
    }
    catch {
        return {
            amount: 0,
        }
    }
}