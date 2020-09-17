<template>
  <div :key="loaded">
    <div class="flex flex-wrap justify-between w-full">
      <div
        class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
      >
        <span class="section-header self-start">My Deals</span>
        <div class="sort-options" v-if="requested.length > 0">
          <span>Sort by</span>
          <v-select
            :options="['Alphabetical', 'Price', 'Most Recent', 'Cap Rate', 'Total Return']"
            :clearable="false"
            class="border-0 sort-select ml-2 w-9/12"
            placeholder="Alphabetical"
            v-model="sort_requested"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap cards" v-if="requested.length > 0 || granted.length > 0">
      <deal-card-new
        :deal="deal"
        :key="deal.id"
        v-for="(deal,index) in requested"
        @capRate="addCapRateRequested(index, ...arguments)"
        @totalReturn="addTotalReturnRequested(index, ...arguments)"
      ></deal-card-new>
      <deal-card-new
        :deal="deal"
        :key="deal.id"
        v-for="(deal,index) in granted"
        @capRate="addCapRateGranted(index, ...arguments)"
        @totalReturn="addTotalReturnGranted(index, ...arguments)"
      ></deal-card-new>
    </div>
    <div class="flex w-full justify-center items-center mt-8 mb-8" v-else>
      <span class="no_records">
        No deal access requests pending.
        <router-link :to="'deals'" class="link-to">Click here to view all deals.</router-link>
      </span>
    </div>
    <!-- <div class="flex flex-wrap justify-between w-full">
      <div
        class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
      >
        <span class="section-header self-start">Deal Access Granted</span>
        <div class="sort-options" v-if="granted.length > 0">
          <span>Sort by</span>
          <v-select
            :options="['Alphabetical', 'Price', 'Most Recent', 'Cap Rate', 'Total Return']"
            :clearable="false"
            class="border-0 sort-select ml-2 w-9/12"
            placeholder="Alphabetical"
            v-model="sort_granted"
          ></v-select>
        </div>
      </div>
    </div>-->
    <!-- <div class="flex flex-wrap cards" v-if="granted.length > 0">
      <deal-card-new
        :deal="deal"
        :key="deal.id"
        v-for="(deal,index) in granted"
        @capRate="addCapRateGranted(index, ...arguments)"
        @totalReturn="addTotalReturnGranted(index, ...arguments)"
      ></deal-card-new>
    </div>-->
    <div class="flex w-full justify-center items-center mt-8">
      <router-link
        :to="'deals'"
        class="link-to"
      >No deal access granted. Please request access to a deal to create your portfolio. Click here to view all deals.</router-link>
    </div>
    <!--<div class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap">
      <span class="section-header self-start">My Deals For Sale</span>
      <div class="sort-options">
        <span>Sort by</span>
        <v-select
          :options="['Alphabetical', 'Price', 'Most Recent', 'Cap Rate', 'Total Return']"
          :clearable="false"
          class="border-0 sort-select ml-2 w-9/12"
          placeholder="Alphabetical"
          v-model="sort"
        ></v-select>
      </div>
    </div>
    <div class="flex flex-wrap justify-between">
      <condos-deal-card :deal="item" :key="item.id" v-for="(item, index) in deals"  @capRate="addCapRate(index, ...arguments)" @totalReturn="addTotalReturn(index, ...arguments)"></condos-deal-card>
    </div>-->
  </div>
</template>

<style lang="scss">
app {
  background-color: #ffffff !important;
}

span.no_records {
  background: white;
  padding: 24px 20px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #686868;
  margin-left: 1%;
  width: 98%;
  margin-bottom: 60px;
  margin-top: 40px;
}

.link-to {
  font-size: 1.5rem;
  text-align: center;
}

.content-wrapper {
  background-color: #f6f6f6;
}
body {
  background-color: #ffffff !important;
}

.tab-nav a {
  margin-right: 3.7rem;
  color: #707070;
}

.tab-nav a:hover {
  color: #fbbf81;
}

.sort span {
  margin-left: 1rem;
}

.sort {
  margin-top: 20px !important;
}

.view-all {
  margin-right: 1.5%;
}

.section-header {
  font-size: 30px;
  font-family: "Khmer MN", Georgia, Times, serif;
  opacity: 0.4;
  margin-left: 1%;
}

.tab-nav .last {
  margin-right: 0;
}

@media (max-width: 767px) {
  .sort {
    width: 100%;
  }
}

.sort-options {
  min-width: 286px;
  max-width: 286px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
}

@media (max-width: 568px) {
  .sort-options {
    width: 100%;
  }
  .sort {
    justify-content: flex-start !important;
  }
}

@media (max-width: 600px) {
  .tab-nav a {
    margin-right: 1.5rem;
  }
}

@media (max-width: 767px) {
  .sort {
    width: 100%;
  }
}
@media (max-width: 645px) {
  .cards {
    justify-content: center;
  }
}

.link-to {
  font-size: 22px;
  text-align: center;
}
.vs__dropdown-option--highlight {
  background: #49a25a;
}
</style>

<script>
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import DealCardNew from "../layouts/components/DealCardNew.vue";
import { API, graphqlOperation } from "aws-amplify";
import { listDeals, getDealMyDeals } from "../graphql/custom-queries";
import vSelect from "vue-select";

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      favorites: [1, 2, 3, 4],
      deals: [],
      collapseDeals: true,
      activeItem: true,
      collapseFav: true,
      activeSort: 1,
      buildingName: "Sunny Hills",
      myBuildings: "Boulevard Royale",
      favBuilding: "Downtown Brickell",
      sort: "Alphabetical",
      loaded: 0,
      granted: [],
      requested: [],
      sort_requested: "Alphabetical",
      sort_granted: "Alphabetical",
    };
  },
  methods: {
    async getMyDeals() {
      this.deals = await API.graphql(
        graphqlOperation(listDeals, {
          filter: { owner: { eq: this.$store.state.userObject.id } },
        })
      );
      this.deals = this.deals.data.listDeals.items;
      ////console.log(this.deals);
      this.loaded = this.loaded + 1;
    },
    getRequested() {
      let dealIDS = [];
      let allowed = [];
      this.$store.state.userObject.accessRequests.forEach(
        async (item, index) => {
          ////console.log("LOLOLO");
          let dealObject = await API.graphql(
            graphqlOperation(getDealMyDeals, { id: item })
          );
          if (
            dealObject.data.getDeal != null &&
            dealObject.data.getDeal.privacy != "Hidden"
          ) {
            if (
              dealObject.data.getDeal.userAccess.includes(
                this.$store.state.userObject.id
              )
            )
              allowed.push(dealObject.data.getDeal);
            else dealIDS.push(dealObject.data.getDeal);
          }
        }
      );
      this.requested = dealIDS;
      this.granted = allowed;
      //console.log(this.granted);
      //console.log(this.requested);
      ////console.log(this.deals);
      this.loaded = this.loaded + 1;
    },

    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = 0;
        if (property != "dollarValues")
          result =
            a[property].toString().toLowerCase() <
            b[property].toString().toLowerCase()
              ? -1
              : a[property].toString().toLowerCase() >
                b[property].toString().toLowerCase()
              ? 1
              : 0;
        else
          result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    addTotalReturn(index, value) {
      this.deals[index].totalReturn = value;
    },
    addTotalReturnGranted(index, value) {
      this.granted[index].totalReturn = value;
    },
    addTotalReturnRequested(index, value) {
      this.requested[index].totalReturn = value;
    },
    addCapRate(index, value) {
      this.deals[index].capRate = value;
    },
    addCapRateGranted(index, value) {
      this.granted[index].capRate = value;
    },
    addCapRateRequested(index, value) {
      this.requested[index].capRate = value;
    },

    sortAlphabetical() {
      this.deals.sort(this.dynamicSort("title"));
    },
    sortAlphabeticalGranted() {
      this.granted.sort(this.dynamicSort("title"));
    },
    sortAlphabeticalRequested() {
      this.requested.sort(this.dynamicSort("title"));
    },
    sortPrice() {
      this.deals.sort(this.dynamicSort("-dollarValues"));
    },
    sortPriceGranted() {
      this.granted.sort(this.dynamicSort("-dollarValues"));
    },
    sortPriceRequested() {
      this.requested.sort(this.dynamicSort("-dollarValues"));
    },
    sortDate() {
      this.deals.sort(this.dynamicSort("-createdAt"));
    },
    sortDateGranted() {
      this.granted.sort(this.dynamicSort("-createdAt"));
    },
    sortDateRequested() {
      this.requested.sort(this.dynamicSort("-createdAt"));
    },
    sortCap() {
      this.deals.sort(this.dynamicSort("-capRate"));
    },
    sortCapGranted() {
      this.granted.sort(this.dynamicSort("-capRate"));
    },
    sortCapRequested() {
      this.requested.sort(this.dynamicSort("-capRate"));
    },
    sortReturn() {
      this.deals.sort(this.dynamicSort("-totalReturn"));
    },
    sortReturnGranted() {
      this.granted.sort(this.dynamicSort("-totalReturn"));
    },
    sortReturnRequested() {
      this.requested.sort(this.dynamicSort("-totalReturn"));
    },
  },
  watch: {
    sort: function () {
      //console.log("sorted");
      if (this.sort == "Alphabetical") this.sortAlphabetical();
      if (this.sort == "Price") this.sortPrice();
      if (this.sort == "Most Recent") this.sortDate();
      if (this.sort == "Cap Rate") this.sortCap();
      if (this.sort == "Total Return") this.sortReturn();
    },
    sort_granted: function () {
      //console.log("sorted");
      if (this.sort_granted == "Alphabetical") this.sortAlphabeticalGranted();
      if (this.sort_granted == "Price") this.sortPriceGranted();
      if (this.sort_granted == "Most Recent") this.sortDateGranted();
      if (this.sort_granted == "Cap Rate") this.sortCapGranted();
      if (this.sort_granted == "Total Return") this.sortReturnGranted();
    },
    sort_requested: function () {
      //console.log("sorted");
      if (this.sort_requested == "Alphabetical")
        this.sortAlphabeticalRequested();
      if (this.sort_requested == "Price") this.sortPriceRequested();
      if (this.sort_requested == "Most Recent") this.sortDateRequested();
      if (this.sort_requested == "Cap Rate") this.sortCapRequested();
      if (this.sort_requested == "Total Return") this.sortReturnRequested();
    },
  },
  created() {
    //this.getMyDeals();
    this.getRequested();
  },
  components: {
    HNavMenu,
    DealCardNew,
    vSelect,
  },
};
</script>
