<template>
  <section class="container-fluid">
    <NavBar />
    <div class="container">
      <div class="row">
        <div class="col-8 pt-3 pl-5 pr-5 pb-3">
          <p class="h4 pt-5">DEAS REGISTRADOS</p>
          <div v-if="mostrarDea.length">
          <div class="row">
            <Curso
              v-for="(curso, index) in mostrarDea"
              :key="index"
              :curso="curso"
              :click="botAccion"
              :botonStyle="botonStyle"
              class="col-6 col-md-4"
            />
          </div>
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
import Curso from "./Curso.vue";

export default {
  name: "src-componentes-inicio",

  components: {
    NavBar,
    AgregarDea,
    Curso,
  },

  props: [],

  mounted() {
    console.log("GET EXAMENES");
    this.$store.dispatch("getCursos");
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
      let examenes = this.$store.state.examenes;
      return examenes;
    },
  },
};
</script>

<style scoped lang="css">
</style>
