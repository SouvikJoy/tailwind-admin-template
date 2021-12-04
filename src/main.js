import { createApp as createVueApp } from 'vue';

import plugins from '@/plugins';

import 'mosha-vue-toastify/dist/style.css';

import App from './App.vue';
import router from './router';
import store from './store';
import { darkModeKey } from '@/config.js';

import './assets/main.pcss';

/* Dark mode */
const localStorageDarkModeValue = localStorage.getItem(darkModeKey);

if ((localStorageDarkModeValue === null && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorageDarkModeValue === '1') {
    store.dispatch('darkMode');
}

/* Default title tag */
const defaultDocumentTitle = 'Debugger Tech';

/* Collapse mobile aside menu on route change */
// eslint-disable-next-line no-unused-vars
router.beforeEach(to => {
    store.dispatch('asideMobileToggle', false);
    store.dispatch('asideLgToggle', false);
});

router.afterEach(to => {
    /* Set document title from route meta */
    if (to.meta && to.meta.title) {
        document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
    } else {
        document.title = defaultDocumentTitle;
    }

    /* Full screen mode */
    store.dispatch('fullScreenToggle', !!to.meta.fullScreen);
});

// eslint-disable-next-line no-unused-vars
const createApp = (ssr = false) => {
    const app = createVueApp(App);

    app.use(router);
    app.use(store);

    app.use(plugins);

    return {
        app
    };
};

const { app } = createApp(false);

router.isReady().then(() => app.mount('#app'));
