<template>
  <div>
    <div class="flex sort w-full justify-between items-center mt-4 md:mt-0 w-full flex-wrap">
      <span class="section-header self-start">All Deals</span>
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
    <div class="flex flex-wrap cards">
      <deal-card-new
        :deal="item"
        :key="item.id"
        v-for="(item, index) in deals"
        @capRate="addCapRate(index, ...arguments)"
        @totalReturn="addTotalReturn(index, ...arguments)"
      ></deal-card-new>
    </div>
  </div>
</template>

<style lang="scss">
app {
  background-color: #ffffff !important;
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
.vs__dropdown-option--highlight {
  background: #49a25a;
}
</style>

<script>
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import DealCardNew from "../layouts/components/DealCardNew.vue";
import { API, graphqlOperation } from "aws-amplify";
import { listDeals } from "../graphql/custom-queries";
import vSelect from "vue-select";

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6],
      favorites: [1, 2, 3, 4],
      myDeals: [1, 2, 3, 4],
      deals: [],
      collapseDeals: true,
      activeItem: true,
      collapseFav: true,
      activeSort: 1,
      buildingName: "Downtown Brickell",
      favBuilding: "Boulevard Royale",
      myBuildings: "Sunny Hills",
      sort: "Alphabetical",
      loaded: 0,
    };
  },
  methods: {
    async listDeals() {
      //console.log(this.$store.state.userObject.id);
      this.deals = await API.graphql(
        graphqlOperation(listDeals, {
          limit: 1000,
          filter: {
            or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }],
          },
        })
      );
      this.deals = this.deals.data.listDeals.items;
      ////console.log(this.deals[0]);
      ////console.log(12);
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

    addCapRate(index, value) {
      this.deals[index].capRate = value;
    },
    sortAlphabetical() {
      this.deals.sort(this.dynamicSort("title"));
    },
    sortPrice() {
      this.deals.sort(this.dynamicSort("-dollarValues"));
    },
    sortDate() {
      this.deals.sort(this.dynamicSort("-createdAt"));
    },
    sortCap() {
      this.deals.sort(this.dynamicSort("-capRate"));
    },
    sortReturn() {
      this.deals.sort(this.dynamicSort("-totalReturn"));
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
    loaded: function () {
      this.sortAlphabetical();
    },
  },
  created() {
    this.listDeals();
  },
  components: {
    HNavMenu,
    DealCardNew,
    vSelect,
  },
};
</script>
