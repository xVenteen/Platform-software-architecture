import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/Login/Login.vue') // 这是路由的籁加载，也可以其他方式
        },
        {
            path: '/Login',
            component: () => import('../views/Login/Login.vue') // 这是路由的籁加载，也可以其他方式
        },
        {
            path: '/Home',
            name: 'Home',
            component: () => import('../views/Home/Home.vue'),
            children: [
                {
                    path: '/Home',
                    component: () => import('../views/MainPages/AllStatus/AllStatus.vue'),

                },
                {
                    path: '/Home/AllStatus',
                    component: () => import('../views/MainPages/AllStatus/AllStatus.vue')
                },
                {
                    path: '/Home/DailyData',
                    component: () => import('../views/MainPages/DailyData/DailyData.vue')
                },
                {
                    path: '/Home/SharedDocumentQuery',
                    component: () => import('../views/MainPages/SharedDocumentQuery/SharedDocumentQuery.vue')
                },
                {
                    path: '/Home/Azkaban',
                    component: () => import('../views/MainPages/Azkaban/Azkaban.vue')
                },
                {
                    path: '/Home/SpecialTopic',
                    component: () => import('../views/MainPages/SpecialTopic/SpecialTopic.vue')
                },
                {
                    path: '/Home/Metadata',
                    component: () => import('../views/MainPages/Metadata/Metadata.vue')
                }
            ]
        }
    ]
})

export default router;