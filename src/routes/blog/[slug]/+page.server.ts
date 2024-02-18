import { BLOGPOST, getDB } from "$lib/db/mongo";
import type { Actions } from "./$types";

export const actions = {
    default: async (event: { params: { slug: any; }; }) => {
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


        return { success: true }
    }
} satisfies Actions;

export async function load(event: { params: { slug: any; }; }) {
    const slugId = event.params.slug

    const currentOponedBlogpost = await getDB().collection(BLOGPOST).findOne(
        { slug: slugId },
        { projection: { amount: 1, _id: 0 } }
    )

    return {
        ...currentOponedBlogpost,
    }
}