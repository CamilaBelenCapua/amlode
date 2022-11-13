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
           
            <th class="text-center">Activo</th>
            <th class="text-center">Puntos</th>
            <th class="text-center"></th>
          </tr>

          <tr v-for="(usuario, index) in mostrarUsuarios" :key="index">
            <td class="text-center">
              {{ usuario.name.value }}
            </td>
            <td class="text-center">
              {{ usuario.lastName.value }}
            </td>
            <td class="text-center">
              {{ usuario.fechaNac.value}}
            </td>
            <td class="text-center">
              {{ usuario.id }}
            </td>
           
             <td class="text-center font-weight-bold" :class= cambiarColorEstado(usuario)>
              {{ usuario.active.value ? "Si" : "No" }}
            </td>
            <td class="text-center">
              {{ usuario.points.value }}
            </td>

            <td class="text-center">
              <button
                class="btn btn-success"
                @click="editarUsuario(usuario.id)"
              >
                Ver Detalle
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
    return {
    };
  },

   
  methods: {

    editarUsuario(mail) {
      this.$router.push({
        path: "/editarUsuario",
        name: "editarUsuario",
        params: { mail: mail },
      });
    },

    cambiarColorEstado(usuario){
      this.textoEstado = "text-danger"
      if(usuario.active.value){
        this.textoEstado = "text-success"
      }
      return this.textoEstado
    }
    
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
