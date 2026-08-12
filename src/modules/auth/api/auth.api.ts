import {auth} from "@/shared/api/firebase.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
}

async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
}

async function logout() {
    await signOut(auth)
}

export default {login, register, logout}