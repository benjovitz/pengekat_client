<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { USER_ID } from "../../stores/generalStore";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$USER_ID) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $USER_ID}
	<slot />
{/if}