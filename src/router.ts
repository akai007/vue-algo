import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

type PagesRoute = RouteRecordRaw & {
  meta?: {
    title: String,
  }
}

import Index from '@/pages/ArrayList/index.vue';

const routes: PagesRoute[] = [
  { name:'index', path: '/', redirect: '/arrayList' },
  { name:'ArrayList', path: '/arrayList', component: Index, meta: {title: 'ArrayList'} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;