<template>
  <section>
    <div class="container">
      <div class="mx-auto" style="width: 500px;">
        <label class="form-inline">
          <gmap-autocomplete
            class="form-control mr-2"
            @place_changed="setPlace"
          ></gmap-autocomplete>
          <button
            type="button"
            class="btn btn-danger"
            @click="addLocationMarker"
          >
            Agregar DEA
          </button>
        </label>
      </div>
    </div>
    <div>
      <gmap-map :center="center" :zoom="15" style="width: 100%; height: 555px">
        <gmap-marker
          v-for="(gmp, index) in mostrarDea"
          :key="index"
          :position="armarPosition(gmp)"
          @click="modalShow = !modalShow"
        ></gmap-marker>
      </gmap-map>

      <!-- MODAL -->
      <div
        v-show="modalShow"
        class="modal"
        tabindex="-1"
        role="dialog"
        style="display: inline"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Información DEA</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="modalShow = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Latitud: {{ this.dea.latitude.value }}</p>
              <p>Longitud: {{ this.dea.longitude.value }}</p>
              <p>Vigente desde: {{ this.dea.datestamp.value.toString() }}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="modalShow = false"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
 
<script>
export default {
  name: "DrawGoogleMap",

  components: {},

  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825,
      },
      locations: [],
      currentLocation: null,
      modalShow: false,
      msjModal: "",
      dea: "",
    };
  },

  mounted() {
    this.setLocationLatLng();
    console.log("GET DEAS");
    this.$store.dispatch("getDeas");
  },

  methods: {
    setPlace(loc) {
      this.currentLocation = loc;
      console.log("current location", loc);
    },

    addLocationMarker() {
      if (this.currentLocation) {
        const marker = {
          lat: this.currentLocation.geometry.location.lat(),
          lng: this.currentLocation.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.currentLocation);
        this.center = marker;
        this.existingPlace = null;
      }
    },

    armarPosition(dea) {
      let location = {
        lat: Number(dea.latitude.value),
        lng: Number(dea.longitude.value),
        label: "United States",
      };

      this.setDea(dea);

      return location;
    },

    setDea(dea) {
      this.dea = dea;
    },

    setLocationLatLng: function () {
      navigator.geolocation.getCurrentPosition((geolocation) => {
        this.center = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
        };
      });
    },
  },

  computed: {
    mostrarDea() {
      let deas = this.$store.state.deas;
      return deas;
    },
  },
};
</script>