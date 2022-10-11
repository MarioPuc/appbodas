<template>
    <div class="login">
        <div class="container">
            <Navbar />
       
            <h1 class="text-center pb-6">Inicio de sesión</h1>

            <v-card class="text-center" >
                <div>
                    <v-row >
                    <div class="container" style="max-width: 500px;">
                        <v-form ref="form" v-model="valid" style="width: 100%;">
                            <v-col cols="12">

                            <v-text-field
                                class="pt-3"
                                v-model="user.name"
                                label="Correo electrónico"
                                outlined
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                            <v-text-field
                                v-model="user.password"
                                type="password"
                                label="Contraseña"
                                outlined
                                required
                            ></v-text-field>

                            <a class="ma-2 d-none" href="javascript:void(0)" @click="isRecoveryModalOpen = !isRecoveryModalOpen">
                                ¿Olvidaste tu contraseña? Recuperala aquí</a><br><br>

                            <v-btn class="miBoton white--text" color="indigo" @click="logIn">Iniciar sesión</v-btn>
                            </v-col>
                        </v-form>
                    </div>
                    </v-row>
                </div>
            </v-card>
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
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    export default {
    name: 'Home',

    components: {
    Navbar
},

    data: () => ({
        valid: false,
        user: {
            name: "",
            password: ""
        },
        snackbar: {
            open: false,
            text: "",
            color: "green darken-1 white--text",
            timeout: 3500,
        },
    }),

    computed: {
        logged() {
            return localStorage.getItem("isLogged");
        },
    },

    methods: {
        async logIn() {
            try {
                const auth = getAuth();
                const val = await signInWithEmailAndPassword(auth, this.user.name, this.user.password);
                console.log(val);
                localStorage.setItem("isLogged", "Logged");
                this.$router.replace({ name: "dashboard" });
            } catch (err) {
                console.log(err);
                this.snackbar.color = "red darken-1 white--text";
                if(err.code == "auth/user-not-found") {
                this.snackbar.text = "El usuario no existe o ha sido eliminado";
                } else if (err.code == "auth/wrong-password") {
                this.snackbar.text = "La contraseña de este usuario es incorrecta";
                } else if(err.code == "auth/network-request-failed") {
                this.snackbar.text = "Error de conexión, es posible que su conexión sea baja o haya exedido el tiempo limite de espera";
                }
                this.snackbar.open = true;
            }
            },
    }

    }

    
  </script>