 <script>
  import {Router, Link, Route} from "svelte-navigator"
  import Login from "./pages/Login/Login.svelte";
  import PrivateRoute from "./pages/PrivateRoute/PrivateRoute.svelte";
  import { USER_ID } from "./stores/generalStore";
  import toast, {Toaster} from "svelte-french-toast";
  import Contact from "./pages/Contact/Contact.svelte";
  import SignUp from "./pages/SignUp/SignUp.svelte";
  import Forgot from "./pages/Forgot/Forgot.svelte";
  import Groups from "./pages/Groups/Groups.svelte";
  import GroupChat from "./pages/GroupChat/GroupChat.svelte";

  async function handleLogout() {
		$USER_ID = null;
      await fetch("http://localhost:8080/auth/logout",{
            credentials: "include"
        })
	}

</script>


<Router>
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

  <main>
    <Route path="/" >
    <h1>HOME</h1>
    </Route>
		<Route path="login">
			<Login />
		</Route>
    <PrivateRoute path="signOut">
      <button on:click={handleLogout}>Log ud</button>
    </PrivateRoute>
    
    <Route path="signup">
      <SignUp />
    </Route>

		<Route path="contact">
			<Contact />
		</Route>
    <Route path="forgot">
      <Forgot />
    </Route>
    
  <PrivateRoute path="groups" let:location >
    <Groups />
  </PrivateRoute>
  <PrivateRoute path="groupChat" let:location >
    <GroupChat />
  </PrivateRoute>


  </main>
</Router>
<Toaster />