import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/results',
    },
    {
      path: '/results',
      redirect: '/results/random-number',
      component: () => import('@/views/Results.vue'),
      children: [
        {
          path: 'list-randomizer',
          component: () => import('@/views/results/ListRandomizer.vue'),
        },
        {
          path: 'random-number',
          component: () => import('@/views/results/RandomNumber.vue'),
        },
      ],
    },
  ],
});
