<template>
  <section class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <vue-form :state="formState" @submit.prevent="agregarDea()">
            <h4 class="pt-4 ">¿Encontraste un DEA? Agregalo!</h4>

            <!-- CAMPO CORREO  -->
            <validate tag="div" class="col-3 float-left">
              <input
                placeholder="Correo Eléctronico"
                v-model.trim="formData.email"
                id="email"
                name="email"
                type="email"
                class="form-control col mt-3"
                autocomplete="on"
                required
              />

              <field-messages name="email" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="email">
                  Formato inválido
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO CORREO  -->

            <!-- CAMPO LATITUD  -->
            <validate tag="div" class="col-3 float-left">
              <input
                placeholder="Latitud"
                v-model.trim="formData.latitud"
                id="latitud"
                name="latitud"
                type="number"
                class="form-control col mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="latitud" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LATITUD  -->

            <!-- CAMPO LONGITUD  -->
            <validate tag="div" class="col-3 float-left">
              <input
                placeholder="Longitud"
                v-model.trim="formData.longitud"
                id="longitud"
                name="longitud"
                type="number"
                class="form-control col mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="longitud" show="$dirty">
                <div class="alert alert-danger mt-1" slot="min">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LONGITUD  -->
            <!-- ENVIO -->
            <button
              class="btn btn-danger my-3 float-Lleft col-2"
              :disabled="formState.$invalid"
            >
              Agregar DEA
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
    let cantSubscriptions = await this.$store.dispatch('getSubscriptions')
    if(cantSubscriptions==0){
      await this.$store.dispatch('subscriber')
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
    };
  },
  methods: {
    getInicialData() {
      return {
        email: "",
        latitud: "",
        longitud: "",
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
      const usuario = await this.$store.dispatch(
        "getUsuarioByMail",
        this.formData.email
      );

      console.log("RESU USUARIO POR MAIL", usuario);

      this.usuarioRegistrado = usuario;
      this.usuarioRegistradoPuntos = usuario.points.value;
      this.usuarioRegistradoNombre = usuario.name.value;

      if (!(await this.datosValidos())) {
        this.modalShow = true;

        return;
      } else {
        this.modalShow = true;
        this.msjModal = `${this.usuarioRegistradoNombre}, ya tenes ${this.usuarioRegistradoPuntos} Puntos acumulados!!`;
        this.tituloModal = "Gracias por colaborar con AMLODE!";
      }

      const id = this.$store.state.deas.length + 1;
      let deaNuevo = {
        id: id.toString(),
        type: "dea",
        latitude: { type: "String", value: this.formData.latitud },
        longitude: { type: "String", value: this.formData.longitud },
        datestamp: { type: "String", value: this.formData.fechaAlta },
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
          const puntos = usuario.points.value + 50;

          let usuarioModificado = {
            id: this.formData.email,
            active: { type: "Boolean", value: usuario.active.value },
            points: { type: "Number", value: puntos },
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
      let usuario = await this.$store.dispatch(
        "getUsuarioByMail",
        this.formData.email
      );
      if (usuario == null) {
        this.msjModal = "Para ingrear un DEA tenes que registrarte";
        this.tituloModal = "ERROR!";
        this.formAgregarUsuario = true;
        console.log("Usuario inexistente");
        this.formData = this.getInicialData();
        this.formState._reset();
        return false;
      }
      return true;
    },
  },

  computed: {},
};
</script>

<style scoped lang="css">
</style>
