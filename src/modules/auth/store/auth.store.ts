import {auth} from '@/shared/api/firebase'
import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const isLoading = ref(false)

    const isInitialized = ref(false)
    const isAuthenticated = computed(() => Boolean(user.value))

    async function login(email: string, password: string) {
        isLoading.value = true
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    async function register(email: string, password: string) {
        isLoading.value = true
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    function initAuth() {
        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser
            isInitialized.value = true
        })

    }

    return {
        user,
        isAuthenticated,
        isInitialized,
        isLoading,
        login,
        register,
        logout,
        initAuth
    }
})