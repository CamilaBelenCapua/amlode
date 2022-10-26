<template>
  <section class="">
    <div class="">
      <table class="table table-dark mb-0">
 

        <tr>
          <td class="text-center col-1">
            {{ dea.id }}
          </td>
          <td class="text-center col-3">
            {{ dea.latitude.value.toString() }}
          </td>
          <td class="text-center col-3">
            {{ dea.longitude.value.toString() }}
          </td>
          <td class="text-center col-2">
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
