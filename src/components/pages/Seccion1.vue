<template>
  <div class="text-center theme-wedding"
    :style="`background-image: url('https://workspacedigiart.com/img/fondos/fondoboda.jpeg');`"
    >
    <div class="container full-height">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <div class="app-container">
            <h1 class="title-handwrite pb-3">The Day</h1>
            <p>¡Bienvenido!</p>

            <div v-if="!isScanning">
              <v-form>
                <p v-if="datosApp.respuesta.codigoInvitado == 'exito'">
                  Código enviado con éxito
                </p>

                <p v-else-if="datosApp.respuesta.codigoInvitado == 'fallo'" class="response-message">
                  El código no es válido, intente de nuevo
                </p>
              </v-form>

              <p class="py-3">Escanée el código QR de su invitación</p>
              <v-btn color="#E6C98A" class="white--text" tile elevation="0"
                v-on:click="isScanning = !isScanning">Escanear código</v-btn>
            </div>
            <div v-else>
              <p>Escanee su código QR</p>

              <LectorQR />

            </div>
          </div>

        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import LectorQR from '../pages/LectorQR'

export default {
  name: 'Seccion1',

  components: {
    LectorQR
  },

  data: () => ({
    codigoInvitado: '',
    isScanning: false,
    msjRespuesta: ''
  }),

  computed: {
    ...mapState(['visibles', 'datosApp'])
  },

  methods: {}
}
</script>
