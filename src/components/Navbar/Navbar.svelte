<script>
    import { USER_ID } from "../../stores/generalStore";
    import { Link } from "svelte-navigator";
</script>

<header>
    <nav class="nav">
        {#if $USER_ID}
            <Link to="groups">Pengekatte </Link>
            <Link to="signOut">Log ud </Link>
        {:else}
            <Link to="login">Login</Link>
        {/if}
    </nav>
</header>