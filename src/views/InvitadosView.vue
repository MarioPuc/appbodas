<template>
  <div class="text-center theme-wedding">
    <div class="container full-height">
        <v-container fill-height fluid>
          <v-row align="center"
              justify="center">
              <div>
          
                <Bienvenida />
                <ConfirmacionAsistencia />
                <Asistencia />

              </div>
          </v-row>
        </v-container>
    </div>
  </div>

</template>

<script>
  import Bienvenida from '../components/pages/Bienvenida.vue';
  import ConfirmacionAsistencia from '../components/pages/ConfirmacionAsistencia.vue';
  import Asistencia from '../components/pages/Asistencia.vue'

  export default {
    name: 'Home',

    components: {
    Bienvenida,
    ConfirmacionAsistencia,
    Asistencia
},

    data: () => ({
      codigoEvento : "",
      isSetCode    : false,
      isSetStage2  : false,
      isStage2     : "",
      nombreUsuario: "Mario Puc"  
    }),

    methods: {
      sendCode() {
        console.log(this.codigoEvento);
        this.isSetCode = true;
      },

      stage2(asistance) {

        if(!asistance) {
          return this.isStage2 = "no";
        }
        return this.isStage2 = "si";
      }
    }
  }
</script>
