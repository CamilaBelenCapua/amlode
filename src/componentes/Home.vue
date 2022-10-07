<template>
  <section class="container-fluid">
    <NavBar />

    <div class="container mt-5">
      <AgregarDeaBarra />
    </div>

    <div class="container-fluid mt-5">
      <AddGoogleMap />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 pt-3 pb-3">          
          <div v-if="mostrarDea.length" class="table-responsive">
            <Dea
              v-for="(dea, index) in mostrarDea"
              :key="index"
              :dea="dea"
              :click="botAccion"
              :botonStyle="botonStyle"
              class="col-12"
            />
          </div>
          <h4 v-else class="alert alert-danger text-center">
            No se encontraron Equipos DEA
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import AgregarDeaBarra from "./AgregarDeaBarra.vue";
import Dea from "./Dea.vue";
import AddGoogleMap from "./AddGoogleMap.vue";

export default {
  name: "src-componentes-home",

  components: {
    NavBar,
    AgregarDeaBarra,
    Dea,
    AddGoogleMap,
  },

  props: [],

  mounted() {
    console.log("GET DEAS");
    this.$store.dispatch("getDeas");
  },

  data() {
    return {
      botAccion: "Más Info",
      botonStyle: "btn bg-warning  visible ",
    };
  },
  methods: {},
  computed: {
    mostrarDea() {
      let deas = this.$store.state.deas;
      console.log(deas);
      return deas;
    },
  },
};
</script>

<style scoped lang="css">
</style>
