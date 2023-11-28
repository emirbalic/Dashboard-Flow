import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// needed for skeleton
import Default from '@/components/default/Default.vue'
import MainLayout from '@/components/MainLayout.vue'
// import Dashboard from '@/components/dashboard/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',
    redirect: '/default',
    children: [
      {
        path: '/default',
        name: 'default',
        component: Default,
        props: {},
        // meta: { product: 'dashboard' },
        // beforeEnter: (to: any, from: any, next: any) => {
        //   const isAdmin = getFromStore('auth.isAdmin');
        //   if (isAdmin) {
        //     next();
        //   } else {
        //   }
        // },
      },
    ],
  },

  // needed for skeleton
  // {
  //   path: '/',
  //   name: 'Default',
  //   component: Default
  // },


  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
