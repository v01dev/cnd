<template>
  <div>
    <h3 class="block section-title" v-if="newDeals.length > 0">Access Notifications</h3>
    <div class="flex flex-wrap" v-if="notifications.length > 0">
      <div
        :key="notification.id"
        v-for="(notification, index) in notifications"
        class="notification-card relative"
        v-if="
          notification.type != 4 &&
            notification.type != 5 &&
            notification.deal != null
        "
      >
        <div class="notification-type ">
          <span v-if="notification.type == 1">Access Requested</span>
          <span v-if="notification.type == 2">Access Granted</span>
          <span v-if="notification.type == 3">Access Denied</span>
        </div>
        <div class="notification-text">
          <span v-if="notification.type == 1"
            >Someone has requested access to
            <span class="deal-link" @click="pushLink(notification.deal.id)"
              >"{{ notification.deal.title }}"</span
            >
            deal</span
          >
          <span v-if="notification.type == 2"
            >You were granted access to
            <span class="deal-link" @click="pushLink(notification.deal.id)"
              >"{{ notification.deal.title }}"</span
            >
            deal</span
          >
          <span v-if="notification.type == 3"
            >You were refused access to the "{{ notification.deal.title }}"
            deal</span
          >
        </div>
        <div class="notification-delete">
          <vs-icon
            @click="deleteNotification(notification.id, index)"
            icon="clear"
            size="small"
          >
          </vs-icon>
        </div>
      </div>
    </div>
    <h3 class="block section-title" v-if="newDeals.length > 0">New Deals</h3>
    <div class="flex flex-wrap" v-if="newDeals.length > 0">
      <div
        :key="notification.id"
        v-for="(notification, index) in newDeals"
        class="notification-card relative"
        v-if="notification.type == 4 && notification.deal != null"
      >
        <div class="notification-type ">
          <span>New Deal</span>
        </div>
        <div class="notification-text">
          <span
            >There is new deal -
            <span class="deal-link" @click="pushLink(notification.deal.id)"
              >"{{ notification.deal.title }}"</span
            >
            deal</span
          >
        </div>
        <div class="notification-delete">
          <vs-icon
            @click="ignoreNotification(notification, index)"
            icon="clear"
            size="small"
          >
          </vs-icon>
        </div>
      </div>
    </div>
    <h3 class="block" v-if="digests.length > 0">Weekly Digest</h3>
    <div class="flex flex-wrap" v-if="digests.length > 0">
      <div
        :key="notification.id"
        v-for="(notification, index) in digests"
        class="notification-card relative"
        v-if="notification.type == 5"
      >
        <div class="notification-type ">
          <span>Weekly Digest</span>
        </div>
        <div class="notification-text">
          <span>{{ notification.text }}</span>
        </div>
        <div class="notification-delete">
          <vs-icon
            @click="ignoreNotification(notification, index)"
            icon="clear"
            size="small"
          >
          </vs-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { getUserNotifications } from "../graphql/custom-queries";
import { deleteNotification, updateUser } from "../graphql/mutations";
import { listNotifications } from "../graphql/queries";
export default {
  data() {
    return {
      notifications: [],
      newDeals: [],
      digests: [],
    };
  },
  methods: {
    async getUserNotifications() {
      //this.$vs.loading({background: "white"});
      //let userObject = await API.graphql(graphqlOperation(getUserNotifications, {id: this.$store.state.currentUserID}));
      //this.$store.commit('setUserObject', userObject.data.getUser);
      this.notifications = this.$store.state.userObject.notifications.items;
      this.notifications.forEach((item, index) => {
        if (this.$store.state.userObject.ignoreDeals == null)
          this.$store.state.userObject.ignoreDeals = [];
        if (
          item.type == 4 &&
          !this.$store.state.userObject.ignoreDeals.includes(item.id)
        ) {
          this.newDeals.push(item);
        }
        if (
          item.type == 5 &&
          !this.$store.state.userObject.ignoreDeals.includes(item.id)
        ) {
          this.digests.push(item);
          //console.log(this.digests);
        }
      });
      //console.log(this.newDeals);
      this.newDeals.sort(this.dynamicSort("createdDate"));
      //console.log(this.newDeals);
      //console.log(this.notifications);
      ////console.log(userObject);
      ////console.log("lol");
      //this.$vs.loading.close();
    },
    async deleteNotification(target_id, target_index) {
      this.$vs.loading({ background: "white" });
      //console.log(target_id);
      let deleteInput = {};
      deleteInput.id = target_id;
      await API.graphql(
        graphqlOperation(deleteNotification, { input: deleteInput })
      );
      this.notifications.splice(target_index, 1);
      this.$vs.loading.close();
    },
    pushLink(id) {
      this.$router.push("../deal-details/" + id);
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = 0;

        result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    async ignoreNotification(notification, index) {
      this.$vs.loading({ background: "white" });
      let updateInput = {};
      if (this.$store.state.userObject.ignoreDeals != null) {
        updateInput.ignoreDeals = this.$store.state.userObject.ignoreDeals;
      } else updateInput.ignoreDeals = [];
      updateInput.ignoreDeals.push(notification.id);
      updateInput.id = this.$store.state.userObject.id;
      let response = await API.graphql(
        graphqlOperation(updateUser, { input: updateInput })
      );
      let currentUser = await API.graphql(
        graphqlOperation(getUserNotifications, {
          id: this.$store.state.currentUserID,
        })
      );
      currentUser = currentUser.data.getUser;
      if (currentUser.notifications.items.length > 0) {
        currentUser.notifications.items.forEach((notification, index) => {
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
            notification.type == 1
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
            item.deal != null
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
          if (!this.$store.state.userObject.ignoreDeals.includes(item.id)) {
            currentUser.notifications.items.push(item);
          }
          ////console.log(currentUser);
        });
      }
      this.$store.commit("setUserObject", currentUser);
      if (notification.type == 4) {
        this.newDeals.splice(index, 1);
      } else this.digests.splice(index, 1);
      this.$vs.loading.close();
    },
  },
  mounted() {
    this.getUserNotifications();
  },
};
</script>

<style scoped>
.notification-card {
      margin: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 2%), 4px 3px 6px rgb(0 0 0 / 8%);
    padding-top: 16px;
    text-align: left;
    display: flex;
    flex-direction: row;
    /* text-align: left !important; */
    background: white;
    padding-left: 27px;
    padding-bottom: 16px;
    width:100%;
}
.notification-type {
      /* left: 0; */
    /* margin-left: 10px; */
    display: block;
    font-size: 19px;
    font-weight: 500;
    line-height: 1;
    margin-top: 0px;
    /* width: 20%; */
    /* flex-grow: 1; */
    /* float: left; */
    width: 200px;
}
.notification-text {
  margin-top: 2px;
    text-align: left;
    display: block;
    margin-top: 0px;
    flex-grow: 1;
}
.notification-delete {
  margin-top: 2px;
    cursor: pointer;
    position: absolute;
    right: 13px;
    opacity: 0.5;
}
.deal-link {
  color: #49a25a;
  cursor: pointer;
}

.section-title {
    font-family: "Khmer MN",Georgia,"Time New Roman",serif;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 1%;
    color: #9b9b9b;
    font-size: 30px;
}
</style>
