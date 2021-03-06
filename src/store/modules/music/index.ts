import https from '@/api';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

import { state } from './music.state';

const getters: GetterTree<typeof state, any> = {
  trendingPlaylist: (state) => state.trendingPlaylist,
  marshMelloPlaylist: (state) => state.marshMelloPlayList,
  kyoPlaylist: (state) => state.kygoPlaylist,
  isLoading: (state) => state.loading,
  selectedPlaylist: (state) => state.selectedPlayist,
  selectedTrack: (state) => state.selectedTrack,
  error: (state) => state.errorMessage,
};

const actions: ActionTree<typeof state, any> = {
  getTrendingPlaylist({ commit }) {
    return new Promise((resolve, reject) => {
      https
        .get('/playlist/7676842822')
        .then(({ data }) => {
          if (!data.error) {
            resolve(data);
            commit('setTrending', data);
          }
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          commit('errorMessage', true);
        });
    });
  },

  getMarshMelloPlayList({ commit }) {
    return new Promise((resolve, reject) => {
      https
        .get('/playlist/7615944662')
        .then(({ data }) => {
          if (!data.error) {
            resolve(data);
            commit('setMarshmelloPlaylist', data);
          }
          commit('setLoading', true);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          commit('errorMessage', true);
        });
    });
  },

  getKygoPlayList({ commit }) {
    return new Promise((resolve, reject) => {
      https
        .get('/playlist/7615939302')
        .then(({ data }) => {
          if (!data.error) {
            resolve(data);
            commit('setKyoPlaylist', data);
          }
          commit('setLoading', true);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          commit('errorMessage', true);
        });
    });
  },

  searchMusic({ commit }, payload) {
    return new Promise((resolve, reject) => {
      https
        .get('/search', { params: { q: payload } })
        .then(({ data }) => {
          if (!data.error) {
            resolve(data);
            commit('setSelectedPlaylist', data);
          }
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          commit('errorMessage', true);
        });
    });
  },
};

const mutations: MutationTree<typeof state> = {
  setTrending: (state, payload) => (state.trendingPlaylist = payload),
  setMarshmelloPlaylist: (state, payload) =>
    (state.marshMelloPlayList = payload),
  setKyoPlaylist: (state, payload) => (state.kygoPlaylist = payload),
  setLoading: (state, payload) => (state.loading = payload),
  setSelectedPlaylist: (state, payload) => (state.selectedPlayist = payload),
  setSelectedTrack: (state, payload) => (state.selectedTrack = payload),
  errorMessage: (state, payload) => (state.errorMessage = payload),
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
