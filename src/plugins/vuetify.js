// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
// Vuetify
import { createVuetify } from 'vuetify'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'

export default createVuetify({
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VBottomSheet
  },
}
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
