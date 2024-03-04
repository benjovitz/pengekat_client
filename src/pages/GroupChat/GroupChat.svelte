<script>
  import { onMount } from "svelte";
  import { GROUP_ID, BASE_URL, USER_ID} from "../../stores/generalStore";
  import Modal from "../../components/Modal/Modal.svelte";
  import toast, {Toaster} from "svelte-french-toast"
  import ChatMessage from "../../components/ChatMessage/ChatMessage.svelte";
  import MemberCard from "../../components/MemberCard/MemberCard.svelte";
  import { socket } from "../../stores/generalStore";
  import ExpenseShare from "../../components/ExpenseShare/ExpenseShare.svelte";
  import AddMember from "../../components/AddMember/AddMember.svelte";
  import ModifyGroup from "../../components/ModifyGroup/ModifyGroup.svelte"
  import LeaveGroup from "../../components/LeaveGroup/LeaveGroup.svelte";
  import Payment from "../../components/Payment/Payment.svelte";

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
   
  let group = {}
  let members = []
  let message = ""
  let messages = []
  let showModal = false
 
  async function handleSendMessage(){
    try {
      if(!message){
        toast.error("Indtast venligst en besked")
        return
      }
      await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/messages", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({comment: message})
    })  
    socket.emit("message-from-client", {groupId: $GROUP_ID, comment: message, _userId: $USER_ID})
    message = ""
    } catch (error) {
      toast.error(error)
    }
  }

  socket.emit("join-room", $GROUP_ID)

  socket.on("update-group", (response) => {
    
    members = response.data.members
  })

  socket.on("update-messages", (response) =>{
    messages = messages.filter((message) => message._id !== response.data)
  })

  socket.on("new-message", (response) =>{
    messages = [...messages, response.data]
  })
</script>

<h1 on:click={() => (showModal = true)} class="group-name">{group.group_name}</h1>

<section class="grid-3">
<section>
  {#each members as member }
  <MemberCard member={member} />
  {/each}
</section>
 
<section class="chat-section" style="background-image: url({group.image}); background-size: cover;">
{#each messages as message}
  <ChatMessage message={message} />
{/each}
</section> 

<Payment />

</section>
<section class="grid-3">
  <div></div>
<div class="message-and-send">
  <input bind:value={message} type="text" class="chat-input" placeholder="message...">
  <button on:click={handleSendMessage} class="send-button">send</button>
</div>
</section>

<Modal bind:showModal={showModal}>
  <h2 slot="header">Muligheder</h2>
  <section class="settings-modal">
    <ExpenseShare members={members}/> 
    <AddMember />
    <LeaveGroup />
    <ModifyGroup />
  </section>  
</Modal>
<Toaster />