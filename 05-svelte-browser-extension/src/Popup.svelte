<script>
	let bgcolor = "red";

	function change() {
		// Set the color in local storage
		chrome.storage.local.set({ background: bgcolor });

		// Update the current tab
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, {message: "update_bgcolor"});
		});
	}
</script>

<main>
	<a href="./options.html">Go to options</a>
	<h1>Popup</h1>

	<div>
		background color: <input type="text" bind:value={bgcolor} />
		<button on:click={change}>Change</button>
	</div>
</main>

<style>
	h1 {
		color: red;
	}
	main {
		width: 450px;
	}
</style>