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
            <validate tag="div">
              <input
                placeholder="Longitud"
                v-model.trim="formData.longitud"
                id="longitud"
                name="longitud"
                type="longitud"
                class="form-control mt-3"
                autocomplete="off"
                validatelongitude
              />

              <field-messages name="longitud" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="validatelongitude">
                  Coordenada inválida
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
                <h5 class="modal-title">ERROR!</h5>
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
                <p>{{this.msjModal}}</p>
              </div>
              <div class="modal-footer">
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
      modalShow: false, 
      msjModal: ""     
    };
  },
  methods: {
    getInicialData() {
      return {
        email: "",       
        latitud: "",
        longitud: "",
        fechaAlta: this.obtenerFecha()
      };
    },
    
  obtenerFecha() {
    const fecha = new Date();
    return fecha.toLocaleDateString()
  },

    mostrarDisplay() {
      let estilo = "none";
      if (this.modalShow) {
        estilo = "inline";
      }
      return estilo;
    },

    async datosValidos(){
      let usuario = await this.$store.dispatch("getUsuarioByMail", this.formData.email)
      if(usuario == null){
        this.msjModal = "No existe usuario para ese email"
        return false;
      }
      return true;
    },

    async agregarDea() {
      if(!await this.datosValidos()){
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
        return;
      }

      const id = this.$store.state.deas.length + 1;
      let deaNuevo = {
          id: id.toString(),
          type: "dea",
          latitude: {type: "String", value: this.formData.latitud},
          longitude: {type: "String", value: this.formData.longitud},
          datestamp: {type: "String", value: this.formData.fechaAlta},
          active: { type: "Boolean", value: true },
      }

      let deaUsuario = {
        idDea: deaNuevo.id,
        idUsuario: this.formData.email
      }
        const resuUsuario = await this.$store.dispatch("actualizarDeasByUsuario", deaUsuario)
        
        if(resuUsuario){
          const resuDea = await this.$store.dispatch("agregarDea", deaNuevo);
          const usuario = await this.$store.dispatch("getUsuarioByMail",this.formData.email);

          if(usuario != null && resuDea){
            const puntos = usuario.points.value + 50

            let usuarioModificado = {
              id: this.formData.email,
              active: {type: "Boolean", value: usuario.active.value},
              points: {type: "Number", value: puntos},
            }
            const resuActualizar = await this.$store.dispatch("actualizarUsuario", usuarioModificado);
            console.log(resuActualizar)

            if (resuActualizar) {
            this.formData = this.getInicialData();
            this.formState._reset();
            this.$store.dispatch("getDeas");
          } 
          }
        } 

    },
  },

  computed: {
     
  },
};
</script>

<style scoped lang="css">
</style>
