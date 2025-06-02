import 'vuetify/styles';

import { createVuetify } from 'vuetify';

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#002e5d',
          secondary: '#d50032', 
          accent: '#63A2BC',
          brand: '#9d0226',
        },
      },
    },
  },
});
