<template>
  <section class="container-fluid align-bottom footer">
    <div class="container">
      <div class="row pb-5 pt-5">
        <div class="col-2 align-middle text-center">
          <img src="img/logo_footer.png" alt="AMLODE" />
        </div>
        <div class="col-10 align-middle text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
  background: #03091e !important; 
  color: #fff;
  
  bottom: 0;
 
}

img {
  border-style: none;
}
</style>
