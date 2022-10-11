<template>
    <div>
        <v-card class="px-8 py-5">
            <h1>Contenido bloqueado</h1>

            <div class="py-8">
                No ha iniciado sesión o esta ha caducado, por favor inicie sesión con el siguiente enlace
            </div>
            
            <v-col cols="12" class="text-center">
                <v-btn to="/login" class="miBoton white--text" color="indigo" >Iniciar sesión</v-btn>
            </v-col>

        </v-card>
    </div>
</template>