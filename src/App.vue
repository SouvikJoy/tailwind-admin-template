<template>
	<div v-if="isLoggedIn()">
		<nav-bar />
		<aside-menu :menu="menu" />
		<main class="pt-14 xl:pl-60">
			<router-view />
		</main>
		<footer-bar />
		<overlay
			v-show="isAsideLgActive"
			zIndex="z-30"
			@overlay-click="overlayClick"
		/>
	</div>
	<Login v-else />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import menu from '@/menu.js';
import NavBar from '@/components/NavBar.vue';
import AsideMenu from '@/components/AsideMenu.vue';
import FooterBar from '@/components/FooterBar.vue';
import Overlay from '@/components/Overlay.vue';
import useAuthUser from '@/composables/UseAuthUser';
import Login from '@/pages/Login.vue';

const { isLoggedIn } = useAuthUser();

const store = useStore();
const isAsideLgActive = computed(() => store.state.isAsideLgActive);


const overlayClick = () => {
  store.dispatch('asideLgToggle', false);
};

</script>
