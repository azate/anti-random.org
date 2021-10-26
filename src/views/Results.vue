<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab to="/results/random-number">Random Number</v-tab>
      <v-tab to="/results/list-randomizer">List Randomizer</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>
