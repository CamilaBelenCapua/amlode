<template>
  <section class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center bg-warning rounded p-2">
          <vue-form :state="formState" @submit.prevent="agregarDea()">
            <h4 class="pt-3 pb-3">Agregar DEA</h4>
            <div class="row">
              <!-- CAMPO CORREO  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Correo Eléctronico"
                  v-model.trim="formData.email"
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  autocomplete="on"
                  required
                  validateemail
                />

                <field-messages name="email" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                  <div class="alert alert-danger mt-1" slot="validateemail">
                    El correo ingresado es inválido.
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO CORREO  -->
              <!-- CAMPO ADDRESS  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Dirección"
                  v-model.trim="formData.address"
                  id="address"
                  name="address"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  
                />

                <field-messages name="address" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                  
                </field-messages>
              </validate>
              <!-- FIN CAMPO ADDRESS  -->
              <!-- CAMPO LATITUD  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Latitud"
                  v-model.trim="formData.latitud"
                  id="latitud"
                  name="latitud"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validatelatitude
                />

                <field-messages name="latitud" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                  <div class="alert alert-danger mt-1" slot="validatelatitude">
                    Coordenada inválida
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO LATITUD  -->

              <!-- CAMPO LONGITUD  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Longitud"
                  v-model.trim="formData.longitud"
                  id="longitud"
                  name="longitud"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validatelongitude
                />

                <field-messages name="longitud" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                  <div class="alert alert-danger mt-1" slot="validatelongitude">
                    Coordenada inválida
                  </div>
                  <!-- FIN CAMPO LONGITUD  -->
                </field-messages>
              </validate>
            </div>
            <!-- ENVIO -->
            <button class="btn btn-dark mt-3" :disabled="formState.$invalid">
              Aceptar
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
                <h5 class="modal-title">{{ this.tituloModal }}</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="modalShow = false"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="h5">{{ this.msjModal }}</p>

                <AgregarUsuario
                  @modalShow="modalShow = $event"
                  :style="getStyle(formAgregarUsuario)"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="modalShow = false"
                >
                  Cerrar
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
import AgregarUsuario from "./AgregarUsuario.vue";

export default {
  name: "src-componentes-login",

  components: {
    AgregarUsuario,
  },
  props: [],
  async mounted() {
    let cantSubscriptions = await this.$store.dispatch("getSubscriptions");
    if (cantSubscriptions == 0) {
      await this.$store.dispatch("subscriber");
    }
  },
  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      modalShow: false,
      msjModal: "",
      tituloModal: "",
      formAgregarUsuario: false,
      cantDigitos: 8,
      usuarioRegistrado: "",
      usuario: "",
      puntos: "",
    };
  },
  methods: {
    getInicialData() {
      return {
        email: "",
        latitud: "",
        longitud: "",
        address:"",
        fechaAlta: this.obtenerFecha(),
      };
    },

    obtenerFecha() {
      const fecha = new Date();
      return fecha.toLocaleDateString();
    },

    getStyle(estado) {
      return {
        display: estado ? "" : "none",
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
      this.usuario = await this.$store.dispatch(
        "getUsuarioByMail",
        this.formData.email
      );

      if (!(await this.datosValidos())) {
        this.modalShow = true;

        // return;
      } else {
        await this.agregarDeaUsuario();

        console.log("RESU USUARIO POR MAIL", this.usuario);

        this.formAgregarUsuario = false;
        this.usuarioRegistrado = this.usuario;
        this.usuarioRegistradoPuntos = this.puntos;
        this.usuarioRegistradoNombre = this.usuario.name.value;
        this.modalShow = true;
        this.msjModal = `${this.usuarioRegistradoNombre}, ya tenes ${this.usuarioRegistradoPuntos} Puntos acumulados!!`;
        this.tituloModal = "Gracias por colaborar con AMLODE!";
      }
    },

    async agregarDeaUsuario() {
      const id = this.$store.state.deas.length + 1;
      let deaNuevo = {
        id: id.toString(),
        type: "dea",
        latitude: { type: "String", value: this.formData.latitud },
        longitude: { type: "String", value: this.formData.longitud },
        datestamp: { type: "String", value: this.formData.fechaAlta },
        address: {type: "String", value: this.formData.address},
        active: { type: "Boolean", value: true },
      };

      let deaUsuario = {
        idDea: deaNuevo.id,
        idUsuario: this.formData.email,
      };
      const resuUsuario = await this.$store.dispatch(
        "actualizarDeasByUsuario",
        deaUsuario
      );

      if (resuUsuario) {
        const resuDea = await this.$store.dispatch("agregarDea", deaNuevo);
        const usuario = await this.$store.dispatch(
          "getUsuarioByMail",
          this.formData.email
        );

        if (usuario != null && resuDea) {
          this.puntos = usuario.points.value + 50;

          let usuarioModificado = {
            id: this.formData.email,
            active: { type: "Boolean", value: usuario.active.value },
            points: { type: "Number", value: this.puntos },
          };
          const resuActualizar = await this.$store.dispatch(
            "actualizarUsuario",
            usuarioModificado
          );
          console.log("RESU USUARIO ACTUALIZAR", resuActualizar);

          if (resuActualizar) {
            this.formData = this.getInicialData();
            this.formState._reset();
            this.$store.dispatch("getDeas");
          }
        }
      }
    },

    async datosValidos() {
      if (this.usuario == null) {
        this.msjModal = "Para ingresar un DEA tenes que registrarte";
        this.tituloModal = "ERROR!";
        this.formAgregarUsuario = true;
        console.log("Usuario inexistente");
        //this.formData = this.getInicialData();
        //this.formState._reset();
        return false;
      } else if (this.usuario.active.value === false) {
        this.msjModal = "Tu cuenta esta Inactiva";
        this.tituloModal = "ERROR!";
        //this.formAgregarUsuario = true;
        console.log("Usuario inactivo");
        //this.formData = this.getInicialData();
        //this.formState._reset();
        return false;
      } else {
        return true;
      }
    },
  },

  computed: {},
};
</script>

<style scoped lang="css">
</style>
