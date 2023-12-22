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
   
  let group = {}
  let members = []
  let message
  let messages = []
  let showModal = false
  let equalShare = true
  let amount
  let currency 
  let comment = ""


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

  async function handleAddExpense(){
    if(!amount || amount <= 0 || !Number(amount)){
      toast.error("Indtast venligt et korrekt beløb at dele")
      return
    }
    try {
      
      const shareOverview = []
      if(!equalShare){

      } else {
        members.map(member => {
          shareOverview.push({userId: member._userId, share: amount / members.length})
        })
      }
      const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/expense", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({amount, currency, comment, shareOverview})
    })  
    } catch (error) {
      
    }
  }




  socket.emit("join-room", $GROUP_ID)

  socket.on("update-balance", (response) => {
    members = response.data.members
  })

  socket.on("update-messages", (response) =>{
    messages = response.data
  })
</script>

<h1 on:click={() => (showModal = true)} class="group-name">{group.group_name}</h1>

<section class="grid-3">
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
<section class="grid-3">
  <div></div>
<div class="message-and-send">
  <input type="text" class="chat-input" placeholder="message...">
  <button class="send-button">send</button>
</div>
</section>

<Modal bind:showModal={showModal}>
  <h2 slot="header">Muligheder</h2>
  <section class="grid-3">
    <div>
      <input bind:value={amount} type="number" placeholder="beløb">
      <select bind:value={currency} name="currency" id="currency">
        <option value="DKK">Danish Krone (DKK)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="USD">US Dollar (USD)</option>
        <option value="JPY">Japanese Yen (JPY)</option>
        <option value="BGN">Bulgarian Lev (BGN)</option>
        <option value="CZK">Czech Republic Koruna (CZK)</option>
        <option value="GBP">British Pound Sterling (GBP)</option>
        <option value="HUF">Hungarian Forint (HUF)</option>
        <option value="PLN">Polish Zloty (PLN)</option>
        <option value="RON">Romanian Leu (RON)</option>
        <option value="SEK">Swedish Krona (SEK)</option>
        <option value="CHF">Swiss Franc (CHF)</option>
        <option value="ISK">Icelandic Króna (ISK)</option>
        <option value="NOK">Norwegian Krone (NOK)</option>
        <option value="HRK">Croatian Kuna (HRK)</option>
        <option value="RUB">Russian Ruble (RUB)</option>
        <option value="TRY">Turkish Lira (TRY)</option>
        <option value="AUD">Australian Dollar (AUD)</option>
        <option value="BRL">Brazilian Real (BRL)</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="CNY">Chinese Yuan (CNY)</option>
        <option value="HKD">Hong Kong Dollar (HKD)</option>
        <option value="IDR">Indonesian Rupiah (IDR)</option>
        <option value="ILS">Israeli New Sheqel (ILS)</option>
        <option value="INR">Indian Rupee (INR)</option>
        <option value="KRW">South Korean Won (KRW)</option>
        <option value="MXN">Mexican Peso (MXN)</option>
        <option value="MYR">Malaysian Ringgit (MYR)</option>
        <option value="NZD">New Zealand Dollar (NZD)</option>
        <option value="PHP">Philippine Peso (PHP)</option>
        <option value="SGD">Singapore Dollar (SGD)</option>
        <option value="THB">Thai Baht (THB)</option>
        <option value="ZAR">South African Rand (ZAR)</option>
        </select> <br>
        <input bind:value={comment} type="text" placeholder="kommentar"> <br>
        <span>Lige fordeling</span>
        <input bind:checked={equalShare} type="checkbox"> <br>
        {#if !equalShare}
          {#each members as member }
          <span>{member.username}</span>
          <input type="number"> <br>
          {/each} 
        {/if}
        
      <button on:click={handleAddExpense}>add expense</button>
    </div>
  
  <button>add member</button>
  <button on:click={handleLeaveGroup}>leave group</button>
  </section>  
</Modal>
 

<Toaster />