<template>
  <div 
    class="text-center theme-wedding"
    :style="`background-image: url('https://workspacedigiart.com/img/fondos/${this.datosApp.evento.fondo}');`"
    v-if="visibles.bienvenida == false && visibles.confirmacionAsistencia == true"
  >
    <div class="container full-height">
        <v-container fill-height fluid>
          <v-row align="center"
              justify="center">
          <div class="app-container">
            <p
              class="pb-4" 
              :style="`font-size:${this.datosApp.evento.tamanoFuenteTitulo}px; font-family:${this.datosApp.evento.fuenteTitulo}`"> 
                {{ this.datosApp.evento.nombreOwner }}
          </p>

            <p
            :style="`font-size:${this.datosApp.evento.tamanoFuenteCuerpo}px; font-family:${this.datosApp.evento.fuenteCuerpo}`"
            >Le(s) han invitado a su boda, por favor confirme su asistencia. 
              Sería muy grato para los novios saber su confirmación. </p>
                  
            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0" v-on:click="confirmarAsistencia('si')" >Asistiré</v-btn>
            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0" v-on:click="confirmarAsistencia('no')" >No Asistiré</v-btn>
          
            <p class="pt-4 subtext">Tiene hasta el {{ deadline }} a las 23:00 hrs</p>
            </div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import * as moment from 'moment';

    export default {
      name: 'Home',
  
      components: {
      },
  
      data: () => ({
        codigoEvento : "",
        nombreUsuario: "Mario Puc1"  
      }),

      computed: {
        ... mapState(['visibles', 'datosApp']),
        deadline() {
          moment.locale('es-mx');
          return moment(this.datosApp.evento.fechaEvento).subtract(2, 'months').format('LL');
        }
      },
  
      methods: {

        ... mapActions(['confirmacionAsistencia']),

        confirmarAsistencia(status){
          this.confirmacionAsistencia(status);
        }
      }
    }

  </script>
  