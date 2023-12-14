<script lang="ts">
	import type { PageData } from "../$types"
    export let data: PageData
</script>

<div class="contact-full-page">
	<div class="contact-container">
		<div class="header">
			<h2>Delete contact</h2>
		</div>
		<div class="contact-content">
			<p>Are you sure to delete this contact ?</p>
            <form action="?/delete" method="post">
                <button type="submit">Yes</button>
                <a href="/contacts/{data.params.id}">No</a>
            </form>
		</div>
	</div>
</div>


<style>
    form {
        margin: 30px auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .header {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    p {
        text-align: center;
    }
</style>