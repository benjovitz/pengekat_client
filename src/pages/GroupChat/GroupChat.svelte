<script>
  import { onMount } from "svelte";
  import { GROUP_ID, BASE_URL } from "../../stores/generalStore";
  import Modal from "../../components/Modal/Modal.svelte";
  import toast, {ToastBar, Toaster} from "svelte-french-toast"
  import ChatMessage from "../../components/ChatMessage/ChatMessage.svelte";
  import MemberCard from "../../components/MemberCard/MemberCard.svelte";
  import { socket } from "../../stores/generalStore";

  onMount(async() => {
    const messagesResponse = await getMessages()
    const groupResponse = await getGroupInfo()
    group = groupResponse.data
    messages = messagesResponse.data
    members = groupResponse.data.members
  })

  async function getMessages(){
    const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/messages", {
      credentials: "include"
    })
    const result = await response.json()
    return result
  }

  async function getGroupInfo(){
    const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID, {
      credentials: "include"
    })
    const result = await response.json()
    return result
  }

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
   showModal = false
  }


 
  let group = {}
  let members = []
  let message
  let messages = []
  let showModal = false

  socket.emit("join-room", $GROUP_ID)

  socket.on("update-balance", (response) => {
    members = response.data.members
  })

  socket.on("update-messages", (response) =>{
    messages = response.data
  })
</script>

<h1 on:click={() => (showModal = true)} class="group-name">{group.group_name}</h1>

<section class="input-section">
<section>
  {#each members as member }
  <MemberCard member={member} />
  {/each}
</section>

<section class="chat-section">
{#each messages as message}
  <ChatMessage message={message} />
{/each}
</section> 

<div>Paypal payment</div>

</section>
<section class="input-section">
  <div></div>
<div class="message-and-send">
  <input type="text" class="chat-input" placeholder="message...">
  <button class="send-button">send</button>
</div>
</section>

<Modal bind:showModal={showModal}>
  <h2 slot="header">Settings</h2>
  <button>add expense</button> <br>
  <button>add member</button> <br>
  <button on:click={handleLeaveGroup}>leave group</button>
</Modal>

<Toaster />