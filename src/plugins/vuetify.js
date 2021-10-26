import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.base,
        secondary: colors.blueGrey.base,
        accent: colors.pink.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.lightBlue.base,
        success: colors.green.base,
      },
    },
  },
});
