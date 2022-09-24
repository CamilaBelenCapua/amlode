<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de Usuarios</h1>

      <div class="row">
        <div class="col-9">
          <p class="h5 mt-5">Listado de DEA Registrados</p>
          <div
            class="media alert alert-info"
            v-for="(dea, index) in this.deas"
            :key="index"
          >
            <div class="media-body">
              <div class="col-2 float-left">ID DEA: {{ dea }}</div>
              <div class="col-3 float-left">
                Latitud: {{ traerInfoDea(dea).latitude.value }}
              </div>
              <div class="col-3 float-left">
                Longitud: {{ traerInfoDea(dea).longitude.value }}
              </div>

              <div class="col-2 float-left text-center font-weight-bold">
                Activo:
                {{ traerInfoDea(dea).active.value ? "Si" : "No" }}
                <!-- <input
                  type="checkbox"
                  v-model="traerInfoDea(dea).active.value"
                /> -->
              </div>
              <div class="col-1 float-left text-center">
                <button
                  class="btn btn-danger"
                  @click="borrarCurso(dea.examen_id)"
                >
                  Desvincular
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 bg-warning">
          <p class="h4 mt-5 text-center">Datos Personales</p>
          <vue-form :state="formState" @submit.prevent="enviar()">
            <div class="flex-fill bd-highlight text-center pb-3 pt-3">
              USUARIO ACTIVO:
              <input
                style="width: 30px; height: 30px"
                type="checkbox"
                v-model="formData.active"
              />
            </div>
            <!-- CAMPO NAME  -->

            <validate tag="div">
              <span style="font-weight: bold">Nombre</span>
              <input
                v-model.trim="formData.name"
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
                v-model.trim="formData.lastName"
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
            <!-- FIN CAMPO LASTNAME  -->

            <!-- CAMPO FECHA NAC  -->

            <validate tag="div">
              <span style="font-weight: bold">Fecha Nacimiento</span>
              <input
                :placeholder="mostrarUsuario.fechaNac"
                v-model.trim="formData.fechaNac"
                id="fechaNac"
                name="fechaNac"
                type="date"
                class="form-control mb-3"
                autocomplete="off"
                required
              />

              <field-messages name="fechaNac" show="$dirty">
                <div class="alert alert-success mt-1">Perfecto!</div>
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO FECHA NAC  -->

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
                readonly
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
    this.$store.dispatch("getUsuarioByMail", this.mail);
    this.$store.dispatch("getDeas");
  },

  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
    };
  },

  methods: {
    /*   borrarCurso(id) {
      let index = this.results.findIndex((curso) => curso.examen_id == id);

      this.results.splice(index, 1);
    }, */

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
        active: "",
        name: "",
        lastName: "",
        fechaNac: "",
        email: "",
        deas: [],
      };
    },

    async cargarForm(usuario) {
      this.formData.active = usuario.active.value;
      this.formData.name = usuario.name.value;
      this.formData.lastName = usuario.lastName.value;
      this.formData.email = usuario.id;
      this.formData.fechaNac = usuario.fechaNac.value;
      this.deas = usuario.deas.value;
    },

    traerInfoDea(idDea) {
      const dea = this.mostrarDeas.find((dea) => dea.id === idDea);
      return dea;
    },

    cambiarColorEstado(dea) {
      this.textoEstado = "text-danger";
      if (dea.active.value) {
        this.textoEstado = "text-success";
      }
      return this.textoEstado;
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
