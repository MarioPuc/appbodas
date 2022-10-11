<template>
    <div v-if="visibles.bienvenida == false && visibles.confirmacionAsistencia == true" class="app-container">

        <h1 class="guest-handwrite pb-4"> {{ this.datosApp.evento.nombreEvento }} </h1>

        <p>Le(s) han invitado a su boda, por favor confirme su asistencia. 
          Sería muy grato para los novios saber su confirmación. </p>
                  
        <v-btn :plain="true" v-on:click="confirmarAsistencia('si')" >Asistiré</v-btn>
        <v-btn :plain="true" v-on:click="confirmarAsistencia('no')" >No Asistiré</v-btn>
        
        <p class="pt-4 subtext">Tiene hasta el 12 de abril de 2023 a las 23:00 hrs</p>

    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';

    export default {
      name: 'Home',
  
      components: {
      },
  
      data: () => ({
        codigoEvento : "",
        nombreUsuario: "Mario Puc1"  
      }),

      computed: {
        ... mapState(['visibles', 'datosApp'])
      },
  
      methods: {

        ... mapActions(['confirmacionAsistencia']),

        confirmarAsistencia(status){
          this.confirmacionAsistencia(status);
        }
      }
    }

  </script>
  