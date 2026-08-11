import {createRouter, createWebHistory, type RouteComponent} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', component: (): RouteComponent => import('@/layouts/DefaultLayout.vue'),
            children: [
                {
                    path: '', component: (): RouteComponent => import('@/modules/dashboard/views/DashboardView.vue')
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
            path: '/auth', component: (): RouteComponent => import('@/layouts/AuthLayout.vue'),
            children: [
                {
                    path: 'login', component: (): RouteComponent => import('@/modules/auth/views/LoginView.vue')
                },
                {
                    path: 'register', component: (): RouteComponent => import('@/modules/auth/views/RegisterView.vue')
                }
            ]
        },
    ],
})

export default router