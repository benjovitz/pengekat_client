<script>
import { GROUP_ID, BASE_URL } from "../../stores/generalStore";
import Modal from "../Modal/Modal.svelte";
import toast, { Toaster} from "svelte-french-toast";

async function handlePayment(){
    const response = await fetch(`${$BASE_URL}api/groups/${$GROUP_ID}/pay`, {
        credentials: "include"
    })
    const result = await response.json()

}
async function prePaymentCheck(){
    const response = await fetch(`${$BASE_URL}api/groups/${$GROUP_ID}/expenses`, {
        credentials: "include"
    })
    const result = await response.json()
    if(!response.ok){
        toast.error(result.data)
        return
    }
    members = result.data.members
    showModal = true
    
}

let members = []
let showModal = false

</script>


<div on:click={prePaymentCheck} class="payment-btn">
    <span>Betal</span>
</div>
<Toaster />

<Modal bind:showModal={showModal} >
<h3>Du skylder:</h3>
<ul>
   { #each members as member }
   <li>{member.username}: {member.slice}</li>
   {/each} 
</ul>
<button on:click={handlePayment}>Betal</button>
</Modal>