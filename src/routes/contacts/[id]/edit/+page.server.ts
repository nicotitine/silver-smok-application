import type { Contact } from '$lib/models/Contact';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params, fetch }: { params: any, fetch: Function }): Promise<any> {
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
    });
    return result
};

export const actions = {
    update: async ({ request, params, fetch }: { request: Request, params: any, fetch: Function }) => {
        const formData = await request.formData()
        const phone: string | undefined = formData.get('phone')?.toString()
        const mobile_phone: string | undefined = formData.get('mobile_phone')?.toString()
        const birthdate: string | undefined = formData.get('birthdate')?.toString()
        const mail_addresses = formData.getAll('mail_addresses').join(',')

        var formDataReturned = {};
        formData.forEach(function (value, key) {
            formDataReturned[key] = value;
        });
        formDataReturned.mail_addresses = mail_addresses
        if (phone) {
            if (!phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                return fail(400, { formData: formDataReturned, incorrect_phone: true })
            }
        }

        if (mobile_phone) {
            if (!mobile_phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                return fail(400, { formData: formDataReturned, incorrect_mobile_phone: true })
            }
        }

        if (birthdate && new Date(birthdate) > new Date()) {
            return fail(400, { formData: formDataReturned, incorrect_birthdate: true })
        }

        const result = await fetch('/api/contacts/' + params.id, {
            method: 'POST',
            body: formData
        }).then(async (res: Response) => {
            const status = res.status
            if (status !== 200) throw error(501, 'Unable to update contact with id ' + params.id)
            throw redirect(303, '/contacts/' + params.id)
        })
        return result
    }
}