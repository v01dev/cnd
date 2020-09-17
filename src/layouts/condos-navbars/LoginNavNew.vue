<template>
  <vs-navbar
    id="login-nav"
    type="flat"
    v-model="routeMeta"
    color="#FFFFFF"
    text-color="#707070"
    active-text-color="#49A25A"
    :key="this.$route.path"
  >
    <div class="logo_holder" slot="title">
      <vs-navbar-title>
        <router-link :to="{name:'page-landing'}">
          <img src="/bulkcondodeals_logo.png" class="logo" href="/" width="120" height="85">
        </router-link>
      </vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <router-link to="./investors">Investors</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <router-link to="./sellers">Sellers</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="2" class="desktop">
      <!-- <router-link to="./company">Company</router-link> -->
      <vs-dropdown>
        <router-link class="a-icon" to="../company">Company</router-link>
        <vs-dropdown-menu>
          <vs-dropdown-item to="../company">About</vs-dropdown-item>
          <!-- <vs-dropdown-item to="../company">
          Investors
          </vs-dropdown-item>-->
          <vs-dropdown-item to="../company">Team</vs-dropdown-item>
          <vs-dropdown-item to="../company">News &amp; Media</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar-item>
    <vs-navbar-item index="3" class="desktop">
      <vs-dropdown>
        <router-link to="../support">Support</router-link>
        <vs-dropdown-menu>
          <vs-dropdown-item to="../how-it-works-buyers">How it works - Investors</vs-dropdown-item>
          <vs-dropdown-item to="../how-it-works-sellers">How it works - Sellers</vs-dropdown-item>
          <vs-dropdown-item to="../brokers">Brokers</vs-dropdown-item>
          <vs-dropdown-item to="../contact">Contact Us</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar-item>

    <vs-navbar-item index="11" class="mobile">
      <router-link to="../company">About</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="12" class="mobile">
      <router-link to="../company">Team</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="13" class="mobile">
      <router-link to="../company">News &amp; Media</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="14" class="mobile">
      <router-link to="../how-it-works-buyers">
        How it works
        <br />for Investors
      </router-link>
    </vs-navbar-item>
    <vs-navbar-item index="8" class="mobile">
      <router-link to="../how-it-works-buyers">
        How it works
        <br />for Sellers
      </router-link>
    </vs-navbar-item>
    <vs-navbar-item index="9" class="mobile">
      <router-link to="../brokers">Brokers</router-link>
    </vs-navbar-item>
    <vs-navbar-item index="10" class="mobile">
      <router-link to="../contact">Contact Us</router-link>
    </vs-navbar-item>
    
    <vs-navbar-item class="flex p-0 login_btn" index="5" v-if="!this.$store.state.userObject.id">
      <vs-button color="dark" type="border" to="../login">Login</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0" index="6" v-if="!this.$store.state.userObject.id">
      <vs-button color="#01b143" to="../register">Get Started</vs-button>
    </vs-navbar-item>
    <vs-navbar-item class="flex p-0 back_to_deals_btn" index="6" v-else>
      <vs-button color="#01b143" to="../deals">Back To Deals</vs-button>
    </vs-navbar-item>
    
  </vs-navbar>
  
</template>

<script>
export default {
  data() {
    return {
      routeMeta: 0,
    };
  },
  props: {
    activeItem: Number,
  },
  watch: {
    "$route.meta.index": function () {
      this.routeMeta = this.$route.meta.index;
    },
  },
};
</script>

<style lang="scss" scoped>
.vs-navbar {
  padding-left: 10%;
  padding-right: 10%;
  // padding-top: 20px;
  // padding-bottom: 20px;
  border-top: 15px #00a551 solid;
}
.vs-navbar a {
  color: inherit;
}
.vs-navbar a:hover {
  color: inherit;
}
.vs-navbar--title {
  width: 100%;
  max-width: 249px;
  font-size: 37px;
  color: #fbbf81;

  @media (max-width: 640px) {
    max-width: 100%;
  }
}
.vs-navbar--item {
  margin-left: 10px;
}
.vs-navbar--item:last-child {
  margin-left: 10px;
  @media (max-width: 800px) {
    margin-left: 0;
    margin-top: 10px;
  }
}
.sign-up-button {
  font-size: 18px;
  font-weight: 600;
}
.vs-navbar--item a {
  font-size: 16px;
  letter-spacing: 0;
  font-weight: 400;
}
@media (max-width: 1400px) {
  .vs-navbar {
    padding-left: 5%;
    padding-right: 5%;
  }
}
@media (max-width: 1250px) {
  .vs-navbar {
    padding-left: 2%;
    padding-right: 2%;
  }
  .vs-navbar--item a {
    font-size: 13px;
    letter-spacing: 0;
    font-weight: 400;
  }
  .sign-up-button {
    font-size: 15px;
  }
}
@media (max-width: 1150px) {
  .vs-navbar {
    padding-left: 1%;
    padding-right: 1%;
  }
  .vs-navbar--item {
    margin-left: 5px;
  }
  .vs-navbar--title {
    width: 100%;
    // max-width: 150px;
    font-size: 37px;
    color: #fbbf81;
  }
}
@media (max-width: 1024px) {
  .vs-navbar {
    padding-left: 2%;
    padding-right: 2%;
  }
  .vs-navbar--item {
    margin-left: 0;
  }
  .sign-up-button {
    margin-left: -5px;
  }
  .vs-navbar--title {
    font-size: 25px;
  }
  .vs-navbar--item a {
    padding: 10px 8px;
  }
}

.logo {
  width: 120px;
  height: auto;
  margin-top: 10px;

  @media (max-width: 640px) {
    width: 120px;
    margin-left: -25px;
  }
}
@media (max-width: 768px) {
  .logo_holder {
    flex-grow: 1;
    text-align: center;
  }
}
.mobile {
  display: none;
}
@media (max-width: 800px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>
