<script lang="ts">
	import type  { ActionData, PageData } from './$types';
	import '@fortawesome/fontawesome-free/css/all.min.css';
    import EditContactComponent from '../../../EditContactComponent.svelte'

	export let data: PageData;
	export let form: ActionData
	$: ({ contact } = data);
</script>

<EditContactComponent contact={contact} action='?/update' form={form}/>


