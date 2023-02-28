<template>
    <div class="text-center theme-wedding"
        style="background-image: url('https://workspacedigiart.com/img/fondos/fondoboda.jpeg');">
        <div :class="{
            'container full-height': !datosPrincipales,
            'container ': datosPrincipales,
        }" >
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
                                    <img src='@/assets/img/separator.svg' alt="some file"  height='46' width='237' /> 
                                    <div class="title-text">Obsequios</div>
                                    <div class="nos-casamos">{{ datosApp.evento.linkMesas }}</div>
                                </div>

                                <div>
                                    <img src='@/assets/img/separator.svg' alt="some file"  height='46' width='237' /> 
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
                                        <v-select v-model="totalAsistentes" label="Número de asistentes"
                                            :items="arrayAsistentes" color="#000"></v-select>

                                        <p class="body-text pt-4">
                                            ¿Cuenta con alguna alergia o preferencia alimenticia?
                                        </p>

                                        <v-select v-model="numeroPlatillosEspecificos" label="Número de platillos a considerar: "
                                            :items="arrayAsistentes" color="#000"></v-select>

                                        <v-text-field v-model="descripcionAlergias" label="Describa su alergia alimenticia"></v-text-field>

                                        <v-select v-model="preferenciasSeleccionadas" label="Seleccione la(s) preferecia(s): "
                                            :items="arrayPreferenciasAlimenticias" color="#000" multiple></v-select>

                                        <v-btn color="#E6C98A" class="white--text" tile elevation="0"
                                            v-on:click="setNumeroAsistentes()">Guardar</v-btn>
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

                            <h3>Número de acompañantes: </h3>

                            <p>{{ this.datosApp.invitado.totalAsistentes }}</p>

                            <h3>Platillos específicos: </h3>

                            <p>{{ this.datosApp.invitado.numeroPlatillosEspecificos }}</p>

                            <h3>Preferencias alimenticias: </h3>

                            <p>
                              <ul>
                                <li v-for="item in this.datosApp.invitado.preferenciasSeleccionadas">
                                    {{ item }}
                                </li>
                              </ul>
                            </p>

                            <h3>Alergias alimenticias: </h3>

                            <p>{{ this.datosApp.invitado.descripcionAlergias }}</p>

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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import * as moment from 'moment';

export default {
    name: 'ThemeWedding1',

    components: {
    },

    data: () => ({
        codigoEvento: "",
        coordenadasGrados: "",
        datosPrincipales: true,
        totalAsistentes: "0",
        numeroPlatillosEspecificos: "0",
        descripcionAlergias: "",
        preferenciasSeleccionadas: [],
        visibleAsistentes: true,
        arrayPreferenciasAlimenticias: [
            'Vegano',
            'Vegetariano',
            'Kosher',
            'Keto',
            'Libre de gluten'
        ],
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
                arrayRespuesta.push(i);
            }
            return arrayRespuesta;
        },

        urlActual() {
            return window.location.href;
        },

        tipoEvento() {
            return this.datosApp.evento.tipoEvento;
        }
    },

    methods: {
        ...mapActions(['confirmacionAsistencia', 'numeroAsistentes']),

        confirmarAsistencia(status) {
            this.confirmacionAsistencia(status);
        },

        setNumeroAsistentes() {
            this.visibleAsistentes = false;
            let opciones = {
                totalAsistentes: this.totalAsistentes,
                numeroPlatillosEspecificos: this.numeroPlatillosEspecificos,
                descripcionAlergias: this.descripcionAlergias,
                preferenciasSeleccionadas: this.preferenciasSeleccionadas,
            }
            this.numeroAsistentes(opciones);
        },
    }
}

</script>

<style scoped src="./styles.css"></style>
