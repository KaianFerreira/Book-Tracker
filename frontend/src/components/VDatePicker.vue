<template>
  <v-container>
    <v-menu
      ref="datePicker"
      v-model="datePicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :label="label"
          hint="DD/MM/YYYY format"
          persistent-hint
          prepend-icon="fa-calendar"
          clearable
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="datePicker = false"
      ></v-date-picker>
    </v-menu>
  </v-container>
</template>
<script>
import moment from 'moment'

export default {
  props: {
    value: {},
    label: {
      type: String,
      default: 'Date'
    },
    hint: {
      type: String,
      default: 'DD/MM/YYYY format'
    }
  },
  data: vm => ({
    date: null,
    dateFormatted: null,
    datePicker: false
  }),
  computed: {
    computedDateFormatted () {
      return this.date ? moment.utc(new Date(this.date)).format('DD/MM/YYYY') : ''
    }
  },

  watch: {
    value (val) {
      if (val) {
        this.date = val
      }
    },
    date (val) {
      this.dateFormatted = this.computedDateFormatted
      this.$emit('input', val)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
