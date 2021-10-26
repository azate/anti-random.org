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

export default {
  components: {
    ValueForm,
    ValueList,
  },
  data: () => ({
    placeholder: 'Your value',
  }),
  computed: {
    ...mapState('results/listRandomizer', [
      'values',
    ]),
    rules() {
      return [
        (v) => !!v || 'The field is required.',
        (v) => !this.hasDuplicate(v) || 'Has a duplicate value.',
      ];
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    ...mapActions('results/listRandomizer', [
      'add',
      'clear',
      'delete',
      'fetch',
    ]),
    hasDuplicate(v) {
      return this.values.includes(v);
    },
    async onAdd(v) {
      await this.add(v);
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
