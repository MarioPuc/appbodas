<template>
    <div class="dashboard">
        <div class="container">
            <Navbar />
            <div v-if="logged === 'Logged'">
                <v-container>
                    <h1>Registro de Empresas</h1>

                    <v-row class="py-4">
                      <v-col cols="6"></v-col>
                      <v-col cols="6" class="text-right" >
                        <v-btn color="indigo white--text" v-on:click="isCreating = !isCreating">Agregar empresa</v-btn>
                      </v-col>
                    </v-row>

                    <v-form 
                      ref="form"
                      v-model="statusValido"
                      lazy-validation
                      class="py-10 text-right"
                      v-if="isCreating"
                    >
                      <h1 class="text-left">Agregar empresa</h1>

                      <h2 class="text-left py-4">Datos de la Empresa</h2>

                      <v-row >
                      <v-col cols="6">
                        <v-text-field
                        label="Nombre de la empresa"
                        v-model="empresa.nombre"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                        label="Giro de la empresa"
                        v-model="empresa.giro"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                        label="Dirección de la empresa"
                        v-model="empresa.direccion"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                        label="Teléfono de contacto"
                        v-model="empresa.telefono"
                        ></v-text-field>
                      </v-col>

                    </v-row>

                    <v-btn color="red white--text my-5" v-on:click="validacion">Agregar</v-btn>

                    </v-form>

                    <v-card class="px-8 py-6">
                        <v-card-title>
                            Empresas
                        </v-card-title>
                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="empresas[0]"
                                :items-per-page="5"
                                class="elevation-1"
                            >
                            <template v-slot:item.actions="{ item }">
                              <router-link :to="`/detallesEmpresa/${ item.id }`" tag="button">
                                <v-icon
                                    medium
                                    color="info"
                                    class="mr-2"
                                    to="/detallesEmpresa/1"
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
                <!--<div class="border border-red hidden">
                  hola
                  <Map />
                </div>-->
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
import { mapActions, mapState } from 'vuex';
import axios from "axios";

import Map from '@/components/widgets/Map.vue';
import MensajeBloqueo from '@/components/MensajeBloqueo.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Empresas',

  created() {
    this.initialize();
  },

  components: {
    Map,
    MensajeBloqueo,
    Navbar
  },

  data: () => ({
    arrayPDF: [],
    banqueteras: ['Camino', 'Banquetera2', 'Banquetera3'],
    docsError: false,
    headers: [
      {
        text: 'Empresa',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Giro', value: 'giro' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Fecha de registro', value: 'fechaRegistro' },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    isCreating: false,
    list: [],
    snackbar: {
      open: false,
      text: "",
      color: "green darken-1 white--text",
      timeout: 3500,
    },
    objectDoc: {},
    opcionesBoolean: [
      'No',
      'Si'
    ],
    opcionesCodigoVestimenta: [
      'Formal',
      'Cóctel',
      'Informal'
    ],
    textDocsError: '',
    reglas: {
      especifico: [
        v => !!v || 'Especifique el tipo de empresa'
      ]
    },
    statusValido: false
  }),

  computed: {
    ... mapState(['empresas', 'empresa', 'opciones', 'respuestaAnadirEmpresa']),

    logged() {
      return localStorage.getItem("isLogged");
    },
  },

    watch: {
      respuestaAnadirEmpresa(nuevaRespuesta, respuestaAnterior) {
        if (nuevaRespuesta != respuestaAnterior && nuevaRespuesta == 'exito') {
          this.snackbar.text = "El empresa se ha añadido con exito";
          this.snackbar.open =  true;
          setTimeout(() => {
            //this.snackbar.text = "";
            window.location.reload(true);
          }, 4000);
        }
      }
    },

    methods: {

    ... mapActions(['addEmpresa', 'getEmpresas', 'getOpciones']),
      
    agregarEmpresa() {
      this.addEmpresa(this.empresa);
    },

    initialize(){
      this.getEmpresas();
      this.getOpciones();
    },

    validacion() {
      //this.$refs.form.validate() ? this.agregarEmpresa() : null ;
      //Comment and uncomment cuando las validaciones esten implementadas
      this.agregarEmpresa();
    }
  }
}
</script>
