import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login'
import Main from '@/view/main/main'
import Page1 from '@/view/table/page1'
import Page2 from '@/view/table/page2'
import Page3 from '@/view/table/page3'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            meta: {
                requireAuth: true
            },
            component: Main
        },
        {
            path: '/main',
            meta: {
                requireAuth: true
            },
            component: Main,
            children: [
                {
                    path: '/main/page1',
                    component: Page1
                },
                {
                    path: '/main/page2',
                    component: Page2
                },
                {
                    path: '/main/page3',
                    component: Page3
                }
            ]
        }

    ]
})
