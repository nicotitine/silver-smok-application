import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../$types"

export async function load({ params }: { params: any }): Promise<PageServerLoad> {
    return { params }
};

export const actions = {
    delete: async ({ params, fetch }: { params: any, fetch: Function }): Promise<Response> => {
        const result = await fetch('/api/contacts/' + params.id, {
            method: 'DELETE',
        }).then(async (res: Response) => {
            const status = res.status

            if (status !== 200) throw error(501, 'Unable to delete contact with id ' + params.id)
            throw redirect(303, '/')
        })
        return result
    }
}