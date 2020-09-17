<template>
  <div class="deal-card" :key="purchaseDiscount" v-if="this.$store.state.userObject.id">
    <div
      :key="titleImage"
      class="card-top relative cursor-pointer"
      @click="viewDetails(deal.id)"
      :style="
        hasAccess && this.titleImage != ''
          ? 'background-image: url(' + this.titleImage + ');'
          : 'background-image: url(' + mapUrl + ');'
      "
    >
      <!-- <img
        :key="mapUrl"
        :src="mapUrl"
        @click="viewDetails(deal.id)"
        alt
        v-if="deal.privacy != 'Public' &&
              !deal.userAccess.includes(this.$store.state.userObject.id) &&
              deal.owner != this.$store.state.userObject.id"
      />
      <img :src="titleImage" @click="viewDetails(deal.id)" v-else-if="this.titleImage != ''" />
      <img :key="mapUrl" :src="mapUrl" @click="viewDetails(deal.id)" alt v-else />-->
      <vs-icon
        :icon="
          this.$store.state.userObject.favorites.includes(deal.id)
            ? 'favorite'
            : 'favorite_border'
        "
        @click.stop="addToFavorites(deal.id)"
        class="save cursor-pointer"
        color="primary"
        size="medium"
      ></vs-icon>
      <span
        class="privacy absolute private cursor-pointer"
        v-if="
          deal.privacy != 'Public' &&
            !deal.userAccess.includes(this.$store.state.userObject.id) &&
            deal.owner != this.$store.state.userObject.id &&
            this.$store.state.userObject.accessRequests != null &&
            !this.$store.state.userObject.accessRequests.includes(deal.id)
        "
      >{{ privateText }}</span>
      <span
        class="privacy absolute requested"
        v-if="
          deal.privacy != 'Public' &&
            !deal.userAccess.includes(this.$store.state.userObject.id) &&
            deal.owner != this.$store.state.userObject.id &&
            this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(deal.id)
        "
      >REQUESTED</span>
      <!-- <span
        class="privacy absolute granted"
        v-if="
          deal.userAccess.includes(this.$store.state.userObject.id) ||
            (deal.owner == this.$store.state.userObject.id &&
              deal.privacy != 'Hidden')
        "
      >ACCESS GRANTED</span>-->
      <span class="privacy absolute granted" v-if="deal.privacy == 'Public'">PUBLIC</span>
      <span class="privacy absolute private cursor-pointer" v-if="deal.privacy == 'Hidden'">HIDDEN</span>
      <!--      <div class="overlay absolute w-full h-full" v-bind:class="hovered ? '' : 'vs-hidden'"-->
      <!--           @click="viewDetails(deal.id)">-->
      <!--        <vs-button-->
      <!--            class="view-btn text-black self-center mb-2"-->
      <!--            color="#FFFFFF"-->
      <!--          @click="viewDetails(deal.id)"-->
      <!--        >View Details-->
      <!--        </vs-button>-->
      <!--      </div>-->
    </div>
    <vs-popup :active.sync="popupActive" class="agree-popup" title="Request Access">
      <p class="text-semidark fs-15 fw-600 text-uppercase mb-4">{{ deal.title }}</p>
      <p class="text-semidark fs-15 fw-600 text-uppercase mb-4">
        {{
        Math.round(dollarValuesInitial).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        })
        }}
      </p>
      <p class="mb-4">
        Thank you for requesting access to the property details. Privacy for sellers is a core feature of the marketplace and deal access is provided on a property by property basis. To protect privacy and maintain the confidential and private nature of the listing, all potential buyers must complete a Non-Disclosure & Non-Circumvent Agreement prior to receiving access and viewing additional financial and ownership information.
        <br />
        <br />
      </p>
      <p class="mb-4" v-if="terms">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, animi
        assumenda atque corporis cumque deserunt dolor doloremque, ducimus harum
        id labore laborum magni obcaecati praesentium, quasi suscipit voluptate
        voluptatibus voluptatum.
      </p>
      <div class="flex mb-4 items-center">
        <vs-checkbox v-model="agree">Send me the Non-Disclosure & Non-Circumvent Agreement</vs-checkbox>
        <a target="_blank" href="/non-disclosure-non-circumvent"></a>
      </div>
      <form @submit.prevent="sendRequest">
        <vs-input type="text" :value="deal.id" name="dealId" class="hidden"></vs-input>
        <vs-input
          :value="this.$store.state.userObject.firstName"
          class="hidden"
          name="userFirstName"
        ></vs-input>
        <vs-input :value="this.$store.state.userObject.lastName" class="hidden" name="userLastName"></vs-input>
        <vs-input :value="this.$store.state.userObject.tel" class="hidden" name="userPhone"></vs-input>
        <vs-input :value="this.$store.state.userObject.email" class="hidden" name="userEmail"></vs-input>
        <vs-input :value="this.$store.state.userObject.username" class="hidden" name="username"></vs-input>
        <vs-input
          :value="this.$store.state.userObject.companyName"
          class="hidden"
          name="userCompanyName"
        ></vs-input>
        <vs-input
          type="text"
          :value="'www.BulkCondoDeals.com/deal-details/' + deal.id"
          name="dealLink"
          class="hidden"
        ></vs-input>
        <vs-input :value="deal.title" class="hidden" name="dealTitle"></vs-input>
        <vs-input
          :value="deal.building.addres + ', ' + deal.building.city + ', ' + deal.building.state"
          class
          name="dealAddress"
        ></vs-input>
        <vs-input :value="seller.firstName" class="hidden" name="sellerFirstName"></vs-input>
        <vs-input :value="seller.lastName" class="hidden" name="sellerLastName"></vs-input>
        <vs-input :value="seller.tel" class="hidden" name="sellerPhone"></vs-input>
        <vs-input :value="seller.email" class="hidden" name="sellerEmail"></vs-input>
        <vs-input :value="seller.companyName" class="hidden" name="sellerCompanyName"></vs-input>
        <vs-button :disabled="!agree" color="primary" type="filled" button="submit">Request Access</vs-button>
      </form>
    </vs-popup>
    <div class="card-bottom">
      <div class="text-center mt-4">
        <span class="deal-number">BCD-{{ deal.id.substring(30) }}</span>
      </div>
      <div class="title text-center">
        <span>{{ deal.title }}</span>
      </div>
      <div
        class="location mb-0 mt-0 text-center"
        v-if="
          deal.userAccess.includes(this.$store.state.userObject.id) ||
            deal.owner == this.$store.state.userObject.id ||
            deal.privacy == 'Public'
        "
      >
        <span class="address">
          {{ deal.building.addres }} {{ deal.building.city }},
          {{ deal.building.state }}
        </span>
      </div>
      <div
        class="location mb-0 mt-0 text-center"
        v-else
      >Private Address {{ deal.building.city }}, {{ deal.building.state }}</div>

      <div class="location">
        <!-- <span class="address">{{ deal.building.city }}, {{ deal.building.state }}</span> -->
        <!-- <span class="deal-number">CNDS-{{ deal.id.substring(30) }}</span> -->
      </div>
      <vs-divider></vs-divider>
      <div class="deal-info">
        <div class="units">
          <span class="key">UNITS</span>
          <span class="value">{{ unitCount }}</span>
        </div>
        <div class="price">
          <span class="key">DEAL PRICE</span>
          <span class="value">
            {{
            Math.floor(deal.dollarValues).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </span>
        </div>
        <div class="savings">
          <span class="key">SAVINGS</span>
          <span class="value">{{ (this.purchaseDiscount * 100).toFixed(0) }}%</span>
        </div>
      </div>
      <div class="calculations">
        <div class="stripe">
          <span class="key-cap">CAP RATE</span>
          <span class="key-noi">DEAL NOI</span>
          <span class="key-roi">DEAL ROI</span>
          <span class="key-return">TOTAL RETURN</span>
        </div>
        <div class="values">
          <span v-if="capRate > 0">{{ (capRate * 100).toFixed(2) }}%</span>
          <span v-else>N/A</span>
          <span v-if="noi < 1000000 && noi > 0">${{ (noi / 1000).toFixed(0) }}k</span>
          <span v-else-if="noi >= 1000000 && noi > 0">${{ (noi / 1000000).toFixed(2) }}m</span>
          <span v-else>N/A</span>
          <span v-if="totalReturnOnInvestment / bidAmount > 0">
            {{
            ((totalReturnOnInvestment / bidAmount) * 100).toFixed(2)
            }}%
          </span>
          <span v-else>N/A</span>
          <span v-if="totalReturn < 1000000 && totalReturn > 0">
            {{
            (totalReturn / 1000).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}k
          </span>
          <span v-else-if="totalReturn >= 1000000 && totalReturn > 0">
            {{
            (totalReturn / 1000000).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            })
            }}m
          </span>
          <span v-else>N/A</span>
        </div>
      </div>
      <vs-button
        @click="popupActive = true"
        class="request-btn text-white self-center w-full"
        color="dark"
        v-if="
          deal.privacy != 'Public' &&
            !deal.userAccess.includes(this.$store.state.userObject.id) &&
            deal.owner != this.$store.state.userObject.id &&
            this.$store.state.userObject.accessRequests != null &&
            !this.$store.state.userObject.accessRequests.includes(deal.id)
        "
      >Request Access</vs-button>
      <vs-button
        @click="popupActive = true"
        class="request-btn text-white self-center w-full"
        color="grey"
        v-if="
          deal.privacy != 'Public' &&
            !deal.userAccess.includes(this.$store.state.userObject.id) &&
            deal.owner != this.$store.state.userObject.id &&
            this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(deal.id)
        "
      >Access Pending</vs-button>
      <vs-button
        @click="popupActive = true"
        class="request-btn text-white self-center w-full"
        color="success"
        v-if="
          deal.privacy != 'Public' &&
            deal.userAccess.includes(this.$store.state.userObject.id) &&
            this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(deal.id)
        "
      >Access Granted</vs-button>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  createAccessRequest,
  createNotification,
  updateUser,
} from "../../graphql/mutations";
import { listLeads, getUser } from "../../graphql/queries";
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      terms: false,
      hovered: false,
      hover: false,
      title: {},
      link: "",
      titleImage: "",
      totalSF: 0,
      from_now: 0,
      activePrompt: false,
      activePrompt2: false,
      rating: 4.7,
      count: 0,
      displayPDF: false,
      image_count: 0,
      images: [],
      title1: 0,
      favorites: [],
      rent: 1,
      investmentType: 1,
      estRent: 0,
      bidAmount: "",
      discount: "5000$",
      dollarValuesInitial: 0,
      localDollarValues: 0,
      downPayment: 100,
      holdPeriod: 5,
      vacancy: 0,
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
          lazyLoad: "progressive",
        },
        thumbnail: {
          slidesToShow: 5,
        },
      },
      memorandumLink: "",
      docLinks: [],
      interestRate: 0.0325,
      term: 30,
      months: 60,
      moInterestRate: 0.0027,
      totalDebtService: 0,
      moPayment: 0,
      balanceAfter: 0,
      repairs: 0,
      management: 0,
      propertyTax: 0,
      insurance: 0,
      repairsFormatted: 0,
      managementFormatted: 0,
      propertyTaxFormatted: 0,
      insuranceFormatted: 0,
      operatingExpenses: 0,
      perMonthRentUnits: 0,
      projectedAppreciation: 5,
      annualAppreciation: 0,
      marketPrice: 0,
      overrideBid: false,
      manualBid: 0,
      bufferInsurance: 0,
      bufferTax: 0,
      bufferManagement: 0,
      bufferRepairs: 0,
      buildingSF: "",
      totalValueSF: 0,
      personalInvestmentTarget: 0,
      customRent: 0,
      customRentFormatted: 0,
      saleSF: "",
      saleTotal: "",
      lastSale: "",
      insuranceFormBuffer: "",
      propertyTaxFormBuffer: "",
      managementFormBuffer: "",
      repairsFormBuffer: "",
      estRentFormatted: "",
      tradedFor: "",
      moment: "",
      estRentBuffer: 0,
      popupActive: false,
      agree: false,
      privateText: "PRIVATE",
      found: false,
      leadObject: {},
      loaded: false,
      mapUrl: "",
      urlFormed: false,
      seller: {},
    };
  },
  name: "dealCard",
  props: {
    deal: {
      type: Object,
    },
  },
  methods: {
    async getSeller() {
      this.seller = await API.graphql(
        graphqlOperation(getUser, { id: this.deal.owner })
      );
      this.seller = this.seller.data.getUser;
      console.log(this.seller);
    },
    async sendRequest(e) {
      await emailjs
        .sendForm(
          "gmail",
          "access_request",
          e.target,
          "user_praLRxgpKucwmV0r1B3O4"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      this.requestAccess(this.deal.id);
      // this.popupActive = false;
      this.$vs.notify({
        color: "success",
        title: "Access requested",
        text: "Access requested!",
        position: "top-center",
      });
    },
    formUrl() {
      // let buffer_address = this.deal.building.addres;
      let buffer_city = this.deal.building.city;
      let buffer_state = this.deal.building.state;
      // buffer_address = buffer_address.replace(/ /g, "+");
      // buffer_address = buffer_address.replace(/\./g, "");
      buffer_city = buffer_city.replace(/ /g, "+");
      buffer_state = buffer_state.replace(/ /g, "+");
      // let buffer_zip = this.deal.building.zip;
      // buffer_zip = buffer_zip.replace(/ /g, "+");
      // console.log(buffer_address);
      // console.log(buffer_city);
      // console.log(buffer_state);
      this.mapUrl += "https://maps.googleapis.com/maps/api/staticmap?center=";
      this.mapUrl += buffer_city;
      this.mapUrl += ",";
      this.mapUrl += buffer_state;
      this.mapUrl +=
        "&zoom=10&size=650x450&scale=2&key=AIzaSyAnWJGsQaK0z0tQyLPKeuWHifPTmhR8zcI";
      //this.urlFormed = true;
      // console.log("haha");
      // console.log(this.mapUrl);
    },
    async checkLeads() {
      let buffer = await API.graphql(
        graphqlOperation(listLeads, {
          limit: 1000,
          filter: {
            and: [
              { userId: { eq: this.$store.state.userObject.id } },
              { dealId: { eq: this.deal.id } },
            ],
          },
        })
      );
      let leadsArray = [];
      //console.log(buffer);
      if (buffer.data.listLeads.items.length > 0) {
        ////console.log(buffer.data);
        this.found = true;
        leadsArray = buffer.data.listLeads.items;
        //console.log("LOL WHAT :)))")
        ////console.log(this.deal.updatedAt);
        leadsArray.sort(this.dynamicSort("-createdAt"));
        ////console.log(this.leadObject);
        this.leadObject = leadsArray[0];
        ////console.log(this.leadObject);
        ////console.log(leadsArray);
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
        var result = 0;
        if (property != "index")
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
    viewDetails(id) {
      this.$router.push("../deal-details/" + id);
    },
    async requestAccess(id) {
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
      // //console.log(this.$store.state.userObject.firstName);
      let request = {
        user: this.$store.state.userObject.id,
        accessRequestDealId: id,
        user_name: userName,
      };
      let check = await API.graphql(
        graphqlOperation(createAccessRequest, { input: request })
      );
      let updatedUser = {};
      updatedUser.id = this.$store.state.userObject.id;
      updatedUser.accessRequests = this.$store.state.userObject.accessRequests;
      //this.$store.commit("updateUserAccessRequests", id);
      if (updatedUser.accessRequests == null) updatedUser.accessRequests = [];
      updatedUser.accessRequests.push(id);
      await API.graphql(graphqlOperation(updateUser, { input: updatedUser }));
      let notificationInput = {};
      notificationInput.notificationDealId = id;
      notificationInput.notificationSenderId = this.$store.state.userObject.id;
      notificationInput.notificationUserId = this.deal.owner;
      notificationInput.type = 1;
      await API.graphql(
        graphqlOperation(createNotification, { input: notificationInput })
      );
      this.popupActive = false;
      console.log(this.deal);
      this.$emit("accessRequested", this.deal);
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Access request submitted",
      });
    },
    cl() {
      let sf = 0;
      let mp = 0;
      let imageLinks = [];
      let repairsCalc = 0;
      let insuranceCalc = 0;
      let managementCalc = 0;
      let taxCalc = 0;
      this.estRent = this.deal.rentalAssumptions * 12;
      if (this.deal.rentalAssumptions % 1 == 0)
        this.estRentFormatted = this.deal.rentalAssumptions * 1200;
      else this.estRentFormatted = this.deal.rentalAssumptions * 12;
      console.log(this.estRent);
      this.deal.units.items.forEach((item, index) => {
        if (item.unit != undefined) {
          taxCalc += item.unit.propertyTaxSF * item.quantity;
          repairsCalc += item.unit.repairSF * item.quantity;
          insuranceCalc += item.unit.insuranceSF * item.quantity;
          managementCalc += item.unit.managementSF * item.quantity;
          sf = sf + item.unit.squareFootage * item.quantity;
          mp = mp + item.unit.price * item.quantity;
          console.log(mp);
          //console.log(item);
        }
      });
      let dv = this.deal.dollarValues;
      this.dollarValuesInitial = dv.toFixed(2);
      ////console.log(typeof(this.dollarValuesInitial))
      this.localDollarValues = this.deal.dollarValues / 100000;
      this.totalSF = sf;
      this.marketPrice = mp;
      //console.log(mp);
      ////console.log(this.deal.createdDate);
      this.estRent = this.deal.rentalAssumptions * 12;
      if (this.deal.userAccess == null) {
        this.deal.userAccess = [1];
      }
      this.propertyTax = taxCalc;
      this.repairs = repairsCalc;
      this.insurance = insuranceCalc;
      this.management = managementCalc;
      if (this.found == true) {
        //console.log(this.found);
        //console.log("HAHAHAHHAHA WTF");
        //console.log(this.leadObject);
        this.propertyTax = this.leadObject.propertyTax;
        this.repairs = this.leadObject.repairs;
        this.insurance = this.leadObject.insurance;
        this.management = this.leadObject.management;
        //console.log("LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLO")
        this.downPayment = this.leadObject.downPayment;
        this.localDollarValues = this.leadObject.purchasePrice / 100000;
        this.investmentType = this.leadObject.investmentType;
        this.holdPeriod = this.leadObject.holdPeriod;
        //this.overrideBid = this.leadObject.manualBid;
        // //this.manualBid = this.leadObject.offerAmount;
        this.vacancy = this.leadObject.vacancy;
        this.personalInvestmentTarget = this.leadObject.investmentTarget;
        if (this.leadObject.customRent != null && this.investmentType == 1) {
          this.rent = 3;
          this.customRent = this.leadObject.customRent;
          //     //if(this.leadObject.customRent % 1 == 0 || (this.leadObject.customRent * 10) % 1 == 0){
          //    //     this.customRentFormatted = this.leadObject.customRent * 100
          //    // } else this.customRentFormatted = this.leadObject.customRent;
        }
        if (this.leadObject.manualBid == true) {
          this.overrideBid = true;
          this.manualBid = this.leadObject.bidAmount;
          //console.log(this.manualBid);
        }
        console.log(this.leadObject);
      }
      if (this.insurance % 1 == 0 || (this.insurance * 10) % 1 == 0) {
        this.insuranceFormatted = this.insurance * 100;
      } else this.insuranceFormatted = this.insurance;
      if (this.propertyTax % 1 == 0 || (this.propertyTax * 10) % 1 == 0) {
        this.propertyTaxFormatted = this.propertyTax * 100;
      } else this.propertyTaxFormatted = this.propertyTax;
      if (
        this.managementFormatted % 1 == 0 ||
        (this.managementFormatted * 10) % 1 == 0
      ) {
        this.managementFormatted = this.management * 100;
      } else this.managementFormatted = this.management;
      if (
        this.repairsFormatted % 1 == 0 ||
        (this.repairsFormatted * 10) % 1 == 0
      ) {
        this.repairsFormatted = this.repairs * 100;
      } else this.repairsFormatted = this.repairs;
      ////console.log(this.deal);
      ////console.log("I'm deal");
      this.loaded = true;
    },
    follow() {
      this.checkLeads().then(() => {
        this.cl();
        return 0;
      });
      this.cl();
      this.formUrl();
    },
    async addToFavorites(id) {
      let currentFavorites = this.$store.state.userObject;
      if (currentFavorites.favorites == null) currentFavorites.favorites = [];
      let updateFavorites = {
        id: this.$store.state.currentUserID,
        favorites: [...currentFavorites.favorites],
      };
      if (updateFavorites.favorites.includes(id) === false) {
        updateFavorites.favorites.push(id);
        this.$store.commit("updateUserFav", id);
        this.$emit("addToFav", this.deal);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      } else {
        updateFavorites.favorites = updateFavorites.favorites.filter(
          (item) => item !== id
        );
        this.$store.commit("deleteUserFav", id);
        this.$emit("unFav", this.deal);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      }
    },
    findImage() {
      // if (
      //     this.deal.unitNumbers != null &&
      //     this.deal.unitNumbers.items.length > 0
      // ) {
      //     let dealImages = this.deal.unitNumbers.items;
      //     ////console.log(dealImages);
      //     for (let i = 0; i < dealImages.length; i++) {
      //         if (dealImages[i].images.length > 0) {
      //             Storage.get(dealImages[i].images[0]).then(result => {
      //                 this.titleImage = result;
      //                 ////console.log(this.titleImage);
      //             });
      //         }
      //     }
      // }
      if (this.deal.images != null && this.deal.images.length > 0) {
        Storage.get(this.deal.images[0]).then((result) => {
          this.titleImage = result;
          console.log(result);
        });
      } else if (
        this.deal.building.images != null &&
        this.deal.building.images.length > 0
      ) {
        Storage.get(this.deal.building.images[0]).then((result) => {
          this.titleImage = result;
          console.log(result);
        });
      }
    },
    graphValuesNoi() {
      let lineChartNoi = [];
      lineChartNoi[0] = this.noi / 12;
      for (let i = 1; i < this.pMonths; i++) {
        lineChartNoi.push(Math.floor(this.noi / 12 + lineChartNoi[i - 1]));
      }
      this.$emit("noi", lineChartNoi);
      return lineChartNoi;
    },
    graphValuesDiscount() {
      this.$emit("discount", this.deal.discount);
      return this.deal.discount;
    },
    graphValuesAppreciation() {
      let lineChartAppreciation = [];
      for (let i = 0; i < this.pMonths; i++) {
        ////console.log(this.marketPrice);
        lineChartAppreciation.push(
          Math.floor(
            this.marketPrice *
              Math.pow(1 + this.projectedAppreciation / 100, (i + 1) / 12) -
              this.marketPrice
          )
        );
        // //console.log(lineChartAppreciation);
      }
      //////console.log(this.lineChart.appreciation);
      this.$emit("appreciation", lineChartAppreciation);
      return lineChartAppreciation;
    },
  },
  computed: {
    hasAccess() {
      return (
        this.deal.privacy === "Public" ||
        this.deal.userAccess.includes(this.$store.state.userObject.id) ||
        this.deal.owner === this.$store.state.userObject.id
      );
    },
    windowWidth() {
      // console.log(this.$store.state.windowWidth);
      return this.$store.state.windowWidth;
    },
    totalReturn() {
      return this.allAppreciation + this.allCashFlow;
    },
    loanAmount() {
      ////console.log((this.deal.dollarValues - this.bidAmount).toLocaleString("en-US", {style: "currency", currency: "USD"}));
      return (this.deal.dollarValues - this.bidAmount).toFixed(2);
    },
    loanTerm() {
      ////console.log(this.term * 12);
      return this.term * 12;
    },
    pMonths() {
      ////console.log(this.holdPeriod * 12);
      return this.holdPeriod * 12;
    },
    monthlyRate() {
      ////console.log(this.interestRate / 12);
      return this.interestRate / 12;
    },
    debtService() {
      ////console.log(this.loanAmount * ((this.monthlyRate * Math.pow((1 + this.monthlyRate), this.loanTerm)) / ((Math.pow((1 + this.monthlyRate), this.loanTerm) - 1) * this.pMonths)))
      return (
        this.loanAmount *
        ((this.monthlyRate * Math.pow(1 + this.monthlyRate, this.loanTerm)) /
          (Math.pow(1 + this.monthlyRate, this.loanTerm) - 1)) *
        this.pMonths
      );
    },
    monthlyPayment() {
      ////console.log(this.loanAmount * ((this.monthlyRate * (1 + this.monthlyRate) * this.pMonths) / (((1 + this.monthlyRate) * this.pMonths) - 1)));
      return (
        this.loanAmount *
        ((this.monthlyRate * (1 + this.monthlyRate) * this.pMonths) /
          ((1 + this.monthlyRate) * this.pMonths - 1))
      );
    },
    balanceAfterN() {
      ////console.log(this.loanAmount * (Math.pow((1 + this.loanAmount), this.loanTerm) - ((Math.pow((1 + this.monthlyRate), this.pMonths)) / ((Math.pow((1 + this.monthlyRate), this.loanTerm)) - 1))))
      return (
        (this.loanAmount *
          (Math.pow(1 + this.monthlyRate, this.loanTerm) -
            Math.pow(1 + this.monthlyRate, this.pMonths))) /
        (Math.pow(1 + this.monthlyRate, this.loanTerm) - 1)
      );
    },
    mortgage() {
      return this.monthlyPayment * 12;
    },
    totalOperatingExpenses() {
      if (this.investmentType === 1)
        return (
          // this.mortgage +
          this.repairs + this.management + this.propertyTax + this.insurance
        );
      else
        return (
          // this.mortgage +
          this.repairs + this.management + this.propertyTax + this.insurance
        );
    },
    rentalIncome() {
      if (this.rent != 3) {
        if (this.expectedRent != this.deal.rentalAssumptions)
          if (this.investmentType === 1) return this.expectedRent;
          else return 0;
        else {
          if (this.investmentType === 1)
            return this.deal.rentalAssumptions * 12;
          else return 0;
        }
      } else {
        if (this.investmentType === 1) return this.customRentFormatted;
        else return 0;
      }
    },
    noi() {
      // //console.log(this.rentalIncome);
      //  //console.log(this.totalOperatingExpenses);
      console.log(this.rentalIncome);
      console.log(this.totalOperatingExpenses);
      return this.rentalIncome - this.totalOperatingExpenses;
    },
    capRate() {
      let capParent = (this.noi + this.mortgage) / this.deal.dollarValues;
      this.$emit("capRate", capParent);
      return (this.noi + this.mortgage) / this.deal.dollarValues;
    },
    purchaseDiscount() {
      console.log(this.deal.discount / this.marketPrice);
      return this.deal.discount / this.marketPrice;
    },
    moRentUnit() {
      return this.rentalIncome / this.unitCount / 12;
    },
    rentPerSF() {
      ////console.log(this.moRentUnit);
      ////console.log(this.totalSF / (this.unitCount))
      return this.moRentUnit / (this.totalSF / this.unitCount);
    },
    salePerSF() {
      return this.salePrice / this.totalSF;
    },
    purchaseSF() {
      return this.deal.dollarValues / this.totalSF;
    },
    salePrice() {
      return (
        this.marketPrice *
        Math.pow(1 + this.projectedAppreciation / 100, this.holdPeriod)
      );
    },
    futureCapRate() {
      return (this.noi + this.mortgage) / this.salePrice;
    },
    yearCashFlow() {
      return this.noi;
    },
    allCashFlow() {
      return this.noi * this.holdPeriod;
    },
    allAppreciation() {
      return this.salePrice - this.deal.dollarValues;
    },
    yearAppreciation() {
      return this.allAppreciation / this.holdPeriod;
    },
    totalReturnOnInvestment() {
      let returnParent = this.allAppreciation + this.allCashFlow;
      this.$emit("totalReturn", returnParent);
      return this.allAppreciation + this.allCashFlow;
    },
    totalReturnWithPrincipal() {
      return this.totalReturnOnInvestment + this.bidAmount;
    },
    cashInvested() {
      return this.bidAmount;
    },
    gainOnSale() {
      return this.totalReturnOnInvestment;
    },
    yield() {
      return this.gainOnSale / this.cashInvested;
    },
    totalAnnualizedIncome() {
      return (
        Math.pow(
          this.totalReturnOnInvestment / this.bidAmount,
          1 / (this.pMonths / 12)
        ) - 1
      );
    },
    totalReturnIncomeWithoutNoi() {
      return this.rentalIncome * this.holdPeriod;
    },
    totalReturnPercentage() {
      return this.gainOnSale / this.bidAmount;
    },
    totalAnnualizedReturn() {
      return (
        Math.pow(
          this.totalReturnWithPrincipal / this.bidAmount,
          1 / (this.pMonths / 12)
        ) - 1
      );
    },
    expectedRent() {
      if (this.vacancy != 0)
        return this.estRent - this.estRent * (this.vacancy / 100);
      else return this.estRent * 1;
    },
    rentPerSfPerYear() {
      return this.rentalIncome / this.totalSF;
    },
    chartAppreciation() {
      return (
        this.marketPrice *
          Math.pow(1 + this.projectedAppreciation / 100, this.pMonths / 12) -
        this.marketPrice
      );
    },
    unitCount() {
      let counter = 0;
      this.deal.units.items.forEach((unit) => {
        counter += unit.quantity;
      });
      ////console.log(counter);
      return counter;
    },
  },
  watch: {
    loaded: function () {
      if (this.loaded == true) {
        this.graphValuesDiscount();
        this.graphValuesAppreciation();
        this.graphValuesNoi();
      }
    },
    customRent: function () {
      ////console.log(this.customRent);
      let buffer = this.customRent;
      buffer = buffer.replace(/,/g, "");
      buffer = buffer.replace(/\$/g, "");
      buffer = parseFloat(buffer);
      this.customRentFormatted = buffer;
      ////console.log(buffer);
    },
    downPayment: function () {
      this.deal.dollarValues = this.localDollarValues * 100000;
      this.bidAmount = (this.deal.dollarValues * this.downPayment) / 100;
      if (this.downPayment < 20) {
        this.downPayment = 20;
        //this.manualBid = this.deal.dollarValues * (this.downPayment / 100);
      }
      if (this.downPayment > 100) {
        this.downPayment = 100;
      }
    },
    localDollarValues: function () {
      this.deal.dollarValues = this.localDollarValues * 100000;
      this.bidAmount = (this.deal.dollarValues * this.downPayment) / 100;
    },
    overrideBid: function () {
      if (this.overrideBid === true)
        this.manualBid = (this.deal.dollarValues * this.downPayment) / 100;
    },
    manualBid: function () {
      this.deal.dollarValues = this.dollarValuesInitial;
      this.downPayment = (this.manualBid / this.deal.dollarValues) * 100;
      this.bidAmount = this.manualBid;
      if (this.manualBid < this.dollarValuesInitial * 0.2) {
        this.manualBid = this.dollarValuesInitial * 0.2;
      }
      if (
        this.manualBid > this.dollarValuesInitial &&
        this.manualBid < this.dollarValuesInitial * 2
      ) {
        this.localDollarValues = this.manualBid / 100000;
        this.downPayment = 100;
      }
      if (this.manualBid >= this.dollarValuesInitial * 2) {
        this.manualBid = this.dollarValuesInitial * 2;
        this.localDollarValues = (this.dollarValuesInitial * 2) / 100000;
        this.deal.dollarValues = this.dollarValuesInitial * 2;
        this.downPayment = 100;
      }
      this.bidAmount = this.manualBid;
    },
    totalSF: function () {
      this.buildingSF = this.totalSF;
    },
    investmentType: function () {
      if (this.investmentType === 2) this.rent = 1;
    },
    bidAmount: function () {
      this.loanAmount;
      this.loanTerm;
      this.pMonths;
      this.monthlyRate;
      this.debtService;
      this.monthlyPayment;
      this.balanceAfterN;
    },
  },
  beforeMount() {
    this.follow();
    this.findImage();
    this.getSeller();
  },
};
</script>

<style lang="scss">
.deal-card {
  width: 18%;
  margin-left: 1%;
  margin-right: 1%;
  color: #818386;
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 13px -10px #cecece;
  box-shadow: 15px 15px 13px -10px #cecece82;

  @media (max-width: 1710px) {
    width: 23%;
  }
  @media (max-width: 1430px) {
    width: 31%;
  }
  @media (max-width: 1320px) {
    width: 30%;
    margin-left: 2%;
  }
  @media (max-width: 1110px) {
    width: 32%;
    margin-left: 0.5%;
    margin-right: 0.5%;
  }
  @media (max-width: 1050px) {
    width: 40%;
    margin-left: 5%;
    margin-right: 5%;
  }
  @media (max-width: 850px) {
    width: 45%;
    margin-left: 2%;
    margin-right: 3%;
  }
  @media (max-width: 740px) {
    width: 48%;
    margin-left: 1%;
    margin-right: 1%;
  }
  @media (max-width: 645px) {
    width: 70%;
    margin-left: 0;
    margin-right: 0;
  }
  @media (max-width: 480px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    width: 90%;
  }
  @media (max-width: 340px) {
    width: 100%;
  }

  .card-top {
    height: 290px;
    background-size: cover;
    background-position: right;
    // flex-grow: 1;
    .overlay {
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .vs-button {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }

    img {
      width: 100%;
      height: auto;
    }

    .privacy {
      display: inline-block;
      top: 5%;
      left: 4%;
      width: 25%;
      min-width: 80px;
      padding: 3px 7px;
      font-size: 10px;
      color: #ffffff;
      z-index: 1000;
    }

    .private {
      background-color: #2f302f;
    }

    .requested {
      background-color: #8a8a8a;
    }

    .granted {
      background-color: #00a651;
    }
  }

  .card-bottom {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .title {
      width: 93%;
      align-self: center;
      margin-top: 4px;
      margin-bottom: 6px;
      line-height: 1.2;

      span {
        // text-transform: uppercase;
        font-size: 2rem;
        color: #575757;
        font-family: "Khmer MN", Georgia, "Times New Roman", Times, serif;
        line-height: 1;
      }
    }
    .location {
      margin-bottom: 10px;
      // display: flex;
      width: 93%;
      justify-content: space-between;
      align-items: center;
      align-self: center;
      flex-grow: 1;
      .address {
        font-size: 15px;
        line-height: 1.3;
      }
    }
    .deal-number {
      margin-top: 3px;
      display: block;
      margin-bottom: 8px;
      text-transform: uppercase;
      font-size: 12px;
      background: #dfdfdf5c;
      display: inline-block;
      padding: 2px 9px;
      border-radius: 4px;
      margin-bottom: 20px;
      color: #a9a9a9;
    }
    .vs-divider {
      margin: 5px 0;
    }

    .deal-info {
      margin-top: 5px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      justify-content: space-evenly;

      div {
        // width: 17%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        .key {
          font-size: 10px;
        }

        .value {
          font-size: 25px;
          font-weight: 600;
          color: #9b9b9b;
        }
      }

      .price {
        // width: 57%;
      }

      .savings {
        .value {
          color: #00a651;
        }
      }
    }

    .calculations {
      .stripe {
        display: flex;
        justify-content: center;
        background-color: #f3f3f3;
        padding-top: 4px;
        padding-bottom: 2px;

        span {
          font-size: 9px;
          width: 23%;
        }
      }

      .values {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;

        span {
          width: 23%;
          font-size: 17px;
        }
      }
    }
  }
}

// .deal-card {

//     box-shadow: 15px 15px 13px -10px #cecece82;
// }

.deal-card:hover {
  box-shadow: 15px 15px 13px -10px #cecece82;
}

.save {
  position: absolute;
  right: 5%;
  top: 5%;
  z-index: 1;
  color: white;
}

.vs-hidden {
  visibility: hidden;
}

.agree-popup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.agree-popup {
  .vs-popup {
    .vs-popup--content {
      height: auto !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }
  }
}
.request-btn {
  border-radius: 0;
  margin: 0 !important;
}
.terms-text {
  color: #49a25a;
}
.text-semidark {
  color: #808184;
}
.fs-15 {
  font-size: 1.5em;
}
.fw-600 {
  font-weight: 600;
}
</style>
