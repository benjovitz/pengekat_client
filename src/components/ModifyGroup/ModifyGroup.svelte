<script>
    import { BASE_URL, GROUP_ID } from "../../stores/generalStore";
    let groupName

    async function handleModifyGroup(){
    const formData = new FormData()
    formData.append("image", document.getElementById("groupPhotoFile").files[0])
    if(groupName){
      formData.append("groupName", groupName)
    }
    try {
      const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID, {
        credentials: "include",
        method: "PATCH",
        body: formData
      })
    } catch (error) {
      
    }
  }
</script>

<div>
    <input bind:value={groupName} type="text" placeholder="gruppenavn">
    <input id="groupPhotoFile"style="margin-left: 4.3rem;" type="file" accept="image/*">
   
    <button on:click={handleModifyGroup}>gem ændringer</button>
  </div>