<script lang="ts">
	import type { PageData } from '../$types';
	import pp from '$lib/assets/default_pp.jpg';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let data: PageData;

	const formatDate = (date_param: string): string => {
		if (date_param === null) return '';
		let date = new Date(date_param);
		const formatter = new Intl.DateTimeFormat('fr', { dateStyle: 'long' });
		return formatter.format(date);
	};

	const formatEmail = (emails: string): string[] => {		
		if (emails === null) return [];
		return emails.split(',');
	};

	$: ({ contact } = data);

</script>

{#if contact}
	<div class="contact-full-page">
		<div class="contact-container">
			<div class="header">
				<img src={pp} alt={pp} id="profile-picture" />
				<div id="header-value-container">
					{#if contact.company}
						<span id="compagny">{contact.company}</span>
					{/if}
					<div id="names">
						<span id="first_name">{contact.first_name}</span>
						<span id="first_name">{contact.last_name}</span>
					</div>
				</div>
			</div>
			<div class="contact-content">
				{#if contact.phone || contact.mobile_phone}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-phone"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Phone</div>
							{#if contact.phone}
								<div id="phone">{contact.phone}</div>
							{/if}
							{#if contact.mobile_phone}
								<div id="mobile_phone">{contact.mobile_phone}</div>
							{/if}
						</div>
					</div>
				{/if}
				{#if contact.mail_addresses}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-envelope"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Mail</div>
							{#each formatEmail(contact.mail_addresses) as mail_address}
								<div class="mail_address"><a href="mailto:{mail_address}">{mail_address}</a></div>
							{/each}
						</div>
					</div>
				{/if}
				{#if contact.website}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-globe"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Website</div>
							<div id="website"><a href={contact.website}>{contact.website}</a></div>
						</div>
					</div>
				{/if}
				{#if contact.address || contact.postal_code || contact.country || contact.city}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-location-dot"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Address</div>
							{#if contact.address}
								<div id="address">{contact.address}</div>
							{/if}
							{#if contact.postal_code || contact.postal_code}
								<div id="postal"><span id="postal">{contact.postal_code}</span> <span id="city">{contact.city}</span></div>
							{/if}
							{#if contact.country}
								<div id="country">{contact.country}</div>
							{/if}
						</div>
					</div>
				{/if}
				{#if contact.birthdate}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-calendar"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Birthdate</div>
							<div id="birthdate">{formatDate(contact.birthdate)}</div>
						</div>
					</div>
				{/if}
				{#if contact.discord_profile || contact.twitter_profile || contact.facebook_profile}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-share-nodes"></i>
						</div>
						<div class="contact-value-container">
							{#if contact.discord_profile}
								<div class="contact-label">Discord</div>
								<div id="discord">
									<a href="https://discord.com/{contact.discord_profile}"
										>{contact.discord_profile}</a
									>
								</div>
							{/if}
							{#if contact.twitter_profile}
								<div class="contact-label">Twitter</div>
								<div id="twitter">
									<a href="https://twitter.com/{contact.twitter_profile}"
										>{contact.twitter_profile}</a
									>
								</div>
							{/if}
							{#if contact.facebook_profile}
								<div class="contact-label">Facebook</div>
								<div id="facebook">
									<a href="{contact.facebook_profile}"
										>{contact.facebook_profile}</a
									>
								</div>
							{/if}
						</div>
					</div>
				{/if}
				{#if contact.additional_notes}
					<div class="contact-info-container">
						<div class="contact-icon-container">
							<i class="fa-solid fa-note-sticky"></i>
						</div>
						<div class="contact-value-container">
							<div class="contact-label">Notes</div>
							<div id="additional_notes">{contact.additional_notes}</div>
						</div>
					</div>
				{/if}
			</div>
			<div class="contact-action-buttons">
                <div>
                    <a class="underline-link" href="/">Return</a>
                </div>
				<div>
					<a class="underline-link" href="/contacts/{contact.contact_id}/delete">Delete</a>
					<a class="button-link" href="/contacts/{contact.contact_id}/edit">Edit</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>

	
</style>
