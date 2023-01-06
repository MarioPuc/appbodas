<template>
    <div>
        <v-app-bar app color="grey lighten-3"  flat >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-row justify="space-between" align="center">
        <v-col cols="4">
          <router-link to="/dashboard">
          <v-img
            :src="require('../assets/logo.png')"
            class="ma-3"
            contain
            width="160"
            max-height="40"
            max-width="120"
          />
          </router-link>
        </v-col>
        <v-col cols="8" class="text-right">

          <div style="display: inline-block;" v-if="logged">
            cuenta
          </div>
          <v-btn icon @click="drawer2 = !drawer2" style="display: inline-block;">
            <v-icon color="orange">mdi-account-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
            
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <v-list>
                <v-list-item-group color="indigo">
                <v-list-item v-for="(link, n) in links" :key="`link${n}`" :to="link.to">
                {{ link.name }}
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer v-model="drawer2" fixed temporary right>
            <v-list>
                <v-list-item-group color="orange">
                <v-list-item to="/login" v-if="logged !== 'Logged'">
                    Iniciar sesión
                </v-list-item>

                <v-list-item @click="signOut" v-if="logged == 'Logged'">
                    Cerrar sesión
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import { getAuth, signOut } from "firebase/auth";

    export default {
    name: 'Home',

    components: {
    Navbar
},

    data: () => ({
        drawer: false,
        drawer2: false,
        links: [
            { to: "/dashboard", name: "Dashboard" },
            { to: "/empresas", name: "Empresas" }
        ],

    }),

    computed: {
        logged() {
            return localStorage.getItem("isLogged");
        },
    },

    methods: {
            async signOut() {
                try {
                    const data = await getAuth().signOut();
                    //console.log(data);
                    localStorage.setItem("isLogged", "");
                    localStorage.setItem("mail", "");
                    console.log(this.$route.name);
                    if(this.$route.name == "login"){
                    this.$router.go();
                    } else {
                    this.$router.replace({ name: "login" });
                    }
                } catch (err) {
                    console.log(err);
                }
            },
    }

    }

    
  </script>