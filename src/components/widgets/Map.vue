<template>
  <div>
    <div v-if="tipoUbicacion == 'evento'">
      <h3 class="text-left pb-1">Fije la ubicación de su evento</h3>
      <h4 class="text-left pb-3">Arrastre el pin a la ubicación de su evento</h4>

      <gmap-map :center="evento.locacionEvento" :zoom="14" style="width: 100%; height: 200px">

        <gmap-marker :position="evento.locacionEvento" title="Ubicación del evento" :clickable="true"
          :draggable="isDraggable" @dragend="updateCoordinates" @click="center = m.position"></gmap-marker>
      </gmap-map>

      <div>
        <v-text-field label="Texto de la ubicación*" hide-details="auto" type="text"
          v-model="evento.textoLocacionEvento" :rules="reglas.textoLocacionEvento"></v-text-field>
      </div>
    </div>
    <div v-else-if="tipoUbicacion == 'ceremonia'">
      <h3 class="text-left pb-1">Fije la ubicación de la ceremonia</h3>
      <h4 class="text-left pb-3">Arrastre el pin a la ubicación de la ceremonia</h4>

      <gmap-map :center="evento.locacionCeremonia" :zoom="14" style="width: 100%; height: 200px">
        <gmap-marker :position="evento.locacionCeremonia" title="Ubicación del evento" :clickable="true"
          :draggable="isDraggable" @dragend="updateCoordinates" @click="center = m.position"></gmap-marker>
      </gmap-map>

      <div>
        <v-text-field label="Texto de la ubicación de la ceremonia*" hide-details="auto" type="text"
          v-model="evento.textoLocacionCeremonia" :rules="reglas.textoLocacionCeremonia"></v-text-field>
      </div>
    </div>
    <div v-else="tipoUbicacion == 'ceremoniaAdicional'">
      <h3 class="text-left pb-1">Fije la ubicación de la ceremonia adicional</h3>
      <h4 class="text-left pb-3">Arrastre el pin a la ubicación de la ceremonia adicional</h4>

      <gmap-map :center="evento.locacionCeremoniaAdicional" :zoom="14" style="width: 100%; height: 200px">
        <gmap-marker :position="evento.locacionCeremoniaAdicional" title="Ubicación del evento" :clickable="true"
          :draggable="isDraggable" @dragend="updateCoordinates" @click="center = m.position"></gmap-marker>
      </gmap-map>

      <div>
        <v-text-field label="Texto de la ubicación de la ceremonia adicional*" hide-details="auto" type="text"
          v-model="evento.textoLocacionCeremoniaAdicional" :rules="reglas.textoLocacionCeremoniaAdicional"></v-text-field>
      </div>
    </div>

    <div class="text-center">
      <h3>
        <span v-if="isDraggable" class="error--text">Modificando ubicación</span>
        <span v-else class="success--text">Ubicación fijada</span>
      </h3>
    </div>

    <div class="d-flex justify-space-between py-3">
      <v-btn color="error" @click="isDraggable = true">Modificar ubicación</v-btn>
      <v-btn color="success" @click="isDraggable = false">Fijar ubicación</v-btn>
    </div>
  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      coordinates: null,
      isDraggable: true,
      reglas: {
        textoLocacionEvento: [
          v => v.length > 10 || 'Escriba la dirección completa'
        ],
        textoLocacionCeremonia: [
          v => v.length > 10 || 'Escriba la dirección completa'
        ],
        textoLocacionCeremoniaAdicional: [
          v => v.length > 10 || 'Escriba la dirección completa'
        ],
      },
    }
  },

  props: ['tipoUbicacion'],

  computed: {
    ...mapState(['evento'])
  },

  methods: {
    ...mapActions(['updateLocation']),
    updateCoordinates(location) {
      let coordinates = [{
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      },
      this.tipoUbicacion
      ];
      this.updateLocation(coordinates);
    }
  }
}
</script>