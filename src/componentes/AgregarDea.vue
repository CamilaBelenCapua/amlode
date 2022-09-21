<template>
  <section class="container-fluid">
    <div class="container">
      <div class="row">
    
        <div class="col-12">
          <vue-form :state="formState" @submit.prevent="agregarDea()">
            <h4 class="pt-5">Agregar DEA</h4>
            <!-- CAMPO CORREO  -->
            <validate tag="div">
              <input
                placeholder="Correo Eléctronico"
                v-model.trim="formData.email"
                id="email"
                name="email"
                type="email"
                class="form-control mt-3"
                autocomplete="on"
                required
              />

              <field-messages name="email" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="email">
                  El correo ingresado es inválido.
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO CORREO  -->

            <!-- CAMPO CONTRASEÑA  -->
            <validate tag="div">
              <input
                placeholder="Contraseña"
                v-model.trim="formData.password"
                id="password"
                name="password"
                type="password"
                class="form-control mt-3"
                autocomplete="off"
              />

              <field-messages name="password" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="email">
                  El correo ingresado es inválido.
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO CONTRASEÑA  -->

            <!-- CAMPO LATITUD  -->
            <validate tag="div">
              <input
                placeholder="Latitud"
                v-model.trim="formData.latitud"
                id="latitud"
                name="latitud"
                type="latitud"
                class="form-control mt-3"
                autocomplete="off"
              />

              <field-messages name="latitud" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LATITUD  -->

            <!-- CAMPO LONGITUD  -->
            <validate tag="div">
              <input
                placeholder="Longitud"
                v-model.trim="formData.longitud"
                id="longitud"
                name="longitud"
                type="longitud"
                class="form-control mt-3"
                autocomplete="off"
              />

              <field-messages name="longitud" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LONGITUD  -->

            <!-- ENVIO -->
            <button
              class="btn btn-info my-3 float-right"
              :disabled="formState.$invalid"
            >
              Enviar
            </button>
          </vue-form>
        </div>

        <!-- MODAL -->
        <div
          class="modal"
          tabindex="-1"
          role="dialog"
          :style="{ display: mostrarDisplay() }"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Mail o Contraseña Incorrecta!</p>
              </div>
              <div class="modal-footer">
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="modalShow = false"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-login",
  props: [],
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      email: "",
      password: "",
      modalShow: false,
    };
  },
  methods: {
    getInicialData() {
      return {
        email: "",
        password: "",
        latitud: "",
        longitud: "",
      };
    },

    mostrarDisplay() {
      let estilo = "none";
      if (this.modalShow) {
        estilo = "inline";
      }
      return estilo;
    },

    async agregarDea() {
      let deaNuevo = {
        id: "1111",
        latitud: this.formData.latitud,
        longitud: this.formData.longitud,
        fechaAlta: new Date(),
      };

      let usuario = {
        email: this.formData.email,
        password: this.formData.password,
        deaId: deaNuevo.id,
      };

      let resu = await this.$store.dispatch(
        "buscarUsuarioPorId",
        usuario.email
      );

      console.log(deaNuevo);
      console.log(usuario);

      if (resu) {
        /* this.$router.push({
          path: "/perfilAlumno",
          name: "perfilAlumno",
          params: { email: this.formData.email },
        }); */

        this.$store.dispatch("agregarDea", deaNuevo);
        this.$store.dispatch("actualizarUsuario", usuario);
      } else {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
      }
    },
  },

  computed: {},
};
</script>

<style scoped lang="css">
</style>
