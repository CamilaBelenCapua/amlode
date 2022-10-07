<template>
  <section class="container-fluid">
    <NavBar />

    <div class="container mt-5">
      
    </div>
    <div class="container mt-5 bg-warning">
 <GoogleSignIn
        :clientId="'1064672349955-6ag6kufjdk22ekgbitse4i35gi9tnabp.apps.googleusercontent.com'"
        :successCallBack="getSuccessData"
        :failureCallBack="getFailureData"
      />    </div>
    <GoogleAuth /> 
    <AddGoogleMap /> 
    <div class="container">
      <div class="row">
        <div class="col-8 pt-3 pb-3">
          <p class="h4 pt-2">DEAS REGISTRADOS</p>
          <div v-if="mostrarDea.length" class="table-responsive">
            <Dea
              v-for="(dea, index) in mostrarDea"
              :key="index"
              :dea="dea"
              :click="botAccion"
              :botonStyle="botonStyle"
              class="col-12"
            />
          </div>
          <h4 v-else class="alert alert-danger text-center">
            No se encontraron Equipos DEA
          </h4>
        </div>
        <div class="col-4 pt-3 pl-5 pr-5 pb-3 bg-warning"><AgregarDea /></div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import AgregarDea from "./AgregarDea.vue";
import Dea from "./Dea.vue";
import AddGoogleMap from "./AddGoogleMap.vue";
import GoogleAuth from "./GoogleAuth.vue"


import GoogleSignIn from "google-signin-vue";

export default {
  name: "src-componentes-inicio",

  components: {
    NavBar,
    AgregarDea,
    Dea,
    AddGoogleMap, 
   GoogleAuth,
    GoogleSignIn,
  },

  props: [],

  mounted() {
    console.log("GET DEAS");
    this.$store.dispatch("getDeas");
  },

  data() {
    return {
      botAccion: "Más Info",
      botonStyle: "btn bg-warning  visible ",
    };
  },
  methods: {
    getSuccessData: function (user) {
        const profile = user.getBasicProfile();
      const fullName = profile.getName();
      const email = profile.getEmail();
      const imageUrl = profile.getImageUrl();
      this.profile = { fullName, email, imageUrl };
      // The User variable contains id_token, id, name, image, email as objects.
      // Send The id_token to the Backend for the verication.
      console.log(fullName)
    },
    getFailureData: function (errorData) {
      // The errorData variable contains failure details
        console.log(errorData)
    },
  },
  computed: {
    mostrarDea() {
      let deas = this.$store.state.deas;
      console.log(deas);
      return deas;
    },
  },
};
</script>

<style scoped lang="css">
</style>
