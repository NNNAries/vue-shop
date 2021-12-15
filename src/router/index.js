import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        component: () => import('../views/Layout/Content/Home/home.vue')
      },
      {
        path: '/goods',
        component: () => import('../views/Layout/Content/Goods/goods.vue')
      },
      {
        path: '/addGoods',
        component: () => import('../views/Layout/Content/Goods/addGoods.vue')
      },
      {
        path: '/adv',
        component: () => import('../views/Layout/Content/Adv/adv.vue')
      },
      {
        path: '/params',
        component: () => import('../views/Layout/Content/Params/params.vue'),
        redirect: '/params/specs',
        children: [
          {
            path: 'specs',
            component: () => import('../views/Layout/Content/Params/Specs/specs.vue')
          }
        ]
      },
      {
        path: '/order',
        component: () => import('../views/Layout/Content/Order/order.vue'),
        redirect: '/order/order-list',
        children: [
          {
            path: 'order-list',
            component: () => import('../views/Layout/Content/Order/list.vue')
          },
          {
            path: 'order-back',
            component: () => import('../views/Layout/Content/Order/back.vue')
          }
        ]
      },
      {
        path: '/self',
        component: () => import('../views/Layout/Content/Self/self.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 判断是否需要登录
  if (to.matched.some(ele => ele.meta.isLogin)) {
    // 判断是否已登录
    let token = store.state.userModule.userInfo.token;
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next()
  }

})

export default router
