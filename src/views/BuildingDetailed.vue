<template>
  <div class="flex flex-wrap" v-if="this.building != {}">
    <div class="w-full flex flex-col items-center desc mb-12">
      <span class="font-bold text-lg">New Construction</span>
      <h1 class="text-center text-5xl mb-3">{{building.name}}</h1>
      <div class="flex tag-container">
        <span class="tag">Downtown</span>
        <span class="tag">{{building.totalUnits}} units</span>
        <span class="tag">{{this.sf}} sf in total</span>
        <span class="tag font-light">10% Cap Rate, $100k+ /mo Rental</span>
      </div>
    </div>
    <div class="flex w-full flex-wrap">
      <div
        class="col-wrapper order-1 lg:order-none lg:w-1/2 flex flex-col items-start mb-8 lg:mb-0"
      >
        <div class="building-hidden-info flex flex-col items-start w-full lg:width-auto">
          <span>
            <span class="font-bold">City:</span>
            {{building.city}}
          </span>
          <span
            v-if="building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id"
          >
            <span class="font-bold">Address:</span>
            {{building.addres}}
          </span>
          <span>
            <span class="font-bold">State:</span>
            {{building.state}}
          </span>
          <span
            v-if="building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id"
          >
            <span class="font-bold">ZIP:</span>
            {{building.zip}}
          </span>
          <span>
            <span class="font-bold">Year Built:</span>
            {{building.yearBuilt}}
          </span>
          <span>
            <span class="font-bold">Floors:</span>
            {{building.floors}} floors
          </span>
          <div class="flex amn">
            <span class="font-bold">Views:</span>
            <ul>
              <li v-for="item in building.views" :key="item">{{item}}</li>
            </ul>
          </div>
          <div class="flex amn">
            <span class="font-bold">Amenities:</span>
            <ul>
              <li v-for="item in building.amenities" :key="item">{{item}}</li>
            </ul>
          </div>
          <span>
            <span
              class="font-bold"
              v-if="building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id"
            >Price Range:</span>
            {{min_price.toLocaleString("en-US", {style: "currency", currency: "USD"})}} - {{max_price.toLocaleString("en-US", {style: "currency", currency: "USD"})}}
          </span>
          <span>
            <span class="font-bold">Total units avaliable:</span>
            {{building.units.items.length}}
          </span>
          <span>
            <span class="fon-bold"></span>
          </span>
          <span>
            <span class="font-bold">Building site plan:</span>
          </span>
          <span>
            <span class="font-bold">Condo dues:</span>
          </span>
          <span v-if="building.rentalApproval">
            <span class="font-bold">Rental Allowed:</span> Yes
          </span>
          <span v-else>
            <span class="font-bold">Rental Allowed:</span> No
          </span>
          <div
            class="mt-4 mb-4"
            v-if="building.privacy == 'Private' || building.privacy == 'Hidden'"
          >
            <vs-button
              :disabled="this.$store.state.userObject.accessRequests != null && this.$store.state.userObject.accessRequests.includes(this.$route.params.id)"
              @click="requestAccess()"
              v-if="!building.userAccess.includes(this.$store.state.userObject.id) && building.owner != this.$store.state.userObject.id"
            >Request Access</vs-button>
          </div>
          <span
            class="mb-4"
            v-show="!building.userAccess.includes(this.$store.state.userObject.id) && this.$store.state.userObject.accessRequests != null && this.$store.state.userObject.accessRequests.includes(this.$route.params.id)"
          >You have requested access</span>
          <div
            class="flex flex-wrap sm:flex-no-wrap w-full mt-5 sm:-mx-3 justify-center xl:justify-start"
            v-if="building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id"
          >
            <div class="card mb-3 w-full sm:w-5/12 mx-3 p-2">
              <div class="card-wrapper">
                <span>Estimated rental income in this building</span>
                <span class="value">$2.20 per sf Condos.com</span>
                <span class="value">$2.25 seller estimate</span>
              </div>
            </div>
            <div class="card w-full sm:w-5/12 mx-3 p-2">
              <div class="card-wrapper">
                <span>Estimated rental income in this building</span>
                <span class="value">$2.20 per sf Condos.com</span>
                <span class="value">$2.25 seller estimate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-wrapper order-none lg:order-1 lg:w-1/2 flex flex-col items-start">
        <div class="building-info w-full flex flex-wrap mb-8">
          <div class="location-info w-full flex flex-col justify-center items-center">
            <VueSlickCarousel
              :asNavFor="$refs.thumbs"
              class="page-carousel carousel-main"
              ref="main"
              v-bind="configCarousel.main"
              v-if="this.building.images.length > 0"
            >
              <div :key="index" class="slide" v-for="(item, index) in this.building.images">
                <iframe :src="item.link" v-if="item.type === 'video'"></iframe>
                <img :src="item.link" v-if="!item.type" />
              </div>
            </VueSlickCarousel>

            <VueSlickCarousel
              :asNavFor="$refs.main"
              class="page-carousel carousel-thumbnails"
              ref="thumbs"
              v-bind="configCarousel.thumbnail"
              v-if="this.building.images.length > 0"
            >
              <div
                :key="index"
                @click="clickOnSlide(index)"
                class="slide"
                v-for="(item, index) in this.building.images"
              >
                <video :src="item.link" class="cursor-pointer" v-if="item.type === 'video'"></video>
                <img :src="item.link" class="cursor-pointer" v-if="!item.type" />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="building-desc flex flex-col">
          <p class="text-lg mb-1 font-medium">Description:</p>
          <p class="mb-8">{{building.description}}</p>
          <div class="card broker-card w-full mb-10">
            <div class="card-wrapper">
              <p class="font-bold">Exclusive broker</p>
              <p class="font-bold">Prefered mortgage partner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center" v-if="pdfLink != ''">
      <h1>Marketing Collateral</h1>
      <div @click="viewBrochure()" class="brochure-wrapper m-4">
        <pdf :src="pdfLink" class="brochure"></pdf>
      </div>
    </div>
    <div class="ml-0 mr-0 contact-us card w-full flex-col mb-8 lg:mb-10">
      <p>Condos.com Incentive</p>
      <p>CONTACT US TO LEARN MORE</p>
    </div>
    <div
      class="deal-units w-full flex flex-wrap justify-around mt-4 mb-4"
      v-if="(building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id) && this.building.units.items.length>0"
    >
      <h2 class="w-full text-center mb-10 text-4xl">Units In This Building</h2>
      <div class="unit-card" v-for="unit in this.building.units.items" :key="unit.id">
        <div class="unit-info">
          <img
            :key="image_count"
            :src="unit.images[0]"
            class="unit-picture"
            v-if="unit.images.length > 0"
          />
          <div class="fill-unit" v-else>No image</div>
        </div>
        <div class="unit-stats flex flex-wrap">
          <div class="w-1/2 stat flex flex-col">
            <span>Current Rent</span>
            <span>$1.563</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Cap Rate</span>
            <span>3.62%</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Total Return</span>
            <span>
              $48,067
              <span>/5 Yr</span>
            </span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Neigbourhood</span>
            <star-rating
              :is-indicator-active="false"
              :rating="rating"
              :star-style="starStyle"
              class="star-rating"
            ></star-rating>
          </div>
          <div class="w-full stat address">
            <span>{{unit.address}}</span>
            <span>{{unit.state}} {{unit.zip}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="deal-units w-full flex flex-wrap justify-around mt-4 mb-4"
      v-if="building.privacy == 'Public' || building.userAccess.includes(this.$store.state.userObject.id) || building.owner == this.$store.state.userObject.id"
    >
      <!--<h2 class="w-full text-center mb-10 text-4xl">Deals In This Building</h2>
      <div class="unit-card">
        <div class="unit-info">
          <img src="../../public/heart.svg" class="save" />
          <img src="../../public/unit.jpg" class="unit-picture" />
        </div>
        <div class="unit-stats flex flex-wrap">
          <div class="w-1/2 stat flex flex-col">
            <span>Current Rent</span>
            <span>$1.563</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Cap Rate</span>
            <span>3.62%</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Total Return</span>
            <span>
              $48,067
              <span>/5 Yr</span>
            </span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Neigbourhood</span>
            <star-rating
              :rating="rating"
              :star-style="starStyle"
              :is-indicator-active="false"
              class="star-rating"
            ></star-rating>
          </div>
          <div class="w-full stat address">
            <span>522 Laurel Mist Ct</span>
            <span>West Columbia, SC 29170</span>
          </div>
        </div>
      </div>
      <div class="unit-card">
        <div class="unit-info">
          <img src="../../public/heart.svg" class="save" />
          <img src="../../public/unit.jpg" class="unit-picture" />
        </div>
        <div class="unit-stats flex flex-wrap">
          <div class="w-1/2 stat flex flex-col">
            <span>Current Rent</span>
            <span>$1.563</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Cap Rate</span>
            <span>3.62%</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Total Return</span>
            <span>
              $48,067
              <span>/5 Yr</span>
            </span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Neigbourhood</span>
            <star-rating :rating="rating" :star-style="starStyle" :is-indicator-active="false"></star-rating>
          </div>
          <div class="w-full stat address">
            <span>522 Laurel Mist Ct</span>
            <span>West Columbia, SC 29170</span>
          </div>
        </div>
      </div>
      <div class="unit-card">
        <div class="unit-info">
          <img src="../../public/heart.svg" class="save" />
          <img src="../../public/unit.jpg" class="unit-picture" />
        </div>
        <div class="unit-stats flex flex-wrap">
          <div class="w-1/2 stat flex flex-col">
            <span>Current Rent</span>
            <span>$1.563</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Cap Rate</span>
            <span>3.62%</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Total Return</span>
            <span>
              $48,067
              <span>/5 Yr</span>
            </span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Neigbourhood</span>
            <star-rating :rating="rating" :star-style="starStyle" :is-indicator-active="false"></star-rating>
          </div>
          <div class="w-full stat address">
            <span>522 Laurel Mist Ct</span>
            <span>West Columbia, SC 29170</span>
          </div>
        </div>
      </div>
      <div class="unit-card">
        <div class="unit-info">
          <img src="../../public/heart.svg" class="save" />
          <img src="../../public/unit.jpg" class="unit-picture" />
        </div>
        <div class="unit-stats flex flex-wrap">
          <div class="w-1/2 stat flex flex-col">
            <span>Current Rent</span>
            <span>$1.563</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Cap Rate</span>
            <span>3.62%</span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Total Return</span>
            <span>
              $48,067
              <span>/5 Yr</span>
            </span>
          </div>
          <div class="w-1/2 stat flex flex-col">
            <span>Neigbourhood</span>
            <star-rating :rating="rating" :star-style="starStyle" :is-indicator-active="false"></star-rating>
          </div>
          <div class="w-full stat address">
            <span>522 Laurel Mist Ct</span>
            <span>West Columbia, SC 29170</span>
          </div>
        </div>
      </div>-->
    </div>

    <div class="about-section w-full">
      <div class="about-unit w-full">
        <div class="section-header w-full flex justify-center">About the Building</div>
        <div class="about flex justify-center">
          <div class="characteristics lg:w-7/12 flex flex-col">
            <div class="header w-full">
              <span class="header">Property Characteristiscs</span>
              <span class="view">View Details</span>
            </div>
            <div class="flex flex-col sm:flex-row">
              <div class="buttons flex flex-col w-full sm:w-5/12 lg:w-1/3 pr-5">
                <vs-button class="float-right options-btn w-full" color="#49A25A">Open House</vs-button>
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                >Inspection Contingency</vs-button>
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                >Roofstock Exclusive</vs-button>
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                >Roofstock Guarantee</vs-button>
              </div>
              <div class="desc w-full sm:w-1/2 lg:w-2/3">
                <p class="pl-3 text-2xl">Open House</p>
                <span
                  class="inline-block pl-3"
                >Lorem ipsum dolor sit amet, consectetur adipisicing elit. At corporis impedit laudantium libero minima quis quo. Animi deserunt, dolor dolorem facilis maxime minima minus, nihil omnis quibusdam quisquam, sed temporibus!</span>
                <ul>
                  <li>
                    <span class="li-desc">Access of newest listings:</span>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium delectus deleniti dolore hic ipsum itaque laborum minus, molestiae nisi porro ratione, reprehenderit rerum saepe sed sint soluta unde veniam voluptatem!</span>
                  </li>
                  <li>
                    <span class="li-desc">Engage sooner with sellers:</span>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores dignissimos expedita natus nostrum omnis quasi vel, voluptates! Architecto, cumque dicta doloribus magnam mollitia nemo quidem quod quos rem saepe.</span>
                  </li>
                  <li>
                    <span class="li-desc">Tip - Make your bid more competitive:</span>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequatur dicta dolore eligendi enim, explicabo facere impedit ipsam, iure laborum officia omnis quaerat quisquam sed suscipit tempore ullam velit voluptatem!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="management flex flex-col lg:w-4/12 items-center">
            <span class="header w-full">Property Management</span>
            <div class="explain-card-wrapper">
              <div class="explain-card">
                <p>Why choose?</p>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam dicta dolorum esse, exercitationem fuga illo inventore ipsa nihil nisi odio odit pariatur perferendis, quam quasi soluta, suscipit veniam?</span>
              </div>
            </div>
            <vs-button
              class="float-right options-btn w-1/2"
              color="#49A25A"
              type="border"
            >View Options</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import vSelect from "vue-select";
import { getBuilding } from "../graphql/queries";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createAccessRequest, updateUser } from "../graphql/mutations";
import pdf from "vue-pdf";

export default {
  data() {
    return {
      test_unit: {
        buildingName: {
          name: "Downtown Brickell",
          address: "20 W 34th St",
          city: "New York",
          unitCount: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        bed: 5,
        bath: 2,
        squareFootage: 125,
        priceSF: 120000.99,
        description: "Studio appartment on the top floor in Downtown",
      },
      loaded: false,
      image_count: 0,
      building: {},
      activePrompt: false,
      activePrompt2: false,
      max_price: 0,
      min_price: 1000000,
      rating: 4.7,
      count: 0,
      sf: 0,
      discount: "5000$",
      pdfLink: "",
      starStyle: {
        fullStarColor: "#ed8a19",
        emptyStarColor: "#737373",
        starWidth: 15,
        starHeight: 15,
      },
      configCarousel: {
        main: {
          slidesToShow: 1,
          arrows: false,
          fade: true,
        },
        thumbnail: {
          slidesToShow: 5,
        },
      },
    };
  },
  components: {
    StarRating,
    vSelect,
    VueSlickCarousel,
    pdf,
  },
  methods: {
    clickOnSlide(index) {
      this.$refs.thumbs.goTo(index);
    },
    async getBuilding() {
      ////console.log(this.$store.state.userObject.accessRequests);
      this.building = await API.graphql(
        graphqlOperation(getBuilding, { id: this.$route.params.id })
      );
      this.building = this.building.data.getBuilding;
      ////console.log(this.building);
      ////console.log("Check here");
      let buildingAssets = [
        ...this.building.images.map((item) => ({ link: item })),
      ].concat(
        ...this.building.videos.map((item) => ({ link: item, type: "video" }))
      );

      if (buildingAssets) {
        buildingAssets = buildingAssets.map((asset) =>
          Storage.get(asset.link).then((result) => ({ ...asset, link: result }))
        );
      }
      Promise.all(buildingAssets).then(
        (result) => (this.building.images = [...result])
      );
      //get units images
      if (this.building.floorPlans != null) {
        let brochureLink = this.building.floorPlans;
        Storage.get(brochureLink).then((result) => (this.pdfLink = result));
        ////console.log(this.pdfLink);
      }
      if (this.building.units.items) {
        this.building.units.items.forEach((unit, index) => {
          this.sf = this.sf + unit.squareFootage;
          if (unit.images.length > 0) {
            Storage.get(unit.images[0]).then((result) => {
              ////console.log(result);
              ////console.log("I'm result");
              this.building.units.items[index].images[0] = result;
              this.image_count++;
            });
          }
        });
      }

      let min = this.min_price;
      let max = this.max_price;
      this.building.units.items.forEach(function (item, index) {
        if (item.price < min) {
          min = item.price;
        }
        if (item.price > max) {
          max = item.price;
        }
      });
      this.min_price = min;
      this.max_price = max;
      this.query_loaded = true;
      this.images_loaded = true;
      if (this.building.userAccess == null) this.building.userAccess = [];
    },
    async addToFavorites(id) {
      let currentFavorites = this.$store.state.userObject;
      if (currentFavorites.favorites == null) currentFavorites.favorites = [];
      let updateFavorites = {
        id: this.$store.state.currentUserID,
        favorites: [...currentFavorites.favorites],
      };
      ////console.log(updateFavorites.favorites.includes(id));
      if (updateFavorites.favorites.includes(id) == false) {
        updateFavorites.favorites.push(id);
        this.$store.commit("updateUserFav", id);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      } else {
        updateFavorites.favorites = updateFavorites.favorites.filter(
          (item) => item !== id
        );
        this.$store.commit("deleteUserFav", id);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      }
    },
    async requestAccess() {
      let userName = "";
      if (
        this.$store.state.userObject.firstName &&
        this.$store.state.userObject.lastName
      )
        userName =
          this.$store.state.userObject.firstName +
          " " +
          this.$store.state.userObject.lastName;
      else userName = "John Doe";
      //console.log (this.$store.state.userObject.firstName);
      let request = {
        user: this.$store.state.userObject.id,
        accessRequestBuildingId: this.$route.params.id,
        user_name: userName,
      };
      let check = await API.graphql(
        graphqlOperation(createAccessRequest, { input: request })
      );
      let updatedUser = {};
      updatedUser.id = this.$store.state.userObject.id;
      updatedUser.accessRequests = this.$store.state.userObject.accessRequests;
      this.$store.commit("updateUserAccessRequests", this.$route.params.id);
      if (updatedUser.accessRequests == null) updatedUser.accessRequests = [];
      updatedUser.accessRequests.push(this.$route.params.id);
      ////console.log(this.$store.state.userObject.accessRequests);
      ////console.log(updatedUser);

      await API.graphql(graphqlOperation(updateUser, { input: updatedUser }));
      ////console.log(check);
    },
    viewBrochure() {
      window.open(this.pdfLink);
    },
    //transformImage(image){
    //
    // let imgLink = image;
    //  if(imgLink!=undefined) {
    // let resultLink = 0;
    //     Storage.get(imgLink).then(result => {
    //         resultLink = result;
    ////console.log(imgLink);
    //  })
    // //console.log(resultLink[0]);
    // }

    // }
  },
  created() {
    this.getBuilding();
  },
};
</script>

<style lang="scss">
.col-wrapper {
  max-width: 100%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
}

.card {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: #ffead2;
  border-radius: 20px;
  height: 150px;
}

.brochure-wrapper {
  width: 50%;
  height: auto;
  cursor: pointer;
}

.unit-card {
  margin-bottom: 3rem;

  .unit-picture {
    width: 100%;
    height: auto;
  }

  .unit-stats {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    flex-basis: 24%;
    max-width: 375px;
  }
  @media screen and (max-width: 991px) {
    max-width: 375px;
  }
}

.broker-card {
  height: auto;
  padding: 30px 20px;
}

.page-carousel {
  max-width: 100%;
  width: 100%;

  .slide {
    > img,
    > iframe {
      border: 1px solid lightgray;
    }
  }
}

.brochure-wrapper {
  cursor: pointer;
  width: 50%;
  height: auto;
  border: 1px solid black;
}

.tag-container {
  margin: -10px;

  .tag {
    background-color: darken(#49a25a, 10%);
    color: white;
    padding: 5px 15px;
    border-radius: 25px;
    margin: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 767px) {
    .tag {
      font-size: 0.85rem;
    }
  }
  @media screen and (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: center;
    .tag {
      text-align: center;
      font-size: 0.7rem;
      width: 43%;
    }
  }
}

.carousel-main {
  .slide {
    height: 400px;
    //min-width: 700px;
    > img,
    > iframe {
      border-radius: 5px;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  margin-bottom: 15px;
  @media screen and (max-width: 767px) {
    height: 300px;
    .slide {
      height: 300px;
    }
  }
}

.carousel-thumbnails {
  overflow: hidden;

  .slick-slide {
    margin: 0 7px;
  }

  .slick-list {
    margin: 0 -7px;
  }

  .slick-track {
    display: flex;
  }

  .slide {
    overflow: hidden;
    border-radius: 3px;

    > img,
    > video {
      min-width: 125px;
      border-radius: inherit;
      max-width: 100%;
      max-height: 86px;
      object-fit: cover;
      object-position: center;
      height: 100%;
    }

    @media screen and (max-width: 576px) {
      > img,
      > video {
        min-width: initial;
      }
    }
  }
}

.rental {
  background: #49a25a;
  height: fit-content;
}

.per-sf {
  height: fit-content;
}

.per-sf:hover {
  background: #49a25a;
}

.rental p {
  padding: 25px;
  font-size: 15px;
}

.per-sf p {
  padding: 25px;
  font-size: 15px;
}

.adjust {
  padding: 1rem;
}

.bid-subtotal {
  padding: 1rem;
}

.bid-subtotal .calculated {
  margin: 20px;
}

.left-btn {
  border-radius: 9999px;
}

.right-btn {
  border-radius: 9999px;
}

.unit-info {
  position: relative;
}

.unit-stats {
  width: 300px;
  margin-top: -7px;
}

.save {
  position: absolute;
  right: 2%;
  top: 2%;
}

.stat {
  height: 50px;
  justify-content: space-evenly;
  border: 0.5px solid lightgray;
}

.stat span {
  margin-left: 5px;
}

.stat star-rating {
  margin-left: 5px;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-wrapper .value {
  font-weight: 700;
}

.address {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.about {
  @media screen and (max-width: 992px) {
    flex-direction: column;
    .management {
      border-left: 0;
    }
  }
}

.about-section {
  margin-top: 30px;
  margin-bottom: 50px;
}

.section-header {
  font-size: 35px;
  font-family: "Khmer MN", Georgia, Times, serif;
  opacity: 0.4;
  margin-left: 1%;
}

.header {
  font-size: 20px;
}

.characteristics {
  margin-top: 20px;
}

.characteristics .view {
  font-size: 12px;
  margin-bottom: 3px;
  margin-left: 15px;
  color: #9d97e0;
  cursor: pointer;
}

.view:hover {
  color: #49a25a !important;
}

.management {
  margin-top: 20px;
  border-left: 1px solid #e6e6e6;
}

.management .header {
  margin-left: 20px;
  align-self: baseline;
}

.explain-card-wrapper {
  margin-left: 20px;
  margin-top: 15px;
  background: #f1f1fe;
  border-radius: 7px;
}

.explain-card {
  display: flex;
  flex-direction: column;
  margin: 15px;
}

.explain-card p {
  margin-bottom: 5px;
}

.explain-card span {
  margin-bottom: 2px;
}

.options-btn {
  color: #837cd0;
  margin-top: 15px;
}

.desc ul li {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 14px;
  margin-right: 8px;
}

.desc ul li::before {
  content: "\2022";
  color: #f5bf81;
  font-weight: 1000;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.amn ul li {
  margin-bottom: 12px;
  margin-left: 14px;
  margin-right: 8px;
}

.amn ul li::before {
  content: "\2022";
  color: #f5bf81;
  font-weight: 1000;
  display: inline-block;
  width: 1em;
}

.li-desc {
  font-weight: 700;
}

.buttons .vs-button {
  margin: 20px 0;
  color: white;
}

.desc p {
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 16px;
}

.management .options-btn {
  margin-left: 20px;
}

.star-rating {
  margin-left: 5px;
}

.unit-picture {
  width: 400px;
  height: 300px;
}

.agile__dots {
  bottom: 10px;
  flex-direction: column;
  right: 10px;
  position: absolute;
}

.agile__dot {
  margin: 5px 0;
}

.agile .unit-picture {
  border-radius: 5px;
}

.agile__dot button {
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}

.agile__dot--current button,
.agile__dot:hover button {
  background-color: #fff;
}

.assumption-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.fill-unit {
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
}
</style>
