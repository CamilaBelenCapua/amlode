<template>
  <section class="container-fluid">
    <div class="container">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- CAMPO name  -->
        <validate tag="div">
          <input
            placeholder="Nombre"
            v-model.trim="formData.name"
            id="name"
            name="name"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
            :minlength="nameMinLength"
          />

          <field-messages name="name" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="minlength">
              El nombre debe tener entre al menos
              {{ nameMinLength }} caracteres.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO name  -->

        <!-- CAMPO lastName  -->
        <validate tag="div">
          <input
            placeholder="Apellido"
            v-model.trim="formData.lastName"
            id="lastName"
            name="lastName"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
            :minlength="nameMinLength"
          />

          <field-messages name="lastName" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="minlength">
              El Apellido debe tener entre al menos
              {{ nameMinLength }} caracteres.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO name  -->

        <!-- CAMPO FECHA NAC  -->
        <validate tag="div">
          <input
            placeholder="Fecha de Nacimiento"
            v-model.trim="formData.fechaNac"
            id="fechaNac"
            name="fechaNac"
            type="date"
            class="form-control mt-3"
            autocomplete="on"
            required
            menoredad
          />

          <field-messages name="fechaNac" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>

            <div class="alert alert-danger mt-1" slot="menoredad">
              La persona tiene que ser mayor de 18 años
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO FECHA NAC  -->

        <!-- CAMPO CORREO  -->
        <validate tag="div">
          <input
            placeholder="Correo Eléctronico"
            v-model.trim="formData.email"
            id="email"
            name="email"
            class="form-control mt-3"
            autocomplete="off"
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

        <!-- ENVIO -->
        <button
          class="btn btn-danger my-3 float-right"
          :disabled="formState.$invalid"
        >
          Enviar
        </button>
      </vue-form>

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
            </div>
            <div class="modal-body">
              <p>{{ this.msjModal }}</p>
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
export default {
  name: "src-componentes-agregarUsuario",
  props: [],
  components: {},
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
      checkPass: "",
      modalShow: false,
      msjModal: "",
      tituloModal: "",
    };
  },
  methods: {
    async enviar() {
      if (!(await this.datosValidos())) {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
        this.msjModal = "Correo electronico ya";
        this.tituloModal = "ERROR!";
        return;
      }

      console.log({ ...this.formData });
      let usuario = {
        id: this.formData.email,
        type: "user",
        name: { type: "String", value: this.formData.name },
        lastName: { type: "String", value: this.formData.lastName },
        fechaNac: { type: "String", value: this.formData.fechaNac },
        active: { type: "Boolean", value: true },
        points: { type: "Number", value: 0 },
        deas: { type: "StructuredValue", value: [] },
      };

      console.log("POST USUARIOS");
      const resu = await this.$store.dispatch("agregarUsuario", usuario);

      if (resu) {
        console.log("resu", resu);
        this.formData = this.getInicialData();
        this.formState._reset();
        this.$emit("modalShow", false);
      }
    },

    getInicialData() {
      return {
        name: "",
        lastName: "",
        fechaNac: "",
        email: "",
        points: 0,
      };
    },

    mostrarDisplay() {
      let estilo = "none";
      if (this.modalShow) {
        estilo = "inline";
      }
      return estilo;
    },

    async datosValidos() {
      let usuario = await this.$store.dispatch(
        "getUsuarioByMail",
        this.formData.email
      );
      if (usuario != null) {
        this.msjModal = "Email ya registrado!";
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