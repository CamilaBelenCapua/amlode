<template>
  <section class="container-fluid bg-light">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/Inicio">
          <a class="navbar-brand" href="#">Inicio</a>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Usuarios
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link to="/formularioAltaUsuario">
                  <a class="dropdown-item" href="#">Formulario Alta</a>
                </router-link>
                <router-link to="/usuarios">
                  <a class="dropdown-item" href="#">Listado de Usuarios</a>
                </router-link>
              </div>
            </li>

            <li class="nav-item">
              <router-link to="/deas">
                <a class="nav-link" href="#">Listado de DEA</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/">
                <a class="nav-link" href="#" @click="desloguar()">Salir</a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-nav-b-ar",
  props: [],
  mounted() {},
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    desloguar(){
      localStorage.setItem('access_token', '')
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
