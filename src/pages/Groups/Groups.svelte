<script>
    import GroupCard from "../../components/GroupCard/GroupCard.svelte";
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/generalStore";
    import Modal from "../../components/Modal/Modal.svelte";

    let showModal = false
    let groups = []
    let groupName = ""
    onMount(async() => {
        const response = await fetch($BASE_URL + "api/groups", {
            credentials: "include"
        })
        const result = await response.json()
        groups = result.data
    })

    async function handleCreateGroup(){
    try {
      const response = await fetch($BASE_URL + "api/groups/", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({groupName})
    }) 
    } catch (error) {
      
    }
  }
</script>

<h1>Dine Pengekatte</h1>
<button on:click={() => (showModal = true)}>Ny gruppe</button>
<section class="grid-3">
{#each groups as group }
    <GroupCard {group} />
{/each}
</section>

<Modal bind:showModal >
<h2 slot="header">Ny gruppe</h2>
<input bind:value={groupName} type="text" placeholder="gruppe navn"> <br>
<button on:click={handleCreateGroup}>Opret gruppe</button>
</Modal>