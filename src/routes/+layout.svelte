<script>
	import './style.css'
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		flex: 1 1 auto;
	}
</style>