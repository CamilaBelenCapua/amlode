<template>
  <section class="container-fluid align-bottom footer">
    <div class="container">
      <div class="row pb-5 pt-5">
        <div class="col-12 align-middle text-center pb-4">
          <img src="img/logo_footer.png" alt="AMLODE" width="80px" />
        </div>
        <div class="col-12 align-middle text-center">
          <p class="h6">
            APP Colaborativa que localiza desfibriladores para salvar vidas
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-footer",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="css">
.footer {
  background: #7B0B00 !important; 
  color: #fff;
  bottom: 0;
  position: fixed;
  left: 0;
  width: 100%;
}

img {
  border-style: none;
}
</style>
