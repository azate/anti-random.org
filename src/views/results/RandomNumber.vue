<template>
  <v-container>
    <ValueForm
      :placeholder="placeholder"
      :rules="rules"
      :values="values"
      @add="onAdd"
    />
    <ValueList
      :values="values"
      @clear="onClear"
      @delete="onDelete"
    />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ValueForm from '@/components/ValueForm.vue';
import ValueList from '@/components/ValueList.vue';
import { isInt, toInt } from '@/utils/helpers';

export default {
  components: {
    ValueForm,
    ValueList,
  },
  data: () => ({
    placeholder: 'Your integer',
  }),
  computed: {
    ...mapState('results/randomNumber', [
      'values',
    ]),
    rules() {
      return [
        (v) => isInt(v) || 'The must be an integer.',
        (v) => !this.hasDuplicate(v) || 'Has a duplicate value.',
      ];
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    ...mapActions('results/randomNumber', [
      'add',
      'clear',
      'delete',
      'fetch',
    ]),
    hasDuplicate(v) {
      return this.values.includes(toInt(v));
    },
    async onAdd(v) {
      await this.add(toInt(v));
    },
    async onClear() {
      await this.clear();
    },
    async onDelete(v) {
      await this.delete(v);
    },
  },
};
</script>
