<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de Usuarios</h1>
      <div class="row">
        <div class="col-9">
          <p class="h5 mt-5">Listado de Cursos Realizados</p>
          <div
            class="media alert alert-info"
            v-for="(curso, index) in this.deas"
            :key="index"
          >
            <div class="media-body">
              <div class="col-5 float-left p-2">
                {{ traerInfoCurso(curso.examen_id).name }}
              </div>
              <div class="col-3 float-left text-center p-2">
                NOTA:
                <input
                  type="text"
                  style="width: 50%"
                  class="text-center"
                  v-model="curso.number"
                />
              </div>
              <div class="col-3 float-left text-center p-2">
                Curso Pago: <input type="checkbox" v-model="curso.payment" />
              </div>
              <div class="col-1 float-left text-center p-2">
                <button
                  class="btn btn-danger"
                  @click="borrarCurso(curso.examen_id)"
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 bg-warning">
          <p class="h5 mt-5">Datos Personales</p>
          <vue-form :state="formState" @submit.prevent="enviar()">
            <!-- CAMPO NAME  -->

            <validate tag="div">
              <span style="font-weight: bold">Nombre</span>
              <input
                v-model.trim="formData.name.value"
                id="name"
                name="name"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                required
                :minlength="nameMinLength"
              />

              <field-messages name="name" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="minlength">
                  El nombre debe tener al menos {{ nameMinLength }} caracteres.
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO NAME  -->

            <!-- CAMPO LASTNAME  -->
            <validate tag="div">
              <span style="font-weight: bold">Apellido</span>
              <input
                v-model.trim="formData.lastName.value"
                id="lastName"
                name="lastName"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                required
            
              />

              <field-messages name="lastName" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
          
              </field-messages>
            </validate>
            <!-- FIN CAMPO EDAD  -->

            <!-- CAMPO TELEFONO  -->

            <validate tag="div">
              <span style="font-weight: bold">Teléfono</span>
              <input
                :placeholder="mostrarUsuario.phone"
                v-model.trim="formData.phone"
                id="phone"
                name="phone"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                required
              />

              <field-messages name="phone" show="$dirty">
                <div class="alert alert-success mt-1">Perfecto!</div>
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO TELEFONO  -->

            <!-- CAMPO CORREO  -->

            <validate tag="div">
              <span style="font-weight: bold">Correo Eléctronico</span>
              <input
                :placeholder="mostrarUsuario.email"
                v-model.trim="formData.email"
                id="email"
                name="email"
                type="email"
                class="form-control mb-3"
                autocomplete="off"
                required
              />

              <field-messages name="email" show="$dirty">
                <div class="alert alert-success mt-1">Perfecto!</div>
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="email">
                  El correo ingresado es inválido.
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO CORREO  -->

            <!-- ENVIO -->
            <button
              class="btn btn-info my-3 float-right"
              :disabled="formState.$invalid"
            >
              Guardar
            </button>
          </vue-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";

import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
  name: "src-componentes-formulario-editar-usuario",
  props: ["mail"],
  components: {
    NavBarBack,
  },

  mounted() {
    this.$store.dispatch("buscarUsuarioPorMail", this.mail);
    const usuario = this.mostrarUsuario()
    console.log("GET DEAS", usuario);
    this.$store.dispatch("getDeas");
  },

  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
    };
  },

  methods: {
    borrarCurso(id) {
      let index = this.results.findIndex((curso) => curso.examen_id == id);

      this.results.splice(index, 1);
    },

    editarCurso(id, pago, nota) {
      let index = this.results.findIndex((curso) => curso.examen_id == id);
      let resultado = {
        examen_id: id,
        number: nota,
        payment: pago,
      };
      this.results.splice(index, 1, resultado);
      this.enviar();
    },

    async enviar() {
      console.log({ ...this.formData });
      let usuario = {
        id: this.formData.email,
        type: "user",
        name: { type: "String", value: this.formData.name },
        lastName: { type: "String", value: this.formData.lastName },
        fechaNac: { type: "String", value: this.formData.fechaNac },       
        email: { type: "String", value: this.formData.email },       
        results: { type: "String", value: this.results },
      };

      let resu = await this.$store.dispatch("actualizarUsuario", usuario);

      if (resu) {
        this.$router.push({
          path: "/usuarios",
        });
      } else {
        console.log("ERROR DE REGISTRO!");
      }
    },

    getInicialData() {
      return {
        name: "",
        lastName: "",
        fechaNac: "",
        email: "",
        deas: [],
      };
    },

    cargarForm(usuario) {
      this.formData.name = usuario.name;
      this.formData.phone = usuario.phone;
      this.formData.email = usuario.email;
      this.formData.edad = usuario.edad;
      this.deas = usuario.deas;
    },

    traerInfoCurso(id) {
      const found = this.mostrarDeas.find((curso) => curso._id === id);
      return found;
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
