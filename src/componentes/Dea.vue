<template>
  <section class="container">
    <div class="w-100 pb-3">
      <div class="cajaCurso rounded p-3">
        <div class="bg-info p-2 text-center font-weight-bold">
          DEA REGISTRADO
        </div>
        <p class="h6 pt-2">Latitud: {{ dea.name.value }}</p>

        <p class="h6 pt-1">Longitud: {{ dea.lastName.value }}</p>

        <p class="w-100 pt-1">Fecha Alta: {{ dea.fechaNac.value }}</p>

        <!--  <p class="w-100 h2 text-right">
          <span class="h5">1 Pago de </span> {{ dea.valor | moneda("$") }}
        </p> -->

        <!--  <p class="w-100 h2 text-right">
          <span class="h5">3 Cuotas de </span>
          {{ dea.valor | cuotas(3) | moneda("$") }}
        </p> -->

        <!--    <div class="text-center float left">
          <button :class="botonStyle" @click="accionBoton(dea._id)">
            {{ click }}
          </button>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-curso",
  props: ["dea", "click", "usuario", "botonStyle"],
  mounted() {},
  data() {
    return {};
  },

  methods: {
    getBg(img) {
      return `background-image: url("../img/${img}")`;
    },

    accionBoton(id) {
      if (this.click === "Más Info") {
        this.$router.push({
          path: "/cursoDetalle",
          name: "cursoDetalle",
          params: { id: id },
        });
      }
      if (this.click === "Inscribirme Ahora!") {
        let datos = {
          idUsuario: this.usuario._id,
          examen_id: id,
          payment: false,
          number: "",
        };
        this.$store.dispatch("inscribirACurso", datos);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
