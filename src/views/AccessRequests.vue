<template>
  <div class="h-full" v-if="this.$store.state.sa">
    <h1>Deal Access Requests</h1>
    <div
      :key="parent_index"
      class="access-request flex flex-col w-1/2 justify-between items-start"
      v-for="(item, parent_index) in myDeals"
      v-if="item.accessRequets.items.length > 0">
      <div class="h-full w-full" v-if="item.accessRequets.items.length > 0">
        <h4>Deal: {{ item.title }}</h4>
        <div
          :key="index"
          class="flex items-center mt-2 flex-grow-1 justify-between w-full"
          v-for="(request, index) in item.accessRequets.items"
        >
          <span :key="index">User {{ request.user_name }} had requested access - {{request.createdAt.substr(0,10)}}</span>
          <div class="flex">
            <vs-button
            :key="index"
              @click="
                allowDealAccess(
                  request.deal.id,
                  request.user,
                  myDeals[parent_index].userAccess,
                  request.id,
                  parent_index,
                  index
                )
              "
              class="ml-2 bg-success"
            >
              Allow
            </vs-button>
            <vs-button
              @click="
                denyDealAccess(
                  request.id,
                  parent_index,
                  index,
                  request.deal.id,
                  request.user
                )
              "
              class="ml-2 bg-danger"
              >Deny</vs-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import {
  listMyBuildings,
  listMyDeals,
  listMyUnits,
} from "../graphql/custom-queries";
import {
  deleteAccessRequest,
  updateBuilding,
  updateDeal,
  updateUnit,
  createNotification,
} from "../graphql/mutations";

export default {
  data() {
    return {
      myUnits: [],
      myBuildings: [],
      myDeals: [],
    };
  },
  methods: {
    async listMyDeals() {
      this.myDeals = await API.graphql(
        graphqlOperation(listMyDeals),
        {limit: 1000}
      );
      this.myDeals = this.myDeals.data.listDeals.items;
      console.log(this.myDeals);
      await this.myDeals.sort(this.dynamicSort("-updatedAt"));
      this.myDeals.forEach((item) => {
          console.log(item);
          item.accessRequets.items.sort(this.dynamicSort("-createdAt"));
      })
      console.log(this.myDeals);
      console.log(this.myDeals);
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
    async allowDealAccess(
      id,
      user,
      accessArray,
      requestID,
      parent_index,
      index
    ) {
      this.$vs.loading({ background: "white" });
      if (accessArray == null) accessArray = [];
      let updateInput = {
        id: id,
        userAccess: [...accessArray,user],
      };
      // accessArray.push(user);
      // console.log(this.myDeals[parent_index].userAccess);
      this.myDeals[parent_index].userAccess.push(user);
      // console.log(this.myDeals[parent_index].userAccess);
      // this.myDeals.items[parent_index].userAccess.push(user);
      let response1 = await API.graphql(graphqlOperation(updateDeal, { input: updateInput }));
      // console.log(response1);
      let deleteRequest = {
        id: requestID,
      };
      let response2 = await API.graphql(
        graphqlOperation(deleteAccessRequest, { input: deleteRequest })
      );
      // console.log(response2);
      //console.log(this.myDeals[parent_index].accessRequets.items);
      this.myDeals[parent_index].accessRequets.items.splice(index, 1);
      //console.log(this.myDeals[parent_index].accessRequets.items);
      let notificationInput = {};
      notificationInput.notificationDealId = id;
      notificationInput.notificationSenderId = this.$store.state.userObject.id;
      notificationInput.notificationUserId = user;
      notificationInput.type = 2;
      await API.graphql(
        graphqlOperation(createNotification, { input: notificationInput })
      );
      this.$vs.loading.close();
    },
    async denyDealAccess(requestID, parent_index, index, deal_id, user) {
      this.$vs.loading({ background: "white" });
      let deleteRequest = {
        id: requestID,
      };
      await API.graphql(
        graphqlOperation(deleteAccessRequest, { input: deleteRequest })
      );
      this.myDeals[parent_index].accessRequets.items.splice(index, 1);
      let notificationInput = {};
      notificationInput.notificationDealId = deal_id;
      notificationInput.notificationSenderId = this.$store.state.userObject.id;
      notificationInput.notificationUserId = user;
      notificationInput.type = 3;
      await API.graphql(
        graphqlOperation(createNotification, { input: notificationInput })
      );
      this.$vs.loading.close();
    },
  },
  mounted() {
    this.listMyDeals();
  },
};
</script>

<style>
.access-request {
 box-shadow: 0 3px 6px rgb(0 0 0 / 1%), 0 3px 6px rgb(0 0 0 / 3%);
    padding: 1rem;
    margin: 1rem;
    background: white;
    border-radius: 5px;
}
</style>
