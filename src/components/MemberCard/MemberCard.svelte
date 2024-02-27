<script>
    export let member
</script>

<div class="member-card">
    <span>{member.username}</span> <br>
    <span class:amount-negative={member.balance < 0}
    class:amount-positive={member.balance >= 0}
    >{member.balance}
</span></div>