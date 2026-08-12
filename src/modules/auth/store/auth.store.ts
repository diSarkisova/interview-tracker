import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {onAuthStateChanged, type User} from 'firebase/auth'
import AuthApi from "@/modules/auth/api/auth.api.ts";
import {auth} from '@/shared/api/firebase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const isLoading = ref(false)

    const isInitialized = ref(false)
    const isAuthenticated = computed(() => Boolean(user.value))

    let isAuthListenerStarted = false

    async function loginUser(email: string, password: string) {
        isLoading.value = true
        try {
            await AuthApi.login(email, password)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    async function registerUser(email: string, password: string) {
        isLoading.value = true
        try {
            await AuthApi.register(email, password)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    async function logoutUser() {
        isLoading.value = true
        try {
            await AuthApi.logout()
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    async function initAuth() {
        if (!isAuthListenerStarted) {
            onAuthStateChanged(auth, (firebaseUser) => {
                user.value = firebaseUser
            })

            isAuthListenerStarted = true
        }

        await auth.authStateReady()

        user.value = auth.currentUser
        isInitialized.value = true
    }

    return {
        user,
        isAuthenticated,
        isInitialized,
        isLoading,

        loginUser,
        registerUser,
        logoutUser,
        initAuth
    }
})