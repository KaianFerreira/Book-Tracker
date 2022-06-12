<template>
  <v-dialog
    persistent
    v-model="globalDialog.open"
    transition="dialog-bottom-transition"
    max-width="600"
  >
  <v-card>
    <v-toolbar color="warning">
      {{ globalDialog.title }}
    </v-toolbar>
    <v-card-text class="mt-5">
      <v-alert
        :value="true"
        color="error"
        icon="fa-warning"
        dark
        class="mb-5"
      >
        <p>
          {{ globalDialog.message }}
        </p>
        <p>
          {{ globalDialog.overline }}
        </p>
      </v-alert>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        color="grey lighten-1"
        dark
        @click="globalDialog.cancel()"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        dark
        @click="globalDialog.submit()"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['globalDialog'])
  }
}
</script>

<style>

</style>
