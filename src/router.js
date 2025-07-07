import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },

  // {path: '/profile/:creatorId',
  //   name: 'Profile Page',
  //   component: loadPage('ProfilePage'),
  // },

  {
  path: '/profile',
  name: 'Profile Page',
  component: loadPage('ProfilePage')
  },

  {
    path: '/posts/:id?', 
    name: 'PostDetails', 
    component: loadPage('ProfilePage')
  },
  

]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
