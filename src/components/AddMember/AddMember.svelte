<script>
    import { GROUP_ID, BASE_URL } from "../../stores/generalStore";

    let userToAdd

async function handleAddMember(){
    try {
      const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/members", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({members:[userToAdd]})
    }) 
    } catch (error) {
      
    }
  }
</script>

<div>
    <input bind:value={userToAdd} type="text" placeholder="brugernavn"> <br>
  <button on:click={handleAddMember}>tilføj medlem</button>
  </div>