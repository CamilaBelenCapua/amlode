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
      console.log("MIXIN MOSTRAR USUARIO")      
      let usuario = this.$store.state.usuario;
      this.cargarForm(usuario);
      
      return usuario;
    },

    mostrarDeas() {
      console.log("MIXIN MOSTRAR DEAS")
      let deas = this.$store.state.deas;
      return deas;
    },

    mostrarDeasActivos() {
      console.log("MIXIN MOSTRAR DEAS ACTIVOS")
      return this.$store.state.deasActivos;
    },

    mostrarUsuarios() {
      console.log("MIXIN MOSTRAR USUARIOS")
      let usuarios = []
      usuarios = this.$store.state.usuarios;
      return usuarios;
    },

    mostrarCurso() {
      console.log("MIXIN MOSTRAR CURSO -> CAMBIAR")
      let dea = this.$store.state.dea;
      return dea;
    },
  }
}