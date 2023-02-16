<template>
    <div class="text-center theme-wedding">
      <div class="container full-height">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <div class="">
              <h1 class="pb-3">Error 404 - Invitado no encontrado</h1>
              <p>La información relacionada con este invitado no fue encontrada, es posible que el código sea incorrecto o que se haya eliminado</p>
            </div>
          </v-row>
        </v-container>
      </div>
    </div>
  </template>
  
  <script>
  
  import LectorQR from '../pages/LectorQR'
  
  export default {
    name: 'ErrorPage',
  
    data: () => ({
      codigoInvitado: '',
    }),
  }
  </script>
  