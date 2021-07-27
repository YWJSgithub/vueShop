import Vue from 'vue'
import Router from 'vue-router'

// import Login from './components/Login.vue'
// import Home from './components/Home.vue'
// import Welcome from './components/Welcome.vue'
const Login = () => import(/* webpackChunkName: "login-home-welcom" */ './components/Login.vue')
const Home = () => import(/* webpackChunkName: "login-home-welcom" */ './components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login-home-welcom" */ './components/Welcome.vue')

// import User from './components/user/Users.vue'
// import Rights from './components/power/Rights.vue'
// import Roles from './components/power/Roles.vue'
const User = () => import(/* webpackChunkName: "user-rights-roles" */ './components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "user-rights-roles" */ './components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "user-rights-roles" */ './components/power/Roles.vue')


// import Cate from './components/goods/Cate.vue'
// import Params from './components/goods/Params.vue'
const Cate = () => import(/* webpackChunkName: "cate-params" */ './components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "cate-params" */ './components/goods/Params.vue')

// import GoodsList from './components/goods/List.vue'
// import GoodsAdd from './components/goods/Add.vue'
const GoodsList = () => import(/* webpackChunkName: "goodslist-add" */ './components/goods/List.vue')
const GoodsAdd = () => import(/* webpackChunkName: "goodslist-add" */ './components/goods/Add.vue')


// import Order from './components/order/Order.vue'
// import Report from './components/report/Report.vue'
const Order = () => import(/* webpackChunkName: "order-report" */ './components/order/Order.vue')
const Report = () => import(/* webpackChunkName: "order-report" */ './components/report/Report.vue')

// import Three from './components/mytest/Three.vue'
const Three = () => import(/* webpackChunkName: "three" */ './components/mytest/Three.vue')
Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: User },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Cate },
                { path: '/params', component: Params },
                { path: '/goods', component: GoodsList },
                { path: '/goods/add', component: GoodsAdd },
                { path: '/orders', component: Order },
                { path: '/reports', component: Report },
                { path: '/three', component: Three },
            ]
        }

    ]
});
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login') //强制跳转到login页面
    next();
})
export default router