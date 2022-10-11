<template>
    <div class="dashboard">
        <div class="container">
            <Navbar />

            <div v-if="logged === 'Logged'">

                <v-container>
                    <h1>Dashboard</h1>

                    <v-row class="py-4">
                        <v-col cols="6"></v-col>
                        <v-col cols="6" class="text-right" >
                            <v-btn color="indigo white--text" v-on:click="isCreating = !isCreating">Agregar evento</v-btn>
                        </v-col>
                    </v-row>

                    

                    <v-form class="py-10 text-right" v-if="isCreating">
                      <h1 class="text-left">Agregar evento</h1>

                      <v-row class="py-4">
                      <v-col cols="4">
                        <v-text-field
                        label="Nombre del evento"
                        hide-details="auto"
                        v-model="evento.nombreEvento"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Nombre del cliente"
                        hide-details="auto"
                        v-model="evento.nombreCliente"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Telefono del cliente"
                        hide-details="auto"
                        v-model="evento.telefonoCliente"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Fecha y hora del evento"
                        hide-details="auto"
                        v-model="evento.fechaEvento"
                      ></v-text-field>
                      </v-col>

                    </v-row>

                    <v-btn color="red white--text" v-on:click="agregarEvento">Agregar</v-btn>

                    </v-form>

                    <v-card class="px-8 py-6">
                        <v-card-title>
                            Eventos
                        </v-card-title>
                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="this.eventos[0]"
                                :items-per-page="5"
                                class="elevation-1"
                            >
                            <template v-slot:item.actions="{ item }">
                              <router-link :to="`/detallesEvento/${ item.id }`" tag="button">
                                <v-icon
                                    medium
                                    color="info"
                                    class="mr-2"
                                    to="/detallesEvento/1"
                                >
                                    mdi-pencil
                                </v-icon>
                              </router-link>
                              <v-icon
                                  medium
                                  color="error"
                                  class="d-none"
                              >
                                  mdi-delete
                              </v-icon>
                          </template>                         
                          </v-data-table>
                        </template>
                    </v-card>
                </v-container>

            </div>

            <div v-else>
                <MensajeBloqueo />
            </div>


        </div>

        <v-snackbar
            v-model="snackbar.open"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
            fixed
            right
            top
            >
            {{ snackbar.text }}

        </v-snackbar>

    </div>
  </template>
  
  <script>
    import Navbar from '@/components/Navbar.vue';
    import MensajeBloqueo from '@/components/MensajeBloqueo.vue';
    import { mapActions, mapState } from 'vuex';

    export default {
    name: 'Home',

    created() {
    this.initialize();
  },

    components: {
    Navbar,
    MensajeBloqueo
},

    data: () => ({

        isCreating: false,

        evento: {
          nombreEvento: "",
          nombreCliente: "",
          telefonoCliente: "",
          fechaEvento: ""
        },

        snackbar: {
            open: false,
            text: "",
            color: "green darken-1 white--text",
            timeout: 3500,
        },

        headers: [
          {
            text: 'Evento',
            align: 'start',
            sortable: false,
            value: 'nombreEvento',
          },
          { text: 'Cliente', value: 'nombreCliente' },
          { text: 'Telefono del cliente', value: 'telefonoCliente' },
          { text: 'Fecha y hora del evento', value: 'fechaEvento' },
          { text: 'Fecha de registro', value: 'fechaRegistro' },
          { text: "Acciones", value: "actions", sortable: false },
        ],

    }),

    computed: {
        ... mapState(['eventos', 'respuestaAnadirEvento']),

        logged() {
            return localStorage.getItem("isLogged");
        },
    },

    watch: {
      respuestaAnadirEvento(nuevaRespuesta, respuestaAnterior) {
        if (nuevaRespuesta != respuestaAnterior && nuevaRespuesta == 'exito') {
          this.snackbar.text = "El evento se ha añadido con exito";
          this.snackbar.open =  true;
          setTimeout(() => {
            //this.snackbar.text = "";
            window.location.reload(true);
          }, 4000);
        }
      }
    },

    methods: {

      ... mapActions(['addEvento', 'getEventos']),
      
      agregarEvento() {
        //Validaciones para el registro de eventos
        //console.log(this.evento);
        this.addEvento(this.evento);
      },

      initialize(){
        this.getEventos();
      }
    }

    }

    
  </script>