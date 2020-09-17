<template>
  <vs-navbar
      id="login-nav"
      type="flat"
      color="#FFFFFF"
      text-color="#707070"
      active-text-color="#000000"
  class="condos-navbar">
    <div slot="title">
      <vs-navbar-title>
        <div class="flex">
          <a href="/" tabindex="-1">
          <img src="../../../../public/bulkcondodeals_logo.png" class="logo" href="/" width="120" height="85">
          </a>
        </div>
      </vs-navbar-title>
    </div>
    <div class="flex w-full justify-between items-center">
    <div class="flex items-center">
      <vs-navbar-item class="mr-4">
        <router-link to="../../dashboard" v-bind:class="{ active: isDashboard }"  tabindex="-1">DASHBOARD </router-link>
    </vs-navbar-item>
    <vs-navbar-item class="mr-4">
      <router-link to="../../deals" v-bind:class="{ active: isDeals }"  tabindex="-1">DEALS</router-link>
    </vs-navbar-item>
    </div>
      <div class="flex items-center">
    <vs-navbar-item class="mr-4">
      <router-link to="../../favorites" v-bind:class="{ active: isFavorites }"  tabindex="-1">MY FAVORITES</router-link>
    </vs-navbar-item>
    <vs-navbar-item class="mr-4">
      <router-link to="../../my-deals" v-bind:class="{ active: isMyDeals }"  tabindex="-1">MY DEALS</router-link>
    </vs-navbar-item>
    <vs-navbar-item class="mr-4" v-if="!this.$store.state.sa">
      <router-link to="" @click.native="popupActive = true" v-bind:class="{ active: isDevTools }"  tabindex="-1">POST DEAL</router-link>
    </vs-navbar-item>
    <vs-navbar-item class="mr-4" v-else>
      <router-link to="../../devtools" v-bind:class="{ active: isDevTools }"  tabindex="-1">POST DEAL</router-link>
    </vs-navbar-item>
    <profile-drop-down></profile-drop-down>
      </div>
    </div>
    <vs-popup :active.sync="popupActive" class="agree-popup" title="Post a Deal">
      <form
        class="w-full flex flex-col justify-center items-left"
        @submit.prevent="sendEmail"
      >
        <h3>Please have the Bulk Condo Deals concierge contact me about posting a deal.</h3>
        <div class="name flex flex-wrap justify-between w-full mt-4 mb-4">
          <h5 class="w-full mb-4">Your Name</h5>
          <vs-input
            label-placeholder="FIRST NAME"
            v-model="firstName"
            class="w-adjust mb-2"
            name="user_firstName"
          ></vs-input>
          <vs-input
            label-placeholder="LAST NAME"
            v-model="lastName"
            class="w-adjust mb-2"
            name="user_lastName"
          ></vs-input>
        </div>
        <vs-input
          label-placeholder="LAST NAME"
          class="w-adjust mb-2 hidden"
          :value="this.$store.state.userObject.companyName"
          name="user_companyName"
        ></vs-input>
        <vs-input
          :value="this.$store.state.userObject.username"
          class="w-adjust mb-2 hidden"
          name="username"
        ></vs-input>
        <div class="contact-info flex flex-wrap justify-between w-full mb-4">
          <h5 class="w-full mb-4">Contact Info</h5>
          <vs-input
            label-placeholder="EMAIL ADDRESS"
            v-model="email"
            class="w-full mb-4"
            name="user_email"
          ></vs-input>
          <vs-input
            label-placeholder="PHONE NUMBER"
            v-model="phone"
            class="w-full"
            name="user_phone"
          ></vs-input>
        </div>
        <div class="message flex flex-wrap justify-between w-full">
          <h5 class="w-full mt-1 mb-2">Message</h5>
          <vs-textarea v-model="message" class="contact-message" height="200px" name="message"></vs-textarea>
        </div>
        <vs-button button="submit" color="success" class="mt-4">Send</vs-button>
      </form>
    </vs-popup>
  </vs-navbar>
</template>

<script>
    import emailjs from "emailjs-com";
    import ProfileDropDown from "./components/ProfileDropDown.vue";

    export default {
        name: "the-navbar-horizontal",
        props: {
            activePage: Number,
            activeItem: Number,
            logo: {type: String},
            isDashboard: false,
            isDeals: false,
            isOffers: false,
            isFavorites: false,
            isMyDeals: false,
            isDevTools: false,
            navbarType: {
                type: String,
                required: true
            },

        },
        data() {
          return{

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      popupActive: false,
          }
        },
        components: {
            ProfileDropDown,
        },
        watch: {
            "$route"() {
                this.isDashboard = this.$route.meta.isDashboard;
                this.isDeals = this.$route.meta.isDeals;
                this.isOffers = this.$route.meta.isOffers;
                this.isFavorites = this.$route.meta.isFavorites;
                this.isMyDeals = this.$route.meta.isMyDeals;
                this.isAddDeals = this.$route.meta.isAddDeals;
                this.isDevTools = this.$route.meta.isDevTools;
            },
        },
        computed: {
            navbarColor() {
                let color = "#fff";
                if (this.navbarType === "sticky") color = "#f7f7f7";
                else if (this.navbarType === "static") {
                    if (this.scrollY < 50) {
                        color = "#ffffff";
                    }
                }

                this.isThemedark === "dark" ? color === "#fff" ? color = "#10163a" : color = "#262c49" : null;

                return color;
            },
            isThemedark() {
                return this.$store.state.theme;
            },
            navbarStyle() {
                return this.navbarType === "static" ? {transition: "all .25s ease-in-out"} : {};
            },
            navbarClasses() {
                return this.scrollY > 5 && this.navbarType === "static" ? null : "d-theme-dark-light-bg shadow-none";
            },
            scrollY() {
                return this.$store.state.scrollY;
            },
            verticalNavMenuWidth() {
                return this.$store.state.verticalNavMenuWidth;
            },
            windowWidth() {
                return this.$store.state.windowWidth;
            },
        },
        mounted(){
            this.isDashboard = this.$route.meta.isDashboard;
            this.isDeals = this.$route.meta.isDeals;
            this.isOffers = this.$route.meta.isOffers;
            this.isFavorites = this.$route.meta.isFavorites;
            this.isMyDeals = this.$route.meta.isMyDeals;
            this.isAddDeals = this.$route.meta.isAddDeals;
            this.isDevTools = this.$route.meta.isDevTools;
            this.setUserInfo();
        },
        beforeUpdate() {
this.setUserInfo();
        },
        methods: {
          setUserInfo() {
      this.firstName = this.$store.state.userObject.firstName;
      this.lastName = this.$store.state.userObject.lastName;
      this.email = this.$store.state.userObject.email;
      this.phone = this.$store.state.userObject.tel;
    },
    async sendEmail(e) {
      await emailjs
        .sendForm("gmail", "deal_post", e.target, "user_praLRxgpKucwmV0r1B3O4")
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
        this.message = "";
        this.popupActive = false;
     
    },
        }
    };

</script>

<style lang="scss">
  .condos-navbar{
    padding-left: 2%;
    padding-right: 2%;
    // padding-top: 20px;
    // padding-bottom: 20px;
    border-top: 15px #00A551 solid;

  .condos-navbar a{
    color: inherit;
  }
  .condos-navbar a:hover{
    color: inherit;
  }
  .vs-navbar--title{
    width: 100%;
    max-width: 290px;
    font-size: 37px;
    color: #fbbf81;
  }
  .vs-navbar--item{
    margin-left: 30px;
  }
  .vs-navbar--item a{
      font-size: 22px;
    padding: 0;
      font-family: "Khmer MN";
    color: #b1b1b1 !important;
      text-transform: uppercase;
    margin-top: 8px;
  }
  .vs-navbar--item .active{
    color: #555555 !important;
  }
  .vs-navbar--item:last-child{
    margin-left: 10px;
    @media(max-width: 800px){
      margin-left: 0;
      margin-top: 10px;
    }
  }
  .vs-con-items{
    width: 78%;
    flex-grow: 1;
  }
  .sign-up-button{
    font-size: 18px;
  }
  .vs-navbar--item a{
    letter-spacing: 0;
  }
  @media(max-width:1250px){
    .vs-navbar--item a{
      letter-spacing: 0;
    }
    .sign-up-button{
      font-size: 15px;
    }
  }
  @media(max-width:1150px){
    .condos-navbar{
      padding-left: 1%;
      padding-right: 1%;
    }
    .vs-navbar--item{
      margin-left: 5px;
    }
  }
  @media(max-width: 1024px){
    .condos-navbar{
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

  .logo{
    width: 120px;
    height: auto;
    margin-top:10px;
    margin-right:10px;
  }
  .the-navbar__user-meta{
    margin-top: -8px;
  }
  .active {
    color: #fbbf81;
  }
  }


//   .logo_holder {
//     flex-grow: 1;
//     text-align: center;
// }

// .vs-con-items.activeMenuResponsive {
//     /* position: absolute; */
//     /* z-index: 1111111111; */
//     /* left: 0; */
//     /* right: 0; */
//     /* top: 0; */
//     /* bottom: 0; */
//     /* background: white; */
//     /* width: 100%; */
//     /* height: 100%; */
//     // min-height: 100vh;
// }

// .activeMenuResponsive .vs-navbar--item a {
//     font-size: 2.4rem;
//     font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
//     line-height: 1;
// }

// .activeMenuResponsive {
//     margin-top: 30px;
//     padding-left: 10%;
//     padding-right: 10%;
//     padding-top: 10%;
//     text-align: center;
// }
</style>

