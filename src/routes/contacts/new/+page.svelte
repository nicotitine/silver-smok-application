<script lang="ts">
    import EditContactComponent from '../../EditContactComponent.svelte'
	import type { ActionData } from './$types';
    export let form: ActionData
</script>

<EditContactComponent contact={undefined} action='?/create' form={form}/>