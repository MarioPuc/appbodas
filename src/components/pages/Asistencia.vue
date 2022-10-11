<template>
    <div class="app-container" >
      <div v-if="visibleAsistentes">
        <div v-if="visibles.asistencia == 'si'"> 
            <h1>¡Excelente!</h1>
            <h1>¡Gracias por su <br> confirmación!</h1>

            <div>
              <p class="pb-8">Aprovechando...</p>

              <p>¿Podría decirnos cuantos <br /> asistentes serán?</p>

              <v-form>
                <v-text-field
                    v-model="totalAsistentes"
                    label="Número de asistentes"
                    color="#000"
                ></v-text-field>

                <v-btn :plain="true" v-on:click="setNumeroAsistentes()">Añadir número de invitados</v-btn>
              </v-form>
            </div>
            
        </div>

        <div v-if="visibles.asistencia == 'no'">
          <h1>Lamentamos que no puedas asistir</h1>

          <p>
            Si cambias de opinión puedes cambiar tu selección
            antes del:
          </p>

          <p class="pt-4 subtext"> 12 de abril de 2023 a las 23:00 hrs</p>
        </div>
      </div>
      <div v-else>
        <h1>Te esperamos</h1>

        <p>Ultimo texto de despedida</p>
      </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Home',
  
      components: {
      },
  
      data: () => ({
        visibleAsistentes: true,
        totalAsistentes: "" 
      }),

      computed: {
        ... mapState(['visibles'])
      },
  
      methods: {
        ... mapActions(['numeroAsistentes']),

        setNumeroAsistentes() {
          this.visibleAsistentes = false;
          this.numeroAsistentes(this.totalAsistentes);
        },
        
      }
    }
  </script>
  