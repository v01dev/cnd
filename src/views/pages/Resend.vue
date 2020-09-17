<template>
  <div
    class="h-screen screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-register"
  >
    <!--    <login-nav :activeItem="activeItem"></login-nav>-->
    <div class="vx-col w-full h-full sm:m-0 m-4">
      <div class="full-page-bg-color h-full w-full" slot="no-body">
        <div class="vx-row no-gutter justify-center items-center h-full w-full">
          <div class="vx-col hidden xl:block xl:w-1/2 h-full relative login-left">
            <div class="overlay"></div>
            <!-- <p class="slogan">Opportunity is everywhere, if you know where to look.</p> -->
          </div>

          <div class="vx-col sm:w-full md:w-full xl:w-1/2 flex d-theme-dark-bg h-full login-right">
            <div class="login-tabs-container">
              <div class="title mb-4">
                <!-- <h2 class="mb-4" v-if="!confirm">Create a new account</h2> -->
                <h2 class="mb-4">Verify Account</h2>
              </div>
              <form>
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  label="Username *"
                  name="username"
                  placeholder="Enter your username"
                  v-model="username"
                />
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  label="Confirmation Code"
                  name="code"
                  placeholder="Enter recieved code here"
                  v-if="confirm"
                  v-model="confirmation_code"
                />
                <span class="text-danger text-sm">{{ errmsg_confirm }}</span>

                <div
                  class="flex items-center py-12"
                  v-bind:class="confirm ? 'justify-between' : 'justify-end'"
                >
                  <router-link to @click.native="resendSignUp" v-show="confirm">Resend code</router-link>
                  <vs-button
                    v-if="!confirm"
                    @click="resendSignUp"
                    class="float-right sign-in-button rounded-full"
                    color="#49A25A"
                    v-text="'Send Code'"
                  ></vs-button>
                  <vs-button
                    v-if="confirm"
                    @click="confirmSignUp"
                    class="float-right sign-in-button rounded-full"
                    color="#49A25A"
                    v-text="'Confirm'"
                  ></vs-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginNav from "../../layouts/condos-navbars/LoginNav";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      confirmation_code: "",
      phone_number: "",
      checkbox_remember_me: false,
      activeItem: 5,
      confirm: false,
      formattedNumber: "",
      isValid: true,
      emptyPhone: true,
      userId: "",
      errmsg: "",
      errmsg_confirm: "",
      register_btn: "Create Account",
      confirm_btn: "Confirm",
      newUser: {
        id: "",
        email: "",
        mobile: "",
        tel: "",
      },
    };
  },
  components: {
    LoginNav,
  },
  methods: {
    async confirmSignUp() {
      this.confirm_btn = "Loading...";
      this.errmsg_confirm = "";
      Auth.confirmSignUp(this.username.toLowerCase(), this.confirmation_code)
        .then((data) => {
          this.$router.push({ name: "page-login" });
        })
        .catch((err) => {
          this.errmsg_confirm = err.message;
          console.log(err);
          this.confirm_btn = "Confirm";
        });
    },
    async resendSignUp() {
      this.confirmation_code = "";
      this.errmsg_confirm = "";
      Auth.resendSignUp(this.username.toLowerCase())
        .then((data) => {
          this.confirm = true;
        })
        .catch((err) => {
          console.log(err);
          this.errmsg_confirm = err.message;
          this.confirm_btn = "Confirm";
        });
    },
  },
  mounted() {
    //console.log(this.phone_number)
  },
};
</script>

<style lang="scss">
app {
  background: #000000;
}

body {
  background: #f8f8f8 !important;
}

@media (min-height: 680px) and (max-height: 849px) {
  .screen {
    height: 140vh !important;
  }
}
@media (min-height: 850px) {
  .screen {
    height: 120vh !important;
    max-height: 1200px;
  }
}

#page-register {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }

    .bg-twitter {
      background-color: #00aaff;
    }

    .bg-google {
      background-color: #4285f4;
    }

    .bg-github {
      background-color: #333;
    }
  }

  .text-danger {
    margin-left: 5px;
  }

  input {
    background-color: #f0f0f0;
    border: none !important;
  }

  .prepend-text {
    background-color: #f0f0f0;
  }

  .login-tabs-container {
    padding: 8rem;
    padding-bottom: 0;
    width: 100%;
    // margin-top: 11%;
  }

  .vue-phone-number-input {
    margin-top: 10px;
  }
  .vs-input--label {
    padding-left: 0;
    font-size: 15px;
    font-weight: 700;
  }

  label {
    font-weight: 700;
  }

  .vs-con-input {
    margin-top: 10px;
  }

  .title {
    padding-bottom: 2rem;
    font-family: "Khmer MN", Georgia, Times, serif;

    h2 {
      font-size: 3rem;
    }
  }

  .login-background {
    width: 100%;
    height: 100%;
    opacity: 0.12;
  }

  .slogan {
    position: absolute;
    top: 12%;
    font-size: 30px;
    width: 70%;
    text-align: center;
    left: 13%;
  }

  .login-right {
    background-color: #f7f7f7;
  }

  .login-left {
    background-image: url("https://www.condos.com/images/condosbck.jpg");
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }

  .login-left .overlay {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.1;
  }

  .login-link {
    color: #49a25a;
  }

  @media (min-width: 1400px) {
    .login-left {
    }
  }
  @media (max-width: 767px) {
    .login-right {
      width: 100vw;
    }
    .login-tabs-container {
      padding: 0;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      margin-top: 10rem;
    }
    .sign-in-button {
      width: 45%;
    }
  }
  @media (max-width: 680px) {
    .sign-in-button {
      width: auto;
    }
  }
}
</style>
