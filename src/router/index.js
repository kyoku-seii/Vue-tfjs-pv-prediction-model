import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AreaModel from '@/views/AreaModel'
import SingleModel from '@/views/SingleModel'
import Training from '@/views/Training'
import Introduce from '@/views/Introduce'
import Demo from '@/views/Demo'
import DataIntroduce from '@/views/DataIntroduce'

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
        path: 'Introduce',
        component: Introduce
      },
      {
        path: 'Demo',
        component: Demo
      },
      {
        path: 'training',
        component: Training
      },
      {
        path: 'DataIntroduce',
        component: DataIntroduce
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    const token = localStorage.getItem('Token')
    if (token === null || token === '') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
