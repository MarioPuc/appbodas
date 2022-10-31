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
  @import url('https://fonts.googleapis.com/css2?family=Gilda+Display&family=Parisienne&family=Work+Sans:ital,wght@0,300;1,200&display=swap');
</style>