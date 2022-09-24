<template>
  <section class="container">
    <div class="w-100 pb-3">
      <div class="cajaDea rounded p-3">
        <div class="bg-info p-2 text-center font-weight-bold">
          DEA REGISTRADO
        </div>
        <p class="h6 pt-2">Latitud: {{ dea.latitude.value.toString() }}</p>

        <p class="h6 pt-1">Longitud: {{ dea.longitude.value.toString()}}</p>

        <p class="w-100 pt-1">Fecha Alta: {{ dea.datestamp.value.toString() }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-dea",
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
