<template>
    <div class="dashboard">
        <div class="container">
            <Navbar />

            <div v-if="logged === 'Logged'">

                <v-container>
                    <h1>Detalles del Empresa</h1>
                    
                    <v-form class="py-10 text-right" >
                      <h2 class="text-left">Editar empresa</h2>

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

                    <v-btn color="red white--text my-5" v-on:click="actualizarEmpresa(empresa)">Guardar cambios</v-btn>

                    </v-form>

                    <v-card class="px-8 py-6">
                        <h1>Empleados</h1>

                    <v-form class="py-10 text-right" >
                      <h2 class="text-left" v-if="!isEditing">Agregar empleado</h2>
                      <h2 class="text-left" v-else>Editar empleado</h2>

                      <v-row class="py-4">
                      <v-col cols="4">
                        <v-text-field
                        label="Nombre del empleado"
                        hide-details="auto"
                        v-model="empleado.nombreEmpleado"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Teléfono del empleado"
                        hide-details="auto"
                        v-model="empleado.telefonoEmpleado"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Rol"
                        hide-details="auto"
                        v-model="empleado.rolEmpleado"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-btn color="red white--text" v-on:click="agregarEmpleado()" v-if="!isEditing">Agregar Empleado</v-btn>
                    <v-btn color="red white--text" v-on:click="actualizarEmpleado()" v-else>Actualizar Empleado</v-btn>

                    </v-form>

                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="this.empleados"
                                :items-per-page="5"
                                class="elevation-1"
                            >
                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                    medium
                                    color="info"
                                    class="mr-2"
                                    v-on:click="editandoEmpleado(item)"
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
    import { mapActions, mapState } from 'vuex';

    import axios from "axios";

    import Navbar from '@/components/Navbar.vue';
    import MensajeBloqueo from '@/components/MensajeBloqueo.vue';


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
        arrayPDF: [],
        banqueteras: ['Camino', 'Banquetera2', 'Banquetera3'],
        docsError: false,
        isCreating: false,
        isEditing: false,

        empleado: {},

        headers: [
          { text: 'Nombre del empleado', value: 'nombreEmpleado' },
          { text: 'Telefono del empleado', value: 'telefonoEmpleado' },
          { text: 'Rol', value: 'rolEmpleado' },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        invitado: {
          totalAsistentes: 1,
          numeroMesa: 1
        },
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
        planners: ['Marta Sosa', 'Otra'],
        textDocsError: '',
        reglas: {
          especifico: [
            v => !!v || 'Especifique el tipo de empresa'
          ]
        },
        statusValido: false
    }),

    computed: {
        ... mapState(['empresas', 'empresa', 'empleados']),

        logged() {
            return localStorage.getItem("isLogged");
        },
    },


    methods: {

      ... mapActions([ 'getEmpresa', 'updateEmpresa', 'addEmpleado', 'getEmpleados', 'updateEmpleado']),

      actualizarEmpresa(empresa) {
        this.updateEmpresa(empresa);
      },

      agregarEmpleado() {
        let paramsEmpleado = this.empleado;
        paramsEmpleado.idEmpresaFirebase = this.empresa.idFirebase;
        paramsEmpleado.idEmpresa = this.empresa.id;

        this.addEmpleado(paramsEmpleado);
      },

      async actualizarEmpleado() {
        console.log(this.empleado);

        response = await this.updateEmpleado(this.empleado).then(
          this.empleado = {}
        );

      },

      editandoEmpleado(empleado) {
        this.isEditing = true;
        let empleadoBreak = {};
        empleadoBreak = empleado;
        this.empleado = empleadoBreak;
        console.log(empleado);
      },

      initialize(){
        this.getEmpresa(this.$route.params.id);
        this.getEmpleados(this.$route.params.id);
      },

      validacion() {
        //this.$refs.form.validate() ? this.agregarEmpresa() : null ;
      }
    }
  }
  </script>
