import { json } from '@sveltejs/kit';
import { SelectQuery, ModifyQuery } from '$lib/database'
import type { Contact } from '$lib/models/Contact';

export async function GET(): Promise<Response> {
	return json(await SelectQuery<Contact[]>('SELECT * FROM contact').then(d => d))
}

function getBirthdate(birthdate: FormDataEntryValue | null): string | null {
	const today: string = new Date().toISOString().substring(0, 10)
	if (birthdate == null || today === birthdate) return null
	return birthdate.toString()
}

export async function POST({ request }: { request: Request }): Promise<Response> {
	const formData: FormData = await request.formData()
	const mail_addresses: string = formData.getAll('mail_addresses').join(',')
	const query: string = `
    INSERT INTO Contact (first_name, last_name, birthdate, facebook_profile, twitter_profile, discord_profile,
	profile_picture, phone, mobile_phone, address, city, postal_code, country, company, website, mail_addresses) VALUES
	('${formData.get('first_name')}', '${formData.get('last_name')}', 
	${getBirthdate(formData.get('birthdate') ? "'" + formData.get('birthdate') + "'" : 'NULL')}, '${formData.get('facebook_profile')}', 
	'${formData.get('twitter_profile')}', '${formData.get('discord_profile')}', 
	'${formData.get('profile_picture')}', '${formData.get('phone')}', 
	'${formData.get('mobile_phone')}', '${formData.get('address')}', 
	'${formData.get('city')}', '${formData.get('postal_code')}', 
	'${formData.get('country')}', '${formData.get('company')}', 
	'${formData.get('website')}', '${mail_addresses}')`
	return json(await ModifyQuery(query))
}
