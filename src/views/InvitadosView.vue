<template>
  <div>
    <Seccion1 />
  </div>
</template>

<script>
  import Seccion1 from '../components/pages/Seccion1.vue';

  export default {
    name: 'Home',

    components: {
      Seccion1
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
