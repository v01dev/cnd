<template>
  <div
    class="tabbed-card"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="tabbed-card-header img-header" v-if="!view">
      <div
        class="w-full h-full bg-image"
        :style="'background-image: url(' + mapUrl + ');'"
      ></div>
    </div>
    <div class="tabbed-card-header img-header" v-else>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="image in this.titleImages" :key="image">
          <div
            class="w-full h-full bg-image"
            :style="'background-image: url(' + image + ');'"
          ></div>
        </swiper-slide>
        <swiper-slide v-for="video in this.titleVideos" :key="video">
          <video autoplay mute loop class="responsive" :src="video"></video>
        </swiper-slide>
        <swiper-slide :key="mapUrl">
          <div
            class="w-full h-full bg-image"
            :style="'background-image: url(' + mapUrl + ');'"
          ></div>
        </swiper-slide>
        <div
          class="swiper-pagination swiper-pagination-bullets"
          slot="pagination"
        ></div>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>-->
      </swiper>
    </div>
    <div class="tabbed-card-controls d-flex justify-start">
      <div
        class="text-uppercase fs-1 cursor-pointer"
        :class="lowerPart == 1 ? 'text-white' : 'text-light'"
        @click="lowerPart = 1"
      >
        Financials
      </div>
      <div
        class="text-uppercase fs-1 cursor-pointer"
        :class="lowerPart == 2 ? 'text-white' : 'text-light'"
        @click="lowerPart = 2"
      >
        Description
      </div>
      <div
        class="text-uppercase fs-1 cursor-pointer"
        :class="lowerPart == 3 ? 'text-white' : 'text-light'"
        @click="lowerPart = 3"
        v-if="
          unit.marketingCollateral != null && unit.marketingCollateral != ''
        "
      >
        Documents
      </div>
    </div>
    <div class="tabbed-card-body financials" v-if="lowerPart == 1">
      <div class="w-100 d-flex justify-between">
        <div style="width: 70%; padding-right:5%">
          <div class="text-uppercase fs-085 text-white">Unit Name</div>
          <div class="text-uppercase fs-13 text-white fw-600">
            {{ unit.nickname }}
          </div>
        </div>
        <div style="width: 30%">
          <div class="text-uppercase fs-085 text-white text-center fw-600">
            Unit Count
          </div>
          <div class="text-uppercase fs-3 text-white text-center fw-600">
            {{ quantity }}
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-between mt-05">
        <div style="width: 40%">
          <div class="text-uppercase fs-125 text-white fw-600">
            {{ unit.squareFootage }} Sq. ft.
          </div>
          <div
            class="fs-125 text-white fw-600"
            v-if="unit.bedsCount != 'Studio'"
          >
            {{ unit.bedsCount }}bd {{ unit.bathsCount }}ba
          </div>
          <div class="fs-125 text-white fw-600" v-else>
            {{ unit.bedsCount }} {{ unit.bathsCount }}ba
          </div>
        </div>
        <div style="width: 40%">
          <div class="text-uppercase fs-085 text-white fw-600">
            Purchase price
          </div>
          <div class="text-uppercase fs-15 text-white fw-600">
            {{
              unit.dealPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }}
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-between mt-05">
        <div>
          <div class="text-uppercase fs-085 text-white fw-600">
            Rental income
          </div>
          <div class="text-uppercase fs-15 text-white fw-600">
            {{
              unit.rentalAssumptions.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }}/mo
          </div>
        </div>
        <div style="width: 40%">
          <div class="text-uppercase fs-085 text-white fw-600">
            Exit Sale Price
          </div>
          <div class="text-uppercase fs-15 text-white fw-600">$3,180,068</div>
        </div>
      </div>
    </div>
    <div class="tabbed-card-body amenities" v-if="lowerPart == 2">
      <div class="w-100 d-flex flex-col justify-between">
        <p class="text-uppercase fs-125 text-white fw-600 mt-2 mb-4">
          Unit Description
        </p>
        <p class="text-uppercase fs-1 text-white fw-300 mt-2 mb-2">
          {{ unit.description }}
        </p>
        <p class="text-uppercase fs-125 text-white fw-600 mt-4 mb-4">
          Unit Amenities
        </p>
        <p
          v-for="amenity in unit.amenities"
          class="text-uppercase fs-1 text-white fw-300 mt-2 mb-2"
          :key="amenity"
        >
          {{ amenity }}
        </p>
        <p class="text-uppercase fs-125 text-white fw-600 mt-4 mb-4">
          Unit Views
        </p>
        <p
          v-for="view in unit.views"
          class="text-uppercase fs-1 text-white fw-300 mt-2 mb-2"
          :key="view"
        >
          {{ view }}
        </p>
      </div>
    </div>
    <div class="tabbed-card-body docs" v-if="lowerPart == 3">
      <div
        class="d-flex mtop-1"
        v-for="(collateralLink, index) in this.marketingCollaterals"
        :key="collateralLink"
      >
        <div style="width: 24px; height: 24px">
          <vs-icon
            :icon="view != true ? 'lock' : 'picture_as_pdf'"
            class="w-full h-full"
            color="primary"
            size="small"
          ></vs-icon>
        </div>
        <div
          class="fs-125 text-white cursor-pointer"
          style="margin-left: 8px;"
          @click="viewPDF(collateralLink)"
          v-if="view == true"
        >
          Collateral Brochure {{ index + 1 }}
        </div>
        <div
          class="fs-125 text-white cursor-pointer"
          style="margin-left: 8px;"
          v-else
        >
          Collateral Brochure {{ index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Storage } from "aws-amplify";
import "swiper/dist/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      titleImages: [],
      titleVideos: [],
      lowerPart: 1,
      collateralLink: "",
      hover: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          },
        },
      },
      marketingCollaterals: [],
    };
  },
  name: "unitCard",
  props: {
    unit: {
      type: Object,
    },
    view: Boolean,
    quantity: Number,
    mapUrl: String,
  },
  methods: {
    viewDetails(id) {
      this.$router.push("../unit-details/" + id);
    },
    findImage() {
      if (
        (this.unit.images != null || this.unit.images != []) &&
        this.unit.images.length > 0
      ) {
        let frontImages = [];
        this.unit.images.forEach((imageKey) => {
          Storage.get(imageKey).then((result) => {
            frontImages.push(result);
          });
        });
        console.log(frontImages);
        console.log("Images");
        this.titleImages = frontImages;
      }
      if (
        (this.unit.videos != null || this.unit.videos != []) &&
        this.unit.videos.length > 0
      ) {
        let frontVideos = [];
        this.unit.videos.forEach((videoKey) => {
          Storage.get(videoKey).then((result) => {
            frontVideos.push(result);
          });
        });
        console.log(frontVideos);
        console.log("Videos");
        this.titleVideos = frontVideos;
      }
      let buffer = "";
      Storage.get(this.unit.marketingCollateral).then((result) => {
        this.collateralLink = result;
      });
    },
    findCollaterals() {
      if (this.unit.marketingCollateral.length > 0) {
        let collateralsArray = [];
        this.unit.marketingCollateral.forEach((item) => {
          Storage.get(item).then((result) => {
            collateralsArray.push(result);
          });
        });
        this.marketingCollaterals = collateralsArray;
      }
    },
    viewPDF(link) {
      window.open(link);
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  beforeMount() {
    this.findImage();
    this.findCollaterals();
  },
};
</script>

<style>
.tabbed-card {
  width: 26%;
  border-radius: 12px;
  height: 488px;
  max-width: 330px;

  margin-right: 0.5%;
  margin-bottom: 10px;
}
.tabbed-card:nth-of-type(1) {
  margin-left: 0;
}
.tabbed-card-header {
  background: #23577c;
  padding: 1em;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 40%;
}
.img-header {
  padding: 0 !important;
  overflow: hidden;
}
.img-header img {
  max-width: 100%;
  height: auto;
}
.tabbed-card-controls {
  background: #1e4e6d;
  padding: 0.5em 1em;
  height: 7%;
}

.tabbed-card-controls div {
  margin-right: 8px;
}

.tabbed-card-body {
  background: #3579b2;
  padding: 1em;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  height: 53%;
}
.financials {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.amenities {
  overflow-y: scroll;
}
.amenities::-webkit-scrollbar {
  width: 3px;
}

.amenities::-webkit-scrollbar-track-piece {
  background-color: #fff;
}

.amenities::-webkit-scrollbar-thumb {
  background-color: #cbcbcb;
  outline: 1px solid #fff;
  outline-offset: -1px;
  border: 0.1px solid #b7b7b7;
}

.amenities::-webkit-scrollbar-thumb:hover {
  background-color: #909090;
}
.overlay-unit {
  z-index: 2;
  transition: display 5s;
  display: block;
}
.title-image {
  z-index: 1;
  transition: display 5s;
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.swiper-container {
  height: 100%;
}
.bg-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
