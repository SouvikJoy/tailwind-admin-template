import { createRouter, createWebHistory } from 'vue-router';
import useAuthUser from '@/composables/UseAuthUser';

import Profile from '@/views/Profile.vue';
import Products from '@/views/Products.vue';
import Categories from '@/views/Categories.vue';
import Services from '@/views/Services.vue';
import Test from '@/views/Test.vue';

const routes = [
  {
    name: 'EmailConfirmation',
    path: '/email-confirmation',
    component: () => import('@/pages/EmailConfirmation.vue'),
  },
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'Login',
    path: '/',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'ForgotPassword',
    path: '/forgotPassword',
    component: () => import('@/pages/ForgotPassword.vue'),
  },
  {
    name: 'Logout',
    path: '/logout',
    beforeEnter: async() => {
      const { logout } = useAuthUser();
      await logout();
      router.go();
      return { name: 'Home' };
    },
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/pages/Register.vue'),
  },
  {
    meta: {
      title: 'Test'
    },
    name: 'Test',
    path: '/test',
    component: () => import('@/views/Test.vue'),
  },
  {
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
    name: 'Profile',
    path: '/profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    meta: {
      title: 'Site Informations',
      requiresAuth: true,
    },
    name: 'SiteInfo',
    path: '/site-info',
    component: () => import('@/views/SiteInfo.vue'),
  },
  {
    meta: {
      title: 'Categories',
      requiresAuth: true,
    },
    name: 'Categories',
    path: '/categories',
    component: () => import('@/views/Categories.vue'),
  },
  {
    meta: {
      title: 'Edit Category',
      requiresAuth: true,
    },
    name: 'EditCategory',
    path: '/categories/:id',
    component: () => import('@/views/EditCategory.vue'),
    props: true
  },
  {
    meta: {
      title: 'Create Category',
      requiresAuth: true,
    },
    name: 'CreateCategory',
    path: '/create-category',
    component: () => import('@/views/CreateCategory.vue'),
  },
  {
    meta: {
      title: 'Products',
      requiresAuth: true,
    },
    name: 'Products',
    path: '/products',
    component: () => import('@/views/Products.vue'),
  },
  {
    meta: {
      title: 'Edit Product',
      requiresAuth: true,
    },
    name: 'EditProduct',
    path: '/products/:id',
    component: () => import('@/views/EditProduct.vue'),
    props: true
  },
  {
    meta: {
      title: 'Create Product',
      requiresAuth: true,
    },
    name: 'CreateProduct',
    path: '/create-product',
    component: () => import('@/views/CreateProduct.vue'),
  },
  {
    meta: {
      title: 'Services',
      requiresAuth: true,
    },
    name: 'Services',
    path: '/services',
    component: () => import('@/views/Services.vue'),
  },
  {
    meta: {
      title: 'Edit Service',
      requiresAuth: true,
    },
    name: 'EditService',
    path: '/services/:id',
    component: () => import('@/views/EditService.vue'),
    props: true
  },
  {
    meta: {
      title: 'Create Service',
      requiresAuth: true,
    },
    name: 'CreateService',
    path: '/create-service',
    component: () => import('@/views/CreateService.vue'),
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    name: 'error',
    path: '/error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes('fromEmail')
  ) {
    return { name: 'Login' };
  }
});

export default router;
