<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--full-page">
    <login-nav-new :activeItem="index"></login-nav-new>
    <router-view></router-view>
    <the-footer/>
  </div>
</template>

<script>
  import LoginNavNew from "../condos-navbars/LoginNavNew.vue"
  import TheFooter from "@/layouts/components/CondosFooter.vue";
  export default{
          data(){
              return {
              }
      },
      components: {
              LoginNavNew, TheFooter
      },
      computed: {
              index() {
                  return this.$route.meta.index;
              }
      },
      mounted(){
            this.$drift.hide();
        },
        beforeUpdate() {
          this.$drift.hide();
        },
  }
</script>
