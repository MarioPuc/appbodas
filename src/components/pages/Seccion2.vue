<template>
  <div class="text-center theme-wedding"
    :style="`background-image: url('https://workspacedigiart.com/img/fondos/${this.datosApp.evento.fondo}');`"
    v-if="visibles.bienvenida == false && visibles.confirmacionAsistencia == true">
    <div class="container full-height">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <div v-if="datosPrincipales">
            <div style="display: none;">
              <p class="pb-2y"
                :style="`font-size:${this.datosApp.evento.tamanoFuenteTitulo}px; font-family:${this.datosApp.evento.fuenteTitulo}; color:${this.datosApp.evento.colorFuenteTitulo};`">
                {{ this.datosApp.evento.nombreOwner }}
              </p>

              <p>Te invitamos a celebrar con nosotros</p>

              <p :style="`font-size: 35px; font-family:${this.datosApp.evento.fuenteTitulo}; `">Nuestra Boda</p>

              <p>{{ this.datosApp.evento.fechaEvento }}</p>

              <p>RECEPCIÓN</p>

              <a :href="coordinatesGrades" target="_blank">
                <v-btn color="#E6C98A" class="white--text my-2" tile elevation="0">Ver evento en google maps</v-btn>
              </a>

              <p>{{ this.datosApp.evento.horaEvento }} hrs</p>

              <p>Código de vestimenta: </p>

              <p>{{ this.datosApp.evento.codigoVestimenta }}</p>

              <a :href="this.datosApp.evento.linkMesas" target="_blank">
                <v-btn color="#E6C98A" class="white--text" tile elevation="0">Ver mesa de regalos</v-btn>
              </a>
              <div>
                <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0"
                  v-on:click="() => { this.datosPrincipales = !this.datosPrincipales }">
                  <v-icon>mdi-arrow-right-bold</v-icon>
                </v-btn>
              </div>
            </div>

            <div>
              <div class="text-center font white--text " style="font-family: GaramondMedIt; font-size: 50px;">
                SPARKLE &
              </div>
              <div class="text-center font white--text "
                style="font-family: GaramondMedIt; font-size: 60px; line-height: 30px;">
                SHINE
              </div>

              <div class="text-center font white--text "
                style="font-family: SofiaProRegular; font-size: 24px; line-height: 40px;">IT'S BIRTHDAY TIME!</div>

              <div class="text-center font white--text "
                style="font-family: SofiaProRegular; font-size: 30px; line-height: 35px; letter-spacing: 2px;">PATTY'S
              </div>

              <div class="text-center font white--text "
                style="font-family: Colatin; font-size: 100px; line-height: 80px;">30 <sup
                  style="font-family: Colatin; font-size: 60px;">th</sup></div>

              <div class="text-center font white--text "
                style="font-family: SofiaProRegular; font-size: 30px; line-height: 35px; letter-spacing: 5px;">PARTY
              </div>


              <div class="text-center font white--text "
                style="font-family: GaramondMedIt; font-size: 50px; line-height: 65px; letter-spacing: 1px;">21/ENE/23
              </div>

              <div class="text-center font white--text "
                style="font-family: SofiaProRegular; font-size: 20px; letter-spacing: 1px;">
                CALLE 25 N° 303 X 4 Y 6 <br> FRACC: MONTEBELLO
              </div>

              <a :href="coordinatesGrades" target="_blank">
                <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                  <v-icon>mdi-map-marker</v-icon> Ver ubicación en Google Maps
                </v-btn>
              </a>

              <div>
                <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0"
                  v-on:click="() => { this.datosPrincipales = !this.datosPrincipales }">
                  <v-icon>mdi-arrow-right-bold</v-icon>
                </v-btn>
              </div>
            </div>

          </div>
          <div class="app-container" v-if="!datosPrincipales">
            <p class="pb-4"
              :style="`font-size:${this.datosApp.evento.tamanoFuenteTitulo}px; font-family:${this.datosApp.evento.fuenteTitulo}; color:${this.datosApp.evento.colorFuenteTitulo}; text-transform: uppercase;`">
              {{ this.datosApp.evento.nombreOwner }}
            </p>

            <p
              :style="`font-size:${this.datosApp.evento.tamanoFuenteCuerpo}px; font-family:${this.datosApp.evento.fuenteCuerpo}; color:${this.datosApp.evento.colorFuenteCuerpo}`">
              Te / Les ha invitado a su fiesta de cumpleaños, por favor confirme su asistencia.
            </p>

            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0"
              v-on:click="confirmarAsistencia('si')">Asistiré</v-btn>
            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0" v-on:click="confirmarAsistencia('no')">No
              Asistiré</v-btn>

            <p class="pt-4 subtext d-none">Tiene hasta el {{ deadline }} a las 23:00 hrs</p>
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
  name: 'Seccion2',

  components: {
  },

  data: () => ({
    codigoEvento: "",
    coordenadasGrados: "",
    datosPrincipales: true
  }),

  computed: {
    ...mapState(['visibles', 'datosApp']),
    deadline() {
      moment.locale('es-mx');
      return moment(this.datosApp.evento.fechaEvento).subtract(2, 'months').format('LL');
    },
    coordinatesGrades() {
      const objCoordenadas = this.datosApp.evento.locacionEvento;
      return `https://www.google.com.mx/maps/search/${objCoordenadas.lat}, ${objCoordenadas.lng}`;
    }
  },

  methods: {
    ...mapActions(['confirmacionAsistencia']),

    confirmarAsistencia(status) {
      this.confirmacionAsistencia(status);
    }
  }
}

</script>
