import {createRouter, createWebHistory, type RouteComponent} from 'vue-router'
import {useAuthStore} from "@/modules/auth/store/auth.store.ts";
import {storeToRefs} from "pinia";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', component: (): RouteComponent => import('@/layouts/DefaultLayout.vue'),
            meta: {requiresAuth: true},
            children: [
                {
                    path: '', component: (): RouteComponent => import('@/modules/dashboard/views/DashboardView.vue'),
                },
                {
                    path: 'interviews',
                    component: (): RouteComponent => import('@/modules/interviews/views/InterviewsView.vue')
                },
                {
                    path: 'consultations',
                    component: (): RouteComponent => import('@/modules/consultations/views/ConsultationsView.vue')
                },
            ]
        },

        {
            path: '/auth',
            component: (): RouteComponent => import('@/layouts/AuthLayout.vue'),
            meta: {
                guestOnly: true,
            },
            children: [
                {
                    path: 'login',
                    component: (): RouteComponent => import('@/modules/auth/views/LoginView.vue')
                },
                {
                    path: 'register', component: (): RouteComponent => import('@/modules/auth/views/RegisterView.vue')
                }
            ]
        },
    ],
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    const {initAuth} = authStore
    const {isInitialized, isAuthenticated} = storeToRefs(authStore)

    if (!isInitialized.value) {
        await initAuth()
    }

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return {
            path: '/auth/login',
        }
    }

    if (to.meta.guestOnly && isAuthenticated.value) {
        return {
            path: '/',
        }
    }
})

export default router