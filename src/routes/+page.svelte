<script lang="ts">
	import type { PageData } from './$types';
    import pp from '$lib/assets/default_pp.jpg';
	import type { Contact } from '$lib/models/Contact';

	export let data: PageData;

    const getSortedContacts = (contacts: Contact[]): Contact[] => {
        return contacts.sort((a, b) => a.first_name.localeCompare(b.first_name))
    }
</script>

<div class="contact-full-page">
	<div class="contact-container">
		<div class="header">
            <h2>Contact list ({data.contacts.length} entries)</h2>
		</div>
        <div class="contact-content">
            <div class="contact-list">
                {#each getSortedContacts(data.contacts) as contact (contact.contact_id)}
                    <a href="/contacts/{contact.contact_id}" class="contact">
                        <img src={pp} alt="{contact.first_name}'s profile picture"/>
                        <span class="names">{contact.first_name} {contact.last_name}</span>
                        <span class="details">{contact.company}</span>
                        <span class="details">
                            {#if contact.phone}
                                {contact.phone}
                            {/if}
                            {#if contact.mobile_phone}
                                {contact.mobile_phone}
                            {/if}
                        </span>
                    </a>
                {/each}
            </div>
        </div>
        <div class="contact-action-buttons">
            <div>
                <a class="button-link" href="/contacts/new/">Create new</a>
            </div>
        </div>
	</div>
</div>

<style>

    .header {
        padding: 30px 30px 30px 30px;
    }

    .contact-list a {
        padding-left: 20px;
        padding: 4px 20px;
    }

	.contact {
		display: flex;
		text-decoration: none;
        transition: all ease-in 0.1s;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        column-gap: 20px;
        color: black
	}

    .contact .names {
        font-weight: bold;
    }

    .contact .details {
        color: grey;
        font-size: 0.9em;
        transition: all ease-in 0.1s;
    }

	.contact:hover {
		background-color: #0071e3;
		color: white;
	}

    .contact:hover > span {
        color: white;
    }

    .contact img {
        width: 30px;
        border-radius: 15px;
    }

</style>
