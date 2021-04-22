<script>
	let count = 0;

	function sum() {
			count++;
	}
</script>

<main>
	<a href="./popup.html">Go to popup</a>
	<h1>Options</h1>

	<p>Counter: {count}</p>
	<button on:click={sum}> + </button>
</main>

<style>
	h1 {
		color: blue;
	}
	main {
		width: 450px;
	}
</style>