import Vue from 'vue'
import VueRouter from 'vue-router'
import InvitadosView from '../views/InvitadosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: InvitadosView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  },
  {
    path: '/detallesEvento/:id',
    name: 'detallesEvento',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetalleEventoView.vue')
  },
  {
    path: '/empresas',
    name: 'empresas',
    component: () => import(/* webpackChunkName: "about" */ '../views/EmpresasView.vue')
  },
  {
    path: '/detallesEmpresa/:id',
    name: 'detallesEmpresa',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetalleEmpresaView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
