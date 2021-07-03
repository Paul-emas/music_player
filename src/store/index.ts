import Vue from 'vue'
import Vuex, { createLogger } from 'vuex';
import music from './modules/music/index';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  strict: true,
  modules: {
    music
  }
});