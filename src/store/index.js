import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { auth } from '@/auth';
import { darkModeKey } from '@/config.js';
import useClient from '@/hooks/sb-hooks';

const supabase = useClient();

export default createStore({
  state: {
    user: null,
    categories: [],
    profile: {},
    isFullScreen: false,
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
    darkMode: false,
    isFieldFocusRegistered: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_CATEGORY(state, data) {
      state.categories = data;
    },
    SET_PROFILE(state, data) {
      state.profile = data;
    },
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    async getAllCategories({ commit }) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');

        if (error || !data) {
          throw error || new Error('No data');
        }
        commit('SET_CATEGORY', data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error.message);
      }
    },

    async getProfile({ commit }) {
      try {
        auth.user = supabase.auth.user();

        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, website, avatar_url')
          .eq('id', auth.user.id)
          .single();

        if (error && status !== 406) throw error;

        await commit('SET_PROFILE', data);
      } catch (error) {
        alert(error.message);
      }
    },
    asideMobileToggle({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0');

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped');

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      });
    },

    asideLgToggle({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive });
    },

    fullScreenToggle({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value });

      document.documentElement.classList[value ? 'add' : 'remove']('full-screen');
    },

    darkMode({ commit, state }) {
      const value = !state.darkMode;

      document.documentElement.classList[value ? 'add' : 'remove']('dark');

      localStorage.setItem(darkModeKey, value ? '1' : '0');

      commit('basic', {
        key: 'darkMode',
        value
      });
    }
  },
  modules: {
  },

  plugins: [createPersistedState()]
});
