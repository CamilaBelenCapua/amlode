<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de DEA</h1>

      <div class="h4 bg-warning p-2 d-flex bd-highlight">
        <div class="flex-fill bd-highlight">ID: {{ mostrarDea.id }}</div>
        <div class="flex-fill bd-highlight text-right">
          DEA ACTIVO:
          <input
            style="width: 30px; height: 30px"
            type="checkbox"
            v-model="formData.active"
          />
        </div>
      </div>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <div class="row">
          <div class="col-4">
            <!-- CAMPO latitude  -->
            <validate tag="div">
              <span style="font-weight: bold">Latitud</span>
              <input
                v-model.trim="formData.latitude"
                id="latitude"
                name="latitude"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                required
              />

              <field-messages name="latitude" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO latitude  -->
          </div>
          <div class="col-4">
            <!-- CAMPO length  -->
            <validate tag="div">
              <span style="font-weight: bold">Longitud</span>
              <input
                v-model.trim="formData.length"
                id="length"
                name="length"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                required
              />

              <field-messages name="length" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO length  -->
          </div>
          <div class="col-4">
            <!-- CAMPO datestamp  -->
            <validate tag="div">
              <span style="font-weight: bold">Fecha de Registro</span>
              <input
                v-model.trim="formData.datestamp"
                id="datestamp"
                name="datestamp"
                type="text"
                class="form-control mb-3"
                autocomplete="off"
                readonly
              />

              <field-messages name="datestamp" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO datestamp  -->
          </div>
        </div>

        <!-- ENVIO -->
        <button class="btn btn-info my-3 text-center" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>

      <!-- <pre>{{formData}}</pre> -->
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
  name: "src-componentes-formulario-editar-dea",
  props: ["id"],
  components: {
    NavBarBack,
  },

  mounted() {
    this.$store.dispatch("getDeaById", this.id);
  },

  updated() {},

  data() {
    return {
      formState: {},
      formData: this.getInicialData(),     
    };
  },

  methods: {
    async enviar() {
      console.log({ ...this.formData });
      let dea = {       
        latitude: this.formData.latitude,
        length: this.formData.length,
        datestamp: this.formData.datestamp,
        active: this.formData.active,
        id: this.id,
      };

      let resu = await this.$store.dispatch("actualizarDea", dea);

      if (resu) {
        this.$router.push({
          path: "/deas",
        });
      } else {
        console.log("ERROR DE REGISTRO!");
      }
    },

    getInicialData() {
      return {
        name: "",
        latitude: "",
        length: "",
        datestamp: "",
        active: "",
      };
    },

    cargarForm(dea) {     
      this.formData.id = dea.id;
      this.formData.latitude = dea.latitude.value;
      this.formData.length = dea.length.value;
      this.formData.datestamp = dea.datestamp.value;
      this.formData.active = dea.active.value;
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
