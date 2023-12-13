<script>
    import { navigate } from "svelte-navigator";
    import { groupId } from "../../stores/generalStore";
    export let group

    function navigateToChat(){
        groupId.set(group._id)
        navigate("groupChat")
    }
</script>


<group-card on:click={navigateToChat}>
    <div class="background-div">
        <h1 
        class:negative={group.members[0].balance < 0}
        class:positive={group.members[0].balance >= 0}
        >{group.members[0].balance}</h1>
    </div>
    <h2 style="color: black;">{group.group_name}</h2>
</group-card>

<style>
    group-card{
        display: grid;
        grid-template-rows: 1fr 1fr;
        border-radius: 25px;
        background-color: beige;
        min-width: 400px;
        transition: transform 0.3s ease;
    }
    group-card:hover{
        transform: scale(1.1);
        cursor: pointer;
    }
    .background-div{
        background-image: url("https://media.cntraveler.com/photos/590a352ca71e701c036ce1e1/master/pass/thai-islands-ko-samui-GettyImages-171623188.jpg");
        background-size: cover;
        border-radius: 25px 25px 0 0;
    }
    .negative{
        color: red;
    }
    .positive{
        color: #118C4F;
    }
</style>