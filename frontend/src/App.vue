<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Book-Tracker logo here</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
      <GlobalDialog/>
    </v-main>
  </v-app>
</template>

<script>
import GlobalDialog from './components/GlobalDialog.vue'
export default {
  name: 'App',
  components: {
    GlobalDialog
  },

  data: () => ({
    //
  })
}
</script>
