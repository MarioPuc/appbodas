<template>
  <div class="text-center theme-wedding"
    :style="`background-image: url('https://workspacedigiart.com/img/fondos/${this.datosApp.evento.fondo}');`"
    v-if="(visibles.bienvenida == false && visibles.confirmacionAsistencia == false)">
    <div class="container full-height">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <div class="app-container white--text">
            <div v-if="visibleAsistentes">
              <div v-if="visibles.asistencia == 'si'">
                <h1
                  :style="`font-size:${this.datosApp.evento.tamanoFuenteTitulo}px; font-family:${this.datosApp.evento.fuenteTitulo}; color:${this.datosApp.evento.colorFuenteTitulo}`">
                  ¡GRACIAS POR SU <br> CONFIRMACIÓN!</h1>

                <div>

                  <p
                    :style="`font-size:${this.datosApp.evento.tamanoFuenteCuerpo}px; font-family:${this.datosApp.evento.fuenteCuerpo}; color:${this.datosApp.evento.colorFuenteCuerpo}`">
                    ¿Podría decirnos cuantos <br /> asistentes serán?</p>

                  <v-form>
                    <v-select v-model="totalAsistentes" label="Número de asistentes" :items="arrayAsistentes"
                      color="#000"></v-select>

                    <v-btn color="#E6C98A" class="white--text" tile elevation="0"
                      v-on:click="setNumeroAsistentes()">Añadir número de invitados</v-btn>
                  </v-form>
                </div>

              </div>

              <div v-if="visibles.asistencia == 'no'">
                <h1
                  :style="`font-size:${this.datosApp.evento.tamanoFuenteTitulo}px; font-family:${this.datosApp.evento.fuenteTitulo}; color:${this.datosApp.evento.colorFuenteTitulo}`">
                  LAMENTAMOS QUE NO PUEDAS ASISTIR</h1>

                <p
                  :style="`font-size:${this.datosApp.evento.tamanoFuenteCuerpo}px; font-family:${this.datosApp.evento.fuenteCuerpo}; color:${this.datosApp.evento.colorFuenteCuerpo}`">
                  Si cambias de opinión puedes cambiar tu selección
                </p>

                <p class="pt-4 subtext d-none"> {{ deadline }} a las 23:00 hrs</p>

                <span>Regresar a la página principal</span><br>

                <a href="/">
                  <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                    <v-icon>mdi-arrow-u-left-bottom</v-icon>
                  </v-btn>
                </a>
              </div>
            </div>
            <div v-else>

              <h3>Nombre: </h3>

              <p>{{ this.datosApp.invitado.nombreInvitado }}</p>

              <h3>Número de acompañantes: </h3>

              <p>{{ this.datosApp.invitado.totalAsistentes }}</p>

              <h3 class="d-none">Preferencias alimenticias: </h3>

              <p class="d-none">N/A</p>

              <h3 class="d-none">Alergias alimenticias: </h3>

              <p class="d-none">N/A</p>

              <p class="d-none">
                Puedes cambiar tu selección antes del:
              </p>

              <p class="pt-4 subtext d-none"> {{ deadline }} a las 23:00 hrs</p>

              <span class="d-block">¡Los datos de tu confirmación se ha registrado exitosamente!</span>
              <span class="d-none">¡Tu confirmación se ha actualizado!</span><br>
              <span>¡Gracias, te esperamos!</span>

              <!--<a :href="urlActual">
                <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                  Finalizar
                </v-btn>
              </a>-->

            </div>
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
  name: 'Seccion3',

  components: {
  },

  data: () => ({
    totalAsistentes: "0",
    visibleAsistentes: true
  }),

  computed: {
    ...mapState(['visibles', 'datosApp']),
    deadline() {
      moment.locale('es-mx');
      return moment(this.datosApp.evento.fechaEvento).subtract(2, 'months').format('LL');
    },
    arrayAsistentes() {
      let arrayRespuesta = [];
      for (let i = 1; i <= this.datosApp.invitado.totalAsistentes; i++) {
        arrayRespuesta.push(i);
      }
      return arrayRespuesta;
    },
    urlActual() {
      return window.location.href;
    }
  },

  methods: {
    ...mapActions(['numeroAsistentes']),

    setNumeroAsistentes() {
      this.visibleAsistentes = false;
      this.numeroAsistentes(this.totalAsistentes);
    },

  }
}
</script>
