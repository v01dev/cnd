<template>
  <div
    v-if="
      this.$route.params.mode != 'edit' ||
        this.newBuilding.owner == this.$store.state.userObject.id
    "
  >
    <div class="flex">
      <div class="w-full flex flex-wrap inputs justify-around form-area">
        <div class="w-full" v-if="this.$route.params.mode == 'edit'">
          <vs-button @click="$router.go(-1)" icon="arrow_back">Back To Seller Tools</vs-button>
        </div>
        <h1
          class="w-full text-left section-title"
          v-if="this.$route.params.mode != 'edit'"
        >Add Building</h1>
        <h1 class="w-full text-left section-title" v-else>Update Building</h1>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Building Name"
            name="Building Name"
            v-model="newBuilding.name"
          ></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input class="w-full" label-placeholder="City" name="City" v-model="newBuilding.city"></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Address"
            name="Address"
            v-model="newBuilding.addres"
          ></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="State"
            name="State"
            v-model="newBuilding.state"
          ></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input class="w-full" label-placeholder="ZIP" name="ZIP" v-model="newBuilding.zip"></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Building Developer"
            name="Building Developer"
            v-model="newBuilding.architect"
          ></vs-input>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            v-validate="'numeric'"
            class="w-full"
            label-placeholder="Building Total Sq Ft"
            name="Building Total Sq Ft"
            v-model="newBuilding.buildingTotalSF"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Building Total Sq Ft')"
          >{{ errors.first("Building Total Sq Ft") }}</span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Year Built or Estimated Completion Date"
            name="Year Built or Estimated Completion Date"
            v-model="newBuilding.yearBuilt"
            v-validate="'numeric'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Year Built or Estimated Completion Date')"
          >{{ errors.first("Year Built or Estimated Completion Date") }}</span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Floors"
            name="Floors"
            v-model="newBuilding.floors"
            v-validate="'numeric'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Floors')"
          >{{ errors.first("Floors") }}</span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Unit Count"
            name="Unit Count"
            v-model="newBuilding.totalUnits"
            v-validate="'numeric'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Unit Count')"
          >{{ errors.first("Unit Count") }}</span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            :key="loaded"
            class="w-full"
            label-placeholder="Association Dues Per SF"
            name="Association Dues"
            v-model.lazy="dues"
            v-money="money"
          ></vs-input>
        </div>

        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Available Sq Ft for Sale"
            name="Available Sq Ft for Sale"
            v-model="newBuilding.totalSfForSale"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Available Sq Ft for Sale')"
          >{{ errors.first("Available Sq Ft for Sale") }}</span>
        </div>

        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Total Value of Available Sq Ft"
            name="Total Value of Available Sq Ft"
            :key="loaded"
            v-money="money"
            v-model="totalValueSfFormatted"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Total Value of Available Sq Ft')"
          >{{ errors.first("Total Value of Available Sq Ft") }}</span>
        </div>

        <div class="input-wrapper md:w-2/5 w-full">
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label datepicker-label"
          >Last Unit Sale Date</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <datepicker
            placeholder="Select Date"
            v-model="newBuilding.lastSaleDate"
            class="w-full datepicker"
          ></datepicker>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Last Unit Sale Amount"
            name="Last Unit Sale Amount"
            :key="loaded"
            v-money="money"
            v-model="lastSaleAmountFormatted"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Last Unit Sale Amount')"
          >{{ errors.first("Last Unit Sale Amount") }}</span>
        </div>

        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Last Unit Sale SF"
            name="Last Unit Sale SF"
            v-model="newBuilding.lastSaleSF"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Last Unit Sale SF')"
          >{{ errors.first("Last Unit Sale SF") }}</span>
        </div>

        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input
            class="w-full"
            label-placeholder="Annual Unit Historical Appreciation %"
            name="Annual Unit Historical Appreciation %"
            v-model="newBuilding.historicalAppreciation"
            v-validate="'min_value:0|max_value:100|max:8'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Annual Unit Historical Appreciation %')"
          >{{ errors.first("Annual Unit Historical Appreciation %") }}</span>
        </div>

        <!-- <v-select placeholder="Select Amenities" multiple label="name" :options="amenities.data.listAmenitys.items" class="w-full"></v-select> -->
        <div class="input-wrapper md:w-2/5 w-full">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Privacy</span>
          <v-select
            :options="['Private', 'Public', 'Hidden']"
            class="w-full"
            placeholder="Select Privacy"
            v-model="selectedPrivacy"
          ></v-select>
        </div>
        <div class="input-wrapper w-full flex flex-col items-center justify-center">
          <span class="mb-2">This build allows rental tenants?</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-switch v-model="rentalAllowed">
            <span slot="on">Yes</span>
            <span slot="off">No</span>
          </vs-switch>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label"
          >Building Construction Status</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <v-select
            :options="[
              'New Construction',
              'Pre-Construction',
              'Resale',
            ]"
            class="w-full"
            placeholder="Select Building Construction Status"
            v-model="newBuilding.status"
          ></v-select>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Views</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <v-select
            :options="this.views"
            class="w-full"
            multiple
            placeholder="Select Views"
            v-model="selectedViews"
          ></v-select>
        </div>
        <div v-if="this.amenities != []" class="input-wrapper md:w-2/5 w-full">
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Amenities</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <v-select
            :options="this.amenities"
            class="w-full"
            multiple
            placeholder="Select Amenities"
            v-model="selectedAmenities"
          ></v-select>
        </div>
        <div class="input-wrapper w-full sm:w-11/12 flex items-center justify-center">
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label description-label"
          >Building Description</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-textarea class="w-full" v-model="newBuilding.description"></vs-textarea>
        </div>
        <div class="w-full flex justify-between flex-wrap" v-if="this.$route.params.mode == 'edit'">
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="border-pdf pdf-wrapper m-2 relative"
              v-for="(item, index) in imageLinks"
              :key="item"
            >
              <img :src="item" class="img-preview" />
              <vs-button @click="deleteImage(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="border-pdf pdf-wrapper m-2 relative"
              v-for="(item, index) in videoLinks"
              :key="item"
            >
              <iframe :src="item" class="img-preview" type="video/mov"></iframe>
              <vs-button @click="deleteVideo(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-4/12">
            <div
              class="preview relative mb-2"
              v-for="(pdfLink, index) in this.floorPlans"
              :key="pdfLink"
            >
              <pdf :src="pdfLink" class="brochure"></pdf>
              <vs-button @click="deleteFloorPlans(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
        </div>
        <div class="w-full upload md:w-1/3 flex flex-col justify-end">
          <h4>
            Upload Building Images
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadBuildingImages" multiple type="file" />
        </div>
        <div class="w-full upload md:w-1/3 flex flex-col justify-end">
          <h4>
            Upload Building Videos
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadBuildingVideos" multiple type="file" />
        </div>
        <div class="w-full upload md:w-1/3 flex flex-col justify-end">
          <h4>
            Upload Building Floor Plans PDFs
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadBuildingBrochure" multiple type="file" />
        </div>

        <vs-button
          :disabled="!validateForm"
          @click="createBuilding()"
          class="sm:w-1/4 mt-8"
          v-if="this.$route.params.mode != 'edit'"
        >Add Building</vs-button>
        <vs-button
          :disabled="!validateForm"
          @click="createBuilding()"
          class="sm:w-1/4 mt-8"
          v-else
        >Update Building</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createBuilding, updateBuilding } from "../graphql/mutations";
import {
  getBuilding,
  listAmenitys,
  listBuildings,
  listCitys,
  listViews,
} from "../graphql/queries";
import { API, graphqlOperation, Storage } from "aws-amplify";
import vSelect from "vue-select";
import moment from "moment";
import { VMoney } from "v-money";
import pdf from "vue-pdf";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      newBuilding: {},
      createNewBuilding: {},
      cities: {},
      selected: "",
      selectedAmenities: [],
      selectedViews: [],
      buildings: {},
      createdBuilding: {},
      old_moment: [2020, 5, 29],
      moment: "",
      from_now: "",
      uuid: "",
      selectedPrivacy: "",
      amenities: [],
      views: [],
      rentalAllowed: false,
      dues: 0,
      money: {
        decimal: ".",
        thousands: ",",
        precision: 2,
        masked: false,
        prefix: "$",
      },
      loaded: false,
      imageLinks: [],
      videoLinks: [],
      pdfLink: "",
      totalValueSfFormatted: "",
      lastSaleAmountFormatted: "",
      floorPlans: [],
    };
  },
  components: {
    vSelect,
    pdf,
    Datepicker,
  },
  directives: { money: VMoney },
  props: {
    dealMode: Boolean,
  },
  watch: {
    totalValueSfFormatted: function () {
      if (typeof this.totalValueSfFormatted != "number") {
        let buffer;
        buffer = this.totalValueSfFormatted.replace(/,/g, "");
        console.log(buffer);
        buffer = buffer.replace(/\$/g, "");
        console.log(buffer);
        buffer = parseFloat(buffer);
        console.log(buffer);
        this.newBuilding.totalSfValue = buffer;
      } else this.newBuilding.totalSfValue = this.totalValueSfFormatted;
      //console.log(this.newBuilding.totalSfValue);
    },
    lastSaleAmountFormatted: function () {
      if (typeof this.lastSaleAmountFormatted != "number") {
        let buffer;
        buffer = this.lastSaleAmountFormatted.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = parseFloat(buffer);
        this.newBuilding.lastSaleAmount = buffer;
      } else this.newBuilding.lastSaleAmount = this.lastSaleAmountFormatted;
      //console.log(this.newBuilding.lastSaleAmount);
    },
  },
  methods: {
    async createBuilding() {
      if (this.$route.params.mode != "edit") {
        this.createNewBuilding = this.newBuilding;
        this.createNewBuilding.buildingCityId = this.selected.id;
        this.createNewBuilding.building;
        this.createNewBuilding.createdDate = moment().format("YYYY.M.DD");
        this.createNewBuilding.views = this.selectedAmenities;
        this.createNewBuilding.amenities = this.selectedViews;
        this.storagePutBuildingImage();
        this.storagePutBuildingVideo();
        this.storagePutBuildingBrochure();
        let transform = this.dues;
        transform = transform.replace(/,/g, "");
        transform = transform.replace(/\$/g, "");
        transform = parseInt(transform);
        this.createNewBuilding.condoDues = transform;
        this.createNewBuilding.privacy = this.selectedPrivacy;
        this.createNewBuilding.rentalApproval = this.rentalAllowed;
        this.createNewBuilding.owner = this.$store.state.userObject.id;
        this.createdBuilding = await API.graphql(
          graphqlOperation(createBuilding, { input: this.createNewBuilding })
        );
        let passToParent = {};
        passToParent.id = this.createdBuilding.data.createBuilding.id;
        passToParent.name = this.createdBuilding.data.createBuilding.name;
        passToParent.units = {};
        passToParent.units.items = [];
        this.$emit("buildingCreated", passToParent);
        if (this.dealMode != true) {
          this.$router.push("../../devtools/4");
        }
      } else {
        this.storagePutBuildingBrochureAdd();
        this.storagePutBuildingVideoAdd();
        this.storagePutBuildingImageAdd();
        let buildingInput = this.newBuilding;
        delete buildingInput.accessRequets;
        delete buildingInput.units;
        delete buildingInput.createdDate;
        delete buildingInput.deal;
        delete buildingInput.owner;
        delete buildingInput.community;
        delete buildingInput.developer;
        ////console.log(buildingInput);
        let transform = this.dues;
        transform = transform.replace(/,/g, "");
        transform = transform.replace(/\$/g, "");
        transform = parseFloat(transform);
        buildingInput.condoDues = transform;
        buildingInput.amenities = this.selectedAmenities;
        buildingInput.views = this.selectedViews;
        buildingInput.privacy = this.selectedPrivacy;
        buildingInput.rentalApproval = this.rentalAllowed;
        console.log(buildingInput);
        this.createdBuilding = await API.graphql(
          graphqlOperation(updateBuilding, { input: buildingInput })
        );
        this.$router.push("../../devtools/4");
      }
    },

    moment1() {
      this.moment = moment().format("YYYY.M.DD");
      this.moment = this.moment.split(".").map(Number);
      ////console.log(moment(this.old_moment))
      ////console.log(moment(this.moment))
      this.from_now = moment(this.old_moment).diff(moment(this.moment));
      this.from_now = Math.round(-this.from_now / 86400000);
      if (this.from_now == 0) {
        this.from_now = "Today";
      } else {
        this.from_now == 1
          ? (this.from_now = this.from_now + " day ago")
          : (this.from_now = this.from_now + " days ago");
      }
    },
    storagePutBuildingImage() {
      const selectedFile = document.getElementById("uploadBuildingImages")
        .files;
      let uuidImageName = this.uuid;
      let unitImagesArray = [];
      selectedFile.forEach(function (item) {
        unitImagesArray.push(uuidImageName + item.name);
        Storage.put(uuidImageName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      ////console.log(unitImagesArray);
      this.createNewBuilding.images = unitImagesArray;
    },
    storagePutBuildingImageAdd() {
      const selectedFile = document.getElementById("uploadBuildingImages")
        .files;
      let uuidImageName = this.uuid;
      let unitImagesArray = [];
      selectedFile.forEach(function (item) {
        unitImagesArray.push(uuidImageName + item.name);
        Storage.put(uuidImageName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      ////console.log(unitImagesArray);
      if (this.newBuilding.images == null) this.newBuilding.images = [];
      this.newBuilding.images = this.newBuilding.images.concat(unitImagesArray);
    },
    storagePutBuildingVideo() {
      const selectedVideo = document.getElementById("uploadBuildingVideos")
        .files;
      let uuidVideoName = this.uuid;
      let unitVideosArray = [];
      selectedVideo.forEach(function (item) {
        if (item.type != "video/quicktime") {
          console.log(item.type);
          unitVideosArray.push(uuidVideoName + item.name);
          Storage.put(uuidVideoName + item.name, item, {
            contentType: "video/mp4",
          }).catch((err) => console.log(err));
        }
      });
      ////console.log(unitVideosArray)
      this.createNewBuilding.videos = unitVideosArray;
    },
    storagePutBuildingVideoAdd() {
      const selectedVideo = document.getElementById("uploadBuildingVideos")
        .files;
      let uuidVideoName = this.uuid;
      let unitVideosArray = [];
      selectedVideo.forEach(function (item) {
        // console.log(item.type);
        if (item.type != "video/quicktime") {
          console.log(item.type);
          unitVideosArray.push(uuidVideoName + item.name);
          Storage.put(uuidVideoName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        }
      });
      ////console.log(unitVideosArray)
      if (this.newBuilding.videos == null) this.newBuilding.videos = [];
      this.newBuilding.videos = this.newBuilding.videos.concat(unitVideosArray);
    },
    storagePutBuildingBrochure() {
      const selectedBrochure = document.getElementById("uploadBuildingBrochure")
        .files;
      ////console.log(selectedBrochure);
      let uuidBrochureName = this.uuid;
      let buildingBrochureArray = [];
      selectedBrochure.forEach(function (item) {
        buildingBrochureArray.push(uuidBrochureName + item.name);
        Storage.put(uuidBrochureName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      this.createNewBuilding.floorPlans = buildingBrochureArray;
      ////console.log(this.createNewUnit);
    },
    storagePutBuildingBrochureAdd() {
      const selectedBrochure = document.getElementById("uploadBuildingBrochure")
        .files;
      ////console.log(selectedBrochure);
      let uuidBrochureName = this.uuid;
      let buildingBrochureArray = [];
      selectedBrochure.forEach(function (item) {
        buildingBrochureArray.push(uuidBrochureName + item.name);
        Storage.put(uuidBrochureName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      this.newBuilding.floorPlans = this.newBuilding.floorPlans.concat(
        buildingBrochureArray
      );
    },
    uuidv4() {
      this.uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    async listCities() {
      this.cities = await API.graphql(graphqlOperation(listCitys));
    },
    async listAmenities() {
      let buffer = await API.graphql(graphqlOperation(listAmenitys));
      this.amenities = buffer.data.listAmenitys.items;
      let newAmenities = [];
      this.amenities.forEach(function (item) {
        newAmenities.push(item.name);
        ////console.log(newAmenities);
      });
      this.amenities = newAmenities;
    },
    async listViews() {
      let buffer = await API.graphql(graphqlOperation(listViews));
      this.views = buffer.data.listViews.items;
      let newViews = [];
      this.views.forEach(function (item) {
        newViews.push(item.name);
        ////console.log(newViews);
      });
      this.views = newViews;
    },
    async listBuildings() {
      this.buildings = await API.graphql(graphqlOperation(listBuildings));
      ////console.log(this.buildings);
    },
    deleteImage(index) {
      this.imageLinks.splice(index, 1);
      this.newBuilding.images.splice(index, 1);
    },
    deleteVideo(index) {
      this.videoLinks.splice(index, 1);
      this.newBuilding.videos.splice(index, 1);
    },
    deleteFloorPlans(index) {
      this.floorPlans.splice(index, 1);
      this.newBuilding.floorPlans.splice(index, 1);
      ////console.log(this.newBuilding.floorPlans);
      ////console.log("I'm deleted")
    },
    async getBuilding() {
      if (this.$route.params.mode == "edit") {
        let buffer = await API.graphql(
          graphqlOperation(getBuilding, { id: this.$route.params.id })
        );
        //console.log(buffer);
        //console.log(buffer.data.getBuilding.lastSaleAmount);
        console.log(buffer);
        if (
          buffer.data.getBuilding == null ||
          buffer.data.getBuilding.owner != this.$store.state.userObject.id
        ) {
          this.$router.push("../../404");
        }
        this.totalValueSfFormatted = buffer.data.getBuilding.totalSfValue.toFixed(2);
        //console.log(this.totalValueSfFormatted)
        this.lastSaleAmountFormatted = buffer.data.getBuilding.lastSaleAmount.toFixed(2);

        //console.log(this.lastSaleAmountFormatted);
        buffer = buffer.data.getBuilding;
        this.newBuilding = buffer;
        delete this.newBuilding.createdAt;
        delete this.newBuilding.updatedAt;
        ////console.log(buffer.condoDues);
        this.dues = this.newBuilding.condoDues.toFixed(2);
        // this.dues = this.newBuilding.condoDues;
        this.loaded = true;
        this.rentalAllowed = this.newBuilding.rentalApproval;
        ////console.log(this.dues);
        this.selectedPrivacy = buffer.privacy;
        this.selectedViews = buffer.views;
        //console.log(buffer);
        this.selectedAmenities = buffer.amenities;
        if (
          this.newBuilding.images != null &&
          this.newBuilding.images.length > 0
        ) {
          let imagesArray = [];
          this.newBuilding.images.forEach(function (item) {
            Storage.get(item).then((result) => imagesArray.push(result));
          });
          this.imageLinks = imagesArray;
        }
        if (
          this.newBuilding.videos != null &&
          this.newBuilding.videos.length > 0
        ) {
          let videosArray = [];
          this.newBuilding.videos.forEach(function (item) {
            Storage.get(item).then((result) => videosArray.push(result));
          });
          this.videoLinks = videosArray;
        }
        if (
          this.newBuilding.floorPlans != null &&
          this.newBuilding.floorPlans.length > 0
        ) {
          let floorPlansArray = [];
          this.newBuilding.floorPlans.forEach((item) => {
            Storage.get(item).then((result) => floorPlansArray.push(result));
          });
          this.floorPlans = floorPlansArray;
          ////console.log(this.pdfLink);
        }
        //this.selectedBuilding = buffer.buildingName;
        //this.selectedPrivacy = buffer.privacy;
        //this.selectedAmenities = buffer.amenities;
        //this.selectedViews = buffer.views;
      }
    },
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.newBuilding.name &&
        this.newBuilding.city &&
        this.newBuilding.addres &&
        this.newBuilding.state &&
        this.newBuilding.zip &&
        this.newBuilding.yearBuilt &&
        this.newBuilding.floors &&
        this.newBuilding.totalUnits &&
        this.selectedPrivacy &&
        this.newBuilding.status &&
        this.dues != "0.00"
      );
    },
  },
  created() {
    this.uuidv4();
    this.moment1();
    this.listCities();
    this.listAmenities();
    this.listBuildings();
    this.listViews();
    this.getBuilding();
  },
};
</script>

<style>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  position: relative;
}

h4 {
  margin-bottom: 12px;
  margin-top: 12px;
}

.img-preview {
  max-width: 100%;
  height: auto;
}

.delete-btn {
  top: 0;
  right: 0;
}
.datepicker {
  margin-top: 21px;
}
.custom-label {
  top: -17px;
  left: -7px;
}
.datepicker-label {
  top: -9px;
}
.description-label {
  top: -29px;
}
.vs__dropdown-option--highlight {
  background: #49a25a;
}

span.light-grey-circle {
  background: #f3f3f3;
  padding: 1px 6px;
  margin-left: 2px;
  border-radius: 17px;
  font-weight: 600;
  font-size: 10px;
  color: #a9a9a9;
  cursor: pointer;
}
</style>
