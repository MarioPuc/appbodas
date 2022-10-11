<template>
    <div class="">
      <p class="error">{{ error }}</p>
        <!--<p class="decode-result">Last result: <b>{{ result }}</b></p> -->
            <p v-if="datosApp.respuesta.codigoInvitado == 'exito'"> 
                    Código escaneado con éxito 
            </p>
            <p v-else-if="datosApp.respuesta.codigoInvitado == 'fallo'"
                    class="response-message"> 
                    El código no es válido, revise que el código sea el correcto
            </p>
          <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'LectorQR',
  components: {
        QrcodeStream
  },

  data: () => ({
   codigoInvitado: '',
   error: '',
   msjRespuesta  : '',
   result: '',
  }),

  computed: {
    ... mapState(['visibles', 'datosApp'])
  },

  methods: {
    ... mapActions(['getInvitadoById']),

    onDecode (result) {
      this.result = result
      this.setInvitado()
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },

    async setInvitado() {
      this.msjRespuesta = await this.getInvitadoById(this.result);
      console.log(this.msjRespuesta);
    },
  }
}
</script>
