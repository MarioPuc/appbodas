<template>
    <div>
        <h1>Autocomplete Example (#164)</h1>
    <label>
      AutoComplete
      <gmap-autocomplete
        placeholder="This is a placeholder text"
        @place_changed="setPlace">
      </gmap-autocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br />

    <gmap-map
      style="width: 600px; height: 300px;"
      :zoom="1"
      :center="{lat: 0, lng: 0}">
      <gmap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"></gmap-marker>
      <gmap-marker v-if="this.place" label="&#x2605;" :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"></gmap-marker>
    </gmap-map>
    </div>
</template>

<script>

export default {
    name: 'Map',

    data: () => ({
        mapa: {
            posicion: {
              lat: 10.0,
              lng: 10.0
            }
        },
        markers: [],
        place: null,
        description: ''
    }),

    computed: {
    },

    methods: {
        setDescription(description) {
            this.description = description;
        },
        setPlace(place) {
            this.place = place
        },
        usePlace(place) {
        if (this.place) {
             this.markers.push({
                position: {
                  lat: this.place.geometry.location.lat(),
                  lng: this.place.geometry.location.lng(),
                }
              })
              this.place = null;
            }
          }
    }
}
</script>
