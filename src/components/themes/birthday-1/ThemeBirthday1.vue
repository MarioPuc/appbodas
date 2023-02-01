<template>
    <div class="text-center theme-wedding"
        style="background-image: url('https://workspacedigiart.com/img/fondos/background-gems.png');">
        <div class="container full-height">
            <v-container fill-height fluid>
                <v-row align="center" justify="center">
                    <div v-if="visibles.bienvenida == false && visibles.confirmacionAsistencia == true">
                        <div v-if="datosPrincipales">
                            <div>
                                <div class="text-center font white--text sparkle">
                                    SPARKLE &
                                </div>

                                <div class="text-center font white--text shine">
                                    SHINE
                                </div>

                                <div class="text-center font white--text birthday-time">
                                    IT'S BIRTHDAY TIME!
                                </div>

                                <div class="text-center font white--text owner pt-4">
                                    {{ datosApp.evento.nombreOwner }}'S
                                </div>

                                <div class="text-center font white--text n-years d-none ">
                                    30 <sup style="font-size: 60px;">th</sup>
                                </div>

                                <div class="text-center font white--text party pb-4">
                                    PARTY
                                </div>


                                <div class="text-center font white--text fecha-evento">
                                    {{ datosApp.evento.fechaEvento }}
                                </div>

                                <div class="text-center font white--text ubicacion">
                                    {{ datosApp.evento.textoLocacionEvento }}
                                </div>

                                <a :href="coordinatesGrades" target="_blank">
                                    <v-btn color="#E6C98A" class="white--text my-5" tile elevation="0">
                                        <v-icon>mdi-map-marker</v-icon> Ver ubicación en Google Maps
                                    </v-btn>
                                </a>

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
                                Te / Les ha invitado a su fiesta de cumpleaños, por favor confirme su asistencia.
                            </p>

                            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0"
                                v-on:click="confirmarAsistencia('si')">Asistiré</v-btn>

                            <v-btn color="#E6C98A" class="white--text mx-2" tile elevation="0"
                                v-on:click="confirmarAsistencia('no')">No
                                Asistiré</v-btn>

                            <p class="pt-4 subtext d-none">Tiene hasta el {{ deadline }} a las 23:00 hrs</p>
                        </div>
                    </div>
                    <div class="app-container white--text">
                        <div v-if="visibleAsistentes">
                            <div v-if="visibles.asistencia == 'si'">
                                <h1 class="title-text">
                                    ¡GRACIAS POR SU <br> CONFIRMACIÓN!</h1>

                                <div>
                                    <p class="body-text">
                                        ¿Podría decirnos cuantos <br /> asistentes serán?</p>

                                    <v-form>
                                        <v-select v-model="totalAsistentes" label="Número de asistentes"
                                            :items="arrayAsistentes" color="#000"></v-select>

                                        <v-btn color="#E6C98A" class="white--text" tile elevation="0"
                                            v-on:click="setNumeroAsistentes()">Añadir número de invitados</v-btn>
                                    </v-form>
                                </div>
                            </div>

                            <div v-if="visibles.asistencia == 'no'">
                                <h1 class="title-text">
                                    LAMENTAMOS QUE NO PUEDAS ASISTIR</h1>

                                <p class="body-text">
                                    Si cambias de opinión puedes cambiar tu selección
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

                            <h3 class="d-none">Preferencias alimenticias: </h3>

                            <p class="d-none">N/A</p>

                            <h3 class="d-none">Alergias alimenticias: </h3>

                            <p class="d-none">N/A</p>

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
    name: 'ThemeBirthday1',

    components: {
    },

    data: () => ({
        codigoEvento: "",
        coordenadasGrados: "",
        datosPrincipales: true,
        totalAsistentes: "0",
        visibleAsistentes: true
    }),

    computed: {
        ...mapState(['visibles', 'datosApp']),

        deadline() {
            moment.locale('es-mx');
            return moment(this.datosApp.evento.fechaEvento).subtract(2, 'months').format('LL');
        },

        coordinatesGrades() {
            const objCoordenadas = this.datosApp.evento.locacionEvento;
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
        }
    },

    methods: {
        ...mapActions(['confirmacionAsistencia', 'numeroAsistentes']),

        confirmarAsistencia(status) {
            this.confirmacionAsistencia(status);
        },

        setNumeroAsistentes() {
            this.visibleAsistentes = false;
            this.numeroAsistentes(this.totalAsistentes);
        },
    }
}

</script>

<style>
@import './styles.css';
</style>
