<script>
    import { BASE_URL, GROUP_ID } from "../../stores/generalStore";
    import toast from "svelte-french-toast";
      async function handleLeaveGroup(){
    try {
      const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/leave", {
      credentials: "include"
    })
    const result = await response.json()
    if(response.status === 400){
      toast.error(result.data)
      return
    }
    toast.success(result.data)

    } catch (error) {
      toast.error(error)
    }
  }
</script>

<div>
    <button on:click={handleLeaveGroup}>forlad gruppe</button>
  </div>