<template>
  <div class="flex flex-wrap" v-if="query_loaded">
    <h1 class="text-center text-5xl mb-10 text-center w-full">
      {{ unit.nickname }}
    </h1>
    <div class="flex w-full flex-wrap lg:flex-no-wrap">
      <div class="w-full lg:w-1/2 flex flex-col col-wrapper lg:mr-5">
        <div class="building-hidden-info w-full flex flex-col items-start mb-8">
          <div
            class="building-hidden-info flex justify-center flex-col items-start"
            v-if="
              this.unit.privacy == 'Public' ||
                this.unit.userAccess.includes(
                  this.$store.state.userObject.id
                ) ||
                this.unit.owner == this.$store.state.userObject.id
            "
          >
            <span>
              <span class="font-bold">Unit plan type / Building line:</span>
            </span>
            <span>
              <span class="font-bold">Community:</span>
            </span>
            <span>
              <span class="font-bold">Building Name:</span>
              {{ this.unit.buildingName.name }}
            </span>
            <span>
              <span class="font-bold">Address:</span>
              {{ this.unit.address }}
            </span>
            <span>
              <span class="font-bold">Unit Price:</span>
              {{
                this.unit.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </span>
            <span>
              <span class="font-bold">Unit Price/SF:</span>
              {{
                Math.round(
                  (this.unit.price / this.unit.squareFootage) * 100 +
                    Number.EPSILON
                ) / 100
              }}
            </span>
            <span v-if="this.unit.rentalApproval"
              ><span class="font-bold">Rental Allowed:</span> Yes</span
            >
            <span v-else
              ><span class="font-bold">Rental Allowed:</span> No</span
            >
          </div>
        </div>
        <VueSlickCarousel
          :asNavFor="$refs.thumbs"
          class="page-carousel carousel-main"
          ref="main"
          v-bind="configCarousel.main"
          v-if="this.unit.images.length > 0"
        >
          <div
            :key="index"
            class="slide"
            v-for="(item, index) in this.unit.images"
          >
            <iframe
              :src="item.link"
              class="cursor-pointer"
              v-if="item.type === 'video'"
            ></iframe>
            <img :src="item.link" class="cursor-pointer" v-if="!item.type" />
          </div>
        </VueSlickCarousel>

        <VueSlickCarousel
          :asNavFor="$refs.main"
          class="page-carousel carousel-thumbnails"
          ref="thumbs"
          v-bind="configCarousel.thumbnail"
          v-if="this.unit.images.length > 0"
        >
          <div
            :key="index"
            @click="clickOnSlide(index)"
            class="slide"
            v-for="(item, index) in this.unit.images"
          >
            <video
              :src="item.link"
              class="cursor-pointer"
              v-if="item.type === 'video'"
            ></video>
            <img :src="item.link" class="cursor-pointer" v-if="!item.type" />
          </div>
        </VueSlickCarousel>
      </div>
      <div
        class="w-full lg:w-1/2 flex justify-start flex-col items-start col-wrapper"
      >
        <div class="building-hidden-info w-full flex flex-col items-start mb-8">
          <span>
            <span class="font-bold">Bed:</span>
            {{ this.unit.bedsCount }}
          </span>
          <span>
            <span class="font-bold">Bath:</span>
            {{ this.unit.bathsCount }}
          </span>
          <span>
            <span class="font-bold">Square footage:</span>
            {{ this.unit.squareFootage }}
          </span>
          <div class="flex amn">
            <span class="font-bold">Views: </span>
            <ul>
              <li :key="item" v-for="item in unit.views">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="flex amn">
            <span class="font-bold">Amenities: </span>
            <ul>
              <li :key="item" v-for="item in unit.amenities">
                {{ item }}
              </li>
            </ul>
          </div>
          <span>
            <span class="font-bold">Decrption:</span>
            {{ this.unit.description }}
          </span>
          <span>
            <span class="font-bold">Offering Memorandum:</span>
          </span>
        </div>

        <div class="flex flex-col items-center justify-center w-full">
          <vs-button
            @click="$router.push(link)"
            class="self-center w-full text-lg"
            v-if="
              this.unit.privacy == 'Public' ||
                this.unit.userAccess.includes(
                  this.$store.state.userObject.id
                ) ||
                this.unit.owner == this.$store.state.userObject.id
            "
            >Add unit to a deal / Create deal
          </vs-button>
          <vs-button
            :disabled="
              this.$store.state.userObject.accessRequests != null &&
                this.$store.state.userObject.accessRequests.includes(
                  this.$route.params.id
                )
            "
            @click="requestAccess()"
            class="self-center w-full text-lg"
            v-else-if="
              !this.unit.userAccess.includes(this.$store.state.userObject.id)
            "
            >Request Access
          </vs-button>
          <span
            class="mb-4 mt-4"
            v-show="
              !unit.userAccess.includes(this.$store.state.userObject.id) &&
                this.$store.state.userObject.accessRequests != null &&
                this.$store.state.userObject.accessRequests.includes(
                  this.$route.params.id
                )
            "
            >You have requested access</span
          >
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center" v-if="pdfLink != ''">
      <h1>Marketing Collateral</h1>
      <div @click="viewBrochure()" class="brochure-wrapper m-4">
        <pdf :src="pdfLink" class="brochure"></pdf>
      </div>
    </div>
    <div class="about-section w-full">
      <div class="about-unit w-full">
        <div class="section-header w-full flex justify-center">
          About the Unit
        </div>
        <div class="about flex justify-center">
          <div class="characteristics lg:w-7/12 flex flex-col">
            <div class="header w-full">
              <span class="header">Property Characteristiscs</span>
              <span class="view">View Details</span>
            </div>
            <div class="flex flex-col sm:flex-row">
              <div class="buttons flex flex-col w-full sm:w-5/12 lg:w-1/3 pr-5">
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                  >Open House</vs-button
                >
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                  >Inspection Contingency
                </vs-button>
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                  >Roofstock Exclusive
                </vs-button>
                <vs-button
                  class="float-right options-btn w-full"
                  color="#49A25A"
                  >Roofstock Guarantee
                </vs-button>
              </div>
              <div class="desc w-full sm:w-1/2 lg:w-2/3">
                <p class="pl-3 text-2xl">Open House</p>
                <span class="inline-block pl-3"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  corporis impedit laudantium libero minima quis quo. Animi
                  deserunt, dolor dolorem facilis maxime minima minus, nihil
                  omnis quibusdam quisquam, sed temporibus!</span
                >
                <ul>
                  <li>
                    <span class="li-desc">Access of newest listings: </span>
                    <span
                      >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium delectus deleniti dolore hic ipsum itaque
                      laborum minus, molestiae nisi porro ratione, reprehenderit
                      rerum saepe sed sint soluta unde veniam voluptatem!</span
                    >
                  </li>
                  <li>
                    <span class="li-desc">Engage sooner with sellers: </span>
                    <span
                      >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amet asperiores dignissimos expedita natus nostrum omnis
                      quasi vel, voluptates! Architecto, cumque dicta doloribus
                      magnam mollitia nemo quidem quod quos rem saepe.</span
                    >
                  </li>
                  <li>
                    <span class="li-desc"
                      >Tip - Make your bid more competitive:
                    </span>
                    <span
                      >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Assumenda consequatur dicta dolore eligendi enim,
                      explicabo facere impedit ipsam, iure laborum officia omnis
                      quaerat quisquam sed suscipit tempore ullam velit
                      voluptatem!</span
                    >
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
                <span
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus animi aperiam dicta dolorum esse, exercitationem
                  fuga illo inventore ipsa nihil nisi odio odit pariatur
                  perferendis, quam quasi soluta, suscipit veniam?</span
                >
              </div>
            </div>
            <vs-button
              class="float-right options-btn w-1/2"
              color="#49A25A"
              type="border"
              >View Options
            </vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import StarRating from "vue-dynamic-star-rating";
import vSelect from "vue-select";
import { getUnit } from "../graphql/queries";
import { createAccessRequest, updateUser } from "../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
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
      activePrompt: false,
      activePrompt2: false,
      rating: 4.7,
      count: 0,
      link: "",
      pdfLink: "",
      discount: "5000$",
      unit: {
        images: false,
        videos: false,
      },
      query_loaded: false,
      images_loaded: false,
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
    async getUnits() {
      this.unit = await API.graphql(
        graphqlOperation(getUnit, { id: this.$route.params.id })
      );
      this.unit = this.unit.data.getUnit;
      this.link =
        "../create-deal/" + this.unit.buildingName.id + "_" + this.unit.id;
      if (this.unit.userAccess == null) this.unit.userAccess = [];
      let unitAssets = [
        ...this.unit.images.map((item) => ({ link: item })),
      ].concat(
        ...this.unit.videos.map((item) => ({ link: item, type: "video" }))
      );

      if (unitAssets) {
        unitAssets = unitAssets.map((asset) =>
          Storage.get(asset.link).then((result) => ({ ...asset, link: result }))
        );
      }
      let marketingCollateral = "";
      let marketingCollateralLink = "";
      if (this.unit.marketingCollateral != null) {
        marketingCollateral = this.unit.marketingCollateral;
        ////console.log(marketingCollateral);
        Storage.get(marketingCollateral).then(
          (result) => (this.pdfLink = result)
        );
      }
      Promise.all(unitAssets).then(
        (result) => (this.unit.images = [...result])
      );
      ////console.log(this.pdfLink);
      this.query_loaded = true;
      this.images_loaded = true;
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
        accessRequestUnitId: this.$route.params.id,
        user_name: userName,
      };
      await API.graphql(
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
    },
    viewBrochure() {
      window.open(this.pdfLink);
    },
  },
  created() {
    this.getUnits();
    //this.//console.log("Hi!");
  },
};
</script>

<style lang="scss">
.card {
  margin: 2%;
  margin-left: 3%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: #ffead2;
  border-radius: 20px;
  height: 150px;
}

.col-wrapper {
  max-width: 100%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
}

.brochure-wrapper {
  cursor: pointer;
  width: 50%;
  height: auto;
  border: 1px solid black;
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

.unit-picture {
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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

.agile {
  width: 400px;
}

.agile .unit-picture {
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

.contact-us {
  margin-left: 2%;
}

.about {
  @media screen and (max-width: 992px) {
    flex-direction: column;
    .management {
      border-left: 0;
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
      min-width: 150px;
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
</style>
