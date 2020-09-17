<template>
  <div class>
    <div class="flex w-full justify-start items-center mb-2" v-if="this.$store.state.sa">
      <!-- <h1 class="page-title">Seller Tools</h1> -->
    </div>
    <vs-tabs :value="value" v-if="this.$store.state.sa">
      <vs-tab label="Add Deal">
        <div class="con-tab-ejemplo">
          <create-deal></create-deal>
        </div>
      </vs-tab>

      <vs-tab label="Add Building">
        <div class="con-tab-ejemplo">
          <create-building></create-building>
        </div>
      </vs-tab>

      <vs-tab label="Add Unit">
        <div class="con-tab-ejemplo">
          <create-unit :dealMode="false"></create-unit>
        </div>
      </vs-tab>
      <vs-tab label="Manage Deals">
        <div class="con-tab-ejemplo">
          <manage-deals></manage-deals>
        </div>
      </vs-tab>
      <vs-tab label="Manage Buildings">
        <div class="con-tab-ejemplo">
          <manage-buildings></manage-buildings>
        </div>
      </vs-tab>
      <vs-tab label="Manage Units">
        <div class="con-tab-ejemplo">
          <manage-units></manage-units>
        </div>
      </vs-tab>
    </vs-tabs>
    <div class="mt-5 flex" v-else>
      <div class="w-1/2 post-deal flex flex-col text-left">
        <h2 class="title">Post a Deal</h2>

        <ul>
          <li>
            <span>1</span> Our deal concierge will input the deal for your review and approval
          </li>
          <li>
            <span>2</span> All deals are 100% confidential so you can retain retail pricing
          </li>
          <li>
            <span>3</span> Get access to our global investor network for fast liquidity
          </li>
        </ul>
      </div>

      <form
        class="contact-form w-1/2 md:w-8/12 xl:w-1/2 flex flex-col justify-center items-left"
        @submit.prevent="sendEmail"
      >
        <!-- <h2>Contact Form</h2> -->
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
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import CreateDeal from "./CreateDeal";
import CreateUnit from "./CreateUnit";
import CreateBuilding from "./CreateBuilding";
import ManageUnits from "./ManageUnits";
import ManageBuildings from "./ManageBuildings";
import ManageDeals from "./ManageDeals";

export default {
  data() {
    return {
      value: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };
  },
  components: {
    CreateDeal,
    CreateUnit,
    CreateBuilding,
    ManageUnits,
    ManageBuildings,
    ManageDeals,
  },
  methods: {
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
    setUserInfo() {
      this.firstName = this.$store.state.userObject.firstName;
      this.lastName = this.$store.state.userObject.lastName;
      this.email = this.$store.state.userObject.email;
      this.phone = this.$store.state.userObject.tel;
    },
    checkRoute() {
      if (this.$route.params.index) {
        this.value = this.$route.params.index;
        if (
          this.$route.params.index == 5 &&
          this.$route.params.action == "create"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, unit added!",
          });
        }
        if (
          this.$route.params.index == 4 &&
          this.$route.params.action == "create"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, building added!",
          });
        }
        if (
          this.$route.params.index == 3 &&
          this.$route.params.action == "create"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, deal added!",
          });
        }
        if (
          this.$route.params.index == 5 &&
          this.$route.params.action == "update"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, unit updated!",
          });
        }
        if (
          this.$route.params.index == 4 &&
          this.$route.params.action == "update"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, building updated!",
          });
        }
        if (
          this.$route.params.index == 3 &&
          this.$route.params.action == "update"
        ) {
          this.$vs.notify({
            color: "success",
            title: "Success",
            text: "Success, deal updated!",
          });
        }
      }
    },
  },
  watch: {
    $route() {
      this.value = this.$route.params.index;
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Saved successfully",
      });
    },
  },
  created() {
    this.checkRoute();
    this.setUserInfo();
  },
};
</script>

<style>
.router-view {
  /* padding-top: 0; */
  padding-left: 3%;
  padding-right: 3%;
}

.vs-tabs--content {
  padding: 0;
}
.vs-con-input-label {
  width: 48%;
}
.con-vs-tabs {
  /* margin-top:40px; */
  width: 95%;
  /* overflow: hidden; */
  /* position: relative; */
  margin-left: 3%;
}

.con-vs-tabs .con-ul-tabs {
  margin-bottom: 2px;
}

.content-wrapper {
  background-color: #f6f6f6;
}

li.vs-tabs--li button.vs-tabs--btn {
  font-size: 16px;
}

li.vs-tabs--li.activeChild button.vs-tabs--btn {
  font-size: 16px;
}

.post-deal {
  padding-left: 5%;
  padding-top: 5%;
}

h2.title {
  font-size: 4.1rem;
  font-family: "Khmer MN", Georgia, Times New Roman, serif;
  text-align: left !important;
  align-self: flex-start;
  margin-bottom: 32px;
}

.post-deal ul {
  max-width: 450px;
}

.post-deal ul li {
  font-size: 1.4rem;
  margin-bottom: 17px;
  display: flex;
}

.post-deal ul li span {
  display: block;
  padding: 4px 20px;
  padding-top: 12px;
  padding-bottom: 0;
  padding-left: 0%;
  padding-right: 30px;
  color: #bebebe;
  font-family: "Khmer MN", Georgia, Times New Roman, serif;
  font-size: 4.3rem;
  line-height: 1;
}

.contact-form {
  padding-right: 10%;
}
</style>
