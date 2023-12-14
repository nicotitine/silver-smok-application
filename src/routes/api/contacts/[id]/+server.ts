import { json } from '@sveltejs/kit';
import { ModifyQuery, SelectQuery } from '$lib/database'
import type { Contact } from '$lib/models/Contact';
import type { ResultSetHeader } from 'mysql2';

export async function GET({ params }: { params: any }): Promise<Response> {
    try {
        const queryResult = await SelectQuery<Contact[]>('SELECT * FROM contact WHERE contact_id = ' + params.id)
        return json(queryResult)
    }
    catch (error: any) {
        return new Response(undefined, {
            status: 501,
            statusText: 'Unable to retrieve contact'
        })
    }
}

function getBirthdate(birthdate: FormDataEntryValue | null): string | null {
    const today: string = new Date().toISOString().substring(0, 10)
    if (birthdate == null || today === birthdate) return null
    return "'" + birthdate.toString() + "'"
}

export async function POST({ request, params }: { request: Request, params: any }): Promise<Response> {
    const formData: FormData = await request.formData()
    const contact_id: string = params.id
    const mail_addresses: string = formData.getAll('mail_addresses').join(',')
    const query: string = `
    UPDATE Contact SET
    first_name = '${formData.get('first_name')}',
    last_name = '${formData.get('last_name')}',
    birthdate = ${getBirthdate(formData.get('birthdate') ? formData.get('birthdate') : 'NULL')},
    facebook_profile = '${formData.get('facebook_profile')}',
    twitter_profile = '${formData.get('twitter_profile')}',
    discord_profile = '${formData.get('discord_profile')}',
    profile_picture = '${formData.get('profile_picture')}',
    phone = '${formData.get('phone')}',
    mobile_phone = '${formData.get('mobile_phone')}',
    address = '${formData.get('address')}',
    city = '${formData.get('city')}',
    postal_code = '${formData.get('postal_code')}',
    country = '${formData.get('country')}',
    company = '${formData.get('company')}',
    website = '${formData.get('website')}',
    mail_addresses = '${mail_addresses}'
    WHERE contact_id = ${contact_id}`

    try {
        const queryResult = await ModifyQuery(query)
        return json(queryResult)
    } catch (error: any) {
        return new Response(undefined, {
            status: 501,
            statusText: 'Unable to update contact'
        })
    }
}

export async function DELETE({ params }: {params: any}): Promise<Response> {
    const query = 'DELETE FROM contact WHERE contact_id=' + params.id
    try {
        const queryResult: ResultSetHeader = await ModifyQuery(query)
        if (queryResult.affectedRows === 0) throw new Error()
        return json(queryResult)
    } catch (error: any) {
        return new Response(undefined, {
            status: 501,
            statusText: 'Unable to delete contact'
        })
    }
}