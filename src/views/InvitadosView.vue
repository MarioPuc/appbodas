<template>
  <div>
    <Seccion1 />
    <Seccion2 />
    <Seccion3 />
  </div>
</template>

<script>
  import Seccion1 from '../components/pages/Seccion1.vue';
  import Seccion2 from '../components/pages/Seccion2.vue';
  import Seccion3 from '../components/pages/Seccion3.vue'

  export default {
    name: 'Home',

    components: {
      Seccion1,
      Seccion2,
      Seccion3
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
