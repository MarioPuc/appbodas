<template>
    <div>
        <transition name="fade" mode="out-in">
            <div key=1 class="loading" v-if="isLoading">
                <div>
                    <img :src="require('../assets/img/loading.gif')" />
                </div>
            </div>
            <div key=2 v-else>
                <ThemeBirthday1 v-if="datosApp.evento?.tema.nombre == 'Spark&Shine'"/>
                <ThemeWedding1 v-if="datosApp.evento?.tema.nombre == 'Nupcial'"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ThemeBirthday1 from '../components/themes/birthday-1/ThemeBirthday1.vue';
import ThemeWedding1 from '@/components/themes/wedding-1/ThemeWedding1.vue';

export default {
    name: 'InvitadosPorCodigoView',

    components: {
        ThemeBirthday1,
        ThemeWedding1
    },

    data: () => ({
        codigoEvento: "",
        isSetCode: false,
        isSetStage2: false,
        isStage2: "",
        isLoading: true,
        show: true
    }),

    created() {
        this.initialize();
    },

    computed: {
        ...mapState(['visibles', 'datosApp']),
    },

    methods: {
        ...mapActions(['getInvitadoById']),

        sendCode() {
            console.log(this.codigoEvento);
            this.isSetCode = true;
        },

        stage2(asistance) {
            if (!asistance) {
                return this.isStage2 = "no";
            }
            return this.isStage2 = "si";
        },
        async initialize() {
            this.$route.params.idInvitado ? await this.getInvitadoById(this.$route.params.idInvitado) : null;
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.loading {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    border: solid red 1px;
    align-items: center;
    justify-content: center;
    background-color: #E3F4FD;
}
</style>
