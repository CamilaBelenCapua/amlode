<template>
  <section class="container-fluid">
    <NavBar />
    <div class="container">
      <div class="row">
        <div class="col-8 pt-3 pb-3">
          <p class="h4 pt-2">DEAS REGISTRADOS</p>
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
        <div class="col-4 pt-3 pl-5 pr-5 pb-3 bg-warning"><AgregarDea /></div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import AgregarDea from "./AgregarDea.vue";
import Dea from "./Dea.vue";

export default {
  name: "src-componentes-inicio",

  components: {
    NavBar,
    AgregarDea,
    Dea,
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
      return deas;
    },
  },
};
</script>

<style scoped lang="css">
</style>
