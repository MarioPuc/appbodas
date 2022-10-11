<template>
    <div class="dashboard">
        <div class="container">
            <Navbar />

            <div v-if="logged === 'Logged'">

                <v-container>
                    <h1>Detalles del Evento</h1>

                    <v-form class="py-10 text-right" >
                      <h2 class="text-left">Editar evento</h2>

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

                    <v-btn color="red white--text" v-on:click="actualizarEvento(evento)">Guardar cambios</v-btn>

                    </v-form>

                    <v-card class="px-8 py-6">
                        <h1>Invitados</h1>

                        <v-form class="py-10 text-right" >
                      <h2 class="text-left" v-if="!isEditing">Agregar invitado</h2>
                      <h2 class="text-left" v-else>Editar invitado</h2>

                      <v-row class="py-4">
                      <v-col cols="4">
                        <v-text-field
                        label="Nombre del invitado"
                        hide-details="auto"
                        v-model="invitado.nombreInvitado"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Teléfono del invitado"
                        hide-details="auto"
                        v-model="invitado.telefonoInvitado"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Total de asistentes"
                        hide-details="auto"
                        v-model="invitado.totalAsistentes"
                      ></v-text-field>
                      </v-col>

                    </v-row>

                    <v-btn color="red white--text" v-on:click="agregarInvitado()" v-if="!isEditing">Agregar Invitado</v-btn>
                    <v-btn color="red white--text" v-on:click="actualizarInvitado()" v-else>Actualizar Invitado</v-btn>

                    </v-form>

                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="this.invitados"
                                :items-per-page="5"
                                class="elevation-1"
                            >
                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                    medium
                                    color="info"
                                    class="mr-2"
                                    v-on:click="editandoInvitado(item)"
                                >
                                    mdi-pencil
                                </v-icon>
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
        isEditing: false,

        invitado: {},

        headers: [
          { text: 'Nombre del invitado', value: 'nombreInvitado' },
          { text: 'Telefono del invitado', value: 'telefonoInvitado' },
          { text: 'Numero total de asistentes', value: 'totalAsistentes' },
          { text: "Acciones", value: "actions", sortable: false },
        ],

    }),

    computed: {
        ... mapState(['eventos', 'evento', 'invitados']),

        logged() {
            return localStorage.getItem("isLogged");
        },
    },


    methods: {

      ... mapActions(['addEvento', 'getEvento', 'updateEvento', 'addInvitado', 'getInvitados', 'updateInvitado']),

      actualizarEvento(evento) {
        this.updateEvento(evento);
      },

      agregarInvitado() {
        let paramsInvitado = this.invitado;
        paramsInvitado.idEventoFirebase = this.evento.idFirebase;
        paramsInvitado.idEvento = this.evento.id;

        this.addInvitado(paramsInvitado);
      },

      async actualizarInvitado() {
        console.log(this.invitado);

        response = await this.updateInvitado(this.invitado).then(
          this.invitado = {}
        );


      },

      editandoInvitado(invitado) {
        this.isEditing = true;
        let invitadoBreak = {};
        invitadoBreak = invitado;
        this.invitado = invitadoBreak;

        console.log(invitado);

      },

      initialize(){
        this.getEvento(this.$route.params.id);
        this.getInvitados(this.$route.params.id);
      }
    }

    }

    
  </script>