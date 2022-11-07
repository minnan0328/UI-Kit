import { createRouter, createWebHistory } from 'vue-router';
import url from './uri';

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
	]
});

export default router;
