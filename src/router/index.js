import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import url from './url';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/views/layout/layout.vue'),
			redirect: url.home,
			children: [
				{
					...url.home,
					component: () => import('@/views/home/home.vue')
				},
				{
					...url.dialog,
					component: () => import('@/views/dialog/dialog.vue')
				},
				{
					...url.carousel,
					component: () => import('@/views/carousel/carousel.vue')
				},
				{
					...url.picker,
					component: () => import('@/views/picker/picker.vue')
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
