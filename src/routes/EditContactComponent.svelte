<script lang="ts">
	import type { Contact } from '$lib/models/Contact';
	import pp from '$lib/assets/default_pp.jpg';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import type { ActionData } from './$types';

	const formatEmail = (emails: string): string[] => {
		if (!emails) return [];
		return emails.split(',');
	};

	const addEmail = () => {
		let newInput = document.createElement('input');
		newInput.setAttribute('name', 'mail_addresses');
		document.getElementById('mail-addresses')?.append(newInput);
	};

	const datePickerFormater = (date_param: Date): string => {
		if (!date_param) return '';
		return new Date(date_param).toISOString().substring(0, 10);
	};

	export let contact: Contact | undefined;
	export let action: string;
	export let form: ActionData;
</script>

<div class="contact-full-page">
	<form class="contact-container" method="post" {action}>
		<div class="header">
			<img src={pp} alt={pp} id="profile-picture" />
			<div id="header-value-container">
				<label for="company">Company</label>
				<input
					type="text"
					value={contact?.company || form?.formData.company || ''}
					name="company"
					id="company"
				/>
				<div>
					<label id="first_name" for="first_name">First name</label>
					<input
						type="text"
						value={contact?.first_name || form?.formData.first_name || ''}
						name="first_name"
					/><br />
					<label id="last_name" for="last_name">Last name</label>
					<input
						type="text"
						name="last_name"
						value={contact?.last_name || form?.formData.last_name || ''}
					/>
				</div>
			</div>
		</div>
		<div class="contact-content">
			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-phone"></i>
				</div>
				<div class="contact-value-container">
					<label id="phone" for="phone">Phone</label>
					<input type="text" name="phone" value={form?.formData.phone || contact?.phone || ''} />
					{#if form?.incorrect_phone}<p class="error">Invalid phone number</p>{/if}
					<label id="mobile_phone" for="mobile_phone">Mobile phone</label>
					<input
						type="text"
						name="mobile_phone"
						value={form?.formData.mobile_phone || contact?.mobile_phone || ''}
					/>
					{#if form?.incorrect_mobile_phone}<p class="error">Invalid mobile phone number</p>{/if}
				</div>
			</div>
			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-envelope"></i>
				</div>
				<div class="contact-value-container">
					<div class="contact-label">Mail</div>
					<div id="mail-addresses">
						{#if contact?.mail_addresses}
							{#each formatEmail(contact.mail_addresses) as mail_address}
								<input name="mail_addresses" value={mail_address} />
							{/each}
						{:else if form?.formData && form?.formData.mail_addresses !== ''}
							{#each formatEmail(form.formData.mail_addresses) as mail_address}
								<input name="mail_addresses" value={mail_address} />
							{/each}
						{:else}
							<input name="mail_addresses" />
						{/if}
					</div>
					<a on:click|preventDefault={addEmail} href="/#"><i class="fa-solid fa-plus"></i></a>
				</div>
			</div>

			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-globe"></i>
				</div>
				<div class="contact-value-container">
					<label for="website">Website</label>
					<input
						type="text"
						name="website"
						id="website"
						value={contact?.website || form?.formData.website || ''}
					/>
				</div>
			</div>

			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-location-dot"></i>
				</div>
				<div class="contact-value-container">
					<label for="address">Address</label>
					<input
						type="text"
						id="address"
						name="address"
						value={contact?.address || form?.formData.address || ''}
					/>
					<label for="postal_code">Postal code</label>
					<input
						type="text"
						name="postal_code"
						id="postal_code"
						maxlength="5"
						value={contact?.postal_code || form?.formData.postal_code || ''}
					/>
					<label for="city">City</label>
					<input
						type="text"
						name="city"
						id="city"
						value={contact?.city || form?.formData.city || ''}
					/>
					<label for="country">Country</label>
					<input
						type="text"
						name="country"
						id="country"
						value={contact?.country || form?.formData.country || ''}
					/>
				</div>
			</div>

			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-calendar"></i>
				</div>
				<div class="contact-value-container">
					<label for="birthdate">Birthdate</label>
					{#if contact?.birthdate}
						<input
							type="date"
							id="birthdate"
							name="birthdate"
							value={datePickerFormater(contact.birthdate)}
						/>
					{:else if form?.formData}
						<input
							type="date"
							id="birthdate"
							name="birthdate"
							value={datePickerFormater(form?.formData.birthdate)}
						/>
					{:else}
						<input
							type="date"
							id="birthdate"
							name="birthdate"
							value={datePickerFormater(new Date())}
						/>
					{/if}
					{#if form?.incorrect_birthdate}<p class="error">Invalid birthdate</p>{/if}
				</div>
			</div>
			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-share-nodes"></i>
				</div>
				<div class="contact-value-container">
					<label for="discord">Discord</label>
					<input
						type="text"
						name="discord_profile"
						id="discord"
						value={contact?.discord_profile || form?.formData.discord_profile || ''}
					/>
					<label for="twitter">Twitter</label>
					<input
						type="text"
						name="twitter_profile"
						id="twitter"
						value={contact?.twitter_profile || form?.formData.twitter_profile || ''}
					/>
					<label for="facebook">Facebook</label>
					<input
						type="text"
						name="facebook_profile"
						id="facebook"
						value={contact?.facebook_profile || form?.formData.facebook_profile || ''}
					/>
				</div>
			</div>
			<div class="contact-info-container">
				<div class="contact-icon-container">
					<i class="fa-solid fa-note-sticky"></i>
				</div>
				<div class="contact-value-container">
					<label for="additional_notes">Notes</label>
					<textarea name="additional_notes" id="additional_notes" cols="30" rows="5"
						>{contact?.additional_notes || form?.formData.additional_notes || ''}</textarea
					>
				</div>
			</div>
		</div>
		<div class="contact-action-buttons">
			{#if contact}
				<a class="underline-link" href="/contacts/{contact?.contact_id}">Cancel</a>
			{:else}
				<a class="underline-link" href="/">Cancel</a>
			{/if}
			<button class="button-link" type="submit">Save</button>
		</div>
	</form>
</div>

<style>
	.error {
		margin: 0px 0px 10px 0px;
	}
</style>
