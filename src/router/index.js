import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AreaModel from '@/views/AreaModel'
import SingleModel from '@/views/SingleModel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/AreaModel',
    name: 'AreaModel',
    component: AreaModel
  }, {
    path: '/SingleModel',
    name: 'SingleModel',
    component: SingleModel
  }
]

const router = new VueRouter({
  routes
})

export default router
