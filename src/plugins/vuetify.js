// plugins/vuetify.js
import 'vuetify/styles'                        // globally load Vuetify’s base styles
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives  from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'pixelPark',
    themes: {
      pixelPark: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface:    '#FFFFFF',
          primary:    '#F5A518',
          secondary:  '#464B9D',
          accent:     '#231815',
          info:       '#464B9D',
          success:    '#F5A518',
          warning:    '#F5A518',
          error:      '#231815',
        },
      },
    },
  },
  defaults: {
    global: {
      fontFamily: 'Press Start 2P, monospace',
      rounded:    '0',
    },
    VBtn: {
      color: 'primary',
      style: {
        letterSpacing: '0.1em',
        textTransform: 'none',
      },
    },
    VAppBar: {
      color: 'surface',
    },
    VCard: {
      color: 'surface',
      elevation: 2,
    },
  },
})