<script>
  import { onMount } from "svelte";
    import { BASE_URL, GROUP_ID } from "../../stores/generalStore";
    import Currencies from "../Currencies/Currencies.svelte";
    import toast from "svelte-french-toast";
    export let members = []
    let amount = 0
    let equalShare = true
    let currency
    let comment = ""


    async function handleAddExpense(){
    if(!amount || amount <= 0 || !Number(amount)){
      toast.error("Indtast et deleligt beløb")
      return
    }
    if(!equalShare && amount - members.reduce((accumulator, member) => accumulator + member.share, 0) !== 0) {
      toast.error("beløb ikke delt helt op")
      return
    }
    try {
      
      const shareOverview = []
      if(!equalShare){
        members.map(member => {
          shareOverview.push({userId: member._userId, share: member.share})
        })
      } else {
        members.map(member => {
          shareOverview.push({userId: member._userId, share: amount / members.length})
        })
      }
      const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/expenses", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({amount, currency, comment, shareOverview})
    })  
    members.map(member => member.share = 0)
    } catch (error) {
      
    }
  }
</script>

<div>
    <input bind:value={amount} type="number" placeholder="beløb">
    <select bind:value={currency} name="currency" id="currency">
      <Currencies />
      </select> <br>
      <input bind:value={comment} type="text" placeholder="kommentar"> <br>
      <span>Lige fordeling</span>
      <input bind:checked={equalShare} type="checkbox"> <br>
      {#if !equalShare}
      <div>Mangler: {amount - members.reduce((accumulator, member) => accumulator + member.share, 0)}</div>
        {#each members as member, i}
        <span>{member.username}</span> <br>
        <input  type="number" bind:value={members[i].share}> <br> 
        {/each} 
      {/if}
      
    <button on:click={handleAddExpense}>tilføj betaling</button>
  </div> 