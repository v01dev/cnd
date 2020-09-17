<template>
  <div
    class="h-full screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-register"
    v-bind:class="{ 'h-screen': confirm }"
  >
    <!--    <login-nav :activeItem="activeItem"></login-nav>-->
    <div class="vx-col w-full h-full sm:m-0 m-4">
      <div class="full-page-bg-color h-full w-full" slot="no-body">
        <div class="vx-row no-gutter justify-center items-center h-full w-full">
          <div class="vx-col xl:block xl:w-1/2 h-full relative login-left">
            <div class="overlay"></div>
            <!-- <p class="slogan">Opportunity is everywhere, if you know where to look.</p> -->
          </div>

          <div class="vx-col sm:w-full md:w-full xl:w-1/2 flex d-theme-dark-bg h-full login-right">
            <div class="login-tabs-container">
              <div class="title mb-4">
                <h2 class="mb-4" v-if="!confirm">Create a new account</h2>
                <h2 class="mb-4" v-if="confirm">Confirm Signup</h2>
              </div>

              <form v-if="!confirm">
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  data-vv-validate-on="blur"
                  label="Email (Username) *"
                  name="email"
                  placeholder="Enter your email"
                  v-model="email"
                  v-validate="'required|email|min:3'"
                />
                <span class="text-danger text-sm">{{ errors.first("email") }}</span>
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
                <vs-input
                  class="w-full"
                  color="#707070"
                  label="First Name *"
                  name="First Name"
                  placeholder="Enter your first name"
                  v-model="firstName"
                  v-validate="'required'"
                />
                <span class="text-danger text-sm">{{ errors.first("First Name") }}</span>
                <span class="text-danger text-sm">{{ errmsg }}</span>
                <vs-input
                  class="w-full"
                  color="#707070"
                  label="Last Name *"
                  name="Last Name"
                  placeholder="Enter your last name"
                  v-model="lastName"
                  v-validate="'required'"
                />
                <span class="text-danger text-sm">{{ errors.first("Last Name") }}</span>
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  label="Company Name (optional)"
                  name="Company Name"
                  placeholder="Enter your company name"
                  v-model="companyName"
                />

                <div class="mt-6">
                  <label class>Phone Number *</label>
                  <VuePhoneNumberInput
                    @update="formatNumber"
                    class="w-full"
                    error-color="#FF0000"
                    v-model="phone_number"
                  />
                  <span class="text-danger text-sm" v-if="!phone_number || isValid"></span>
                  <span
                    class="text-danger text-sm"
                    v-if="!isValid && phone_number"
                  >Invalid, it won't be added to your account</span>
                </div>
                <div class="flex items-center justify-between py-12">
                  <vs-checkbox v-model="usernamePhone">Use phone number instead of email as username</vs-checkbox>
                </div>
                <div class="flex items-center justify-between py-12">
                  <span>
                    Have an account?
                    <br class="sm:hidden" />
                    <router-link class="font-bold login-link" to="./login">Login</router-link>
                  </span>
                  <vs-button
                    :disabled="!validateForm"
                    @click="registerUser"
                    class="float-right sign-in-button rounded-full"
                    color="#49A25A"
                  >{{ register_btn }}</vs-button>
                </div>
              </form>
              <form v-show="confirm">
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  disabled
                  label="Username *"
                  name="email"
                  placeholder="Enter your username"
                  v-model="email"
                  v-if="!usernamePhone"
                />
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  disabled
                  label="Username *"
                  name="email"
                  placeholder="Enter your username"
                  v-model="formattedNumber"
                  v-else
                />
                <vs-input
                  class="w-full mt-6"
                  color="#707070"
                  label="Confirmation Code"
                  name="code"
                  placeholder="Enter recieved code here"
                  v-model="confirmation_code"
                />
                <span class="text-danger text-sm">{{ errmsg_confirm }}</span>
                <div class="mt-2">
                  <span>
                    Lost your code?
                    <router-link
                      class="font-bold login-link"
                      to
                      v-on:click.native="resendSignUp"
                    >Resend code</router-link>
                  </span>
                </div>
                <div class="flex items-center justify-between py-12">
                  <router-link
                    class="font-bold login-link"
                    color="#707070"
                    to="./login"
                  >Back to Sign In</router-link>
                  <vs-button
                    :disabled="!validateConfirm"
                    @click="confirmSignUp"
                    class="float-right sign-in-button rounded-full"
                    color="#49A25A"
                  >{{ confirm_btn }}</vs-button>
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
import VuePhoneNumberInput from "vue-phone-number-input";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createUser } from "../../graphql/mutations";

export default {
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      companyName: "",
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
      usernamePhone: false,
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
    VuePhoneNumberInput,
  },
  methods: {
    async registerUser() {
      this.register_btn = "Loading...";
      if (!this.isValid) {
        Auth.signUp({
          username: this.username,
          password: this.password,
          attributes: {
            email: this.email,
          },
        })
          .then((data) => {
            this.newUser.id = data.userSub;
            this.newUser.email = this.email;
            this.confirm = true;
            this.$vs.notify({
              time: 8000,
              title: "Confirm Signup",
              text:
                "You will receive a confirmation code by email, please enter it to verify your account.",
              color: "primary",
            });
            //API.graphql(graphqlOperation(createUser, {input: this.newUser}));
          })
          .catch((err) => {
            this.errmsg = "Username is already taken";
            this.register_btn = "Create Account";
            console.log(err);
          });
      } else {
        if (this.usernamePhone) {
          this.username = this.formattedNumber;
          Auth.signUp({
            username: this.formattedNumber,
            password: this.password,
            attributes: {
              email: this.email.toLowerCase(),
              phone_number: this.formattedNumber,
              given_name: this.firstName,
              family_name: this.lastName,
            },
          })
            .then((data) => {
              this.newUser.id = data.userSub;
              this.newUser.email = this.email.toLowerCase();
              this.newUser.mobile = this.formattedNumber;
              this.newUser.tel = this.formattedNumber;
              this.confirm = true;
              //API.graphql(graphqlOperation(createUser, {input: this.newUser}))
              this.$vs.notify({
                time: 8000,
                title: "Confirm Signup",
                text:
                  "You will receive a confirmation code by email, please enter it to verify your account.",
                color: "primary",
              });
            })
            .catch((err) => {
              this.errmsg = err.message;
              this.register_btn = "Create Account";
            });
        } else {
          this.username = this.email.toLowerCase();
          Auth.signUp({
            username: this.email.toLowerCase(),
            password: this.password,
            attributes: {
              email: this.email.toLowerCase(),
              phone_number: this.formattedNumber,
              given_name: this.firstName,
              family_name: this.lastName,
            },
          })
            .then((data) => {
              this.newUser.id = data.userSub;
              this.newUser.email = this.email.toLowerCase();
              this.newUser.mobile = this.formattedNumber;
              this.newUser.tel = this.formattedNumber;
              this.confirm = true;
              //API.graphql(graphqlOperation(createUser, {input: this.newUser}))
              this.$vs.notify({
                time: 8000,
                title: "Confirm Signup",
                text:
                  "You will receive a confirmation code by email, please enter it to verify your account.",
                color: "primary",
              });
            })
            .catch((err) => {
              this.errmsg = err.message;
              this.register_btn = "Create Account";
            });
        }
      }
    },
    formatNumber(payload) {
      this.formattedNumber = payload.formattedNumber;
      this.isValid = payload.isValid;
    },
    async confirmSignUp() {
      this.confirm_btn = "Loading...";
      this.errmsg_confirm = "";
      if (this.usernamePhone) {
        this.username = this.formattedNumber;
      } else {
        this.username = this.email.toLowerCase();
      }
      Auth.confirmSignUp(this.username, this.confirmation_code)
        .then((data) => {
          //console.log(data);
          Auth.signIn(this.username, this.password)
            .then((data) => {
              this.newUser.username = data.username.toLowerCase();
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
              this.newUser.firstName = this.firstName;
              this.newUser.lastName = this.lastName;
              this.newUser.companyName = this.companyName;
              API.graphql(
                graphqlOperation(createUser, { input: this.newUser })
              );
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
              this.errmsg = "Invalid credentials";
              this.login_btn = "Login";
              console.log(err);
            });
        })
        .catch((err) => {
          this.errmsg_confirm = "Wrong code";
          this.confirm_btn = "Confirm";
        });
    },
    async resendSignUp() {
      this.confirm_btn = "Loading...";
      this.confirmation_code = "";
      this.errmsg_confirm = "";
      Auth.resendSignUp(this.username)
        .then((data) => {
          this.confirm_btn = "Confirm";
        })
        .catch((err) => {
          this.errmsg_confirm = "Oops, something went wrong";
          this.confirm_btn = "Confirm";
        });
    },
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.isValid &&
        this.phone_number
      );
    },
    validateConfirm() {
      return !this.errors.any() && this.confirmation_code !== "";
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
