<template>
  <div class="flex flex-wrap justify-between edit-profile">
    <vs-tabs>
      <vs-tab label="Personal Info">
        <div class="form-area">
          <h1 class=" w-full text-left section-title">Manage Profile</h1>
          <div
            class="sm:flex items-center w-full flex-shrink-0 justify-start profile mt-2"
          >
            <img
              :src="userImage"
              alt="user-img"
              class="user-img shadow-md rounded-lg block ml-3"
              v-if="this.user.avatar != null"
            />
            <img
              v-else
              class="user-img shadow-md rounded-lg block ml-3"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            />
            <input class="ml-3 mt-2 sm:mt-0" id="uploadAvatar" type="file" />
          </div>
          <div class="w-full lg:w-2/5 xxl:w-3/12 m-3">
            <vs-input
              class="w-full"
              color="#707070"
              label="Company Name"
              name="Company Name"
              placeholder="Company Name"
              v-model="user.companyName"
            />
          </div>
          <div class="w-full lg:w-2/5 xxl:w-3/12 m-3">
            <vs-input
              class="w-full"
              color="#707070"
              label="First Name"
              name="First Name"
              placeholder="Enter your first name"
              v-model="user.firstName"
              v-validate="'required'"
            />
            <span class="text-danger text-sm">{{
              errors.first("First Name")
            }}</span>
          </div>
          <div class="w-full lg:w-2/5 xxl:w-3/12 m-3">
            <vs-input
              class="w-full"
              color="#707070"
              label="Last Name"
              name="Last Name"
              placeholder="Enter your last name"
              v-model="user.lastName"
              v-validate="'required'"
            />
            <span class="text-danger text-sm">{{
              errors.first("Last Name")
            }}</span>
          </div>
          <div class="flex flex-col w-full lg:w-2/5 xxl:w-3/12 m-3">
            <vs-input
              class="w-full"
              color="#707070"
              label="Email"
              name="email"
              disabled
              placeholder="Enter your email"
              v-model="user.email"
              v-validate="'email'"
            />
            <span class="text-danger text-sm">{{ errors.first("email") }}</span>
          </div>
          <!--    <div class="w-full lg:w-2/5 xxl:w-3/12 m-3">-->
          <!--    <vs-input-->
          <!--        class="w-full"-->
          <!--        color="#707070"-->
          <!--        label="Mobile Phone Number"-->
          <!--        name="mobile_phone_number"-->
          <!--        placeholder="Enter your mobile phone number(optional)"-->
          <!--        v-model="user.mobile"/>-->
          <!--    </div>-->

          <div class="w-full lg:w-2/5 xxl:w-3/12 m-3">
            <vs-input
              class="w-full"
              color="#707070"
              label="Phone Number"
              name="Phone Number"
              disabled
              placeholder="Enter your phone number"
              v-model="user.tel"
            />
          </div>
          <!--    <div class="w-full flex flex-col justify-center mt-8">-->
          <!--      <h4>Edit your newsletter</h4>-->
          <!--      <vs-textarea v-model="user.newsletter"/>-->
          <!--    </div>-->
          <div class="w-full flex justify-center mt-8">
            <vs-button
              :disabled="!validateForm"
              @click="updateUser()"
              class="float-right rounded-full sign-in-button"
              color="#49A25A"
              size="large"
            >
              Save
            </vs-button>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Notification Settings">
        <notification-settings></notification-settings>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import notificationSettings from "./NotificationSettings";

export default {
  data() {
    return {
      given_name: "Condos",
      family_name: "User",
      middle_name: "",
      userImage: "",
      textarea: "",
      companyName: "",
      email: "condosuser@gmail.com",
      phone_number: "+16045550097",
      birthdate: new Date("1971-05-02"),
      city: "New York",
      gender: "Rather not say",
      user: {},
      options: [
        { id: 1, label: "Female" },
        { id: 3, label: "Male" },
        { id: 2, label: "Rather not say" },
      ],
    };
  },
  methods: {
    async getCurrentUser() {
      this.user = this.$store.state.userObject;
      // if (this.user.newsletter == null) this.user.newsletter = "Hi! I'm " + this.user.username;

      if (this.user.avatar != null) {
        Storage.get(this.user.avatar).then((result) => {
          this.userImage = result;
        });
      }
      //console.log(this.validateForm);
    },
    async updateUser() {
      this.$vs.loading({ background: "white" });
      let updatedUser = {};
      updatedUser.id = this.user.id;
      updatedUser.firstName = this.user.firstName;
      updatedUser.lastName = this.user.lastName;
      updatedUser.email = this.user.email;
      // updatedUser.mobile = this.user.mobile;
      updatedUser.tel = this.user.tel;
      updatedUser.companyName = this.user.companyName;
      // updatedUser.newsletter = this.user.newsletter;
      if (
        this.$store.state.userObject.configured === false &&
        updatedUser.firstName &&
        updatedUser.lastName &&
        updatedUser.tel
      )
        updatedUser.configured = true;
      ////console.log(updatedUser.newsletter);
      let selectedFile = document.getElementById("uploadAvatar").files;
      ////console.log(selectedFile[0]);
      if (selectedFile[0]) {
        updatedUser.avatar = updatedUser.id + selectedFile[0].name;
        ////console.log(updatedUser.avatar);
        Storage.put(updatedUser.avatar, selectedFile[0], {
          contentType: selectedFile[0].type,
        });
      }
      ////console.log(updatedUser);
      this.user = await API.graphql(
        graphqlOperation(updateUser, { input: updatedUser })
      );
      this.user = this.user.data.updateUser;
      let mergeUser = { ...this.$store.state.userObject, ...this.user };
      ////console.log(mergeUser);
      this.$store.commit("setUserObject", mergeUser);
      //console.log(this.$store.state.userObject);
      if (selectedFile[0]) {
        setTimeout(this.waitUpload, 10000);
      } else {
        // this.$vs.loading.close();
        this.$router.go(0);
      }
    },
    waitUpload() {
      this.$router.go(0);
    },
    updatePage() {
      this.$router.go(0);
    },
  },
  mounted() {
    //setTimeout((//console.log(this.birthdate)), 3000);
    this.getCurrentUser();
    this.$vs.loading.close();
  },
  components: {
    Datepicker,
    notificationSettings,
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.user.firstName && this.user.lastName;
    },
  },
  watch: {
    user: function() {
      //console.log(this.validateForm);
    },
  },
};
</script>

<style lang="scss">
.edit-profile {
  .user-img {
    width: 200px;
    height: auto;
  }

  @media (min-width: 1024px) {
    .edit-profile {
      margin-top: 6rem;
    }
  }

  .content-wrapper {
    min-height: 100% !important;
  }

  .vs-input input {
    background-color: #f0f0f0;
    border: none !important;
    border-radius: 9999px;
  }

  .vdp-datepicker input {
    background-color: #f0f0f0;
    border: none !important;
    border-radius: 9999px;
  }

  .v-select {
    background-color: #f0f0f0;
    border: none !important;
    border-radius: 9999px;
    margin-top: 5px;
  }

  .vs__dropdown-toggle {
    border: none;
    border-radius: 9999px;
  }

  .vs-input--label {
    font-size: 15px;
  }

  label {
    padding-left: 5px;
  }

  .vs__dropdown-menu {
    border-radius: 15px;
    border: none;
    padding: 0;
  }

  // .con-input-upload {
  // }

  .vs-con-input {
    margin-top: 5px;
  }

  .profile {
    margin-top: -20px;
  }

  .datepicker {
    margin-top: 5px;
  }

  @media (max-width: 575px) {
    .con-upload {
      margin-top: 20px;
    }

    .con-img-upload {
      padding: 0 !important;
    }

    .con-input-upload {
      margin: 0;
    }

    .profile {
      margin-top: 0;
    }
  }
}

h1.section-title {
  margin-left: 0;
  margin-top: 0;
  padding-top: 50px;
}
</style>
