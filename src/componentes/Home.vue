<template>
  <section class="container-fluid">
    <NavBar />

    <div class="container mt-5">
      <AgregarDeaBarra />
    </div>

    <div class="container-fluid mt-5">
     <AddGoogleMap :deasActivos="this.mostrarDeasActivos" /> 
    </div>
    <!-- <div class="container">
      <div class="row">
        <div class="col-12 pt-3 pb-3">
          <div v-if="mostrarDeasActivos.length" class="table-responsive">
            <table class="table table-dark mb-0">
              <tr>
                <th class="text-center col-1">ID</th>
                <th class="text-center col-3">Latitud</th>
                <th class="text-center col-3">Longitud</th>
                <th class="text-center col-2">Fecha de Alta</th>
              </tr>
            </table>
            <Dea
              v-for="(dea, index) in mostrarDeasActivos"
              :key="index"
              :dea="dea"
              :click="botAccion"
              :botonStyle="botonStyle"
            />
          </div>
          <h4 v-else class="alert alert-danger text-center">
            No se encontraron Equipos DEA
          </h4>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import AgregarDeaBarra from "./AgregarDeaBarra.vue";
//import Dea from "./Dea.vue";
import AddGoogleMap from "./AddGoogleMap.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],

  name: "src-componentes-home",

  components: {
    NavBar,
    AgregarDeaBarra,
    //Dea,
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
  computed: {},
};
</script>

<style scoped lang="css">
</style>
