<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="d-flex align-center">
        <ProjectLogo />
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="wrapper d-flex justify-center">
        <router-view class="router-view"/>
      </div>
    </v-main>
    <GlobalDialog/>
  </v-app>
</template>

<script>
import GlobalDialog from './components/GlobalDialog.vue'
import ProjectLogo from './components/ProjectLogo.vue'
export default {
  name: 'App',
  components: {
    ProjectLogo,
    GlobalDialog
  },

  data: () => ({
    //
  })
}
</script>
<style lang="scss" scoped>
.router-view {
  max-width: 1980px;
}
</style>
