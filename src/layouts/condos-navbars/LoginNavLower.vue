<template>
  <vs-navbar
      id="login-nav"
      type="flat"
      v-model="activeItem"
      color="#FFFFFF"
      text-color="#707070"
      active-text-color="#000000"
  class="navbar-lower">
    <div slot="title">
      <vs-navbar-title>
        <router-link to="./sellers">
          <img src="../../../public/bulkcondodeals_logo.png" class="logo" href="/" width="120" height="85">
        </router-link>
      </vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <router-link to="./investors">Investors</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <router-link to="./sellers">Sellers</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <router-link to="./support">Company</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <router-link to="./contact">Support</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="4">
      <router-link to="./contact">Contact</router-link>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="5" v-if="!this.$store.state.isLoggedIn">
      <vs-button color="dark" type="border" to="../login">Login</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="6" v-if="!this.$store.state.isLoggedIn">
      <vs-button color="#01b143" to="../register">Get Started</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="5" v-else>
      <vs-button color="#01b143" to="../deals">Back To Deals</vs-button>
    </vs-navbar-item>
  </vs-navbar>
</template>

<script>
  export default {
      props:{
          activeItem: Number,
      }
  }
</script>

<style lang="scss">
  .navbar-lower{
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .navbar-lower a{
    color: inherit;
  }
  .navbar-lower a:hover{
    color: inherit;
  }
  .vs-navbar--title{
    width: 100%;
    max-width: 200px;
    font-size: 37px;
    color: #fbbf81;
  }
  .vs-navbar--item{
    margin-left: 30px;
  }
  .vs-navbar--item:last-child{
    margin-left: 10px;
  }
  .vs-con-items{

  }
  .sign-up-button{
    font-size: 18px;
  }
  .vs-navbar--item a{
    font-size: 15px;
    letter-spacing: 0;
    font-weight: 300;
  }
  @media(max-width:1400px){
    .navbar-lower{
      padding-left: 5%;
      padding-right: 5%;
    }
  }
  @media(max-width:1250px){
    .navbar-lower{
      padding-left: 2%;
      padding-right: 2%;
    }
    .vs-navbar--item a{
      font-size: 13px;
      letter-spacing: 0;
      font-weight: 300;
    }
    .sign-up-button{
      font-size: 15px;
    }
  }
  @media(max-width:1150px){
    .navbar-lower{
      padding-left: 1%;
      padding-right: 1%;
    }
    .vs-navbar--item{
      margin-left: 5px;
    }
    .vs-navbar--title{
      width: 100%;
      max-width: 150px;
      font-size: 37px;
      color: #fbbf81;
    }
  }
  @media(max-width: 1024px){
    .navbar-lower{
      padding-left: 2%;
      padding-right: 2%;
    }
    .vs-navbar--item{
      margin-left: 0;
    }
    .sign-up-button{
      margin-left: -5px;
    }
    .vs-navbar--title{
      font-size: 25px;
    }
    .vs-navbar--item a{
      padding: 10px 8px;
    }
  }
  .navbar-lower{
  .vs-navbar--header{
  @media (max-width: 800px){
    .vs-navbar--btn-responsive{
      visibility: hidden;
    }
  }
  }
  }
  .logo{
    width: 120px;
    height: auto;

    @media (max-width: 640px){
      width:120px;
    }
  }

  .logo_holder {
    flex-grow: 1;
    text-align: center;
}

.vs-con-items.activeMenuResponsive {
    /* position: absolute; */
    /* z-index: 1111111111; */
    /* left: 0; */
    /* right: 0; */
    /* top: 0; */
    /* bottom: 0; */
    /* background: white; */
    /* width: 100%; */
    /* height: 100%; */
    // min-height: 100vh;
}

.activeMenuResponsive .vs-navbar--item a {
    font-size: 2.4rem;
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
    line-height: 1;
}

.activeMenuResponsive {
    margin-top: 30px;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 10%;
    text-align: center;
}
</style>
