import { error } from '@sveltejs/kit';
import type { Contact } from '$lib/models/Contact';
import type { PageServerLoad } from './$types';

export async function load({ params, fetch }: { params: any, fetch: Function }): Promise<PageServerLoad> {
	const result = await fetch('/api/contacts/' + params.id).then(async (res: Response) => {
		const status = res.status

		if (status !== 200) throw error(501, 'Unable to retrieve contact with id ' + params.id)

		try {
			const contacts: Contact[] = await res.json();

			if (contacts.length === 0) throw error(501, 'Contact not found')

			const contact: Contact = contacts[0]
			return { contact };
		} catch (reason: any) {
			throw error(501, 'Unable to read contact with id ' + params.id)
		}
	})
	return result
};