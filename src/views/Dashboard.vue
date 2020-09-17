<template>
  <div v-if="this.deals.length">
    <div class="flex flex-wrap justify-between w-full">
      <div
        class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
      >
        <!-- <span class="section-header self-start">Featured Deals</span> -->
        <!-- <div class="sort-options">
          <span>Sort by</span>
          <v-select
            :options="[
              'Alphabetical',
              'Price',
              'Most Recent',
              'Cap Rate',
              'Total Return',
            ]"
            :clearable="false"
            class="border-0 sort-select ml-2 w-9/12"
            placeholder="Alphabetical"
            v-model="sort_featured"
          ></v-select>
        </div> -->
      </div>
    </div>
    <!-- <div class="flex flex-wrap cards">
      <deal-card-new
        :deal="deal"
        :key="deal.id"
        v-for="(deal, index) in featuredDeals"
        @capRate="addCapRateFeatured(index, ...arguments)"
        @totalReturn="addTotalReturnFeatured(index, ...arguments)"
        @accessRequested="addToMyDeals"
        @addToFav="addToFavorites"
      ></deal-card-new>
    </div> -->
    <div class="flex flex-wrap justify-between w-full">
      <div
        class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
      >
        <span class="section-header self-start">Latest Listings</span>
        <div class="sort-options">
          <span>Sort by</span>
          <v-select
            :options="[
              'Alphabetical',
              'Price',
              'Most Recent',
              'Cap Rate',
              'Total Return',
            ]"
            :clearable="false"
            class="border-0 sort-select ml-2 w-9/12"
            placeholder="Alphabetical"
            v-model="sort_latest"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap cards">
      <deal-card-new
        :deal="deal"
        :key="deal.id"
        v-for="(deal, index) in deals"
        @capRate="addCapRate(index, ...arguments)"
        @totalReturn="addTotalReturn(index, ...arguments)"
        @accessRequested="addToMyDeals"
        @addToFav="addToFavorites"
      ></deal-card-new>
    </div>
    <div
      class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
    >
      <span class="section-header self-start">My Favorites</span>
      <div class="sort-options" v-if="favorites.length > 0">
        <span>Sort by</span>
        <v-select
          :options="[
            'Alphabetical',
            'Price',
            'Most Recent',
            'Cap Rate',
            'Total Return',
          ]"
          :clearable="false"
          class="border-0 sort-select ml-2 w-9/12"
          placeholder="Alphabetical"
          v-model="sort_favorites"
        ></v-select>
      </div>
    </div>
    <div class="flex flex-wrap cards" v-if="favorites.length > 0">
      <deal-card-new
        :deal="favorite"
        :key="favorite.id"
        @unFav="remove(index)"
        v-for="(favorite, index) in favorites"
        @capRate="addCapRateFavorites(index, ...arguments)"
        @totalReturn="addTotalReturnFavorites(index, ...arguments)"
        @accessRequested="addToMyDeals"
      ></deal-card-new>
    </div>
    <div class="flex w-full justify-left items-left mt-8 mb-8" v-else>
      <span class="no_records">
        No favorites added. Please click the heart icon on a deal to add it to
        your favorites list.
        <router-link :to="'favorites'" class="link-to">Click here to view all deals</router-link>
      </span>
    </div>
    <div
      class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
      :key="myDealsLoaded"
    >
      <span class="section-header self-start">My Deals</span>
      <div class="sort-options" v-if="myDeals.length > 0">
        <span>Sort by</span>
        <v-select
          :options="[
            'Alphabetical',
            'Price',
            'Most Recent',
            'Cap Rate',
            'Total Return',
          ]"
          :clearable="false"
          class="border-0 sort-select ml-2 w-9/12"
          placeholder="Alphabetical"
          v-model="sort_my"
        ></v-select>
      </div>
    </div>
    <div class="flex flex-wrap cards" v-if="myDeals.length > 0">
      <deal-card-new
        :deal="myDeal"
        :key="myDeal.id"
        @unFav="remove(index)"
        v-for="(myDeal, index) in myDeals"
        @capRate="addCapRateMy(index, ...arguments)"
        @totalReturn="addTotalReturnMy(index, ...arguments)"
        @addToFav="addToFavorites"
      ></deal-card-new>
    </div>
    <div class="flex w-full justify-left items-left mt-8 mb-8" v-else>
      <span class="no_records">
        No deal access requests pending.
        <router-link :to="'deals'" class="link-to">
          Click here to view all
          deals.
        </router-link>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.vs__dropdown-option--highlight {
  background: #49a25a;
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

app {
  background-color: #ffffff;
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

.tab-nav .active {
  color: #fbbf81;
}

.sort {
  margin-top: 20px !important;
}

.view-all {
  margin-right: 1.5%;
}

.section-header {
  font-size: 30px;
  font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
  opacity: 0.4;
  margin-left: 1%;
  padding-left:0;
  padding-top:0;
}

.tab-nav .last {
  margin-right: 0;
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

.sort-options {
  min-width: 286px;
  max-width: 286px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1.5%;
}

@media (max-width: 568px) {
  .sort-options {
    width: 100%;
  }
  .sort {
    justify-content: flex-start !important;
  }
}

@media (max-width: 645px) {
  .cards {
    justify-content: center;
  }
}
</style>

<script>
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import DealCardNew from "../layouts/components/DealCardNew.vue";
import { API, graphqlOperation } from "aws-amplify";
import { getDeal, getUnit, listUnits } from "../graphql/queries";
import {
  listBuildingsDashboard,
  listDeals,
  getDealFavorites,
} from "../graphql/custom-queries";
import vSelect from "vue-select";
import pdf from "vue-pdf";

export default {
  data() {
    return {
      items: [],
      favorites: [],
      myDeals: [],
      deals: [],
      collapseDeals: true,
      activeItem: true,
      collapseFav: true,
      activeSort: 1,
      buildingName: "Sunny Hills",
      myBuildings: "Boulevard Royale",
      favBuilding: "Downtown Brickell",
      units: {},
      sort: "Alphabetical",
      type: 1,
      active: "unit",
      getAccesibleFilter: {
        or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }],
      },
      featuredDeals: [],
      sort_featured: "Alphabetical",
      sort_my: "Alphabetical",
      sort_favorites: "Alphabetical",
      sort_latest: "Most Recent",
      loaded: 0,
      myDealsLoaded: false,
    };
  },
  methods: {
    async listUnits() {
      this.units = {};
      this.$vs.loading({ background: "white" });
      this.units = await API.graphql(
        graphqlOperation(listUnits, {
          limit: 1000,
          filter: {
            or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }],
          },
        })
      );
      this.units = this.units.data.listUnits.items;
      this.$vs.loading.close();
    },
    async getFeaturedDeals() {
      let buffer = await API.graphql(
        graphqlOperation(listDeals, {
          limit: 1000,
          filter: {
            featured: { eq: "True" },
          },
        })
      );
      this.featuredDeals = buffer.data.listDeals.items;
    },
    // async getMyDeals() {
    //   this.myDeals = await API.graphql(
    //     graphqlOperation(listDeals, {
    //       limit: 1000,
    //       filter: { owner: { eq: this.$store.state.currentUserID } }
    //     })
    //   );
    //   this.myDeals = this.myDeals.data.listDeals.items;
    // },
    addCapRate(index, value) {
      this.deals[index].capRate = value;
      ////console.log(this.deals);
    },
    addCapRateFeatured(index, value) {
      this.featuredDeals[index].capRate = value;
    },
    addCapRateFavorites(index, value) {
      this.favorites[index].capRate = value;
    },
    addCapRateMy(index, value) {
      this.myDeals[index].capRate = value;
    },
    addTotalReturnFeatured(index, value) {
      this.featuredDeals[index].totalReturn = value;
    },
    addTotalReturn(index, value) {
      ////console.log(this.deals);
      this.deals[index].totalReturn = value;
    },
    addTotalReturnFavorites(index, value) {
      ////console.log(this.favorites);
      this.favorites[index].totalReturn = value;
    },
    addTotalReturnMy(index, value) {
      // //console.log(this.myDeals);
      this.myDeals[index].totalReturn = value;
    },
    async listBuildings() {
      this.units = {};
      this.$vs.loading({ background: "white" });
      this.units = await API.graphql(
        graphqlOperation(listBuildingsDashboard, {
          limit: 1000,
          filter: {
            or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }],
          },
        })
      );
      this.units = this.units.data.listBuildings.items;
      this.loaded = this.loaded + 1;
      this.$vs.loading.close();
    },
    getFavorites() {
      let dealIDS = [];
      if (this.$store.state.userObject.favorites)
        this.$store.state.userObject.favorites.forEach(async function (
          item,
          index
        ) {
          ////console.log("LOLOLO");
          let dealObject = await API.graphql(
            graphqlOperation(getDealFavorites, { id: item })
          );

          if (
            dealObject.data.getDeal != null &&
            dealObject.data.getDeap.privacy != "Hidden"
          )
            dealIDS.push(dealObject.data.getDeal);
        });
      this.favorites = dealIDS;
      ////console.log(this.favorites);
      this.loaded = this.loaded + 1;
    },
    remove(index) {
      this.favorites.splice(index, 1);
    },
    async getMyDeals() {
      // this.myDeals = await API.graphql(
      //   graphqlOperation(listDeals, {
      //     filter: { owner: { eq: this.$store.state.userObject.id } }
      //   })
      // );
      // this.myDeals = this.myDeals.data.listDeals.items;
      ////console.log(this.myDeals);
      if (this.$store.state.userObject.accessRequests)
        this.$store.state.userObject.accessRequests.forEach(
          async (item, index) => {
            ////console.log("LOLOLO");
            ////console.log(index);
            let dealObject = await API.graphql(
              graphqlOperation(getDealFavorites, { id: item })
            );
            if (
              dealObject.data.getDeal != null &&
              dealObject.data.getDeal.privacy != "Hidden"
            ) {
              this.myDeals.push(dealObject.data.getDeal);
            }
          }
        );
      ////console.log(this.deals);

      this.myDealsLoaded = true;
      this.loaded = this.loaded + 1;
    },
    async listAllDeals() {
      let buffer = await API.graphql(
        graphqlOperation(listDeals, {
          limit: 1000,
          filter: {
            or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }],
          },
        })
      );
      this.deals = buffer.data.listDeals.items;
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
        if (
          property != "dollarValues" &&
          property != "capRate" &&
          property != "totalReturn"
        )
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
    sortAlphaFavorites() {
      this.favorites.sort(this.dynamicSort("title"));
      ////console.log("sorted");
    },
    sortPriceFavorites() {
      this.favorites.sort(this.dynamicSort("-dollarValues"));
      // //console.log("sorted");
    },
    sortDateFavorites() {
      this.favorites.sort(this.dynamicSort("-createdAt"));
      ////console.log("sorted");
    },
    sortCapFavorites() {
      this.favorites.sort(this.dynamicSort("-capRate"));
      ////console.log("sorted");
    },
    sortReturnFavorites() {
      this.favorites.sort(this.dynamicSort("-totalReturn"));
    },
    sortAlphaFeatured() {
      this.featuredDeals.sort(this.dynamicSort("title"));
      ////console.log("sorted");
    },
    sortPriceFeatured() {
      this.featuredDeals.sort(this.dynamicSort("-dollarValues"));
      //  //console.log("sorted");
    },
    sortDateFeatured() {
      this.featuredDeals.sort(this.dynamicSort("-createdAt"));
      ////console.log("sorted");
    },
    sortCapFeatured() {
      this.featuredDeals.sort(this.dynamicSort("-capRate"));
      ////console.log("sorted");
    },
    sortReturnFeatured() {
      this.featuredDeals.sort(this.dynamicSort("-totalReturn"));
    },
    sortAlphaMy() {
      this.myDeals.sort(this.dynamicSort("title"));
      // //console.log("sorted");
    },
    sortPriceMy() {
      this.myDeals.sort(this.dynamicSort("-dollarValues"));
      ////console.log("sorted");
    },
    sortDateMy() {
      this.myDeals.sort(this.dynamicSort("-createdAt"));
      ////console.log("sorted");
    },
    sortCapMy() {
      this.myDeals.sort(this.dynamicSort("-capRate"));
      // //console.log("sorted");
    },
    sortReturnMy() {
      this.myDeals.sort(this.dynamicSort("-totalReturn"));
    },
    sortAlphaLatest() {
      this.deals.sort(this.dynamicSort("title"));
      // //console.log("sorted");
    },
    sortPriceLatest() {
      this.deals.sort(this.dynamicSort("dollarValues"));
      ////console.log("sorted");
    },
    sortDateLatest() {
      this.deals.sort(this.dynamicSort("-createdAt"));
      ////console.log("sorted");
    },
    sortCapLatest() {
      this.deals.sort(this.dynamicSort("-capRate"));
    },
    sortReturnLatest() {
      ////console.log(this.deals);
      this.deals.sort(this.dynamicSort("-totalReturn"));
      ////console.log(this.deals);
      // //console.log("sorted");
    },
    order() {
      this.$vs.loading();
      this.listUnits();
      this.getFavorites();
      this.getMyDeals();
      this.getFeaturedDeals();
      this.listAllDeals();
      this.sortDateLatest();
      this.sortAlphaMy();
      this.sortAlphaFavorites();
      this.sortAlphaFeatured();
      this.$vs.loading.close();
    },
    addToMyDeals(value) {
      // console.log(value);
      this.myDeals.push(value);
    },
    addToFavorites(value) {
      this.favorites.push(value);
    },
  },
  components: {
    HNavMenu,
    DealCardNew,
    vSelect,
    pdf,
  },
  watch: {
    type: function () {
      if (this.type == 1) this.listUnits();
      if (this.type == 2) this.listBuildings();
      if (this.type == 3) this.active = "developer";
      if (this.type == 4) this.active = "city";
    },
    sort_featured: function () {
      ////console.log("sorted");
      if (this.sort_featured == "Alphabetical") this.sortAlphaFeatured();
      if (this.sort_featured == "Price") this.sortPriceFeatured();
      if (this.sort_featured == "Most Recent") this.sortDateFeatured();
      if (this.sort_featured == "Cap Rate") this.sortCapFeatured();
      if (this.sort_featured == "Total Return") this.sortReturnFeatured();
    },
    sort_my: function () {
      ////console.log("sorted");
      if (this.sort_my == "Alphabetical") this.sortAlphaMy();
      if (this.sort_my == "Price") this.sortPriceMy();
      if (this.sort_my == "Most Recent") this.sortDateMy();
      if (this.sort_my == "Cap Rate") this.sortCapMy();
      if (this.sort_my == "Total Return") this.sortReturnMy();
    },
    sort_favorites: function () {
      // //console.log("sorted");
      if (this.sort_favorites == "Alphabetical") this.sortAlphaFavorites();
      if (this.sort_favorites == "Price") this.sortPriceFavorites();
      if (this.sort_favorites == "Most Recent") this.sortDateFavorites();
      if (this.sort_favorites == "Cap Rate") this.sortCapFavorites();

      if (this.sort_favorites == "Total Return") this.sortReturnFavorites();
    },
    sort_latest: function () {
      ////console.log("sorted");
      if (this.sort_latest == "Alphabetical") this.sortAlphaLatest();
      if (this.sort_latest == "Price") this.sortPriceLatest();
      if (this.sort_latest == "Most Recent") this.sortDateLatest();
      if (this.sort_latest == "Cap Rate") this.sortCapLatest();

      if (this.sort_latest == "Total Return") this.sortReturnLatest();
    },
    loaded: function () {
      this.sortDateLatest();
      this.sortAlphaFavorites();
      this.sortAlphaFeatured();
    },
    myDealsLoaded: function () {
      this.sortAlphaMy();
    },
  },
  created() {
    this.order();
  },
};
</script>
