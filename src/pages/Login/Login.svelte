<script>
	import  { useNavigate, useLocation, navigate } from "svelte-navigator";
	import { USER_ID } from "../../stores/generalStore";
    import toast, {Toaster} from "svelte-french-toast"
	const useNavigation = useNavigate();
	const location = useLocation();

    
    
	let username;
	let password;

    async function signIn(){
        const response = await fetch("http://localhost:8080/auth/signIn",{
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const result = await response.json()
            if(!response.ok){
                toast.error(result.data)
        } else {
            toast.success(result.data.message)
            USER_ID.set(result.data.userId);
		    useNavigation("/groups", { replace: true });
        } 
    }
    
</script>

<h1>Log ind</h1>
<input bind:value={username} type="text" placeholder="username"> <br>
<input bind:value={password} type="password" placeholder="password"><br>
<button on:click={signIn}>Login</button>
<button on:click={() => navigate("signup")}>Opret</button> <br>
<img src="../public/gatekeeper.png">


<Toaster />