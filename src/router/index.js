import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('@/views/Homepage.vue'),
  },
  {
    path: '/:id',
    name: 'Redirect',
    component: () => import('@/views/Redirect.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
