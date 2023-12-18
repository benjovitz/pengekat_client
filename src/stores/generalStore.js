import { readable, writable } from "svelte/store";
import { io } from "socket.io-client";


export const BASE_URL = readable("http://localhost:8080/")

export const GROUP_ID = writable("")

export const USER_ID = writable("")

export const socket = io("localhost:8080")