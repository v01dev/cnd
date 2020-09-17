<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <!--    <login-nav :activeItem="activeItem"></login-nav>-->
    <div class="vx-col w-full h-full sm:m-0 m-4">
      <div class="full-page-bg-color h-screen w-full" slot="no-body">
        <div class="vx-row no-gutter justify-center items-center h-screen w-full">
          <div class="vx-col sm:w-1/3 xl:block xl:w-1/2 h-screen relative login-left">
            <div class="overlay"></div>
            <!-- <p class="slogan">Opportunity is everywhere, if you know where to look.</p> -->
          </div>

          <div
            class="vx-col sm:w-full md:w-full xl:w-1/2 flex d-theme-dark-bg h-screen login-right"
          >
            <div class="login-tabs-container">
              <div class="title mb-4">
                <h2 class="mb-4">Login to your account</h2>
              </div>

              <div>
                <vs-input
                  class="w-full"
                  color="#707070"
                  label="Email (Username) *"
                  name="username"
                  placeholder="Enter your email (username)"
                  v-model="username"
                />
                <span class="text-danger text-sm">{{ errmsg }}</span>
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  data-vv-validate-on="blur"
                  label="Password *"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  v-model="password"
                  v-validate="'required|min:8'"
                />
                <span class="text-danger text-sm">{{ errors.first("password") }}</span>
                <div class="flex flex-wrap justify-between my-5 mb-12 pb-2">
                  <span v-if="goToResend">
                    <router-link class="font-bold login-link" to="./resend">Go to verification page</router-link>
                  </span>
                  <span v-else>
                    Forgot your password?
                    <router-link class="font-bold login-link" to="./reset">Reset password</router-link>
                  </span>
                </div>
                <div class="flex items-center justify-between pb-2">
                  <span>
                    No account?
                    <router-link
                      class="font-bold login-link"
                      color="#707070"
                      to="./register"
                    >Create account</router-link>
                  </span>
                  <vs-button
                    :disabled="!validateForm"
                    @click="loginUser"
                    class="float-right rounded-full sign-in-button"
                    color="#49A25A"
                  >{{ login_btn }}</vs-button>
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
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createUser } from "../../graphql/mutations";

export default {
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
      activeItem: 4,
      errmsg: "",
      login_btn: "Login",
      newUser: {},
      goToResend: false,
    };
  },
  components: {
    LoginNav,
  },
  methods: {
    async loginUser() {
      this.login_btn = "Loading...";
      Auth.signIn(this.username.toLowerCase(), this.password)
        .then((data) => {
          this.newUser.username = data.username;
          console.log(data);
          this.newUser.id = data.attributes.sub;
          this.$store.commit("setCurrentUserID", data.attributes.sub);
          this.newUser.email = data.attributes.email.toLowerCase();
          this.newUser.tel = data.attributes.phone_number;
          this.newUser.mobile = data.attributes.phone_number;
          this.newUser.configured = false;
          this.newUser.notificationNew = true;
          this.newUser.notificationDigest = true;
          this.newUser.notificationGranted = true;
          this.newUser.notificationDenied = true;
          this.newUser.notificationRequests = false;
          this.newUser.firstName = "Condos";
          this.newUser.lastName = "User";
          API.graphql(graphqlOperation(createUser, { input: this.newUser }));
          this.$store.commit("log");
          this.$store.commit("setCurrentUser", data.username);
          this.$store.commit("setUserObject", this.newUser);
          Auth.currentAuthenticatedUser().then((data) => {
            if (data.signInUserSession.idToken.payload["cognito:groups"]) {
              if (
                data.signInUserSession.idToken.payload[
                  "cognito:groups"
                ].includes("SA")
              )
                this.$store.commit("sa", true);
              else this.$store.commit("sa", false);
              console.log(this.$store.state.sa);
            } else {
              this.$store.commit("sa", false);
              console.log(this.$store.state.sa);
            }
          });
          setTimeout(() => {
            this.$router.push("/dashboard").catch(() => {});
          }, 1000);
        })
        .catch((err) => {
          this.errmsg = err.message;
          if (err.code == "UserNotConfirmedException") {
            this.goToResend = true;
          }
          this.login_btn = "Login";
          console.log(err);
        });
      //Auth.currentUserInfo()
      //.then(date=>console.log(data))
      // .catch(err=>console.log(err))
    },
    checkIfLogged() {
      if (this.$store.state.isLoggedIn) this.$router.push("/dashboard");
    },
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username !== "" && this.password !== "";
    },
  },
  created() {
    this.checkIfLogged();
    //console.log(this.$store.state.currentUser)
  },
};
</script>

<style lang="scss">
body {
  background: #f8f8f8 !important;
}

#page-login {
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
        font-size: 3rem;
        text-align: center;
      }
    }
  }

  .vs-input--label {
    padding-left: 0;
    font-size: 15px;
    font-weight: 700;
  }

  .vs-con-input {
    margin-top: 10px;
  }
  .slogan {
    position: absolute;
    top: 12%;
    font-size: 30px;
    width: 70%;
    text-align: center;
    left: 13%;
  }

  .title {
    padding-bottom: 2rem;
  }

  .login-background {
    width: 100%;
    height: 100%;
    opacity: 0.12;
  }

  .slogan {
    position: absolute;
    top: 72%;
    font-size: 30px;
    width: 70%;
    text-align: center;
    left: 13%;
  }
  .login-left {
    background-image: url("/condosbck.jpg");
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .login-left .overlay {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.1;
  }

  .login-right {
    background-color: #f7f7f7;
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

  @media (max-width: 767px) {
    .login-right {
      width: 100vw;
      height: auto !important;
    }
    .login-tabs-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 2rem;
      padding-top: 2rem;
    }
    .sign-in-button {
      width: 40%;
    }
  }
}
</style>
