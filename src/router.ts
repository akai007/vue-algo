import { createRouter, createWebHistory } from "vue-router";

import Index from '@/pages/ArrayList/index.vue';

const routes = [
  { name:'index', path: '/', component: Index },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;