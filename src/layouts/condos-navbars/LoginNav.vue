<template>
  <vs-navbar
      id="login-nav"
      type="flat"
      v-model="activeItem"
      color="#FFFFFF"
      text-color="#707070"
      active-text-color="#fbbf81">
    <div slot="title">
      <vs-navbar-title>
       <router-link to="./landing">CONDOS</router-link>
      </vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <router-link to="./faq">How it works</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <router-link to="./devs">Developers</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <router-link to="./support">Support</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="3">
      <router-link to="./contact">Contact</router-link>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="4" v-if="$store.state.isLoggedin != true">
      <vs-button color="dark" type="border" :disabled="true" to="../login">Login</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="5" v-if="$store.state.isLoggedin != true">
      <vs-button color="#01b143" to="../register">Get Started</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="4" v-else>
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

<style lang="scss" scoped>
  .vs-navbar{
    position: absolute;
    top: 0;
  }
  .vs-navbar a{
    color: inherit;
  }
  .vs-navbar a:hover{
    color: inherit;
  }
  .vs-navbar--title{
    font-size: 37px;
    opacity: 0.52;
    padding-left: 2rem;
    padding: 2rem;
    color: #fbbf81;
  }
  .vs-navbar--item{
    margin-right: 1rem;
  }
  .vs-con-items{
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .sign-up-button{
    font-size: 18px;
  }
  .vs-navbar--item a{
    font-size: 15px;
    letter-spacing: 0;
    font-weight: 400;
  }
  @media(max-width: 1024px){
    .vs-navbar--item{
      margin-right: 0;
    }
    .sign-up-button{
      margin-left: -5px;
    }
    .vs-navbar--title{
      font-size: 25px;
    }
  }

@media (max-width:768px){
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
    min-height: 100vh;
}

.activeMenuResponsive .vs-navbar--item a {
    font-size: 2.4rem;
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
    line-height: 1;
}

.activeMenuResponsive .vs-navbar--item button {
    width: 100%;
}

.activeMenuResponsive {
    margin-top: 30px;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 10%;
    text-align: center;
}
}
</style>
