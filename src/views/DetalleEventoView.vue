<template>
    <div class="dashboard">
        <div class="container">
            <Navbar />

            <div v-if="logged === 'Logged'">

                <v-container>
                    <h1>Detalles del Evento</h1>
                    
                    <v-form
                      ref="form"
                      v-model="statusValido"
                      lazy-validation
                      class="py-10 text-right"
                    >
                      <h2 class="text-left">Editar evento</h2>

                      <h2 class="text-left py-4">Datos del Evento</h2>

                      <v-row >
                      <v-col cols="6">
                        <v-select
                          v-model="evento.tipoEvento"
                          :items="tiposEventos"
                          label="Tipo de evento*"
                          :rules="reglas.tipoEvento"
                        ></v-select>
                      </v-col>

                      <v-col cols="6" v-if="evento.tipoEvento == 'Otro'">
                        <v-text-field
                          label="Especifique*"
                          hide-details="auto"
                          v-model="evento.especifico"
                          :rules="reglas.especifico"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="6">
                        <v-text-field
                          label="Nombre de la Pareja y/o Familia y/o Principal del Evento*"
                          hide-details="auto"
                          v-model="evento.nombreOwner"
                          :rules="reglas.nombreOwner"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-select
                          v-model="evento.banquetera"
                          :items="banqueteras"
                          label="Banquetera"
                        ></v-select>
                      </v-col>

                      <v-col cols="6">
                        <v-select
                          v-model="evento.planner"
                          :items="planners"
                          label="Wedding / Event Planner"
                        ></v-select>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Fecha del evento*"
                          hide-details="auto"
                          type="date"
                          v-model="evento.fechaEvento"
                          :rules="reglas.fechaEvento"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Hora del evento*"
                          hide-details="auto"
                          type="time"
                          v-model="evento.horaEvento"
                          :rules="reglas.horaEvento"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Locación del evento*"
                          hide-details="auto"
                          v-model="evento.locacionEvento"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Numero de invitaciones (opcional)"
                          hide-details="auto"
                          type="number"
                          min="0"
                          v-model="evento.numeroInvitaciones"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Links de mesas de regalos (opcional)"
                          hide-details="auto"
                          v-model="evento.linkMesas"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-select
                          v-model="evento.codigoVestimenta"
                          :items="opcionesCodigoVestimenta"
                          label="Código de Vestimenta*"
                          :rules="reglas.codigoVestimenta"
                        ></v-select>
                      </v-col>

                      <v-col cols="6">
                        <v-file-input
                            id="campoDocs"
                            accept=".pdf, .jpg"
                            small-chips
                            multiple
                            label="Subir invitación* (Mínimo requerido 1 archivo de hasta 800 KB)"
                            v-model="arrayPDF"
                            :show-size="1000"
                            prepend-icon="mdi-file-document-plus"
                            :error="docsError"
                            @change="subirImagenes()"
                        ></v-file-input>

                        <ul>
                          <li v-for="item of evento.docs">
                            <a 
                              :href="'https://workspacedigiart.com/helpers/' + item.name"
                              target="_blank"                            
                            >
                              {{ item.originalName }}</a>
                          </li>
                        </ul>
                      </v-col>
                      
                      <v-col cols="6">
                        <v-checkbox
                          v-model="evento.soloAdultos"
                          label="Sólo adultos"
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                    <div>

                      <h2 class="text-left py-2">Datos de la Ceremonia</h2>

                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            label="Lugar de la misa / ceremonia*"
                            hide-details="auto"
                            v-model="evento.locacionCeremonia"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            label="Fecha de la ceremonia*"
                            hide-details="auto"
                            type="date"
                            v-model="evento.fechaCeremonia"
                            :rules="reglas.fechaCeremonia"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            label="Horario de la ceremonia*"
                            hide-details="auto"
                            type="time"
                            v-model="evento.horarioCeremonia"
                            :rules="reglas.horarioCeremonia"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-select
                            v-model="evento.ceremoniaAdicional"
                            :items="opcionesBoolean"
                            label="Ceremonia Adicional (opcional)"
                            :rules="reglas.ceremoniaAdicional"
                          ></v-select>
                        </v-col>
                        
                        <v-col cols="6" v-if="evento.ceremoniaAdicional == 'Si'">
                          <v-text-field
                            label="Locación de la ceremonia adicional*"
                            hide-details="auto"
                            v-model="evento.locacionCeremoniaAdicional"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6" v-if="evento.ceremoniaAdicional == 'Si'">
                          <v-text-field
                            label="Hora de la ceremonia adicional*  "
                            hide-details="auto"
                            type="time"
                            v-model="evento.horaCeremoniaAdicional"
                            :rules="reglas.horaCeremoniaAdicional"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                    </div>

                    <h2 class="text-left pt-6 pb-4">Datos del Cliente</h2>

                    <v-row clas="pb-2">
                      
                      <v-col cols="6">
                        <v-text-field
                          label="Nombre del cliente*"
                          hide-details="auto"
                          v-model="evento.nombreCliente"
                          :rules="reglas.nombreCliente"
                      ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          label="Telefono del cliente*"
                          hide-details="auto"
                          v-model="evento.telefonoCliente"
                          :rules="reglas.telefonoCliente"
                      ></v-text-field>
                      </v-col>

                    </v-row>

                    <h2 class="text-left pt-6 pb-4">Estilos de la invitación</h2>

                    <v-row>
                      <v-col cols="6" class="text-left">
                        <h2 >Opciones de Fuente</h2>
                        <h3>Título</h3>

                        <p 
                        :style="`font-size:${evento.tamanoFuenteTitulo}px; font-family:${evento.fuenteTitulo}; color:${evento.colorFuenteTitulo}`"
                        >Lorem ipsum</p>

                        <v-row>
                        <v-col cols="6">
                          <v-select
                            v-model="evento.fuenteTitulo"
                            :items="opciones[0].estilos.fuentes"
                            item-text="nombre"
                            item-value="valor"
                            label="Fuente"
                            class="py-3"
                          ></v-select>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="evento.tamanoFuenteTitulo"
                            type="number"
                            label="Tamaño de fuente"
                            class="py-3"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-select
                            v-model="evento.colorFuenteTitulo"
                            :items="opciones[0].estilos.coloresFuentes"
                            item-text="nombre"
                            item-value="valor"
                            label="Color de fuente del título"
                            class="py-3"
                          ></v-select>
                        </v-col>
                      </v-row>
                        <h3>Cuerpo</h3>

                        <p 
                        :style="`font-size:${evento.tamanoFuenteCuerpo}px; font-family:${evento.fuenteCuerpo}; color:${evento.colorFuenteCuerpo}`"
                        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet ipsam quia officia nisi. Ad eius harum pariatur autem expedita cupiditate commodi fugiat rerum ullam, perspiciatis natus enim, quidem adipisci at.</p>
                        <v-row>
                        <v-col cols="6">
                          <v-select
                            v-model="evento.fuenteCuerpo"
                            :items="opciones[0].estilos.fuentes"
                            item-text="nombre"
                            item-value="valor"
                            label="Fuente"
                            class="py-3"
                          ></v-select>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="evento.tamanoFuenteCuerpo"
                            type="number"
                            label="Tamaño de fuente"
                            class="py-3"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-select
                            v-model="evento.colorFuenteCuerpo"
                            :items="opciones[0].estilos.coloresFuentes"
                            item-text="nombre"
                            item-value="valor"
                            label="Color de fuente del cuerpo"
                            class="py-3"
                          ></v-select>
                        </v-col>
                      </v-row>
                      </v-col>
                      <v-col cols="6" >
                        <v-img
                          :src="`https://workspacedigiart.com/img/fondos/${evento.fondo}`"
                          aspect-ratio="1"
                          width="200px"
                          class="grey lighten-2 ml-auto mr-auto"
                        />

                        <v-select
                          v-model="evento.fondo"
                          :items="opciones[0].estilos.fondos"
                          label="Fondo"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-btn color="red white--text my-5" v-on:click="actualizarEvento(evento)">Guardar cambios</v-btn>

                    </v-form>

                    <v-card class="px-8 py-6">
                        <h1>Invitados</h1>

                        <v-form 
                          ref="form"
                          v-model="statusValidoInvitado"
                          lazy-validation class="py-10 text-right"
                        >
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
                        :rules="reglas.telefonoInvitado"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                        label="Total asistentes"
                        type="number"
                        min="1"
                        hide-details="auto"
                        v-model="invitado.totalAsistentes"
                        :rules="reglas.totalAsistentes"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                          label="Número de mesa"
                          type="number"
                          min="1"
                          hide-details="auto"
                          v-model="invitado.numeroMesa"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-btn color="red white--text" v-on:click="validacionInvitadoAdd()" v-if="!isEditing">Agregar Invitado</v-btn>
                    <v-btn color="red white--text" v-on:click="validacionInvitadoUpdate()" v-else>Actualizar Invitado</v-btn>

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

        <Map />
    </div>
  </template>
  
  <script>
    import { mapActions, mapState } from 'vuex';

    import axios from "axios";

    import Navbar from '@/components/Navbar.vue';
    import Map from '@/components/widgets/Map.vue'
    import MensajeBloqueo from '@/components/MensajeBloqueo.vue';

    export default {
    name: 'Home',

    created() {
    this.initialize();
  },

    components: {
    Navbar,
    Map,
    MensajeBloqueo
},

    data: () => ({
        arrayPDF: [],
        banqueteras: ['Camino', 'Banquetera2', 'Banquetera3'],
        docsError: false,
        isCreating: false,
        isEditing: false,

        headers: [
          { text: 'Nombre del invitado', value: 'nombreInvitado' },
          { text: 'Telefono del invitado', value: 'telefonoInvitado' },
          { text: 'Numero total de asistentes', value: 'totalAsistentes' },
          { text: 'Número de mesa', value: 'numeroMesa' },
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
            v=> !!v || 'El nombre del cliente es requerido'
          ],
          nombreOwner: [
            v => !!v || 'Se requiere el nombre de la pareja/familia o principal del evento'
          ],
          telefonoCliente: [
            v=> !!v || 'El telefono del cliente es requerido'
          ],
          tipoEvento: [
            v => !!v || 'El tipo de evento es requerido'
          ],
          nombreInvitado: [
            v => !!v || 'El nombre del invitado es requerido'
          ],
          telefonoInvitado: [
            v=> !!v || 'El telefono del cliente es requerido'
          ],
          totalAsistentes: [
            v=> !!v || 'El número de mesa es requerido'
          ]
        },
        statusValido: false,
        statusValidoInvitado: false
    }),

    computed: {
        ... mapState([ 'evento', 'eventos', 'invitados', 'opciones', 'respuestaEditarEvento']),

        logged() {
            return localStorage.getItem("isLogged");
        },
    },

    watch: {
      respuestaEditarEvento(nuevaRespuesta, respuestaAnterior) {
        if (nuevaRespuesta != respuestaAnterior && nuevaRespuesta == 'exito') {
          console.log("desde el watch de respuesta");
          this.snackbar.text = "El evento se ha modificado con exito";
          this.snackbar.open =  true;
          setTimeout(() => {
            //this.snackbar.text = "";
            window.location.reload(true);
          }, 4000);
        }
      }
    },

    methods: {

      ... mapActions(['addEvento', 'getEvento', 'getOpciones', 'updateEvento', 'addInvitado', 'getInvitados', 'updateInvitado']),

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
        this.getOpciones();
      },

      async subirImagenes(){
      if(this.arrayPDF.length == 0){
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
            ).then(function(response){
              if(response.data.doc == ''){
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
      validacion() {
        this.$refs.form.validate() ? this.agregarEvento() : null ;
      },
      validacionInvitadoAdd() {
        this.$refs.form.validate() ? this.agregarInvitado() : null ;
      },
      validacionInvitadoUpdate() {
        this.$refs.form.validate() ? this.actualizarInvitado() : null ;
      },
      validacionArrayPDF() {
        return this.evento.docs.length != 0 ? true : 'Agregue un invitación para su evento'
      }
    }
  }
  </script>
