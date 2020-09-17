<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-reset"
  >
    <!-- <login-nav :activeItem="activeItem"></login-nav> -->
    <div class="vx-col w-full h-screen sm:m-0 m-4">
      <div class="full-page-bg-color h-full w-full" slot="no-body">
        <div class="vx-row no-gutter justify-center items-center h-full w-full">
          <div class="vx-col hidden xl:block xl:w-1/2 h-screen relative login-left">
            <div class="overlay"></div>
            <!-- <p class="slogan">Opportunity is everywhere, if you know where to look.</p> -->
          </div>

          <div class="vx-col sm:w-full md:w-full xl:w-1/2 flex d-theme-dark-bg h-full login-right">
            <div class="login-tabs-container">
              <div class="title mb-4">
                <h2 class="mb-4">Reset your password</h2>
                <h4
                  class="mb-4 font-normal"
                  v-if="!confirm"
                >You will receive a verification code from BulkCondoDeals.com</h4>
                <h4 class="mb-4 font-normal" v-if="confirm">
                  Enter the code you received and set a new
                  password.
                </h4>
              </div>

              <div>
                <vs-input
                  class="w-full"
                  color="#707070"
                  label="Email (Username) *"
                  name="username"
                  placeholder="Enter your email (username)"
                  v-if="!confirm"
                  v-model="username"
                />
                <span class="text-danger text-sm" v-if="!confirm">{{ errmsg }}</span>
                <vs-input
                  class="w-full"
                  color="#707070"
                  label="Verification code"
                  name="code"
                  placeholder="Enter code"
                  v-if="confirm"
                  v-model="code"
                />
                <span class="text-danger text-sm">{{ errmsg_verify }}</span>
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  data-vv-validate-on="blur"
                  label="New Password"
                  name="password"
                  placeholder="Enter new password"
                  type="password"
                  v-if="confirm"
                  v-model="new_password"
                  v-validate="'required|min:8'"
                />
                <span class="text-danger text-sm">{{ errors.first("password") }}</span>
                <div class="flex items-center justify-between pt-8 pb-4" v-if="goToResend">
                  <router-link
                    class="font-bold login-link"
                    color="#707070"
                    to="./resend"
                  >Go to verification page</router-link>
                  <vs-button
                    :disabled="!validateFirst"
                    @click="forgotPassword"
                    class="float-right rounded-full"
                    color="#49A25A"
                  >{{submit_btn}}</vs-button>
                </div>
                <div class="flex items-center justify-end pt-8 pb-4" v-if="!goToResend && !confirm">
                  <vs-button
                    :disabled="!validateFirst"
                    @click="forgotPassword"
                    class="float-right rounded-full"
                    color="#49A25A"
                  >{{submit_btn}}</vs-button>
                </div>
                <div class="flex items-center justify-between pt-8 pb-4" v-if="confirm">
                  <router-link
                    class="font-bold login-link"
                    color="#707070"
                    to
                    v-on:click.native="forgotPassword"
                  >Resend code</router-link>
                  <vs-button
                    :disabled="!validateForm"
                    @click="forgotPasswordSubmit"
                    class="float-right rounded-full"
                    color="#49A25A"
                  >{{verify_btn}}</vs-button>
                </div>
              </div>
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
      code: "",
      new_password: "",
      activeItem: "",
      confirm: false,
      errmsg: "",
      errmsg_verify: "",
      submit_btn: "Submit",
      verify_btn: "Verify",
      goToResend: false,
    };
  },
  components: {
    LoginNav,
  },
  methods: {
    async forgotPassword() {
      this.submit_btn = "Loading...";
      this.verify_btn = "Loading...";
      Auth.forgotPassword(this.username.toLowerCase())
        .then((data) => {
          //console.log(data);
          this.confirm = true;
          this.verify_btn = "Verify";
        })
        .catch((err) => {
          if (err.code != "InvalidParameterException")
            this.errmsg = err.message;
          else {
            this.errmsg =
              "Cannot reset password for the user as there is no verified email or phone_number";
            this.goToResend = true;
          }
          this.submit_btn = "Submit";
          this.errmsg_verify = "";
          this.verify_btn = "Verify";
        });
    },
    async forgotPasswordSubmit() {
      this.verify_btn = "Loading...";
      this.errmsg_verify = "";
      Auth.forgotPasswordSubmit(
        this.username.toLowerCase(),
        this.code,
        this.new_password
      )
        .then((data) => {
          //console.log(data);
          this.$router.push("/login").catch(() => {});
        })
        .catch((err) => {
          this.errmsg_verify = "Wrong code";
          this.verify_btn = "Verify";
        });
    },
  },
  computed: {
    validateFirst() {
      return this.username !== "";
    },
    validateForm() {
      return !this.errors.any() && this.code !== "" && this.new_password !== "";
    },
  },
};
</script>

<style lang="scss">
#page-reset {
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

  .login-tabs-container {
    padding: 8rem;
    width: 100%;
    margin-top: 11%;
  }
  .title {
    padding-bottom: 2rem;
    font-family: "Khmer MN", "khmer_mnregular", Georgia, "Times New Roman",
      Times, serif;

    h2 {
      font-size: 3rem;

      @media (max-width: 767px) {
        font-size: 2rem;
        text-align: center;
      }
    }
    h4 {
      // text-align: center;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 1rem;
      line-height: 1.4;

      @media (max-width: 767px) {
        text-align: center;
      }
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
    background-image: url("/condosbck.jpg");
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    // height: calc(100vh - 99px) !important;
  }

  .login-left {
    background-image: url("/condosbck.jpg");
    color: #49a25a;
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 767px) {
      width: 100%;
      height: 200px !important;
    }
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
      // max-height: 100vh;
      // height: 110vh !important;
    }
  }
  @media (max-width: 767px) {
    .login-right {
      width: 100vw;
    }
    .login-tabs-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 2rem;
      padding-top: 2rem;
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
