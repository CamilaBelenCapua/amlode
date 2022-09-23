<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Listado de Equipos DEA</h1>

      <div v-if="mostrarDeas.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Latitud</th>
            <th class="text-center">Longitud</th>
            <th class="text-center">Fecha de Alta</th>

            <th class="text-center">Borrar Dea</th>
            <th class="text-center">Editar Dea</th>
          </tr>

          <tr v-for="(dea, index) in mostrarDeas" :key="index">
            <td class="text-center">  
              {{dea.id}}
            </td>
            <td class="text-center">
              {{dea.latitude.value}}
            </td>
            <td class="text-center">
              {{dea.length.value}}
            </td>
            <td class="text-center">
              {{dea.datestamp.value}}
            </td>

            <td class="text-center">
              <button class="btn btn-danger" @click="borrarDea(dea.id)">
                Borrar
              </button>
            </td>

            <td class="text-center">
              <button class="btn btn-success" @click="editarDea(dea.id)">
                Editar
              </button>
            </td>
          </tr>
        </table>
      </div>
      <h4 v-else class="alert alert-danger text-center">
        No se encontraron Deas regitrados
      </h4>
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
  name: "src-componentes-deas",
  props: [],
  components: {
    NavBarBack,
  },

  mounted() {
    this.$store.dispatch("getDeas");
  },

  data() {
    return {};
  },
  methods: {
   async borrarDea(id) {
      console.log(id)
      /*
      let result = await this.$store.dispatch("buscarDeaPorId", id);

      if(result){
        
        let usuarios = await this.$store.dispatch("getUsuarios");
        const usuarioEncontrado = usuarios.find(usuario => usuario.deas.value.includes(id.toString()))
        const nuevosDeas = usuarioEncontrado.deas.value.filter(dea => dea !== id.toString() )
        */
       //this.$store.dispatch("borrarDea", id);
      }
        
    },

    editarDea(id) {
      this.$router.push({
        path: "/actualizarDea",
        name: "actualizarDea",
        params: { id: id },
      });

      
    },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
