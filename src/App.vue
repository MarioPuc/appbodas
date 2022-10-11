<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  @import './assets/styles/styles.css';
  @import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
</style>