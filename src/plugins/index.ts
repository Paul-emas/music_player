import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

const plugins = () => {
  Vue.use(Buefy, {
    defaultIconPack: 'fas',
  });
};

export default plugins;
