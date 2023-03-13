<template>
    <div class="text-center theme-wedding"
        style="background-image: url('https://workspacedigiart.com/img/fondos/fondoboda.jpeg');">
        <div :class="{
            'container full-height': !datosPrincipales,
            'container ': datosPrincipales,
        }">
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <div v-if="visibles.bienvenida == false && visibles.confirmacionAsistencia == true">
                        <div v-if="datosPrincipales">
                            <div>

                                <div class="text-center font gold--text owner">
                                    {{ datosApp.evento.nombreOwner }}
                                </div>

                                <div class="text-center pt-4 nos-casamos">
                                    <div>
                                        Nos uniremos en matrimonio y nos <br> complace invitarlos a la ceremonia <br>
                                        religiosa que
                                        tendrá lugar el próximo
                                    </div>
                                </div>

                                <div class="text-center pt-4 nos-casamos">
                                    <div class="fecha-ceremonia">{{ fechaCeremoniaReadable }}</div>

                                    <div class="hora-ceremonia" v-if="tipoEvento !== 'Boda Civil'">
                                        {{ datosApp.evento.horarioCeremonia }} hrs
                                    </div>

                                    <div class="lugar-ceremonia" v-if="tipoEvento !== 'Boda Civil'">
                                        {{ datosApp.evento.textoLocacionCeremonia }}
                                    </div>
                                </div>

                                <a :href="coordinatesCeremonia" target="_blank" v-if="tipoEvento !== 'Boda Civil'">
                                    <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                                        <v-icon>mdi-map-marker</v-icon> Ver ubicación de la ceremonia <br> en Google Maps
                                    </v-btn>
                                </a>

                                <div v-if="tipoEvento !== 'Boda Ceremonial'">
                                    <img src='@/assets/img/separator.svg' alt="some file" height='46' width='237' />

                                    <div class="title-text">Recepción</div>

                                    <div class="hora-ceremonia">{{ datosApp.evento.horaEvento }} hrs</div>

                                    <div class="lugar-ceremonia">{{ datosApp.evento.textoLocacionEvento }}</div>

                                    <a :href="coordinatesEvento" target="_blank">
                                        <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                                            <v-icon>mdi-map-marker</v-icon> Ver ubicación del evento <br> en Google Maps
                                        </v-btn>
                                    </a>
                                </div>

                                <div>
                                    <img src='@/assets/img/separator.svg' alt="some file" height='46' width='237' />
                                    <div class="title-text">Obsequios</div>
                                    <div class="nos-casamos">{{ datosApp.evento.linkMesas }}</div>
                                </div>

                                <div>
                                    <img src='@/assets/img/separator.svg' alt="some file" height='46' width='237' />
                                    <div class="title-text">Vestimenta</div>
                                    <div class="nos-casamos">{{ datosApp.evento.codigoVestimenta }}</div>
                                </div>

                                <div>
                                    <div class="nos-casamos py-4" v-if="datosApp.evento.soloAdultos">
                                        Para permitir a todos los invitados,
                                        incluidos los padres, una noche de relajación,
                                        hemos elegido que nuestra boda sea una ocasión solo para adultos.
                                        <br><br>
                                        ¡No podemos esperar para celebrar contigo!
                                    </div>
                                </div>

                                <div>
                                    <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0"
                                        v-on:click="() => { this.datosPrincipales = !this.datosPrincipales }">
                                        <span v-if="this.datosApp.invitado.isUpdated">
                                            Actualizar datos de confirmación
                                        </span>
                                        <span v-else>
                                            Confirmar datos
                                        </span>
                                        <v-icon>mdi-arrow-right-bold</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>

                        <div class="app-container" v-if="!datosPrincipales">
                            <p class="pb-4 title-text">
                                {{ this.datosApp.evento.nombreOwner }}
                            </p>

                            <p class="body-text">
                                Sería de nuestro agrado saber su confirmación
                            </p>

                            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0"
                                v-on:click="confirmarAsistencia('si')">Asistiré</v-btn>

                            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0"
                                v-on:click="confirmarAsistencia('no')">No
                                Asistiré</v-btn>

                            <p class="pt-4 subtext d-none">Tiene hasta el {{ deadline }} a las 23:00 hrs</p>
                        </div>
                    </div>
                    <div class="app-container">
                        <div v-if="visibleAsistentes">
                            <div v-if="visibles.asistencia == 'si'">
                                <h1 class="title-text">
                                    ¡Gracias por Confirmar!</h1>

                                <div>
                                    <p class="body-text pt-4">
                                        ¿Podría decirnos cuantos personas asistirán?
                                    </p>

                                    <v-form>
                                        <v-select v-model="datosApp.invitado.asistentesConfirmados" label="Número de asistentes"
                                            :items="arrayAsistentes" color="#000"></v-select>

                                        <p class="body-text pt-4">
                                            ¿Cuenta con alguna alergia o preferencia alimenticia?
                                        </p>

                                        <v-btn class="text-lg font-weight-bold my-3" @click="abrirPlatillosForm">+ Agregar
                                            platillos especiales</v-btn>

                                        <div v-if="isAddingPlate || isEditingPlate">
                                            <v-row>
                                                <v-col>
                                                    <v-select v-model="objPlatillo.cantidadPlatillosEspeciales"
                                                        label="Cantidad de platillos" :items="arrayCalcularPlatillos"
                                                        color="#000"></v-select>
                                                </v-col>

                                                <v-col>
                                                    <v-select v-model="objPlatillo.tipoPlatillo" @change="onChangeTipoPlatillo" label="Tipo de platillo"
                                                        :items="['Alergia alimentaria', 'Preferencia alimenticia', 'Ambos']"
                                                        color="#000"></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row
                                                v-if="objPlatillo.tipoPlatillo == 'Alergia alimentaria' || objPlatillo.tipoPlatillo == 'Ambos'">
                                                <v-col>
                                                    <v-text-field v-model="objPlatillo.descripcionAlergias"
                                                        label="Describa su alergia alimenticia"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row
                                                v-if="objPlatillo.tipoPlatillo == 'Preferencia alimenticia' || objPlatillo.tipoPlatillo == 'Ambos'">
                                                <v-col>
                                                    <v-select v-model="objPlatillo.preferenciasSeleccionadas"
                                                        label="Seleccione la(s) preferecia(s): "
                                                        :items="arrayPreferenciasAlimenticias" color="#000"
                                                        multiple></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-btn v-if="isAddingPlate" color="#E6C98A" class="white--text my-3" tile elevation="0"
                                                v-on:click="addPlatilloArray()">Agregar platillo (s)</v-btn>
                                            
                                            <v-btn v-if="isEditingPlate" color="#E6C98A" class="white--text my-3" tile elevation="0"
                                                v-on:click="updatePlatillo()">Editar platillo (s)</v-btn>
                                        </div>

                                        <v-card>
                                            <v-simple-table v-if="datosApp.invitado.platillosEspeciales.length > 0">
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">
                                                                Cantidad
                                                            </th>
                                                            <th class="text-center">
                                                                Tipo
                                                            </th>
                                                            <th class="text-center">
                                                                Descripción Alergia
                                                            </th>
                                                            <th class="text-center">
                                                                Preferencias alimenticias
                                                            </th>
                                                            <th class="text-center">
                                                                Acciones
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in platillosEspecialesFresh"
                                                            :key="item.name">
                                                            <td>{{ item.cantidadPlatillosEspeciales }}</td>
                                                            <td>{{ item.tipoPlatillo }}</td>
                                                            <td>{{ item.descripcionAlergias }}</td>
                                                            <td>
                                                                <ul v-if="item.preferenciasSeleccionadas.length > 0">
                                                                    <li
                                                                        v-for="preferencia in item.preferenciasSeleccionadas">
                                                                        {{ preferencia }}
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <v-btn icon>
                                                                    <v-icon color="info" small
                                                                        v-on:click="editandoPlatillo(item, index)">
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                </v-btn>

                                                                <v-btn icon>
                                                                    <v-icon color="error" small
                                                                        v-on:click="deletePlatilloImport(index)">
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card>

                                        <v-btn color="#E6C98A" class="white--text my-6" tile elevation="0"
                                            v-on:click="setNumeroAsistentes()">Guardar selecciones</v-btn>
                                    </v-form>
                                </div>
                            </div>

                            <div v-if="visibles.asistencia == 'no'">
                                <h1 class="title-text">
                                    Lamentamos que no puedas asistir
                                </h1>

                                <p class="body-text py-4">
                                    Si cambias de opinión puedes modificar tu selección
                                </p>

                                <p class="pt-4 subtext d-none"> {{ deadline }} a las 23:00 hrs</p>

                                <span class="d-none">Regresar a la página principal</span><br>

                                <a href="/" class="d-none">
                                    <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                                        <v-icon>mdi-arrow-u-left-bottom</v-icon>
                                    </v-btn>
                                </a>
                            </div>
                        </div>
                        <div v-else>

                            <h3>Nombre: </h3>

                            <p>{{ this.datosApp.invitado.nombreInvitado }}</p>

                            <h3>Número de asistentes confirmados: </h3>

                            <p>{{ this.datosApp.invitado.asistentesConfirmados }}</p>

                            <h3>Platillos específicos: </h3>
                            
                            <v-card>
                                            <v-simple-table v-if="datosApp.invitado.platillosEspeciales.length > 0">
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">
                                                                Cantidad
                                                            </th>
                                                            <th class="text-center">
                                                                Tipo
                                                            </th>
                                                            <th class="text-center">
                                                                Descripción Alergia
                                                            </th>
                                                            <th class="text-center">
                                                                Preferencias alimenticias
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in platillosEspecialesFresh"
                                                            :key="item.name">
                                                            <td>{{ item.cantidadPlatillosEspeciales }}</td>
                                                            <td>{{ item.tipoPlatillo }}</td>
                                                            <td>{{ item.descripcionAlergias }}</td>
                                                            <td>
                                                                <ul v-if="item.preferenciasSeleccionadas.length > 0">
                                                                    <li
                                                                        v-for="preferencia in item.preferenciasSeleccionadas">
                                                                        {{ preferencia }}
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card>

                            <p class="d-none">
                                Puedes cambiar tu selección antes del:
                            </p>

                            <p class="pt-4 subtext d-none"> {{ deadline }} a las 23:00 hrs</p>

                            <span class="d-block">¡Los datos de tu confirmación se ha registrado exitosamente!</span>

                            <span class="d-none">¡Tu confirmación se ha actualizado!</span><br>

                            <span>¡Gracias, te esperamos!</span>
                        </div>
                    </div>
                </v-row>
            </v-container>
        </div>

        <v-snackbar v-model="snackbar.open" :timeout="snackbar.timeout" :color="snackbar.color" fixed right top>
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import * as moment from 'moment';
import { stringLength } from '@firebase/util';

export default {
    name: 'ThemeWedding1',

    components: {
    },

    data: () => ({
        codigoEvento: "",
        coordenadasGrados: "",
        datosPrincipales: true,
        isAddingPlate: false,
        isEditingPlate: false,
        totalAsistentes: "0",
        indexEditado: 0,
        platilloEditado: {},
        preferenciasSeleccionadas: [],
        platillosEspeciales: [],
        visibleAsistentes: true,
        arrayPreferenciasAlimenticias: [
            'Vegano',
            'Vegetariano',
            'Kosher',
            'Keto',
            'Libre de gluten'
        ],
        objPlatillo: {},
        snackbar: {
            open: false,
            text: "",
            color: "green darken-1 white--text",
            timeout: 3500,
        },
    }),

    computed: {
        ...mapState(['visibles', 'datosApp']),

        deadline() {
            moment.locale('es-mx');
            return moment(this.datosApp.evento.fechaEvento).subtract(2, 'months').format('LL');
        },

        fechaCeremoniaReadable() {
            moment.locale('es-mx');
            return moment(this.datosApp.evento.fechaEvento).format('Do [de] MMMM [del] YYYY');
        },

        coordinatesEvento() {
            const objCoordenadas = this.datosApp.evento.locacionEvento;
            return `https://www.google.com.mx/maps/search/${objCoordenadas.lat}, ${objCoordenadas.lng}`;
        },

        coordinatesCeremonia() {
            const objCoordenadas = this.datosApp.evento.locacionCeremonia;
            return `https://www.google.com.mx/maps/search/${objCoordenadas.lat}, ${objCoordenadas.lng}`;
        },

        arrayAsistentes() {
            let arrayRespuesta = [];
            for (let i = 1; i <= this.datosApp.invitado.totalAsistentes; i++) {
                arrayRespuesta.push(i.toString());
            }
            return arrayRespuesta;
        },

        arrayCalcularPlatillos() {
            let arrayRespuesta = [];
            let cantidadPlatillosEspeciales = 0;
            let sumaPlatillos = 0;
            let asistentesConfirmados = this.datosApp.invitado.asistentesConfirmados;

            if(this.datosApp.invitado.platillosEspeciales.length > 0) {
                this.datosApp.invitado.platillosEspeciales.map(platillo => {
                    sumaPlatillos = sumaPlatillos + parseInt(platillo.cantidadPlatillosEspeciales);
                });
            }
            console.log("suma platillos: " + sumaPlatillos);
            let seleccionables =  asistentesConfirmados - sumaPlatillos;
            console.log("seleccionables: " + seleccionables);
            for (let i = 1; i <= seleccionables; i++) {
                arrayRespuesta.push(i.toString());
            }
            return arrayRespuesta;
        },

        urlActual() {
            return window.location.href;
        },

        tipoEvento() {
            return this.datosApp.evento.tipoEvento;
        },

        platillosEspecialesFresh() {
            return this.datosApp.invitado.platillosEspeciales;
        }
    },

    methods: {
        ...mapActions(['confirmacionAsistencia', 'numeroAsistentes', 'deletePlatillo']),

        confirmarAsistencia(status) {
            this.confirmacionAsistencia(status);
        },

        setNumeroAsistentes() {
            if(this.datosApp.invitado.asistentesConfirmados) {
                this.visibleAsistentes = false;
                let opciones = {
                    asistentesConfirmados: this.datosApp.invitado.asistentesConfirmados,
                    platillosEspeciales: this.datosApp.invitado.platillosEspeciales
                }
                this.numeroAsistentes(opciones);
            } else {
                this.snackbar.text = "Confirme el número de asistentes";
                this.snackbar.open = true;
                this.snackbar.color = "red darken-1 white--text";
            }
        },
        addPlatilloArray() {
            if (this.objPlatillo.cantidadPlatillosEspeciales > 0 && this.objPlatillo.tipoPlatillo != "") {

                if (this.objPlatillo.tipoPlatillo == 'Alergia alimentaria') {
                    this.objPlatillo.preferenciasSeleccionadas = [];
                } else if (this.objPlatillo.tipoPlatillo == 'Preferencia alimenticia') {
                    this.objPlatillo.descripcionAlergias = "";
                }

                this.datosApp.invitado.platillosEspeciales.push(this.objPlatillo); 

                this.objPlatillo = {
                    cantidadPlatillosEspeciales: "0",
                    tipoPlatillo: "",
                    descripcionAlergias: "",
                    preferenciasSeleccionadas: []
                };

            } else {
                //alerta error
                this.snackbar.text = "Verifique la cantidad de platillos y tipo de platillo";
                this.snackbar.open = true;
                this.snackbar.color = "red darken-1 white--text";
            }
        },

        abrirPlatillosForm() {
            let platillosLimite = 1;
            if(this.datosApp.invitado.asistentesConfirmados) {
                platillosLimite = this.datosApp.invitado.asistentesConfirmados;
            }
            let cantidadPlatillosEsp = this.datosApp.invitado.platillosEspeciales.length; 

            if(cantidadPlatillosEsp >= platillosLimite) {
                this.snackbar.text = "Se agotaron los platillos por seleccionar";
                this.snackbar.open = true;
                this.snackbar.color = "red darken-1 white--text";
            } else {
                this.objPlatillo = {
                    cantidadPlatillosEspeciales: "0",
                    tipoPlatillo: "",
                    descripcionAlergias: "",
                    preferenciasSeleccionadas: []
                };
                this.isEditingPlate = false;
                this.isAddingPlate = !this.isAddingPlate;
            }
        },

        editandoPlatillo(platillo, index) {
            this.isAddingPlate = false;
            this.isEditingPlate = !this.isEditingPlate;
            this.indexEditado = index;
            //this.platilloEditado = platillo;
            this.objPlatillo = platillo;
        },

        updatePlatillo() {
            this.datosApp.invitado.platillosEspeciales[this.indexEditado] = this.objPlatillo;
            this.snackbar.text = "Platillo actualizado";
            this.snackbar.open = true;
            this.isEditingPlate = false;
        },

        deletePlatilloImport(index) {
            this.deletePlatillo(index);
        },

        onChangeTipoPlatillo() {
            if (this.objPlatillo.tipoPlatillo == 'Alergia alimentaria') {
                this.objPlatillo.preferenciasSeleccionadas = [];
            } else if (this.objPlatillo.tipoPlatillo == 'Preferencia alimenticia') {
                this.objPlatillo.descripcionAlergias = "";
            }
        }
    }
}

</script>

<style scoped src="./styles.css"></style>
