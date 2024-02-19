<script>
    import { navigate } from "svelte-navigator";
    import { GROUP_ID } from "../../stores/generalStore";
    import { socket } from "../../stores/generalStore";
    export let group

    function navigateToChat(){
        if($GROUP_ID){
            socket.emit("leave-room", $GROUP_ID)
        }
        GROUP_ID.set(group._id)
        navigate("groupChat")
    }
</script>


<section class="group-card" on:click={navigateToChat}>
    {#if !group.image}
    <div class="background-div">
        <h1 
        class:negative={group.members[0].balance < 0}
        class:positive={group.members[0].balance >= 0}
        >{group.members[0].balance}</h1>
    </div>
    {:else}
    <div class="background-div" style="background-image: url({group.image});">
        <h1 
        class:negative={group.members[0].balance < 0}
        class:positive={group.members[0].balance >= 0}
        >{group.members[0].balance}</h1>
    </div>
    {/if}
    
    
    <h2 style="color: black;">{group.group_name}</h2>
</section>
