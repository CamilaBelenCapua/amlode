<template>
  <section class="container-fluid" style="background: #f8f9fa">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item pr-3 pl-3">
              <router-link to="/home">
                <a class="nav-link" href="#">AMLODE</a>
              </router-link>
            </li>


            <li class="nav-item pr-3 pl-3">
              <router-link to="/home">
                <a class="nav-link" href="#">Primeros Auxilios</a>
              </router-link>
            </li>

            <li class="nav-item pr-3 pl-3">
              <router-link to="/home">
                <a class="nav-link" href="#">FAQ</a>
              </router-link>
            </li>

            <li class="nav-item pr-3 pl-3 ">
              <router-link to="/deas">
                <a class="nav-link bg-danger text-light rounded" href="#" target="_blank">BackOffice</a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-componentes-nav-b-ar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
</style>
