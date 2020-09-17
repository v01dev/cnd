<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <h1 class="four mb-8">404</h1>
    <h3 class="nf mb-8">Page Not Found</h3>
    <vs-button @click="goBack()" color="primary" size="large">Go Back</vs-button>
  </div>
</template>

<style>
.four {
  font-size: 120px;
}
.nf {
  font-size: 40px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-2);
    },
  },
};
</script>