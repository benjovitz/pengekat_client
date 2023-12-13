<script>
    import GroupCard from "../../components/GroupCard/GroupCard.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/generalStore";

    let groups = []
    onMount(async() => {
        const response = await fetch($BASE_URL + "api/groups", {
            credentials: "include"
        })
        const result = await response.json()
        groups = result.data
    })
</script>

<h1>Dine Pengekatte</h1>
<section class="group-section">
{#each groups as group }
    <GroupCard {group} />
{/each}
</section>



<style>
    .group-section{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>