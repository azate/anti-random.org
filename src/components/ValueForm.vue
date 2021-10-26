<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="onAdd"
  >
    <v-text-field
      v-model="value"
      :placeholder="placeholder"
      :rules="rules"
      autofocus
      outlined
      @blur="onBlur"
    >
      <template v-slot:append-outer>
        <div class="v-input__icon v-input__icon--append-outer">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                :disabled="isDisabledButtonAddValue"
                color="accent"
                icon
                @click="onAdd"
                v-on="on"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            Add
          </v-tooltip>
        </div>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isValid: false,
    value: null,
  }),
  computed: {
    isDisabledButtonAddValue() {
      return !this.isValid;
    },
  },
  methods: {
    onAdd() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$emit('add', this.value);
      this.$refs.form.reset();
    },
    onBlur() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
