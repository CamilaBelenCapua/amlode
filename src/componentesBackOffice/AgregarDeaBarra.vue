<template>
  <section class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center bg-grey rounded p-2">
          <vue-form :state="formState" @submit.prevent="agregarDea()">
            <h4 class="pt-3 pb-3">Agregar DEA</h4>
            <div class="row">
              <!-- CAMPO CORREO  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Correo Eléctronico Usuario"
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
            </div>
            <p class="text-left mb-0 mt-2">Datos de Ubicación</p>
            <div class="row">
              <!-- CAMPO CALLE  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Calle"
                  v-model.trim="formData.calle"
                  id="calle"
                  name="calle"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validateaddress
                />

                <field-messages name="calle" show="$dirty">
                  <div class="alert alert-danger mt-1 text-left" slot="validateaddress">
                    Datos inválidos
                  </div>
                  <div class="alert alert-danger mt-1 text-left" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO CALLE  -->

              <!-- CAMPO NUMERO CALLE  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Número"
                  v-model.trim="formData.nroCalle"
                  id="nroCalle"
                  name="nroCalle"
                  type="number"
                  class="form-control"
                  autocomplete="off"
                  required
                />

                <field-messages name="nroCalle" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO NUMERO CALLE  -->

              <!-- CAMPO CODIGO POSTAL  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="CP"
                  v-model.trim="formData.codigoPostal"
                  id="codigoPostal"
                  name="codigoPostal"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validateaddress
                />

                <field-messages name="codigoPostal" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="validateaddress">
                    Datos inválidos
                  </div>
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO CODIGO POSTAL  -->

              <!-- CAMPO BARRIO  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Barrio"
                  v-model.trim="formData.barrio"
                  id="barrio"
                  name="barrio"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validateaddress
                />

                <field-messages name="barrio" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="validateaddress">
                    Datos inválidos
                  </div>
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO BARRIO  -->

              <!-- CAMPO PROVINCIA  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Provincia"
                  v-model.trim="formData.provincia"
                  id="provincia"
                  name="provincia"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validateprovstate
                />

                <field-messages name="provincia" show="$dirty">
                  <div class="alert alert-danger mt-1" slot="validateprovstate">
                    Datos inválidos
                  </div>
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO PROVINCIA  -->

              <!-- CAMPO PAIS  -->
              <validate tag="div" class="col-sm">
                <input
                  placeholder="Pais"
                  v-model.trim="formData.pais"
                  id="pais"
                  name="pais"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  required
                  validateprovstate
                />

                <field-messages name="pais" show="$dirty">
                  <div class="alert alert-danger mt-1 text-left" slot="validateprovstate">
                    Datos inválidos
                  </div>
                  <div class="alert alert-danger mt-1" slot="required">
                    Campo obligatorio
                  </div>
                </field-messages>
              </validate>
              <!-- FIN CAMPO PAIS  -->
            </div>
            <p class="text-left mb-0 mt-2">Coordenadas</p>
            <div class="row">
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
        calle: "",
        nroCalle: "",
        codigoPostal: "",
        barrio: "",
        provincia: "",
        pais: "",
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
        this.msjModal = `${this.usuarioRegistradoNombre}, ya tiene ${this.usuarioRegistradoPuntos} Puntos acumulados!!`;
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
        address: {
          type: "String",
          value:
            this.formData.calle +
            " " +
            this.formData.nroCalle +
            ", " +
            this.formData.codigoPostal +
            " " +
            this.formData.barrio +
            ", " +
            this.formData.provincia +
            ", " +
            this.formData.pais,
        },
        active: { type: "Boolean", value: true },
      };

      const usuario =await this.$store.dispatch("getUsuarioByMail",  this.formData.email);
    
      if (usuario != null) {
        const idDeas = usuario.deas.value
        const newArray = [...idDeas, deaNuevo.id];
        this.puntos = usuario.points.value + 50;

        let body = {
            active: { type: "Boolean", value: usuario.active.value },
            points: { type: "Number", value: this.puntos },
            deas: { type: "StructuredValue", value: newArray }
        }

      const resuUsuario = await this.$store.dispatch(
        "actualizarUsuario",
        {id: this.formData.email, body}
      );
          console.log("RESU USUARIO ACTUALIZAR", resuUsuario);
          if (resuUsuario) {
            this.formData = this.getInicialData();
            this.formState._reset();
            this.$store.dispatch("getDeas");
          }
      }
    },

    async datosValidos() {
      if (this.usuario == null) {
        this.msjModal = "Para ingresar un DEA tenes que registrarlo";
        this.tituloModal = "ERROR!";
        this.formAgregarUsuario = true;
        console.log("Usuario inexistente");
        return false;
      } else if (this.usuario.active.value === false) {
        this.msjModal = "La cuenta está Inactiva";
        this.tituloModal = "ERROR!";
        console.log("Usuario inactivo");
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
