<script>
    import { USER_ID, BASE_URL, GROUP_ID } from "../../stores/generalStore";
    import toast, {Toaster} from "svelte-french-toast";
    import Modal from "../../components/Modal/Modal.svelte";

    export let message
    let showModal = false

    async function handleDeleteExpense(){
        try {
            const response = await fetch($BASE_URL + "api/groups/" + $GROUP_ID + "/expenses", {
                credentials: "include",
                method: "DELETE",
                body: JSON.stringify({expenseId: message._id}),
                headers: {
                "content-type": "application/json"
                    },
                })
                const result = await response.json()
                toast.success(result.data)
        } catch (error) {
            toast.error(error)
        }
    }
</script>

{#if !message.amount}
<div 
class:message-from-other={message._userId !== $USER_ID}
class:message-from-user={message._userId === $USER_ID}
>
<span>{message.comment}</span>
</div> 
{:else if message._userId !== $USER_ID}
<div class="expense-from-other">
    <span><b>{message.comment}</b></span> <br> 
    <span class="amount">{message.original_amount || message.amount} {message.currency}</span>
    </div>
{:else}
<div on:click={() => (showModal = true)}
class="expense-from-user">
<span><b>{message.comment}</b></span> <br>
<span class="amount">{message.original_amount || message.amount} {message.currency}</span>
</div>
{/if}

<Modal bind:showModal > 
    <h2 slot="header">slet udgift</h2>
    <button on:click={handleDeleteExpense}>slet udgift</button>
</Modal>

<Toaster />