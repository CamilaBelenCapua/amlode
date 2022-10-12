<template>
  <section class="container-fluid">
    <NavBar />

    <div class="container mt-5">
      <AgregarDeaBarra />
    </div>

    <div class="container-fluid mt-5">
     <AddGoogleMap :deasActivos="this.mostrarDeasActivos" /> 
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import AgregarDeaBarra from "./AgregarDeaBarra.vue";
import AddGoogleMap from "./AddGoogleMap.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],

  name: "src-componentes-home",

  components: {
    NavBar,
    AgregarDeaBarra,
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
