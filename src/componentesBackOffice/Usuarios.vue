<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Listado de Usuarios</h1>

      <div v-if="mostrarUsuarios.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Apellido</th>
            <th class="text-center">Fecha de nacimiento</th>
            <th class="text-center">Correo Electronico</th>
            <th class="text-center">Tipo</th>
            <th class="text-center">Activo</th>
            <th class="text-center">Editar Usuario</th>
          </tr>

          <tr v-for="(usuario, index) in mostrarUsuarios" :key="index">
            <td class="text-center">
              {{ usuario.name.value }}
            </td>
            <td class="text-center">
              {{ usuario.lastName.value }}
            </td>
            <td class="text-center">
              {{ usuario.fechaNac.value }}
            </td>
            <td class="text-center">
              {{ usuario.id }}
            </td>
            <td class="text-center">
              {{ usuario.type }}
            </td>
            <td class="text-center">
              {{ usuario.active.value ? "Si" : "No" }}
            </td>

            <td class="text-center">
              <button
                class="btn btn-success"
                @click="editarUsuario(usuario.id)"
              >
                Editar
              </button>
            </td>
          </tr>
        </table>
      </div>

      <h4 v-else class="alert alert-danger text-center">
        No se encontraron usuarios
      </h4>
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
  name: "src-componentes-usuario",
  props: [],
  components: {
    NavBarBack,
  },
  mounted() {
    this.$store.dispatch("getUsuarios");
  },

  data() {
    return {};
  },
  methods: {
    borrarUsuario(mail) {
      this.$store.dispatch("eliminarUsuario", mail);
    },

    editarUsuario(mail) {
      console.log(mail);
      this.$router.push({
        path: "/editarUsuario",
        name: "editarUsuario",
        params: { mail: mail },
      });
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
