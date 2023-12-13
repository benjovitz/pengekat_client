<script>
  import { onMount } from "svelte";
  import { groupId } from "../../stores/generalStore";
  import io from "socket.io-client"

    const socket = io("localhost:8080", {
        withCredentials: true
    })


  //chat, payment, overview of group members and balance
    
</script>

<h1>group name</h1>
<div>..., leave group, modify group, add member</div>
<div style="background-color: white; color: black;">CHAT, add expense/delete in the expense in the chat, send message</div>
<div>PAY if under 0</div>
