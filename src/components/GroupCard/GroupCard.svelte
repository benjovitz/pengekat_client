<script>
    import { navigate } from "svelte-navigator";
    import { GROUP_ID } from "../../stores/generalStore";
    export let group

    function navigateToChat(){
        GROUP_ID.set(group._id)
        navigate("groupChat")
    }
</script>


<section class="group-card" on:click={navigateToChat}>
    <div class="background-div">
        <h1 
        class:negative={group.members[0].balance < 0}
        class:positive={group.members[0].balance >= 0}
        >{group.members[0].balance}</h1>
    </div>
    <h2 style="color: black;">{group.group_name}</h2>
</section>
