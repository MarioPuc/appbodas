<template>
  <div class="dashboard">
    <div class="container">
      <Navbar />
      <div v-if="logged === 'Logged'">
        <v-container>
          <h1>Dashboard</h1>

          <v-row class="py-4">
            <v-col cols="6"></v-col>
            <v-col cols="6" class="text-right">
              <v-btn color="indigo white--text" v-on:click="openAgregarEvento()">Agregar evento</v-btn>
            </v-col>
          </v-row>

          <v-form ref="form" v-model="statusValido" lazy-validation class="py-10 text-right" v-if="isCreating">
            <h1 class="text-left">Agregar evento</h1>

            <h2 class="text-left py-4">Datos del Evento</h2>

            <v-row>
              <v-col cols="6">
                <v-select v-model="evento.tipoEvento" :items="tiposEventos" label="Tipo de evento*"
                  :rules="reglas.tipoEvento"></v-select>
              </v-col>

              <v-col cols="6" v-if="evento.tipoEvento == 'Otro'">
                <v-text-field label="Especifique*" hide-details="auto" v-model="evento.especifico"
                  :rules="reglas.especifico"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="Nombre de la Pareja y/o Familia y/o Principal del Evento*" hide-details="auto"
                  v-model="evento.nombreOwner" :rules="reglas.nombreOwner" required></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select v-model="evento.banquetera" :items="empresas[0]" item-text="nombre" item-value="id"
                  label="Banquetera" @change="actualizarEmpleados(evento.banquetera)"></v-select>
              </v-col>

              <v-col cols="6">
                <v-select v-model="evento.planner" :items="empleados" item-text="nombreEmpleado" item-value="idEmpleado"
                  label="Wedding / Event Planner"></v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field label="Fecha del evento*" hide-details="auto" type="date" v-model="evento.fechaEvento"
                  :rules="reglas.fechaEvento"></v-text-field>
              </v-col>

              <v-col cols="6" v-if="evento.tipoEvento !== 'Boda Ceremonial'">
                <v-text-field label="Hora del evento*" hide-details="auto" type="time" v-model="evento.horaEvento"
                  :rules="reglas.horaEvento"></v-text-field>
              </v-col>

              <v-col cols="6" v-if="evento.tipoEvento !== 'Boda Ceremonial'">
                <Map tipoUbicacion="evento" />
              </v-col>

              <v-col cols="6">
                <v-text-field label="Numero de invitaciones (opcional)" hide-details="auto" type="number" min="0"
                  v-model="evento.numeroInvitaciones"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="Links de mesas de regalos (opcional)" hide-details="auto"
                  v-model="evento.linkMesas"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select v-model="evento.codigoVestimenta" :items="opcionesCodigoVestimenta"
                  label="Código de Vestimenta*" :rules="reglas.codigoVestimenta"></v-select>
              </v-col>

              <v-col cols="6">
                <v-file-input id="campoDocs" accept=".pdf, .jpg" small-chips multiple
                  label="Subir invitación* (Mínimo requerido 1 archivo de hasta 800 KB)" v-model="arrayPDF"
                  :rules="[validacionArrayPDF]" :show-size="1000" prepend-icon="mdi-file-document-plus"
                  :error="docsError" @change="subirImagenes()"></v-file-input>

                <ul>
                  <li v-for="item of list">{{ item.originalName }}</li>
                </ul>
              </v-col>

              <v-col cols="6">
                <v-checkbox v-model="evento.soloAdultos" label="Sólo adultos"></v-checkbox>
              </v-col>
            </v-row>

            <div v-if="evento.tipoEvento !== 'Boda Civil'">
              <h2 class="text-left py-2">Datos de la Ceremonia</h2>

              <v-row>
                <v-col cols="6">
                  <Map tipoUbicacion="ceremonia" />
                </v-col>

                <v-col cols="6">
                  <v-text-field label="Fecha de la ceremonia*" hide-details="auto" type="date"
                    v-model="evento.fechaCeremonia" :rules="reglas.fechaCeremonia"></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field label="Horario de la ceremonia*" hide-details="auto" type="time"
                    v-model="evento.horarioCeremonia" :rules="reglas.horarioCeremonia"></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-select v-model="evento.ceremoniaAdicional" :items="opcionesBoolean"
                    label="Ceremonia Adicional (opcional)" :rules="reglas.ceremoniaAdicional"></v-select>
                </v-col>

                <v-col cols="6" v-if="evento.ceremoniaAdicional == 'Si'">
                  <Map tipoUbicacion="ceremoniaAdicional" />
                </v-col>

                <v-col cols="6" v-if="evento.ceremoniaAdicional == 'Si'">
                  <v-text-field label="Hora de la ceremonia adicional*  " hide-details="auto" type="time"
                    v-model="evento.horaCeremoniaAdicional" :rules="reglas.horaCeremoniaAdicional"></v-text-field>
                </v-col>
              </v-row>
            </div>

            <h2 class="text-left pt-6 pb-4">Datos del Cliente</h2>

            <v-row clas="pb-2">
              <v-col cols="6">
                <v-text-field label="Nombre del cliente*" hide-details="auto" v-model="evento.nombreCliente"
                  :rules="reglas.nombreCliente"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field label="Telefono del cliente*" hide-details="auto" v-model="evento.telefonoCliente"
                  :rules="reglas.telefonoCliente"></v-text-field>
              </v-col>
            </v-row>

            <h2 class="text-left pt-6 pb-4">Estilos de la invitación</h2>

            <v-row>
              <v-col cols="6" class="text-left">
                <div class="d-none">
                  <h2>Opciones de Fuente</h2>
                  <h3>Título</h3>

                  <p
                    :style="`font-size:${evento.tamanoFuenteTitulo}px; font-family:${evento.fuenteTitulo}; color:${evento.colorFuenteTitulo}`">
                    Lorem ipsum</p>

                  <v-row>
                    <v-col cols="6">
                      <v-select v-model="evento.fuenteTitulo" :items="opciones[0].estilos.fuentes" item-text="nombre"
                        item-value="valor" label="Fuente" class="py-3"></v-select>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model="evento.tamanoFuenteTitulo" type="number" label="Tamaño de fuente"
                        class="py-3"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-select v-model="evento.colorFuenteTitulo" :items="opciones[0].estilos.coloresFuentes"
                        item-text="nombre" item-value="valor" label="Color de fuente del título"
                        class="py-3"></v-select>
                    </v-col>
                  </v-row>
                  <h3>Cuerpo</h3>

                  <p
                    :style="`font-size:${evento.tamanoFuenteCuerpo}px; font-family:${evento.fuenteCuerpo}; color:${evento.colorFuenteCuerpo}`">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet ipsam quia officia nisi. Ad eius
                    harum pariatur autem expedita cupiditate commodi fugiat rerum ullam, perspiciatis natus enim, quidem
                    adipisci at.</p>
                  <v-row>
                    <v-col cols="6">
                      <v-select v-model="evento.fuenteCuerpo" :items="opciones[0].estilos.fuentes" item-text="nombre"
                        item-value="valor" label="Fuente" class="py-3"></v-select>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field v-model="evento.tamanoFuenteCuerpo" type="number" label="Tamaño de fuente"
                        class="py-3"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-select v-model="evento.colorFuenteCuerpo" :items="opciones[0].estilos.coloresFuentes"
                        item-text="nombre" item-value="valor" label="Color de fuente del cuerpo"
                        class="py-3"></v-select>
                    </v-col>
                  </v-row>
                </div>

                <h2>Tema</h2>

                <v-col cols="12">
                  <v-select v-model="evento.tema" :items="opciones[0].temas" item-text="nombre" return-object label="Tema"
                    class="py-3"></v-select>
                </v-col>
              </v-col>
              <v-col cols="6" class="text-left">
                <h2>Vista previa del tema</h2>

                <v-img :src="`https://workspacedigiart.com/img/temas/${temaPreview}`" width="200px"
                  class="grey lighten-2 ml-auto mr-auto" />

                <v-select class="d-none" v-model="evento.fondo" :items="opciones[0].estilos.fondos" label="Fondo"></v-select>
              </v-col>
            </v-row>

            <v-btn color="red white--text my-5" v-on:click="validacion">Agregar</v-btn>

          </v-form>

          <v-card class="px-8 py-6">
            <v-card-title>
              Eventos
            </v-card-title>
            <template>
              <v-data-table :headers="headers" :items="this.eventos[0]" :items-per-page="5" class="elevation-1">
                <template v-slot:item.actions="{ item }">
                  <router-link :to="`/detallesEvento/${item.id}`" tag="button">
                    <v-icon medium color="info" class="mr-2">
                      mdi-pencil
                    </v-icon>
                  </router-link>
                  <v-icon medium color="error" class="d-none">
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
    <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout" :color="snackbar.color" fixed right top>
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
  name: 'Home',

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
        text: 'Evento',
        align: 'start',
        sortable: false,
        value: 'tipoEvento',
      },
      { text: 'Cliente', value: 'nombreCliente' },
      { text: 'Telefono del cliente', value: 'telefonoCliente' },
      { text: 'Fecha y hora del evento', value: 'fechaEvento' },
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
    tiposEventos: [
      'Boda Religiosa',
      'Boda Civil',
      'Boda Civil y Religiosa',
      'Boda Ceremonial',
      'Graduación',
      'Quince años',
      'Bautizo',
      'Primera Comunión',
      'Evento Social',
      'Otro'
    ],
    reglas: {
      especifico: [
        v => !!v || 'Especifique el tipo de evento'
      ],
      fechaCeremonia: [
        v => !!v || 'La fecha de la ceremonia es requerida'
      ],
      fechaEvento: [
        v => !!v || 'Se requiere la fecha del evento'
      ],
      horarioCeremonia: [
        v => !!v || 'Se requiere la hora de la ceremonia'
      ],
      horaCeremoniaAdicional: [
        v => !!v || 'Se requiere la hora de la ceremonia adicional'
      ],
      horaEvento: [
        v => !!v || 'Se requiere la hora del evento'
      ],
      nombreCliente: [
        v => !!v || 'El nombre del cliente es requerido'
      ],
      nombreOwner: [
        v => !!v || 'Se requiere el nombre de la pareja/familia o principal del evento'
      ],
      telefonoCliente: [
        v => !!v || 'El telefono del cliente es requerido'
      ],
      tipoEvento: [
        v => !!v || 'El tipo de evento es requerido'
      ]
    },
    statusValido: false
  }),

  computed: {
    ...mapState(['empleados', 'empresas', 'eventos', 'evento', 'opciones', 'respuestaAnadirEvento']),

    logged() {
      return localStorage.getItem("isLogged");
    },

    temaPreview() {
      return this.evento.tema.preview;
    }
  },

  watch: {
    respuestaAnadirEvento(nuevaRespuesta, respuestaAnterior) {
      if (nuevaRespuesta != respuestaAnterior && nuevaRespuesta == 'exito') {
        this.snackbar.text = "El evento se ha añadido con exito";
        this.snackbar.open = true;
        setTimeout(() => {
          //this.snackbar.text = "";
          window.location.reload(true);
        }, 4000);
      }
    }
  },

  methods: {

    ...mapActions(['addEvento', 'getEmpleados', 'getEmpresas', 'getEventos', 'getOpciones', 'resetEvento']),

    agregarEvento() {
      this.addEvento(this.evento);
    },

    initialize() {
      this.getEventos();
      this.getOpciones();
      this.getEmpresas();
    },

    async subirImagenes() {
      if (this.arrayPDF.length == 0) {
        //document.getElementById("zonaImagenes").innerHTML = "";
      } else {
        let formData = new FormData();
        for (let doc of this.arrayPDF) {
          formData.append("file", doc);
          let respuesta = await axios.post(
            "https://workspacedigiart.com/helpers/upload-doc.php",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          ).then(function (response) {
            if (response.data.doc == '') {
            } else {
              sessionStorage.setItem('oldNombreDoc', response.data.oldDoc);
              sessionStorage.setItem('nombreDoc', response.data.doc);
              //document.getElementById("imagenCargada").innerHTML = `<img src='https://www.agenciaweb.mx/agronome/${nombreImagen}' style="width: 70px;">`;
            }
          });
          this.objectDoc = {
            name: sessionStorage.getItem('nombreDoc'),
            originalName: sessionStorage.getItem('oldNombreDoc'),
          };
          this.list.push(this.objectDoc);
          this.docsError = false;
          this.textDocsError = '';
        };
        this.evento.docs = this.list;
        this.arrayPDF = [];
      }
    },

    openAgregarEvento() {
      this.resetEvento();
      this.isCreating = !this.isCreating;
    },

    actualizarEmpleados(id) {
      console.log(id);
      this.getEmpleados(id);
    },
    validacion() {
      this.$refs.form.validate() ? this.agregarEvento() : null;
    },
    validacionArrayPDF() {
      return this.evento.docs.length != 0 ? true : 'Agregue un invitación para su evento'
    }
  }
}
</script>
