export const mixinsBack = {

  methods: {

  },

  computed: {
    async mostrarDea() {
      console.log("MIXIN BACKOFFICE MOSTRAR DEA")
      let dea = await this.$store.state.dea;
      this.cargarForm(dea);
      return dea;
    },

    mostrarUsuario() {
      console.log("MIXIN BACKOFFICE MOSTRAR USUARIO")
      let usuario = this.$store.state.usuario;
      this.cargarForm(usuario);
      return usuario;
    },

    mostrarDeas() {
      console.log("MIXIN BACKOFFICE MOSTRAR DEAS")
      let deas = this.$store.state.deas;
      console.log("Deas "+JSON.stringify(deas))
      return deas;
    },
    mostrarUsuarios() {
      console.log("MIXIN BACKOFFICE MOSTRAR USUARIOS")
      let usuarios = []
      usuarios = this.$store.state.usuarios;
      return usuarios;
    },

    mostrarCurso() {
      console.log("MIXIN BACKOFFICE MOSTRAR CURSO -> CAMBIAR")
      let dea = this.$store.state.dea;
      return dea;
    },
  }
}