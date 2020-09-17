<template>
  <div
    v-if="
      this.$route.params.mode != 'edit' ||
        this.newUnit.owner == this.$store.state.userObject.id ||
        this.dealMode == true
    "
  >
    <div class="flex">
      <div class="sm:w-full flex flex-wrap justify-around inputs form-area">
        <div class="w-full" v-if="this.$route.params.mode == 'edit' && this.dealMode != true">
          <vs-button @click="$router.go(-1)" icon="arrow_back">Back To Seller Tools</vs-button>
        </div>
        <h1
          class="w-full text-left section-title"
          v-if="this.$route.params.mode != 'edit' || this.dealMode == true"
        >Add Unit</h1>
        <h1 class="w-full text-left section-title" v-else>Update Unit</h1>
        <div class="input-container">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-input class="w-full" label-placeholder="Unit Nickname" v-model="newUnit.nickname"></vs-input>
        </div>
        <div class="input-container">
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
            label-placeholder="Unit #"
            name="Unit #"
            v-model="newUnit.unitNumber"
          >></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Unit #')">
            {{
            errors.first("Unit #")
            }}
          </span>
        </div>
        <div class="input-container">
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
            label-placeholder="Unit Market Price"
            name="Unit Market Price"
            v-model="price"
            v-money="money"
            v-validate="'required'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Unit Market Price')"
          >{{ errors.first("Unit Market Price") }}</span>
        </div>
        <div class="input-container">
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
            label-placeholder="Unit Deal Price"
            name="Unit Deal Price"
            v-model="dealPrice"
            v-money="money"
            v-validate="'required'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Unit Deal Price')"
          >{{ errors.first("Unit Deal Price") }}</span>
        </div>
        <div class="input-container">
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
            label-placeholder="Total Management Cost (Annual)"
            name="Management"
            v-model="managementFormatted"
            v-money="money"
          ></vs-input>
        </div>
        <div class="input-container">
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
            label-placeholder="Total Property Tax Cost (Annual)"
            name="Property Tax"
            v-model="propertyTaxFormatted"
            v-money="money"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Property Tax')"
          >{{ errors.first("Property Tax") }}</span>
        </div>
        <div class="input-container">
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
            label-placeholder="Total Insurance Cost (Annual)"
            name="Insurance"
            v-model="insuranceFormatted"
            v-money="money"
            v-validate="'required'"
          ></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Insurance')">
            {{
            errors.first("Insurance")
            }}
          </span>
        </div>
        <div class="input-container">
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
            label-placeholder="Total Repair Cost (Annual)"
            name="Repairs"
            v-model="repairFormatted"
            v-money="money"
            v-validate="'required'"
          ></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Repairs')">
            {{
            errors.first("Repairs")
            }}
          </span>
        </div>
        <div class="input-wrapper w-full md:w-5/12 flex items-center justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label-unit"
          >Bath Count</span>
          <v-select
            :options="bathOptions"
            class="w-full"
            label="name"
            placeholder="Bath Count"
            v-model="selectedBathCount"
          ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('Bath Count')">
            {{
            errors.first("Bath Count")
            }}
          </span>
        </div>
        <div class="input-wrapper w-full md:w-5/12 flex items-center justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label-unit"
          >Bed Count</span>
          <v-select
            :options="bedOptions"
            class="w-full"
            label="name"
            placeholder="Bed Count"
            v-model="selectedBedCount"
          ></v-select>
        </div>
        <div class="input-container">
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
            label-placeholder="Unit Square Footage"
            name="Square Footage"
            v-model="newUnit.squareFootage"
            v-validate="'decimal:2|min_value:0'"
          ></vs-input>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Square Footage')"
          >{{ errors.first("Square Footage") }}</span>
        </div>
        <div class="input-container">
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
            label-placeholder="Unit Developer Incentive"
            name="Developer Incentive"
            v-model="newUnit.devIncentive"
          ></vs-input>
        </div>
        <div class="input-container rental">
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
            label-placeholder="Monthly Rental Price"
            name="Rental Assumptions"
            v-model.lazy="rentalPrice"
            v-money="money"
          ></vs-input>
        </div>
        <vx-tooltip
          title="Tooltip title"
          color="success"
          class="inline"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <span class="light-grey-circle">i</span>
        </vx-tooltip>
        <vs-textarea
          class="w-full sm:w-11/12"
          label="Unit Description"
          v-model="newUnit.description"
        ></vs-textarea>
        <div class="input-wrapper w-full md:w-5/12 flex items-center justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label-unit"
          >Building</span>
          <v-select
            v-if="buildings != {}"
            :disabled="
              this.$route.params.mode == 'edit' || this.dealMode == true
            "
            :options="buildings.data.listBuildings.items"
            class="w-full"
            label="name"
            placeholder="Select Building"
            v-model="selectedBuilding"
          ></v-select>
        </div>
        <!-- <div class="input-wrapper w-full md:w-5/12 flex items-center justify-center">
          <span class="input-span-placeholder vs-input--placeholder normal custom-label-unit"> Privacy </span>
        <v-select :options="['Private', 'Public', 'Hidden']" placeholder="Select Privacy" class="w-full"
                  v-model="selectedPrivacy"></v-select>
        </div>-->
        <div class="input-wrapper w-11/12 flex items-center justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span
            class="input-span-placeholder vs-input--placeholder normal custom-label-unit"
          >Amenities</span>
          <v-select
            :options="this.amenities"
            multiple
            placeholder="Select Amenities"
            class="w-full"
            v-model="selectedAmenities"
          ></v-select>
        </div>
        <div class="input-wrapper w-11/12 flex items-center justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span class="input-span-placeholder vs-input--placeholder normal custom-label-unit">Views</span>
          <v-select
            :options="this.views"
            multiple
            placeholder="Select Views"
            class="w-full"
            v-model="selectedViews"
          ></v-select>
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
              <iframe :src="item" class="img-preview"></iframe>
              <vs-button @click="deleteVideo(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-4/12">
            <div
              class="preview relative mb-2"
              v-for="(pdfLink, index) in this.marketingCollaterals"
              :key="pdfLink"
            >
              <pdf :src="pdfLink" class="brochure"></pdf>
              <vs-button @click="deleteCollateral(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
        </div>
        <div class="w-full upload md:w-1/3 flex flex-col">
          <h4>
            Upload Unit Images
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadUnitImages" multiple type="file" />
        </div>

        <div class="w-full upload md:w-1/3 flex flex-col">
          <h4>
            Upload Unit Videos
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadUnitVideos" multiple type="file" />
        </div>

        <div class="w-full upload md:w-1/3 flex flex-col justify-center">
          <h4>
            Upload Unit Brochures
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </h4>
          <input id="uploadUnitBrochure" multiple type="file" />
        </div>
        <div class="w-full flex justify-center">
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <span v-if="typeof this.dealPrice == 'string'">
            Unit Deal Price:
            {{
            (
            parseFloat(
            this.dealPrice.replace(/,/g, "").replace(/\$/g, "")
            ) / this.newUnit.squareFootage
            ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            })
            }}
            / SF
          </span>
        </div>
        <vs-button
          :disabled="!validateForm"
          @click="createUnit()"
          class="sm:w-1/4 mt-2"
          v-if="this.$route.params.mode != 'edit' || this.dealMode == true"
        >Add Unit</vs-button>
        <vs-button
          :disabled="!validateForm"
          @click="createUnit()"
          class="sm:w-1/4 mt-2"
          v-else
        >Update Unit</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createUnit, updateUnit } from "../graphql/mutations";
import {
  getUnit,
  listAmenitys,
  listBuildings,
  listCommunitys,
  listViews,
} from "../graphql/queries";
import { API, graphqlOperation, Storage } from "aws-amplify";
import vSelect from "vue-select";
import moment from "moment";
import { VMoney } from "v-money";
import pdf from "vue-pdf";

export default {
  components: {
    vSelect,
    pdf,
  },
  created() {
    this.listCommunities();
    this.listBuildings();
    this.listAmenities();
    this.listViews();
    this.uuidv4();
    this.getUnit();
    this.fixBuilding();
  },
  data() {
    return {
      newUnit: {
        unitBuildingNameId: "",
      },
      createNewUnit: {},
      cities: {},
      buildings: {},
      communities: {},
      selectedPrivacy: "",
      selectedBuilding: "",
      selectedAmenities: [],
      selectedViews: [],
      createdUnit: {},
      uuid: "",
      amenities: [],
      views: [],
      startAmenities: [],
      startViews: [],
      rentalAllowed: false,
      price: "",
      dealPrice: "",
      money: {
        decimal: ".",
        thousands: ",",
        precision: 2,
        masked: false,
        prefix: "$",
      },
      loaded: false,
      pdfLink: "",
      imageLinks: [],
      videoLinks: [],
      rentalPrice: "",
      managementFormatted: "",
      insuranceFormatted: "",
      repairFormatted: "",
      propertyTaxFormatted: "",
      management: 0,
      insurance: 0,
      repair: 0,
      property: 0,
      marketingCollaterals: [],
      selectedBedCount: "",
      selectedBathCount: "",
      bedOptions: ["Studio", "1", "2", "3", "4", "5"],
      bathOptions: [
        "0",
        ".5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "4.5",
        "5",
      ],
    };
  },
  directives: { money: VMoney },
  watch: {
    managementFormatted: function () {
      let buffer = this.managementFormatted;
      if (typeof this.managementFormatted == "string") {
        buffer = this.managementFormatted.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      this.management = buffer;
      //console.log(this.management);
    },
    insuranceFormatted: function () {
      let buffer = this.insuranceFormatted;
      if (typeof this.insuranceFormatted == "string") {
        buffer = this.insuranceFormatted.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      this.insurance = buffer;
      //console.log(this.insurance);
    },
    repairFormatted: function () {
      let buffer = this.repairFormatted;
      if (typeof this.repairFormatted == "string") {
        buffer = this.repairFormatted.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      this.repair = buffer;
      //console.log(this.repair);
    },
    propertyTaxFormatted: function () {
      let buffer = this.propertyTaxFormatted;
      if (typeof this.propertyTaxFormatted == "string") {
        buffer = this.propertyTaxFormatted.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      this.property = buffer;
      //console.log(this.property);
    },
    price: function () {
      let buffer = this.price;
      if (typeof this.price == "string") {
        buffer = this.price.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      this.newUnit.price = buffer;
      //console.log(this.price);
      //console.log(this.newUnit.price);
    },
  },
  computed: {
    perSfPrice() {
      let buffer = this.price;
      if (typeof this.price == "string") {
        buffer = this.price.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
      }
      buffer = parseFloat(buffer);
      if (this.newUnit.squareFootage != 0) {
        return buffer / this.newUnit.squareFootage;
      } else return buffer;
    },
    validateForm() {
      console.log(this.errors);
      if (this.$route.params.mode != "edit")
        return (
          !this.errors.any() &&
          this.newUnit.nickname &&
          this.newUnit.price &&
          this.selectedBathCount &&
          this.selectedBedCount &&
          this.newUnit.squareFootage &&
          this.selectedBuilding &&
          this.price != "0.00" &&
          this.dealPrice != "0.00" &&
          this.price.charAt(0) != "-" &&
          this.dealPrice.charAt(0) != "-" &&
          this.rentalPrice.charAt(0) != "-" &&
          this.managementFormatted.charAt(0) != "-" &&
          this.propertyTaxFormatted.charAt(0) != "-" &&
          this.insuranceFormatted.charAt(0) != "-" &&
          this.repairFormatted.charAt(0) != "-"
        );
      else
        return (
          !this.errors.any() &&
          this.newUnit.nickname &&
          this.newUnit.price &&
          this.selectedBedCount &&
          this.selectedBathCount &&
          this.newUnit.squareFootage &&
          this.selectedBuilding &&
          this.price != "0.00" &&
          this.dealPrice != "0.00"
        );
    },
  },
  methods: {
    cl() {
      this.newUnit.price = this.newUnit.price.replace(/,/g, "");
      this.newUnit.price = this.newUnit.price.replace(/\$/g, "");
      ////console.log(parseFloat(this.newUnit.price));
    },
    async createUnit() {
      if (this.$route.params.mode != "edit" || this.dealMode == true) {
        delete this.newUnit.deals; //temp
        delete this.newUnit.createdAt;
        delete this.newUnit.updatedAt;
        this.createNewUnit = this.newUnit;
        let buffer = this.price.replace(/,/g, "");
        buffer = buffer.replace(/\$/, "");
        this.createNewUnit.price = buffer;
        let change = this.dealPrice.replace(/,/g, "");
        change = change.replace(/\$/g, "");
        this.createNewUnit.dealPrice = change;
        let transform = parseFloat(this.createNewUnit.price);
        let transformDeal = parseFloat(this.createNewUnit.dealPrice);
        this.createNewUnit.managementSF = this.management;
        this.createNewUnit.propertyTaxSF = this.property;
        this.createNewUnit.insuranceSF = this.insurance;
        this.createNewUnit.repairSF = this.repair;
        this.createNewUnit.price = transform;
        this.createNewUnit.dealPrice = transformDeal;
        //this.createNewUnit.price = 120;
        this.createNewUnit.unitBuildingNameId = this.selectedBuilding.id;
        //this.createNewUnit.unitCommunityId = this.selectedCommunity.id;
        this.createNewUnit.amenities = this.selectedAmenities;
        this.createNewUnit.views = this.selectedViews;
        this.createNewUnit.createdDate = moment().format("YYYY.M.DD");
        // this.createNewUnit.privacy = this.selectedPrivacy;
        this.createNewUnit.owner = this.$store.state.userObject.id;
        this.createNewUnit.rentalApproval = this.rentalAllowed;
        let replace = this.rentalPrice.replace(/,/g, "");
        replace = replace.replace(/\$/g, "");
        this.createNewUnit.rentalAssumptions = replace;
        let transformRental = parseFloat(this.createNewUnit.rentalAssumptions);
        this.createNewUnit.rentalAssumptions = transformRental;
        this.storagePutUnitImage();
        this.storagePutUnitVideo();
        this.storagePutUnitBrochure();
        this.createNewUnit.marketingCollateral = this.newUnit.marketingCollateral;
        this.createNewUnit.bedsCount = this.selectedBedCount;
        this.createNewUnit.bathsCount = this.selectedBathCount;
        //console.log(this.createNewUnit.price);
        //console.log(this.createNewUnit);
        this.createdUnit = await API.graphql(
          graphqlOperation(createUnit, { input: this.createNewUnit })
        );
        ////console.log(this.createdUnit);
        let parentProp = {};
        parentProp.id = this.createdUnit.data.createUnit.id;
        parentProp.nickname = this.createdUnit.data.createUnit.nickname;
        parentProp.price = this.createdUnit.data.createUnit.price;
        parentProp.dealPrice = this.createdUnit.data.createUnit.dealPrice;
        parentProp.rentalAssumptions = this.createdUnit.data.createUnit.rentalAssumptions;
        parentProp.squareFootage = this.createdUnit.data.createUnit.squareFootage;
        this.$emit("unitCreated", parentProp);
        if (this.dealMode != true) {
          this.$router.push("../../devtools/5/create");
        }
      } else {
        delete this.newUnit.deals; // temp
        delete this.newUnit.createdAt;
        delete this.newUnit.updatedAt;
        let unitInput = this.newUnit;
        delete unitInput.accessRequets;
        delete unitInput.buildingName;
        delete unitInput.createdDate;
        delete unitInput.deal;
        delete unitInput.owner;
        delete unitInput.community;
        delete unitInput.state;
        delete unitInput.city;
        delete unitInput.zip;
        delete unitInput.address;
        this.storagePutUnitBrochureAdd();
        unitInput.managementSF = this.management;
        unitInput.propertyTaxSF = this.property;
        unitInput.insuranceSF = this.insurance;
        unitInput.repairSF = this.repair;
        unitInput.bedsCount = this.selectedBedCount;
        unitInput.bathsCount = this.selectedBathCount;
        ////console.log(this.newUnit.marketingCollateral);
        ////console.log("ama collateral");
        unitInput.marketingCollateral = this.newUnit.marketingCollateral;
        ////console.log(unitInput.marketingCollateral);
        ////console.log("I'm collateral");
        this.storagePutUnitVideoAdd();
        unitInput.videos = this.newUnit.videos;
        if (unitInput.videos == undefined) unitInput.videos = null;
        this.storagePutUnitImageAdd();
        unitInput.images = this.newUnit.images;
        if (unitInput.images == undefined) unitInput.images = null;
        let buffer = this.price.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        unitInput.price = buffer;
        let transform = this.dealPrice.replace(/,/g, "");
        transform = transform.replace(/\$/g, "");
        unitInput.dealPrice = transform;
        unitInput.price = parseFloat(unitInput.price);
        unitInput.dealPrice = parseFloat(unitInput.dealPrice);
        unitInput.amenities = this.selectedAmenities;
        unitInput.views = this.selectedViews;
        // unitInput.privacy = this.selectedPrivacy;
        unitInput.rentalApproval = this.rentalAllowed;
        let change = this.rentalPrice.replace(/,/g, "");
        change = change.replace(/\$/g, "");
        unitInput.rentalAssumptions = change;
        let transformRental = parseFloat(unitInput.rentalAssumptions);
        unitInput.rentalAssumptions = transformRental;
        ////console.log(unitInput);
        ////console.log("ama input");
        //console.log(unitInput);
        this.createdUnit = await API.graphql(
          graphqlOperation(updateUnit, { input: unitInput })
        );
        this.$router.push("../../devtools/5/update");
      }
    },
    deleteCollateral(index) {
      this.marketingCollaterals.splice(index, 1);
      this.newUnit.marketingCollateral.splice(index, 1);
      ////console.log(this.newUnit.marketingCollateral);
      ////console.log("I'm deleted");
    },
    deleteImage(index) {
      this.imageLinks.splice(index, 1);
      this.newUnit.images.splice(index, 1);
    },
    deleteVideo(index) {
      this.videoLinks.splice(index, 1);
      this.newUnit.videos.splice(index, 1);
    },
    fixBuilding() {
      if (this.building != "") {
        ////console.log(this.building);
        ////console.log("I'm somewhere here")
        this.selectedBuilding = this.building;
      }
    },
    async getUnit() {
      if (this.$route.params.mode == "edit" && this.dealMode == false) {
        let buffer = await API.graphql(
          graphqlOperation(getUnit, { id: this.$route.params.id })
        );
        console.log(buffer);
        if (
          buffer.data.getUnit == null ||
          buffer.data.getUnit.owner != this.$store.state.userObject.id
        ) {
          this.$router.push("../../404");
        }
        console.log(buffer);
        buffer = buffer.data.getUnit;
        this.newUnit = buffer;
        this.price = this.newUnit.price.toFixed(2);
        this.dealPrice = this.newUnit.dealPrice.toFixed(2);
        this.selectedBuilding = buffer.buildingName;
        // this.selectedPrivacy = buffer.privacy;
        this.selectedAmenities = buffer.amenities;
        this.selectedViews = buffer.views;
        this.selectedBedCount = buffer.bedsCount;
        this.selectedBathCount = buffer.bathsCount;
        //console.log(buffer);

        if (
          buffer.propertyTaxSF % 1 == 0 ||
          (buffer.propertyTaxSF * 10) % 1 == 0
        )
          this.propertyTaxFormatted = buffer.propertyTaxSF * 100;
        else this.propertyTaxFormatted = buffer.propertyTaxSF;
        //console.log(buffer.propertyTaxSF);

        if (buffer.managementSF % 1 == 0 || (buffer.managementSF * 10) % 1 == 0)
          this.managementFormatted = buffer.managementSF * 100;
        else this.managementFormatted = buffer.managementSF;

        //console.log(buffer.managementSF);
        //console.log(buffer.managementSF % 1);
        //console.log((buffer.managementSF * 10) % 1);

        if (buffer.repairSF % 1 == 0 || (buffer.repairSF * 10) % 1 == 0)
          this.repairFormatted = buffer.repairSF * 100;
        else this.repairFormatted = buffer.repairSF;

        if (buffer.insuranceSF % 1 == 0 || (buffer.insuranceSF * 10) % 1 == 0)
          this.insuranceFormatted = buffer.insuranceSF * 100;
        else this.insuranceFormatted = buffer.insuranceSF;

        ////console.log(buffer);
        if (
          buffer.rentalAssumptions % 1 == 0 ||
          (buffer.rentalAssumptions * 10) % 1 == 0
        )
          this.rentalPrice = buffer.rentalAssumptions * 100;
        else this.rentalPrice = buffer.rentalAssumptions;
        ////console.log(this.rentalPrice);
        if (
          this.newUnit.marketingCollateral != null &&
          this.newUnit.marketingCollateral.length > 0
        ) {
          let collateralsArray = [];
          this.newUnit.marketingCollateral.forEach((item) => {
            Storage.get(item).then((result) => collateralsArray.push(result));
          });
          this.marketingCollaterals = collateralsArray;
          ////console.log(this.pdfLink);
          ////console.log("I'm link");
        }
      }
      if (this.newUnit.images != null && this.newUnit.images.length > 0) {
        let imagesArray = [];
        this.newUnit.images.forEach(function (item) {
          Storage.get(item).then((result) => imagesArray.push(result));
        });
        this.imageLinks = imagesArray;
      }
      this.loaded = true;
      ////console.log(this.newUnit);
      if (this.newUnit.videos != null && this.newUnit.videos.length > 0) {
        let videosArray = [];
        this.newUnit.videos.forEach(function (item) {
          Storage.get(item).then((result) => videosArray.push(result));
        });
        this.videoLinks = videosArray;
      }
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
    async listBuildings() {
      this.buildings = await API.graphql(
        graphqlOperation(listBuildings, {
          limit: 1000,
          filter: { owner: { eq: this.$store.state.userObject.id } },
        })
      );
      ////console.log(this.buildings);
    },
    async listCommunities() {
      this.communities = await API.graphql(graphqlOperation(listCommunitys));
      //console.log(this.errors);
      ////console.log(this.communities);
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
    storagePutUnitBrochure() {
      if (
        document.getElementById("uploadUnitBrochure") != null &&
        document.getElementById("uploadUnitBrochure").files.length > 0
      ) {
        const selectedBrochure = document.getElementById("uploadUnitBrochure")
          .files;
        //////console.log(selectedBrochure);
        let uuidBrochureName = this.uuid;
        let unitBrochureArray = [];
        selectedBrochure.forEach(function (item) {
          unitBrochureArray.push(uuidBrochureName + item.name);
          Storage.put(uuidBrochureName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        // ////console.log(uuidBrochureName)
        ////console.log(this.newUnit.marketingCollateral);
        this.newUnit.marketingCollateral = unitBrochureArray;
        ////console.log(this.newUnit.marketingCollateral);
        ////console.log("WEAREHERE");
      }
    },
    storagePutUnitImage() {
      const selectedFile = document.getElementById("uploadUnitImages").files;
      let uuidImageName = this.uuid;
      let unitImagesArray = [];
      selectedFile.forEach(function (item) {
        unitImagesArray.push(uuidImageName + item.name);
        Storage.put(uuidImageName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      ////console.log(unitImagesArray);
      this.createNewUnit.images = unitImagesArray;
    },
    storagePutUnitImageAdd() {
      if (
        (document.getElementById("uploadUnitImages") != null) &
        (document.getElementById("uploadUnitImages").files.length > 0)
      ) {
        const selectedFile = document.getElementById("uploadUnitImages").files;
        let uuidImageName = this.uuid;
        let unitImagesArray = [];
        selectedFile.forEach(function (item) {
          unitImagesArray.push(uuidImageName + item.name);
          Storage.put(uuidImageName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        ////console.log(this.newUnit.images);

        if (this.newUnit.images == null) this.newUnit.images = [];
        this.newUnit.images = this.newUnit.images.concat(unitImagesArray);
        ////console.log(this.newUnit.images);
      }
    },
    storagePutUnitVideo() {
      const selectedVideo = document.getElementById("uploadUnitVideos").files;
      let uuidVideoName = this.uuid;
      let unitVideosArray = [];
      selectedVideo.forEach(function (item) {
        if (item.type != "video/quicktime") {
          unitVideosArray.push(uuidVideoName + item.name);
          Storage.put(uuidVideoName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        }
      });
      ////console.log(this.createNewUnit.videos);
      this.createNewUnit.videos = unitVideosArray;
      ////console.log(this.createNewUnit.videos);
    },
    storagePutUnitVideoAdd() {
      if (
        (document.getElementById("uploadUnitVideos") != null) &
        (document.getElementById("uploadUnitVideos").files.length > 0)
      ) {
        const selectedVideo = document.getElementById("uploadUnitVideos").files;
        let uuidVideoName = this.uuid;
        let unitVideosArray = [];
        selectedVideo.forEach(function (item) {
          if (item.type != "video/quicktime") {
            unitVideosArray.push(uuidVideoName + item.name);
            Storage.put(uuidVideoName + item.name, item, {
              contentType: item.type,
            }).catch((err) => console.log(err));
          }
        });
        ////console.log(unitVideosArray)
        if (this.newUnit.videos == null) this.newUnit.videos = [];
        this.newUnit.videos = this.newUnit.videos.concat(unitVideosArray);
      }
    },
    storagePutUnitBrochureAdd() {
      if (
        document.getElementById("uploadUnitBrochure") != null &&
        document.getElementById("uploadUnitBrochure").files.length > 0
      ) {
        const selectedBrochure = document.getElementById("uploadUnitBrochure")
          .files;
        //////console.log(selectedBrochure);
        let uuidBrochureName = this.uuid;
        let unitBrochureArray = [];
        selectedBrochure.forEach(function (item) {
          unitBrochureArray.push(uuidBrochureName + item.name);
          Storage.put(uuidBrochureName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        // ////console.log(uuidBrochureName)
        ////console.log(this.newUnit.marketingCollateral);
        this.newUnit.marketingCollateral = this.newUnit.marketingCollateral.concat(
          unitBrochureArray
        );
        ////console.log(this.newUnit.marketingCollateral);
        ////console.log("WEAREHERE");
      }
    },
    uuidv4() {
      this.uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
  },
  props: {
    building: Object,
    dealMode: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  position: relative;
}

@media (min-width: 576px) {
  .input-container {
    width: 40%;
  }

  .inputs .vs-input {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .v-select {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .upload {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.upload {
  margin-top: 25px;
  margin-bottom: 25px;
}

.upload h4 {
  margin-bottom: 12px;
}

.img-preview {
  max-width: 100%;
  height: auto;
}

.delete-btn {
  top: 0;
  right: 0;
}

.custom-label-unit {
  top: 5px;
  left: -7px;
}

@media (min-width: 576px) {
  .rental {
    margin-right: 50%;
  }
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
