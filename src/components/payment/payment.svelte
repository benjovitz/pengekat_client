<script>
import { GROUP_ID, BASE_URL } from "../../stores/generalStore";

async function handlePayment(){
    const response = await fetch(`${$BASE_URL}api/groups/${$GROUP_ID}/pay`, {
        credentials: "include"
    })
    const result = await response.json()
}

</script>


<div on:click={handlePayment} class="payment-btn">
    <span>Betal</span>
</div>