import { createRouter, createWebHistory } from 'vue-router';
import url from './url';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/views/layout/layout.vue'),
			meta: { auth: true },
			redirect: url.home,
			children: [
				{
					...url.home,
					component: () => import('@/views/home/home.vue')
				},
				{
					...url.dialog,
					component: () => import('@/views/dialog/dialog.vue')
				}
			]
		},
		{
			// 403 頁面
			...url.unauthorized,
			component: () => import('@/views/error/unauthorized.vue')
		},
		{
			// 404 頁面
			...url.notFound,
			component: () => import('@/views/error/not-found.vue')
		}
	]
});

export default router;
