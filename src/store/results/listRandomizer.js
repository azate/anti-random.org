import {
  addValue,
  clearValues,
  deleteValue,
  getValues,
  STORAGE_RESULT_LIST_RANDOMIZER_VALUES,
} from '@/utils/storage';

export default {
  namespaced: true,
  state: {
    values: [],
  },
  mutations: {
    SET_VALUES(state, value) {
      state.values = value;
    },
  },
  getters: {},
  actions: {
    async add({ commit }, value) {
      commit('SET_VALUES', await addValue(STORAGE_RESULT_LIST_RANDOMIZER_VALUES, value));
    },
    async clear({ commit }) {
      commit('SET_VALUES', await clearValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES));
    },
    async fetch({ commit }) {
      commit('SET_VALUES', await getValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES));
    },
    async delete({ commit }, value) {
      commit('SET_VALUES', await deleteValue(STORAGE_RESULT_LIST_RANDOMIZER_VALUES, value));
    },
  },
};
