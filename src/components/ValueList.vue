<template>
  <div class="mt-2">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="isDisabledDeleteAllValues"
          color="accent"
          icon
          @click="onClear"
          v-on="on"
        >
          <v-icon>mdi-delete-sweep</v-icon>
        </v-btn>
      </template>
      Clear
    </v-tooltip>
    <v-chip
      v-for="(value, index) in values"
      :key="index"
      class="ma-1"
      close
      label
      @click:close="onDelete(value)"
    >
      {{ value }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isDisabledDeleteAllValues() {
      return !this.values.length;
    },
  },
  methods: {
    onDelete(v) {
      this.$emit('delete', v);
    },
    onClear() {
      this.$emit('clear');
    },
  },
};
</script>
