import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('@/views/Homepage.vue'),
  },
  {
    path: '/404',
    name: 'Not Found',
    component: () => import('@/views/NotFound.vue'),
    meta: { statusCode: 404 },
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
