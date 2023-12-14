import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'

export async function load({fetch}: {fetch: Function}): Promise<PageServerLoad> {
	const result = await fetch('/api/contacts').then(async (res: Response) => {
		const status = res.status
		if (status !== 200) throw error(501, 'Unable to retrieve contacts list')
		const contacts = await res.json()
		return { contacts }
	})
	return result
};