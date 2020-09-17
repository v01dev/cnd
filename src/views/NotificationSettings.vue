<template>
  <vx-card no-shadow>
    <div class="mb-base form-area">
      <h1 class=" w-full text-left section-title">Activity</h1>

      <div class="flex items-center mb-4">
        <vs-switch v-model="grant" />
        <span class="ml-4">Notify me when deal access is granted</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="deny" />
        <span class="ml-4">Notify me when deal access is denied</span>
      </div>
      <div class="flex items-center mb-4" v-if="this.$store.state.sa">
        <vs-switch v-model="request" />
        <span class="ml-4">Notify me when deal access is requested</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="newDeal" />
        <span class="ml-4">Notify me when new deals are posted</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="digest" />
        <span class="ml-4">Send me a weekly deal digest</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-base">
      <vs-button @click="updateNotificationSettings" class="ml-auto mt-2"
        >Save Changes</vs-button
      >
      <vs-button
        @click="setDefault"
        class="ml-4 mt-2"
        color="warning"
        type="border"
        >Reset</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
import { updateUser } from "../graphql/mutations";
import { getUserNotifications } from "../graphql/custom-queries";
import { API, graphqlOperation } from "aws-amplify";
import { listNotifications } from "../graphql/queries";

export default {
  data() {
    return {
      grant: false,
      deny: false,
      request: false,
      newDeal: false,
      digest: false,
    };
  },
  methods: {
    getUserSettings() {
      //console.log(this.$store.state.userObject);
      this.grant = this.$store.state.userObject.notificationGranted;
      this.deny = this.$store.state.userObject.notificationDenied;
      this.request = this.$store.state.userObject.notificationRequests;
      this.newDeal = this.$store.state.userObject.notificationNew;
      this.digest = this.$store.state.userObject.notificationDigest;
      if (this.grant == null) this.grant = false;
      if (this.deny == null) this.deny = false;
      if (this.request == null) this.request = false;
      if (this.newDeal == null) this.newDeal = false;
      if (this.digest == null) this.digest = false;
    },
    async updateNotificationSettings() {
      this.$vs.loading({ background: "white" });
      let request = {};
      request.id = this.$store.state.userObject.id;
      request.notificationGranted = this.grant;
      request.notificationDenied = this.deny;
      request.notificationRequests = this.request;
      request.notificationNew = this.newDeal;
      request.notificationDigest = this.digest;
      let newUserObject = await API.graphql(
        graphqlOperation(updateUser, { input: request })
      );
      let currentUser = await API.graphql(
        graphqlOperation(getUserNotifications, {
          id: this.$store.state.currentUserID,
        })
      );
      currentUser = currentUser.data.getUser;
      console.log(this.$store.state.userObject);
      let userCreatedAt = this.$store.state.userObject.createdAt;
      if (currentUser.notifications.items.length > 0) {
        currentUser.notifications.items.forEach((notification, index) => {
          if (new Date(notification.createdAt) < new Date(userCreatedAt)) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (notification.deal == null) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationDenied != true &&
            notification.type == 3
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationGranted != true &&
            notification.type == 2
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationRequests != true &&
            notification.type == 1 &&
            !this.$store.state.sa
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
        });
      }

      if (currentUser.notificationNew == true) {
        let newDealNotifications = await API.graphql(
          graphqlOperation(listNotifications, {
            limit: 1000,
            filter: {
              type: { eq: 4 },
            },
          })
        );
        newDealNotifications =
          newDealNotifications.data.listNotifications.items;
        newDealNotifications.forEach((item) => {
          if (this.$store.state.userObject.ignoreDeals == null)
            this.$store.commit("updateUserIgnore", []);
          if (
            !this.$store.state.userObject.ignoreDeals.includes(item.id) &&
            item.deal != null &&
            new Date(item.createdAt) > new Date(userCreatedAt)
          ) {
            currentUser.notifications.items.push(item);
          }
          ////console.log(currentUser);
        });
      }
      if (currentUser.notificationDigest == true) {
        let digestNotifications = await API.graphql(
          graphqlOperation(listNotifications, {
            limit: 1000,
            filter: {
              type: { eq: 5 },
            },
          })
        );
        digestNotifications = digestNotifications.data.listNotifications.items;
        digestNotifications.forEach((item) => {
          if (this.$store.state.userObject.ignoreDeals == null)
            this.$store.commit("updateUserIgnore", []);
          if (
            !this.$store.state.userObject.ignoreDeals.includes(item.id) &&
            new Date(item.createdAt) > new Date(userCreatedAt)
          ) {
            currentUser.notifications.items.push(item);
          }
          ////console.log(currentUser);
        });
      }
      console.log(currentUser);
      this.$store.commit("setUserObject", currentUser);
      this.getUserSettings();
      // this.$vs.loading.close();
      this.$router.go(0);
    },
    async setDefault() {
      this.$vs.loading({ background: "white" });
      let request = {};
      request.id = this.$store.state.userObject.id;
      request.notificationGranted = true;
      request.notificationDenied = false;
      request.notificationRequests = true;
      request.notificationNew = false;
      request.notificationDigest = true;
      let newUserObject = await API.graphql(
        graphqlOperation(updateUser, { input: request })
      );
      this.$store.commit("setUserObject", newUserObject.data.updateUser);
      this.getUserSettings();
      this.$vs.loading.close();
    },
  },
  mounted() {
    this.getUserSettings();
  },
};
</script>
