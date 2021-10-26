import Vue from 'vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import App from '@/popup/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
