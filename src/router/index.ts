import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Vehicle from '@/views/Vehicle.vue'
import Orders from '@/views/Orders.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/vehicle', name: 'Vehicle', component: Vehicle, meta: { requiresAuth: true } },
    { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } },
    { path: '/order-detail/:id', name: 'OrderDetail', component: OrderDetail, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/home')
  } else {
    next()
  }
})

export default router
