import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Tasks from '@/components/tasks'
import Out from '@/components/out'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!Out.checkAuth()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
  },
  {
      path: '/',
      name: 'Tasks',
      component: Tasks,
      beforeEnter: requireAuth
  }
  ]
})
