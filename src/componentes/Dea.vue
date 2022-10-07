<template>
  <section class="container">
    <div class="table-responsive">
      <table class="table table-dark">
        <tr>
          <th class="text-center col-1">ID</th>
          <th class="text-center col-3">Latitud</th>
          <th class="text-center col-3">Longitud</th>
          <th class="text-center col-2">Fecha de Alta</th>
        </tr>

        <tr>
          <td class="text-center">
            {{ dea.id }}
          </td>
          <td class="text-center">
            {{ dea.latitude.value.toString() }}
          </td>
          <td class="text-center">
            {{ dea.longitude.value.toString() }}
          </td>
          <td class="text-center">
            {{ dea.datestamp.value.toString() }}
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-dea",
  props: ["dea"],
  mounted() {},
  data() {
    return {};
  },

  methods: {},
  computed: {},
};
</script>

<style scoped lang="css">
</style>
