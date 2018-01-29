// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import i18n from './i18n/i18n';
import axios from 'axios'
import filter from './filter/filter'  //定义全局过滤器
import directive from './directive/directive'  //自定义全局指令

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;

const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (router.options.routes[1].meta.requireAuth) {
        let token = window.localStorage.getItem('userInfo');
        if (token == null || token == "" || token == undefined) {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next('/login');
            }
        } else {
          next()
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: {App},
    template: '<App/>'
})
