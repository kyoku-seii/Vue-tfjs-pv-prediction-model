import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AreaModel from '@/views/AreaModel'
import SingleModel from '@/views/SingleModel'
import Training from '@/views/Training'
import A from '@/views/A'
import B from '@/views/B'

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
    component: SingleModel,
    children: [
      {
        path: 'A',
        component: A
      },
      {
        path: 'B',
        component: B
      },
      {
        path: 'training',
        component: Training
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
