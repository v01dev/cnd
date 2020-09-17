<template>
  <div
    ref="addUnit"
    v-if="this.$route.params.mode != 'edit' || this.newDeal.owner == this.$store.state.userObject.id"
  >
    <div class="flex">
      <div class="w-full inputs items-center flex flex-wrap justify-around form-area">
        <div class="w-full" v-if="this.$route.params.mode == 'edit'">
          <vs-button @click="$router.go(-1)" icon="arrow_back">Back To Seller Tools</vs-button>
        </div>
        <h1
          class="w-full text-left section-title"
          v-show="this.$route.params.mode != 'edit'"
        >Add Deal</h1>
        <h1
          class="w-full text-left section-title"
          v-show="this.$route.params.mode == 'edit'"
        >Update Deal</h1>
        <div class="input-wrapper md:w-2/5 w-full">
          <vs-input
            class="w-full"
            label-placeholder="Deal Title"
            name="Deal Title"
            v-model="newDeal.title"
            v-validate="'min:4'"
          ></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Deal Title')">
            {{
            errors.first("Deal Title")
            }}
          </span>
        </div>
        <!--<div class="input-wrapper md:w-2/5 w-full">
        <vs-input v-validate="'decimal:2'" name="Buyer Rebate" label-placeholder="Buyer Rebate" v-model="newDeal.buyerRebate" class="w-full"></vs-input>
        <span class="text-danger text-sm" v-show="errors.has('Buyer Rebate')">{{ errors.first('Buyer Rebate') }}</span>
        </div>-->
        <!--<div class="input-wrapper md:w-2/5 w-full">
        <vs-input v-validate="'required'" name="Developer Incentive" label-placeholder="Developer Incentive" v-model="newDeal.devIncentive" class="w-full"></vs-input>
        <span class="text-danger text-sm" v-show="errors.has('Developer Incentive')">{{ errors.first('Developer Incentive') }}</span>
        </div>-->
        <div class="input-wrapper md:w-2/5 w-full">
          <vs-input
            class="w-full"
            label-placeholder="Price"
            name="Price"
            v-if="overridePrice"
            v-model.lazy="manualPrice"
            v-money="money"
          ></vs-input>
          <vs-input
            :disabled="true"
            :key="price"
            class="w-full"
            label-placeholder="Price"
            name="Price"
            v-if="!overridePrice"
            v-model.lazy="price"
            v-money="money"
          ></vs-input>
          <vs-checkbox :disabled="overrideDiscount" v-model="overridePrice">Override Price</vs-checkbox>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Privacy</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <v-select
            :options="['Private', 'Public', 'Hidden']"
            class="w-full mb-0"
            name="Privacy"
            placeholder="Select Privacy"
            v-model="newDeal.privacy"
            v-validate="'required'"
          ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('Privacy')">
            {{
            errors.first("Privacy")
            }}
          </span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Building</span>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <v-select
            v-if="(buildings.data != undefined && this.$route.params.mode != 'edit')"
            :disabled="this.$route.params.mode == 'edit' || newBuildingDeal"
            :options="buildings.data.listBuildings.items"
            class="w-full"
            label="name"
            name="Building"
            placeholder="Select Building"
            v-model="selectedBuilding"
            v-validate="'required'"
          ></v-select>
          <v-select
            v-if="(this.$route.params.mode == 'edit') && (selectedBuilding != '')"
            :disabled="this.$route.params.mode == 'edit' || newBuildingDeal"
            :options="selectedBuilding"
            class="w-full"
            label="name"
            name="Building"
            placeholder="Select Building"
            v-model="selectedBuilding"
            v-validate="'required'"
          ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('Building')">
            {{
            errors.first("Building")
            }}
          </span>
        </div>
        <div class="w-full" v-if="selectedBuilding && selectedBuilding.id == 0">
          <create-building :dealMode="true" @buildingCreated="selectBuilding" class="create"></create-building>
        </div>
        <div
          class="input-wrapper w-11/12 flex items-center justify-center"
          v-if="
            selectedBuilding.units != null || this.$route.params.mode == 'edit'
          "
        >
          <span class="input-span-placeholder vs-input--placeholder normal custom-label">Units</span>
          <v-select
            v-if="this.$route.params.mode != 'edit'"
            :options="selectedBuilding.units.items"
            class="w-full"
            label="nickname"
            multiple
            name="Units"
            placeholder="Select Units"
            v-model="selectedUnits"
            v-validate="'required'"
          ></v-select>
          <v-select
            v-if="this.$route.params.mode == 'edit' && newDeal.building != undefined"
            :options="newDeal.building.units.items"
            class="w-full"
            label="nickname"
            multiple
            name="Units"
            placeholder="Select Units"
            v-model="selectedUnits"
            v-validate="'required'"
          ></v-select>
          <span class="text-danger text-sm" v-show="errors.has('Units')">
            {{
            errors.first("Units")
            }}
          </span>
        </div>
        <div class="w-full create-border" v-if="newBuildingDeal || unitCreation">
          <create-unit
            :building="selectedBuilding"
            :dealMode="true"
            @unitCreated="addUnit"
            class="create"
          ></create-unit>
        </div>
        <div class="input-wrapper w-11/12 flex items-center justify-center" v-if="selectedBuilding">
          <vs-button
            @click="unitCreation = !unitCreation; goto()"
            type="border"
            v-text="selectedUnits.length > 0 ? '+ Add Another Unit' : '+ Add a Unit'"
          ></vs-button>
        </div>
        <div
          class="input-wrapper md:w-2/5 w-full"
          v-for="(item,index) in selectedUnits"
          :key="item.nickname"
        >
          <vs-input
            class="w-full"
            :label-placeholder="'Unit ' + item.nickname + ' quantity ' + '-' + ' Deal Price ' + ( item.dealPrice / item.squareFootage).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
          }) + '/sf ' + ' - ' + ' Deal discount ' + ((item.price - item.dealPrice) / item.squareFootage).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
          }) + '/sf '"
            :key="item.dealPrice"
            :name="item.nickname + ' quantity'"
            v-model="unitQuantity[index]"
            v-validate="'required|min_value:1'"
          ></vs-input>
          <span class="text-danger text-sm" v-show="errors.has(item.nickname + ' quantity')">
            {{
            errors.first(item.nickname + ' quantity')
            }}
          </span>
        </div>
        <div class="input-wrapper md:w-2/5 w-full">
          <vs-input
            :disabled="true"
            :key="discount"
            class="w-full"
            label-placeholder="Discount"
            name="Discount"
            v-if="!overrideDiscount"
            v-model.lazy="discount"
            v-money="money"
          ></vs-input>
          <vs-input
            :key="loaded"
            class="w-full"
            label-placeholder="Discount"
            name="Discount"
            v-else
            v-model.lazy="manualDiscount"
            v-money="money"
          ></vs-input>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
          <vs-checkbox :disabled="overridePrice" v-model="overrideDiscount">Override Discount</vs-checkbox>
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div
          class="input-wrapper md:w-2/5 w-full"
          v-if="selectedBuilding && selectedUnits.length > 0"
        >
          <vs-input
            :disabled="true"
            class="w-full"
            label-placeholder="Rental Per Month"
            name="Rental Assumptions"
            v-if="this.$route.params.mode != 'edit'"
            v-model.lazy="rentalAssumptions"
            v-money="money"
          ></vs-input>
          <vs-input
            :disabled="true"
            :key="finalAssumptions"
            class="w-full"
            label-placeholder="Rental Per Month"
            name="Rental Assumptions"
            v-if="this.$route.params.mode == 'edit'"
            v-model.lazy="finalAssumptions"
            v-money="money"
          ></vs-input>
        </div>
        <div class="w-full flex justify-between flex-wrap" v-if="this.$route.params.mode == 'edit'">
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="border-pdf pdf-wrapper m-2 relative"
              v-for="(item,index) in imageLinks"
              :key="item"
            >
              <img :src="item" class="img-preview" />
              <vs-button @click="deleteImage(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="border-pdf pdf-wrapper m-2 relative"
              v-for="(item,index) in videoLinks"
              :key="item"
            >
              <iframe :src="item" class="img-preview"></iframe>
              <vs-button @click="deleteVideo(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="preview relative"
              v-for="(pdfLink, index) in this.offeringMemorandums"
              :key="pdfLink"
            >
              <pdf :src="pdfLink" class="brochure"></pdf>
              <vs-button @click="deleteMemorandum(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-3/12">
            <div
              class="border-pdf pdf-wrapper m-2 relative"
              v-for="(item, index) in docLinks"
              :key="item"
            >
              <pdf :src="item" class></pdf>
              <vs-button @click="deleteDoc(index)" class="absolute delete-btn" type="flat">X</vs-button>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-wrap justify-around">
          <div class="w-full upload md:w-1/4 flex flex-col justify-end mb-4">
            <h4>
              Upload Deal Images
              <vx-tooltip
                title="Tooltip title"
                color="success"
                class="inline"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </h4>
            <input id="uploadDealImages" multiple type="file" />
          </div>
          <div class="w-full upload md:w-1/4 flex flex-col justify-end mb-4">
            <h4>
              Upload Deal Videos
              <vx-tooltip
                title="Tooltip title"
                color="success"
                class="inline"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </h4>
            <input id="uploadDealVideos" multiple type="file" />
          </div>

          <div class="w-full upload md:w-1/4 flex flex-col justify-end mb-4">
            <h4>
              Upload Offering Memorandum PDFs
              <vx-tooltip
                title="Tooltip title"
                color="success"
                class="inline"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </h4>
            <input id="uploadOfferingMemorandum" multiple type="file" />
          </div>

          <div class="w-full upload md:w-1/4 flex flex-col justify-end mb-4">
            <h4>
              Upload Other PDFs
              <vx-tooltip
                title="Tooltip title"
                color="success"
                class="inline"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </h4>
            <input id="uploadOtherDocs" multiple type="file" />
          </div>
        </div>
        <vs-button
          :disabled="!validateForm"
          @click="createDeal()"
          class="w-1/3 mt-3"
          v-show="this.$route.params.mode != 'edit'"
        >Add Deal</vs-button>
        <vs-button
          :disabled="!validateForm"
          @click="createDeal()"
          class="w-1/3"
          v-show="this.$route.params.mode == 'edit'"
        >Update Deal</vs-button>
      </div>
    </div>
    <!-- <vs-popup :active.sync="popupActive" class="agree-popup" title="Request access">
      <p class="mb-4">Please have the Private Condo Deals concierge contact me about posting a deal</p>
      <form @submit.prevent="sendEmail">
        <vs-input
          label-placeholder="FIRST NAME"
          :value="this.$store.state.userObject.firstName"
          class="w-adjust mb-2 hidden"
          name="user_firstName"
        ></vs-input>
        <vs-input
          label-placeholder="LAST NAME"
          :value="this.$store.state.userObject.lastName"
          class="w-adjust mb-2 hidden"
          name="user_lastName"
        ></vs-input>
        <vs-input
          label-placeholder="EMAIL"
          :value="this.$store.state.userObject.email"
          class="w-adjust mb-2 hidden"
          name="user_email"
        ></vs-input>
        <vs-input
          label-placeholder="LAST NAME"
          :value="this.$store.state.userObject.companyName"
          class="w-adjust mb-2 hidden"
          name="user_companyName"
        ></vs-input>
        <vs-input
          label-placeholder="LAST NAME"
          :value="this.$store.state.userObject.tel"
          class="w-adjust mb-2 hidden"
          name="user_phone"
        ></vs-input>
        <div class="message flex flex-wrap justify-between w-full">
          <span class="w-full mt-1 mb-2">Message</span>
          <vs-textarea v-model="message" class="contact-message" height="200px" name="message"></vs-textarea>
        </div>
        <vs-button button="submit" color="primary" type="filled">Add Deal</vs-button>
      </form>
    </vs-popup> -->
  </div>
</template>

<script>
import {
  createDeal,
  updateDeal,
  updateUnit,
  createUnitDealQuantity,
  deleteUnitDealQuantity,
  createNotification,
} from "../graphql/mutations";
import { editDeal } from "../graphql/custom-queries";
import { listBuildingsCreate } from "../graphql/custom-queries";
import { API, graphqlOperation, Storage } from "aws-amplify";
import vSelect from "vue-select";
import moment from "moment";
import CreateBuilding from "./CreateBuilding";
import CreateUnit from "./CreateUnit";
import { VMoney } from "v-money";
import pdf from "vue-pdf";
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      newDeal: {},
      createNewDeal: {},
      cities: {},
      amenities: {},
      buildings: {},
      communities: {},
      selectedCity: {},
      selectedUnits: [],
      selectedBuilding: "",
      selectedCommunity: {},
      createdDeal: {},
      updatedUnits: [],
      selectedPrivacy: "",
      startUnits: [],
      unitsToDelete: [],
      newBuildingDeal: false,
      unitCreation: false,
      uuid: "",
      money: {
        decimal: ".",
        thousands: ",",
        precision: 2,
        masked: false,
        prefix: "$",
      },
      overrideDiscount: false,
      manualDiscount: "",
      overridePrice: false,
      manualPrice: "",
      loaded: false,
      docLinks: [],
      finalAssumptions: "",
      doneFetching: false,
      price: "",
      discount: "",
      perUnitPrice: "",
      unitQuantity: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
      imageLinks: [],
      videoLinks: [],
      offeringMemorandums: [],
      popupActive: false,
      message: "",
    };
  },
  components: {
    vSelect,
    CreateBuilding,
    CreateUnit,
    pdf,
  },
  directives: { money: VMoney },
  methods: {
    async sendEmail(e) {
      await emailjs
        .sendForm("gmail", "deal_post", e.target, "user_praLRxgpKucwmV0r1B3O4")
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      this.popupActive = false;
      this.createDeal();
    },
    async listBuildings() {
      if (this.$route.params.mode != "edit") {
        this.buildings = await API.graphql(
          graphqlOperation(listBuildingsCreate, {
            limit: 1000,
            filter: { owner: { eq: this.$store.state.userObject.id } },
          })
        );
        let blankBuilding = {
          id: 0,
          name: "Add Building",
        };
        this.buildings.data.listBuildings.items.unshift(blankBuilding);
        this.addUnitToDeal();
      }
      this.loaded = true;
    },
    async createDeal() {
      if (this.$route.params.mode != "edit") {
        this.$vs.loading({ background: "white" });
        let notificationInput = {};
        this.newDeal.createdDate = moment().format("YYYY.M.DD");
        this.newDeal.owner = this.$store.state.userObject.id;
        this.newDeal.dealBuildingId = this.selectedBuilding.id;
        this.newDeal.featured = false;
        this.newDeal.userAccess = [];
        this.newDeal.overridePrice = this.overridePrice;
        this.newDeal.overrideDiscount = this.overrideDiscount;
        let ra = this.rentalAssumptions;
        //this.newDeal.unitQuantity = this.unitQuantity;
        if (typeof ra != "number") {
          //console.log(this.rentalAssumptions);
          ra = ra.replace(/,/g, "");
          ra = ra.replace(/$/g, "");
          ra = parseFloat(ra);
        }
        this.newDeal.rentalAssumptions = ra;
        if (!this.overrideDiscount) {
          let newDiscount = this.discount.replace(/,/g, "");
          newDiscount = newDiscount.replace(/\$/g, "");
          newDiscount = parseFloat(newDiscount);
          this.newDeal.discount = newDiscount;
        } else {
          let newDiscount = this.manualDiscount.replace(/,/g, "");
          newDiscount = newDiscount.replace(/\$/g, "");
          newDiscount = parseFloat(newDiscount);
          this.newDeal.discount = newDiscount;
        }
        if (!this.overridePrice) {
          let newPrice = this.price.replace(/,/g, "");
          newPrice = newPrice.replace(/\$/g, "");
          newPrice = parseFloat(newPrice);
          this.newDeal.dollarValues = newPrice;
        } else {
          let newPrice = this.manualPrice.replace(/,/g, "");
          newPrice = newPrice.replace(/\$/g, "");
          newPrice = parseFloat(newPrice);
          this.newDeal.dollarValues = newPrice;
        }
        this.storagePutOfferingMemorandum();
        this.storagePutOtherDocs();
        this.storagePutDealImage();
        this.storagePutDealImage();
        const dealContext = await API.graphql(
          graphqlOperation(createDeal, { input: this.newDeal })
        );
        if (this.newDeal.privacy != "Hidden") {
          notificationInput.notificationDealId = dealContext.data.createDeal.id;
          notificationInput.notificationSenderId = this.$store.state.userObject.id;
          notificationInput.type = 4;
          await API.graphql(
            graphqlOperation(createNotification, { input: notificationInput })
          );
        }
        let quantityArray = this.unitQuantity;
        this.selectedUnits.forEach(async function (unit, index) {
          unit.unitDealId = dealContext.data.createDeal.id;
          await API.graphql(graphqlOperation(updateUnit, { input: unit }));
          let quantityInput = {};
          quantityInput.unitDealQuantityUnitId = unit.id;
          quantityInput.unitDealQuantityDealId = dealContext.data.createDeal.id;
          quantityInput.quantity = quantityArray[index];
          quantityInput.index = index;
          await API.graphql(
            graphqlOperation(createUnitDealQuantity, { input: quantityInput })
          );
        });
        setTimeout(() => {
          this.$vs.loading.close();
          this.$router.push("../../devtools/3/create");
        }, 5000);
      } else {
        this.$vs.loading({ background: "white" });
        let updateInput = {};
        updateInput.id = this.newDeal.id;
        updateInput.title = this.newDeal.title;
        if (this.newDeal.featured == false || this.newDeal.featured == null) {
          updateInput.featured = false;
        }
        updateInput.buyerRebate = this.newDeal.buyerRebate;
        updateInput.devIncentive = this.newDeal.devIncentive;
        updateInput.dollarValues = this.newDeal.dollarValues;
        updateInput.privacy = this.newDeal.privacy;
        updateInput.overridePrice = this.overridePrice;
        updateInput.overrideDiscount = this.overrideDiscount;
        let ra = this.rentalAssumptions;
        if (typeof ra != "number") {
          ////console.log(this.rentalAssumptions);
          ra = ra.replace(/,/g, "");
          ra = parseFloat(ra);
        }
        updateInput.rentalAssumptions = ra;
        this.storagePutOtherDocsAdd();
        this.storagePutOfferingMemorandumAdd();
        this.storagePutDealImageAdd();
        this.storagePutDealVideoAdd();
        if (this.newDeal.offeringMemorandum === undefined)
          updateInput.offeringMemorandum = null;
        else updateInput.offeringMemorandum = this.newDeal.offeringMemorandum;
        if (document.getElementById("uploadDealImages") != null) {
          updateInput.images = this.newDeal.images;
        }
        if (document.getElementById("uploadDealVideos") != null) {
          updateInput.videos = this.newDeal.videos;
        }
        //console.log(this.newDeal.offeringMemorandum);
        //console.log(updateInput);
        if (document.getElementById("uploadOtherDocs") != null) {
          updateInput.otherDocs = this.newDeal.otherDocs;
        }
        if (!this.overrideDiscount) {
          let newDiscount = this.discount.replace(/,/g, "");
          newDiscount = newDiscount.replace(/\$/g, "");
          newDiscount = parseFloat(newDiscount);
          updateInput.discount = newDiscount;
        } else {
          let newDiscount = this.manualDiscount.replace(/,/g, "");
          newDiscount = newDiscount.replace(/\$/g, "");
          newDiscount = parseFloat(newDiscount);
          updateInput.discount = newDiscount;
        }
        if (!this.overridePrice) {
          let newPrice = this.price.replace(/,/g, "");
          newPrice = newPrice.replace(/\$/g, "");
          newPrice = parseFloat(newPrice);
          updateInput.dollarValues = newPrice;
        } else {
          let newPrice = this.manualPrice.replace(/,/g, "");
          newPrice = newPrice.replace(/\$/g, "");
          newPrice = parseFloat(newPrice);
          updateInput.dollarValues = newPrice;
        }
        const dealContext = await API.graphql(
          graphqlOperation(updateDeal, { input: updateInput })
        );
        console.log(dealContext);
        let quantityArray = this.unitQuantity;
        this.selectedUnits.forEach(async function (unit, index) {
          unit.unitDealId = dealContext.data.updateDeal.id;
          // await API.graphql(graphqlOperation(updateUnit, { input: unit }));
          let quantityInput = {};
          quantityInput.unitDealQuantityUnitId = unit.id;
          quantityInput.unitDealQuantityDealId = unit.unitDealId;
          quantityInput.quantity = quantityArray[index];
          quantityInput.index = index;
          console.log(
            await API.graphql(
              graphqlOperation(createUnitDealQuantity, { input: quantityInput })
            )
          );
        });
        this.newDeal.units.items.forEach(async function (unit, index) {
          let deleteInput = {};
          deleteInput.id = unit.id;
          await API.graphql(
            graphqlOperation(deleteUnitDealQuantity, { input: deleteInput })
          );
        });
        // this.compareUnits();
        //if (this.unitsToDelete.length > 0) {
        //  this.unitsToDelete.forEach(async function(unit) {
        //    unit.unitDealId = null;
        //     await API.graphql(graphqlOperation(updateUnit, { input: unit }));
        //  });
        //}
        setTimeout(() => {
          this.$vs.loading.close();
          this.$router.push("../../devtools/3/update");
        }, 5000);
      }
    },
    addUnitToDeal() {
      //console.log(this.$route.params);
      if (this.$route.params) {
        let params = 0;
        if (
          this.$route.params &&
          this.$route.params.id != "new" &&
          this.$route.params.mode != "edit" &&
          this.$route.params.id.includes("_")
        ) {
          params = this.$route.params.id.split("_");

          this.buildings.data.listBuildings.items.forEach((item) => {
            if (item.id == params[0]) {
              this.selectedBuilding = item;
            }
          });
          this.selectedBuilding.units.items.forEach((item) => {
            if (item.id == params[1]) {
              this.selectedUnits.push(item);
            }
          });
        }
      }
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
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    async getEditDeal() {
      if (this.$route.params) {
        if (
          this.$route.params.id != "new" &&
          this.$route.params.mode == "edit" &&
          !this.$route.params.id.includes("_")
        ) {
          this.$vs.loading({ background: "white" });
          let getDealInput = {};
          getDealInput.id = this.$route.params.id;
          ////console.log(getDealInput);
          let response = await API.graphql(
            graphqlOperation(editDeal, { id: this.$route.params.id })
          );
          if (
            response.data.getDeal == null ||
            response.data.getDeal.owner != this.$store.state.userObject.id
          ) {
            this.$vs.loading.close();
            this.$router.push("../../404");
          }
          // console.log(response);
          this.newDeal = response.data.getDeal;
          console.log(this.newDeal);
          if (this.newDeal.title == null) this.newDeal.title = "Deal";
          if (this.newDeal.units.items.length > 0) {
            //console.log(this.newDeal.units.items);
            this.newDeal.units.items.sort(this.dynamicSort("index"));
            //console.log(this.newDeal.units.items);
            this.newDeal.units.items.forEach((unit, index) => {
              this.unitQuantity[index] = unit.quantity;
              //console.log(this.unitQuantity);
            });
          }
          //console.log(this.unitQuantity);
          this.selectedBuilding = [];
          this.selectedBuilding[0] = {};
          this.selectedBuilding[0].name = this.newDeal.building.name;
          this.selectedBuilding[0].units =
            response.data.getDeal.unitNumbers.items;
          this.selectedBuilding[0].id = response.data.getDeal.building.id;
          console.log(this.selectedBuilding);
          //this.startUnits = response.data.getDeal.unitNumbers.items;
          response.data.getDeal.units.items.forEach((item) => {
            //console.log(item);
            this.selectedUnits.push(item.unit);
          });
          //this.selectedUnits = response.data.getDeal.unitNumbers.items;
          this.manualDiscount = response.data.getDeal.discount.toFixed(2);
          this.manualPrice = response.data.getDeal.dollarValues.toFixed(2);
          let checkUnitPrice = 0;
          let checkDiscount = 0;
          //response.data.getDeal.units.items.forEach((item) => {
          //   this.unitQuantity.push(item.quantity);
          //})
          let unitQuantity = this.unitQuantity;
          this.selectedUnits.forEach((item, index) => {
            //console.log(item);
            checkUnitPrice += item.dealPrice * unitQuantity[index];
            checkDiscount +=
              (item.price - item.dealPrice) * unitQuantity[index];
            //console.log(checkDiscount);
          });
          this.overridePrice = this.newDeal.overridePrice;
          ////console.log(response);
          ////console.log(this.manualDiscount);
          ////console.log("123456");
          //console.log(this.unitQuantity);
          this.loaded = true;
          this.$vs.loading.close();
          //console.log(checkDiscount);
          this.overrideDiscount = this.newDeal.overrideDiscount;
          // //console.log(this.newDeal.building.units.items);
          ////console.log(this.startUnits);
          ////console.log("Start Units");
          // //console.log(this.newDeal.offeringMemorandum);
          if (
            this.newDeal.offeringMemorandum != null &&
            this.newDeal.offeringMemorandum.length > 0
          ) {
            let memorandums = [];
            this.newDeal.offeringMemorandum.forEach((item) => {
              Storage.get(item).then((result) => memorandums.push(result));
            });
            this.offeringMemorandums = memorandums;
            // Storage.get(this.newDeal.offeringMemorandum).then(
            //   (result) => (this.pdfLink = result)
            // );
            ////console.log(this.pdfLink);
            ////console.log("I'm link");
          }
          if (
            this.newDeal.otherDocs != null &&
            this.newDeal.otherDocs.length > 0
          ) {
            let newLinks = [];
            this.newDeal.otherDocs.forEach(function (item) {
              Storage.get(item).then((result) => newLinks.push(result));
            });
            ////console.log(newLinks);
            ////console.log("We're new links");
            this.docLinks = newLinks;
          }
          if (this.newDeal.images != null && this.newDeal.images.length > 0) {
            let imagesArray = [];
            this.newDeal.images.forEach(function (item) {
              Storage.get(item).then((result) => imagesArray.push(result));
            });
            this.imageLinks = imagesArray;
          }
          ////console.log(this.newUnit);
          if (this.newDeal.videos != null && this.newDeal.videos.length > 0) {
            let videosArray = [];
            this.newDeal.videos.forEach(function (item) {
              Storage.get(item).then((result) => videosArray.push(result));
            });
            this.videoLinks = videosArray;
          }
          this.doneFetching = true;
          ////console.log(this.newDeal);
          console.log(this.newDeal);
          ////console.log(this.selectedBuilding[0]);
          ////console.log("We're here!!!");
          //this.newDeal = await API.graphql(graphqlOperation(getDeal, {input: this.$route.params.id}));
        }
        //this.$vs.loading.close();
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

    storagePutOtherDocs() {
      if (document.getElementById("uploadOtherDocs").files.length > 0) {
        const selectedDocs = document.getElementById("uploadOtherDocs").files;
        let uuidBrochureName = this.uuid;
        let buildingOtherDocsArray = [];
        selectedDocs.forEach(function (item) {
          buildingOtherDocsArray.push(uuidBrochureName + item.name);
          Storage.put(uuidBrochureName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        // //console.log(uuidBrochureName)

        this.newDeal.otherDocs = buildingOtherDocsArray;
        ////console.log(this.createNewDeal.buildingOtherDocsArray);
        ////console.log(this.createNewDeal);
      }
    },
    storagePutOtherDocsAdd() {
      if (document.getElementById("uploadOtherDocs").files.length > 0) {
        const selectedDocs = document.getElementById("uploadOtherDocs").files;
        let uuidBrochureName = this.uuid;
        let buildingOtherDocsArray = [];
        selectedDocs.forEach(function (item) {
          buildingOtherDocsArray.push(uuidBrochureName + item.name);
          Storage.put(uuidBrochureName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        // //console.log(uuidBrochureName)
        if (this.newDeal.otherDocs == null) this.newDeal.otherDocs = [];
        this.newDeal.otherDocs = this.newDeal.otherDocs.concat(
          buildingOtherDocsArray
        );
        ////console.log(this.createNewDeal.buildingOtherDocsArray);
        ////console.log(this.createNewDeal);
      }
    },
    storagePutOfferingMemorandum() {
      if (document.getElementById("uploadOfferingMemorandum") != null) {
        const selectedBrochure = document.getElementById(
          "uploadOfferingMemorandum"
        ).files;
        ////console.log(selectedBrochure);
        let uuidBrochureName = this.uuid;
        let buildingOffringMemorandumArray = [];
        selectedBrochure.forEach(function (item) {
          buildingOffringMemorandumArray.push(uuidBrochureName + item.name);
          Storage.put(uuidBrochureName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        // //console.log(uuidBrochureName)
        this.newDeal.offeringMemorandum = buildingOffringMemorandumArray;
        ////console.log(this.createNewDeal.offeringMemorandum);
        ////console.log(this.createNewDeal);
      }
    },

    storagePutOfferingMemorandumAdd() {
      if (
        document.getElementById("uploadOfferingMemorandum").files.length > 0
      ) {
        const selectedDocs = document.getElementById("uploadOfferingMemorandum")
          .files;
        let uuidMemorandumName = this.uuid;
        let docsArray = [];
        selectedDocs.forEach((item) => {
          docsArray.push(uuidMemorandumName + item.name);
          Storage.put(uuidMemorandumName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        if (this.newDeal.offeringMemorandum == null)
          this.newDeal.offeringMemorandum = [];
        this.newDeal.offeringMemorandum = this.newDeal.offeringMemorandum.concat(
          docsArray
        );
      }
    },
    compareUnits() {
      this.unitsToDelete = this.startUnits.filter(
        (x) => this.selectedUnits.indexOf(x) === -1
      );
      ////console.log(this.unitsToDelete);
    },
    goto() {
      window.scrollTo(0, 0);
      // console.log(this.selectedBuilding[0]);
    },
    selectBuilding(value) {
      this.selectedBuilding = value;
      this.newBuildingDeal = true;
      this.unitCreation = true;
      this.goto();
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Building Added. Next add units for this building deal.",
      });
      ////console.log(value);
    },
    addUnit(value) {
      this.selectedUnits.push(value);
      this.newBuildingDeal = false;
      this.unitCreation = false;
      ////console.log(value);
    },
    deleteMemorandum(index) {
      this.offeringMemorandums.splice(index, 1);
      this.newDeal.offeringMemorandum.splice(index, 1);
    },
    deleteDoc(index) {
      this.newDeal.otherDocs.splice(index, 1);
      this.docLinks.splice(index, 1);
    },
    storagePutDealImage() {
      const selectedFile = document.getElementById("uploadDealImages").files;
      let uuidImageName = this.uuid;
      let unitImagesArray = [];
      selectedFile.forEach(function (item) {
        unitImagesArray.push(uuidImageName + item.name);
        Storage.put(uuidImageName + item.name, item, {
          contentType: item.type,
        }).catch((err) => console.log(err));
      });
      ////console.log(unitImagesArray);
      this.newDeal.images = unitImagesArray;
    },
    storagePutDealVideo() {
      const selectedVideo = document.getElementById("uploadDealVideos").files;
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
      this.newDeal.videos = unitVideosArray;
      ////console.log(this.createNewUnit.videos);
    },
    storagePutDealImageAdd() {
      if (
        (document.getElementById("uploadDealImages") != null) &
        (document.getElementById("uploadDealImages").files.length > 0)
      ) {
        const selectedFile = document.getElementById("uploadDealImages").files;
        let uuidImageName = this.uuid;
        let unitImagesArray = [];
        selectedFile.forEach(function (item) {
          unitImagesArray.push(uuidImageName + item.name);
          Storage.put(uuidImageName + item.name, item, {
            contentType: item.type,
          }).catch((err) => console.log(err));
        });
        ////console.log(this.newUnit.images);

        if (this.newDeal.images == null) this.newDeal.images = [];
        this.newDeal.images = this.newDeal.images.concat(unitImagesArray);
        ////console.log(this.newUnit.images);
      }
    },
    storagePutDealVideoAdd() {
      if (
        (document.getElementById("uploadDealVideos") != null) &
        (document.getElementById("uploadDealVideos").files.length > 0)
      ) {
        const selectedVideo = document.getElementById("uploadDealVideos").files;
        let uuidVideoName = this.uuid;
        let unitVideosArray = [];
        selectedVideo.forEach(function (item) {
          if (item.type != "video/quicktime") {
            // console.log(item.type);
            unitVideosArray.push(uuidVideoName + item.name);
            Storage.put(uuidVideoName + item.name, item, {
              contentType: item.type,
            }).catch((err) => console.log(err));
          }
        });
        ////console.log(unitVideosArray)
        if (this.newDeal.videos == null) this.newDeal.videos = [];
        this.newDeal.videos = this.newDeal.videos.concat(unitVideosArray);
      }
    },
    deleteImage(index) {
      this.imageLinks.splice(index, 1);
      this.newDeal.images.splice(index, 1);
    },
    deleteVideo(index) {
      this.videoLinks.splice(index, 1);
      this.newDeal.videos.splice(index, 1);
    },
  },
  computed: {
    selectedUnitsLength() {
      return this.selectedUnits.length;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.selectedBuilding &&
        this.selectedUnits.length > 0 &&
        this.newDeal.privacy
      );
    },
    rentalAssumptions: {
      get: function () {
        let newRental = 0;
        let unitQuantity = this.unitQuantity;
        this.selectedUnits.forEach(function (item, index) {
          ////console.log(item);
          newRental = newRental + item.rentalAssumptions * unitQuantity[index];
          ////console.log(newRental);
          ////console.log(newRental);
        });
        return newRental;
      },
      set: function () {},
    },
  },
  watch: {
    loaded: function () {
      ////console.log("I'm watch");
      let newSum = 0;
      //let newPrice = this.manualPrice;
      let checkFetch = this.doneFetching;
      let unitQuantity = this.unitQuantity;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item.rentalAssumptions);
        if (item.rentalAssumptions != null) {
          //console.log(unitQuantity[index]);
          newSum = newSum + item.rentalAssumptions * unitQuantity[index];
          //console.log(newSum);
          //if(checkFetch == true) newPrice = newPrice + item.price
          ////console.log(newSum);
        }
      });
      ////console.log(newSum);
      if (newSum % 1 == 0) this.finalAssumptions = newSum * 100;
      else this.finalAssumptions = newSum;

      let newPrice = 0;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item);
        newPrice = newPrice + item.dealPrice * unitQuantity[index];
        ////console.log(newPrice);
      });
      ////console.log(newPrice);
      if (newPrice % 1 == 0) this.price = newPrice * 100;
      else this.price = newPrice;
      //this.manualPrice = newPrice;

      let newDiscount = 0;
      this.selectedUnits.forEach(function (item, index) {
        if (item.dealPrice != null) {
          ////console.log(item);
          newDiscount = newDiscount + item.price * unitQuantity[index];

          newDiscount = newDiscount - item.dealPrice * unitQuantity[index];

          ////console.log(newDiscount);
        }
      });
      ////console.log(this.discount);
      this.discount = newDiscount.toFixed(2);

      if (this.selectedUnits != null && this.selectedUnits.length > 0) {
        let newPerUnitPrice = 0;
        this.selectedUnits.forEach(function (item, index) {
          if (item.dealPrice != null) {
            newPerUnitPrice =
              newPerUnitPrice + item.dealPrice * unitQuantity[index];
          }
          ////console.log(newPerUnitPrice);
        });
        if (this.overridePrice == false)
          this.perUnitPrice = (
            newPerUnitPrice / this.selectedUnits.length
          ).toFixed(2);
        if (this.overridePrice == true && typeof this.manualPrice == "string") {
          let buffer = this.manualPrice.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.perUnitPrice = (
            parseFloat(buffer).toFixed(2) / this.selectedUnits.length
          ).toFixed(2);
        }
        if (this.overridePrice == true && typeof this.manualPrice != "string")
          this.perUnitPrice = (
            (parseFloat(this.manualPrice) / 100).toFixed(2) /
            this.selectedUnits.length
          ).toFixed(2);
        ////console.log(parseFloat(this.manualPrice));
      }
    },
    selectedUnitsLength: function () {
      this.selectedUnits.sort(this.dynamicSort("nickname"));
    },
    selectedUnits: function () {
      ////console.log("I'm watch");
      let newSum = 0;
      //let newPrice = this.manualPrice;
      let checkFetch = this.doneFetching;
      let unitQuantity = this.unitQuantity;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item.rentalAssumptions);
        if (item.rentalAssumptions != null) {
          //console.log(unitQuantity[index]);
          newSum = newSum + item.rentalAssumptions * unitQuantity[index];
          //console.log(newSum);
          //if(checkFetch == true) newPrice = newPrice + item.price
          ////console.log(newSum);
        }
      });
      ////console.log(newSum);
      if (newSum % 1 == 0) this.finalAssumptions = newSum * 100;
      else this.finalAssumptions = newSum;

      let newPrice = 0;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item);
        newPrice = newPrice + item.dealPrice * unitQuantity[index];
        ////console.log(newPrice);
      });
      ////console.log(newPrice);
      if (newPrice % 1 == 0) this.price = newPrice * 100;
      else this.price = newPrice;
      //this.manualPrice = newPrice;

      if (!this.overridePrice) {
        let newDiscount = 0;
        this.selectedUnits.forEach(function (item, index) {
          if (item.dealPrice != null) {
            ////console.log(item);
            newDiscount = newDiscount + item.price * unitQuantity[index];

            newDiscount = newDiscount - item.dealPrice * unitQuantity[index];

            ////console.log(newDiscount);
          }
        });
        ////console.log(this.discount);
        this.discount = newDiscount.toFixed(2);
      }
      if (this.selectedUnits != null && this.selectedUnits.length > 0) {
        let newPerUnitPrice = 0;
        this.selectedUnits.forEach(function (item, index) {
          if (item.dealPrice != null) {
            newPerUnitPrice =
              newPerUnitPrice + item.dealPrice * unitQuantity[index];
          }
          ////console.log(newPerUnitPrice);
        });
        if (this.overridePrice == false)
          this.perUnitPrice = (
            newPerUnitPrice / this.selectedUnits.length
          ).toFixed(2);
        if (this.overridePrice == true && typeof this.manualPrice == "string") {
          let buffer = this.manualPrice.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.perUnitPrice = (
            parseFloat(buffer).toFixed(2) / this.selectedUnits.length
          ).toFixed(2);
        }
        if (this.overridePrice == true && typeof this.manualPrice != "string")
          this.perUnitPrice = (
            (parseFloat(this.manualPrice) / 100).toFixed(2) /
            this.selectedUnits.length
          ).toFixed(2);
        if (this.overridePrice == true) {
          let newDiscount = 0;
          let newPrice = 0;
          this.selectedUnits.forEach((item, index) => {
            newPrice += item.price * unitQuantity[index];
          });
          let buffer = this.manualPrice.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.discount = (newPrice - buffer).toFixed(2);
        }
        if (this.overrideDiscount == true) {
          let newDiscount = 0;
          let newPrice = 0;
          this.selectedUnits.forEach((item, index) => {
            newPrice += item.price * unitQuantity[index];
          });
          let buffer = this.manualDiscount.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.price = (newPrice - buffer).toFixed(2);
        }
      }
    },
    unitQuantity: function () {
      //console.log("I'm watch");
      let newSum = 0;
      //let newPrice = this.manualPrice;
      let checkFetch = this.doneFetching;
      let unitQuantity = this.unitQuantity;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item.rentalAssumptions);
        if (item.rentalAssumptions != null) {
          //console.log(unitQuantity[index]);
          newSum = newSum + item.rentalAssumptions * unitQuantity[index];
          //console.log(newSum);
          //if(checkFetch == true) newPrice = newPrice + item.price
          ////console.log(newSum);
        }
      });
      ////console.log(newSum);
      if (newSum % 1 == 0) this.finalAssumptions = newSum * 100;
      else this.finalAssumptions = newSum;

      let newPrice = 0;
      this.selectedUnits.forEach(function (item, index) {
        ////console.log(item);
        newPrice = newPrice + item.dealPrice * unitQuantity[index];
        ////console.log(newPrice);
      });
      ////console.log(newPrice);
      if (newPrice % 1 == 0) this.price = newPrice * 100;
      else this.price = newPrice;
      //this.manualPrice = newPrice;
      if (!this.overridePrice) {
        let newDiscount = 0;
        this.selectedUnits.forEach(function (item, index) {
          if (item.dealPrice != null) {
            ////console.log(item);
            newDiscount = newDiscount + item.price * unitQuantity[index];

            newDiscount = newDiscount - item.dealPrice * unitQuantity[index];

            ////console.log(newDiscount);
          }
        });
        ////console.log(this.discount);
        this.discount = newDiscount.toFixed(2);
      }
      if (this.selectedUnits != null && this.selectedUnits.length > 0) {
        let newPerUnitPrice = 0;
        this.selectedUnits.forEach(function (item, index) {
          if (item.dealPrice != null) {
            newPerUnitPrice =
              newPerUnitPrice + item.dealPrice * unitQuantity[index];
          }
          ////console.log(newPerUnitPrice);
        });
        if (this.overridePrice == false)
          this.perUnitPrice = (
            newPerUnitPrice / this.selectedUnits.length
          ).toFixed(2);
        if (this.overridePrice == true && typeof this.manualPrice == "string") {
          let buffer = this.manualPrice.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");

          this.perUnitPrice = (
            parseFloat(buffer).toFixed(2) / this.selectedUnits.length
          ).toFixed(2);
        }
        if (this.overridePrice == true && typeof this.manualPrice != "string")
          this.perUnitPrice = (
            (parseFloat(this.manualPrice) / 100).toFixed(2) /
            this.selectedUnits.length
          ).toFixed(2);
        ////console.log(parseFloat(this.manualPrice));
      }
      if (this.overridePrice == true) {
        let newDiscount = 0;
        let newPrice = 0;
        this.selectedUnits.forEach((item, index) => {
          newPrice += item.price * unitQuantity[index];
        });
        let buffer = this.manualPrice.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        this.discount = (newPrice - buffer).toFixed(2);
      }
      if (this.overrideDiscount == true) {
        let newDiscount = 0;
        let newPrice = 0;
        this.selectedUnits.forEach((item, index) => {
          newPrice += item.price * unitQuantity[index];
        });
        let buffer = this.manualDiscount.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        this.price = (newPrice - buffer).toFixed(2);
      }
    },
    overridePrice: function () {
      if (this.overridePrice == false) {
        if (this.selectedUnits != null && this.selectedUnits.length > 0) {
          let newPerUnitPrice = 0;
          let newDiscount = 0;
          let unitsMarketPrice = 0;
          this.selectedUnits.forEach((item, index) => {
            if (item.dealPrice != null) {
              newPerUnitPrice =
                newPerUnitPrice + item.dealPrice * this.unitQuantity[index];
            }
            if (item.price != null) {
              // console.log(item);
              unitsMarketPrice += item.price * this.unitQuantity[index];
              let buffer = this.price.replace(/,/g, "");
              buffer = buffer.replace(/\$/g, "");
              newDiscount = unitsMarketPrice - buffer;
              this.discount = newDiscount.toFixed(2);
            }

            ////console.log(newPerUnitPrice);
          });
          if (this.overridePrice == false)
            this.perUnitPrice = (
              newPerUnitPrice / this.selectedUnits.length
            ).toFixed(2);
          if (
            this.overridePrice == true &&
            typeof this.manualPrice == "string"
          ) {
            let buffer = this.manualPrice.replace(/,/g, "");
            buffer = buffer.replace(/\$/g, "");
            this.perUnitPrice = (
              parseFloat(buffer).toFixed(2) / this.selectedUnits.length
            ).toFixed(2);
          }
          if (this.overridePrice == true && typeof this.manualPrice != "string")
            this.perUnitPrice = (
              (parseFloat(this.manualPrice) / 100).toFixed(2) /
              this.selectedUnits.length
            ).toFixed(2);
          ////console.log(parseFloat(this.manualPrice));
        }
      } else {
        if (this.selectedUnits != null && this.selectedUnits.length > 0) {
          let newPerUnitPrice = 0;
          let newDiscount = 0;
          let unitsMarketPrice = 0;
          this.selectedUnits.forEach((item, index) => {
            if (item.dealPrice != null) {
              newPerUnitPrice = newPerUnitPrice + item.dealPrice;
            }
            if (item.price != null) {
              // console.log(item);
              unitsMarketPrice += item.price * this.unitQuantity[index];
              let buffer = this.manualPrice.replace(/,/g, "");
              buffer = buffer.replace(/\$/g, "");
              newDiscount = unitsMarketPrice - buffer;
              this.discount = newDiscount.toFixed(2);
            }

            ////console.log(newPerUnitPrice);
          });
          if (this.overridePrice == false)
            this.perUnitPrice = (
              newPerUnitPrice / this.selectedUnits.length
            ).toFixed(2);
          if (
            this.overridePrice == true &&
            typeof this.manualPrice == "string"
          ) {
            let buffer = this.manualPrice.replace(/,/g, "");
            buffer = buffer.replace(/\$/g, "");
            this.perUnitPrice = (
              parseFloat(buffer).toFixed(2) / this.selectedUnits.length
            ).toFixed(2);
          }
          if (this.overridePrice == true && typeof this.manualPrice != "string")
            this.perUnitPrice = (
              (parseFloat(this.manualPrice) / 100).toFixed(2) /
              this.selectedUnits.length
            ).toFixed(2);
          ////console.log(parseFloat(this.manualPrice));
        }
      }
    },
    manualPrice: function () {
      if (this.selectedUnits != null && this.selectedUnits.length > 0) {
        let newPerUnitPrice = 0;
        let newDiscount = 0;
        let unitsMarketPrice = 0;
        this.selectedUnits.forEach((item, index) => {
          if (item.dealPrice != null) {
            newPerUnitPrice = newPerUnitPrice + item.dealPrice;
          }
          if (item.price != null) {
            // console.log(item);
            unitsMarketPrice += item.price * this.unitQuantity[index];
            let buffer = this.manualPrice.replace(/,/g, "");
            buffer = buffer.replace(/\$/g, "");
            newDiscount = unitsMarketPrice - buffer;
            this.discount = newDiscount.toFixed(2);
          }

          ////console.log(newPerUnitPrice);
        });
        if (this.overridePrice == false)
          this.perUnitPrice = (
            newPerUnitPrice / this.selectedUnits.length
          ).toFixed(2);
        if (this.overridePrice == true && typeof this.manualPrice == "string") {
          let buffer = this.manualPrice.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.perUnitPrice = (
            parseFloat(buffer).toFixed(2) / this.selectedUnits.length
          ).toFixed(2);
        }
        if (this.overridePrice == true && typeof this.manualPrice != "string")
          this.perUnitPrice = (
            (parseFloat(this.manualPrice) / 100).toFixed(2) /
            this.selectedUnits.length
          ).toFixed(2);
        ////console.log(parseFloat(this.manualPrice));
      }
    },

    manualDiscount: function () {
      if (this.selectedUnits != null && this.selectedUnits.length > 0) {
        let newPrice = 0;
        let marketPrice = 0;
        this.selectedUnits.forEach((item, index) => {
          marketPrice += item.price * this.unitQuantity[index];
          let buffer = this.manualDiscount.replace(/,/g, "");
          buffer = buffer.replace(/\$/g, "");
          this.price = (marketPrice - buffer).toFixed(2);
        });
      }
    },
    overrideDiscount: function () {
      if (this.overrideDiscount == false) {
        let newSum = 0;
        //let newPrice = this.manualPrice;
        let checkFetch = this.doneFetching;
        let unitQuantity = this.unitQuantity;
        this.selectedUnits.forEach(function (item, index) {
          ////console.log(item.rentalAssumptions);
          if (item.rentalAssumptions != null) {
            //console.log(unitQuantity[index]);
            newSum = newSum + item.rentalAssumptions * unitQuantity[index];
            //console.log(newSum);
            //if(checkFetch == true) newPrice = newPrice + item.price
            ////console.log(newSum);
          }
        });
        ////console.log(newSum);
        if (newSum % 1 == 0) this.finalAssumptions = newSum * 100;
        else this.finalAssumptions = newSum;

        let newPrice = 0;
        this.selectedUnits.forEach(function (item, index) {
          ////console.log(item);
          newPrice = newPrice + item.dealPrice * unitQuantity[index];
          ////console.log(newPrice);
        });
        ////console.log(newPrice);
        if (newPrice % 1 == 0) this.price = newPrice * 100;
        else this.price = newPrice;
        //this.manualPrice = newPrice;

        if (!this.overridePrice) {
          let newDiscount = 0;
          this.selectedUnits.forEach(function (item, index) {
            if (item.dealPrice != null) {
              ////console.log(item);
              newDiscount = newDiscount + item.price * unitQuantity[index];

              newDiscount = newDiscount - item.dealPrice * unitQuantity[index];

              ////console.log(newDiscount);
            }
          });
          ////console.log(this.discount);
          this.discount = newDiscount.toFixed(2);
        }
        if (this.selectedUnits != null && this.selectedUnits.length > 0) {
          let newPerUnitPrice = 0;
          this.selectedUnits.forEach(function (item, index) {
            if (item.dealPrice != null) {
              newPerUnitPrice =
                newPerUnitPrice + item.dealPrice * unitQuantity[index];
            }
            ////console.log(newPerUnitPrice);
          });
          if (this.overridePrice == false)
            this.perUnitPrice = (
              newPerUnitPrice / this.selectedUnits.length
            ).toFixed(2);
          if (
            this.overridePrice == true &&
            typeof this.manualPrice == "string"
          ) {
            let buffer = this.manualPrice.replace(/,/g, "");
            buffer = buffer.replace(/\$/g, "");
            this.perUnitPrice = (
              parseFloat(buffer).toFixed(2) / this.selectedUnits.length
            ).toFixed(2);
          }
          if (this.overridePrice == true && typeof this.manualPrice != "string")
            this.perUnitPrice = (
              (parseFloat(this.manualPrice) / 100).toFixed(2) /
              this.selectedUnits.length
            ).toFixed(2);
          ////console.log(parseFloat(this.manualPrice));
        }
      } else {
        if (this.selectedUnits != null && this.selectedUnits.length > 0) {
          let newPrice = 0;
          let marketPrice = 0;
          this.selectedUnits.forEach((item, index) => {
            marketPrice += item.price * this.unitQuantity[index];
            let buffer = this.manualDiscount.replace(/,/g, "");
            buffer = buffer.replace(/\$/g, "");
            this.price = (marketPrice - buffer).toFixed(2);
          });
        }
      }
    },
  },
  beforeMount() {
    this.listBuildings();
    this.getEditDeal();
    this.uuidv4();
  },
};
</script>

<style lang="scss">
.vs__dropdown-option--highlight {
  background: #49a25a;
}
.input-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* min-height: 120px; */
  position: relative;
  min-height: 90px;
}

.create-border {
  border: 1px black solid;
}

.create {
  padding: 25px 0;
}

.delete-btn {
  top: 0;
  right: 0;
}
.vs-button {
  margin: 10px;
  margin-left: 0;
}
.vs-checkbox {
  margin: 10px;
  margin-left: 0;
}
.custom-label {
  top: -30px !important;
  font-size: 14px;
  /* color: #333; */
  /* margin-bottom: 17px;*/
}

.vs-input--placeholder {
  top: 0px;
  font-size: 17px !important;
  line-height: 1;
}

h1.section-title {
  margin-top: 80px;
  margin-bottom: 40px;
  font-family: "Khmer MN", serif;
  font-size: 3.1rem;
  margin-top: 80px;
  margin-bottom: 40px;
  margin-left: 5%;
  /* text-transform: uppercase; */
}

.form-area {
  background: white;
  padding-bottom: 80px;
  border-radius: 0 0 8px 8px;
  padding-left: 4% !important;
  padding-right: 4% !important;
}

.datepicker {
  margin-top: 10px;
}

.contact-message {
  .vs-textarea {
    height: 200px;
  }
  .vs-textarea:focus {
    resize: none !important;
  }
}
</style>
