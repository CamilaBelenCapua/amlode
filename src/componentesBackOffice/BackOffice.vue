<template>
  <section class="container caja">
    <div class="row caja">
      <div class="col-12 col-md-8">
        <p class="h4 mt-5">Sistema de Gestión de Usuarios y Equipos DEA</p>
        <h3>Aplicación Móvil para la Localización de Desfibriladores</h3>

        <p class="h5">Solo personal autorizado puede ingresar al Sistema</p>
        <p>
          Por favor, si no cuentas con cuenta para acceder al sistema,
          comunicate con el Administrador.
        </p>
      </div>
      <div class="col-12 col-md-4 p-5 bg-grey caja">
        <vue-form :state="formState" @submit.prevent="login()">
          <h4>Ingreso a Usuarios Registrados</h4>

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

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
          <!-- CAMPO CONTRASEÑA  -->
          <validate tag="div">
        
      
            <input
              placeholder="Contraseña"
              v-model.trim="formData.password"
              id="password"
              name="password"
              type="password"
              class="form-control pass mt-3"
              autocomplete="off"
              required
              
            />

           <i class="far fa-eye glyphicon mt-3" id="togglePassword" @click="showPassword()"></i>
            
           

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

          <!-- ENVIO -->
          <button
            class="btn btn-dark my-3 float-right"
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
            </div>
            <div class="modal-body">
              <p>Mail o Contraseña Incorrecta!</p>
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
  </section>
</template>

<script>
import { mixinsBack } from "../mixinsBack";
export default {
  mixins: [mixinsBack],
  name: "src-componentes-loginBackOffice",
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
      email: "",
      password: "",
      modalShow: false,
    };
  },
  methods: {
    async login() {
      let usuario = {
        name: this.formData.email,
        password: this.formData.password,
      };

      let resu = await this.$store.dispatch("loguearAdmin", usuario);

      if (resu) {
        this.visible = true;
        this.$router.push({
          path: "/inicio",
        });
      } else {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
      }
    },

    getInicialData() {
      return {
        email: "",
        password: "",
      };
    },

    mostrarDisplay() {
      let estilo = "none";

      if (this.modalShow) {
        estilo = "inline";
      }
      return estilo;
    },

    showPassword(){
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#password');

      togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
      });
    }
  },

  computed: {},
};
</script>

<style scoped lang="css">

.pass {
  padding-right: 30px;
  width: 85%;
  float: left;
}

.glyphicon {
width: 15%;
  right: 0;
  padding: 12px 10px;
  cursor: pointer;
  float: left;
}
.caja {
  height: 100%;
}
</style>
