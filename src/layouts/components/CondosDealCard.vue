<template>
  <vx-card class="overlay-card card-alignment overflow-hidden flex-grow" v-if="this.$store.state.userObject.favorites">
    <template slot="no-body">
      <img
        alt="user-profile-cover"
        class="responsive overlay-img"
        src="https://sydneyexpert.com/wp-content/uploads/2019/11/Sydney-street-in-the-Rocks-at-night.jpg"
        v-if="titleImage == ''"
      />
      <img :src="titleImage" alt="user-profile-cover" class="responsive overlay-img" v-else />
      <vs-icon
        :icon="
          this.$store.state.userObject.favorites.includes(deal.id)
            ? 'favorite'
            : 'favorite_border'
        "
        @click.stop="addToFavorites(deal.id)"
        class="save cursor-pointer"
        color="#fbbf81"
        size="medium"
      ></vs-icon>
      <div class="card-overlay text-white h-full flex flex-col justify-center">
        <p
          class="building-status text-center mb-2"
          v-if="deal.building != null"
        >{{ deal.building.status }}</p>
        <h4 class="text-white text-center mb-4 deal-title">{{ deal.title }}</h4>
        <h5
          class="text-white text-center mb-2 unit-count"
          v-if="deal.units != null"
        >{{ unitCount }} Units</h5>
        <h4 class="text-white text-center mb-2 unit-count">
          {{
          deal.dollarValues.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          })
          }}
        </h4>
        <h6
          class="text-white text-center mb-4 unit-count"
        >{{(purchaseDiscount * 100).toFixed(0)}}% Discount / ${{deal.discount / 1000000}}mm Savings</h6>
        <vs-button
          @click="viewDetails(deal.id)"
          class="view-btn text-black self-center mb-2"
          color="#FFFFFF"
        >View Details</vs-button>
        <vs-button
          @click="popupActive = true"
          class="request-btn text-white self-center"
          color="#FFFFFF"
          type="flat"
          v-if="
            deal.privacy != 'Public' &&
              !deal.userAccess.includes(this.$store.state.userObject.id) &&
              deal.owner != this.$store.state.userObject.id &&
              this.$store.state.userObject.accessRequests != null &&
              !this.$store.state.userObject.accessRequests.includes(deal.id)
          "
        >Request Access</vs-button>
        <vs-popup class="agree-popup"  title="Request access" :active.sync="popupActive">
          <p class="mb-4">Thank you for requesting access to the property details. In order to protect the privacy of the seller and to maintain the confidential and private nature of the listing, all potential buyers must complete a Non-Disclosure & Non-Circumvent Agreement prior to receiving access and viewing additional financial and ownership information.
<br><br>
Privacy for sellers is a core feature of the marketplace and deal access is provided on a property by property basis. Please check the box below and we will email you a link to the appropriate document for execution in Docusign.  
</p>
          <vs-checkbox v-model="agree">I agree</vs-checkbox>
          <vs-button :disabled="!agree" @click="requestAccess(deal.id)" color="primary" type="filled">Request Access</vs-button>
        </vs-popup>
      </div>
    </template>
    <template slot="footer">
      <div class="flex justify-around fields">
        <span class="w-2/12 first-margin">CAP RATE</span>
        <span class="w-3/12">PROJ. NOI</span>
        <span class="w-2/12">PROJ. ROI</span>
        <span class="w-3/12">5YR APPR</span>
      </div>
      <div class="flex justify-around values h-full w-full background-white">
        <span class="w-2/12 first-margin" v-if="capRate >= 0">{{ (capRate * 100).toFixed(2) }}%</span>
        <span class="w-2/12 first-margin" v-else>N/A</span>
        <span class="w-3/12" v-if="noi >= 0">${{ (noi / 1000).toFixed(0) }}k/mo</span>
        <span class="w-3/12" v-else>N/A</span>
        <span class="w-2/12" v-if="(totalReturnOnInvestment / bidAmount) >= 0">{{(totalReturnOnInvestment / bidAmount).toFixed(2) * 100}}%</span>
        <span class="w-2/12" v-else>N/A</span>
        <span class="w-3/12" v-if="allAppreciation >= 0">+${{ (allAppreciation / 1000000).toFixed(1) }}m</span>
        <span class="w-3/12" v-else>N/A</span>
      </div>
    </template>
  </vx-card>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  createAccessRequest,
  updateUser,
  createNotification
} from "../../graphql/mutations";

export default {
  data() {
    return {
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
        starHeight: 15
      },
      configCarousel: {
        main: {
          slidesToShow: 1,
          arrows: false,
          fade: true,
          lazyLoad: "progressive"
        },
        thumbnail: {
          slidesToShow: 5
        }
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
      repairs: 6000,
      management: 18000,
      propertyTax: 100000,
      insurance: 9000,
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
    };
  },
  name: "dealCard",
  props: {
    deal: {
      type: Object
    }
  },
  methods: {
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
        user_name: userName
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
      this.$vs.notify({
        color: "success",
        title: "Access Requested",
        text: "You have succesfully requested access"
      });
      let notificationInput = {};
      notificationInput.notificationDealId = id;
      notificationInput.notificationSenderId = this.$store.state.userObject.id;
      notificationInput.notificationUserId = this.deal.owner;
      notificationInput.type = 1;
      await API.graphql(
        graphqlOperation(createNotification, { input: notificationInput })
      );
        this.popupActive = false;
    },
    cl() {
      let sf = 0;
      let mp = 0;
      let imageLinks = [];
      this.insuranceFormatted = this.insurance * 100;
      this.propertyTaxFormatted = this.propertyTax * 100;
      this.managementFormatted = this.management * 100;
      this.repairsFormatted = this.repairs * 100;
      this.estRent = this.deal.rentalAssumptions * 12;
      if (this.deal.rentalAssumptions % 1 == 0)
        this.estRentFormatted = this.deal.rentalAssumptions * 1200;
      else this.estRentFormatted = this.deal.rentalAssumptions * 12;
      this.deal.units.items.forEach((item, index) => {
          if(item.unit != undefined){
        sf = sf + (item.unit.squareFootage * item.quantity);
        mp = mp + (item.unit.price * item.quantity);
        //console.log(mp);
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
      ////console.log(this.deal);
      ////console.log("I'm deal");
    },
    async addToFavorites(id) {
      let currentFavorites = this.$store.state.userObject;
      if (currentFavorites.favorites == null) currentFavorites.favorites = [];
      let updateFavorites = {
        id: this.$store.state.currentUserID,
        favorites: [...currentFavorites.favorites]
      };
      if (updateFavorites.favorites.includes(id) === false) {
        updateFavorites.favorites.push(id);
        this.$store.commit("updateUserFav", id);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      } else {
        updateFavorites.favorites = updateFavorites.favorites.filter(
          item => item !== id
        );
        this.$store.commit("deleteUserFav", id);
        this.$emit("unFav");
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
      }
    },
    findImage() {
      if (
        this.deal.unitNumbers != null &&
        this.deal.unitNumbers.items.length > 0
      ) {
        let dealImages = this.deal.unitNumbers.items;
        ////console.log(dealImages);
        for (let i = 0; i < dealImages.length; i++) {
          if (dealImages[i].images.length > 0) {
            Storage.get(dealImages[i].images[0]).then(result => {
              this.titleImage = result;
              ////console.log(this.titleImage);
            });
          }
        }
      }
    },
      graphValuesNoi() {
        let lineChartNoi = [];
          lineChartNoi[0] = this.noi / 12;
          for(let i=1;i<this.pMonths;i++){
              lineChartNoi.push(Math.floor((this.noi / 12) + lineChartNoi[i-1]));
          }
          this.$emit('noi',lineChartNoi);
          return lineChartNoi;
      },
      graphValuesDiscount() {
        this.$emit('discount',this.deal.discount);
          return this.deal.discount;
      },
      graphValuesAppreciation() {
          let lineChartAppreciation = [];
          for(let i=0;i<this.pMonths;i++){
              ////console.log(this.marketPrice);
              lineChartAppreciation.push(Math.floor((this.marketPrice * (Math.pow((1+ (this.projectedAppreciation / 100)), ((i+1) / 12)))) - this.marketPrice))
             // //console.log(lineChartAppreciation);
          }
          //////console.log(this.lineChart.appreciation);
          this.$emit('appreciation',lineChartAppreciation);
          return lineChartAppreciation;
      }
  },
  computed: {
      totalReturn() {
          return (
              this.deal.dollarValues *
              Math.pow(1 + this.projectedAppreciation / 100, this.holdPeriod).toFixed(
                  2
              )
          ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
          });
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
                  this.mortgage +
                  this.repairs +
                  this.management +
                  this.propertyTax +
                  this.insurance
              );
          else
              return (
                  this.mortgage +
                  this.repairs +
                  this.management +
                  this.propertyTax +
                  this.insurance
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
              if (this.investmentType === 1) return this.customRentFormatted * 12;
              else return 0;
          }
      },
      noi() {
         // //console.log(this.rentalIncome);
        //  //console.log(this.totalOperatingExpenses);
          return this.rentalIncome - this.totalOperatingExpenses;
      },
      capRate() {
          let capParent = (this.noi + this.mortgage) / this.deal.dollarValues
          this.$emit('capRate', capParent)
          return (this.noi + this.mortgage) / this.deal.dollarValues;
      },
      purchaseDiscount() {
          return this.deal.discount / this.marketPrice;
      },
      moRentUnit() {
          return this.rentalIncome / (this.unitCount) / 12;
      },
      rentPerSF() {
          ////console.log(this.moRentUnit);
          ////console.log(this.totalSF / (this.unitCount))
          return (
              this.moRentUnit / (this.totalSF / (this.unitCount))
          );
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
          this.$emit('totalReturn', returnParent);
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
          return (this.marketPrice * (Math.pow((1+ (this.projectedAppreciation / 100)), (this.pMonths / 12)))) - this.marketPrice;
      },
      unitCount() {
          let counter = 0;
          this.deal.units.items.forEach( (unit) => {
              counter += unit.quantity;
          })
          ////console.log(counter);
          return counter;
      }
  },
  watch: {
    customRent: function() {
      ////console.log(this.customRent);
      let buffer = this.customRent;
      buffer = buffer.replace(/,/g, "");
      buffer = buffer.replace(/\$/g, "");
      buffer = parseFloat(buffer);
      this.customRentFormatted = buffer;
      ////console.log(buffer);
    },
    downPayment: function() {
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
    localDollarValues: function() {
      this.deal.dollarValues = this.localDollarValues * 100000;
      this.bidAmount = (this.deal.dollarValues * this.downPayment) / 100;
    },
    overrideBid: function() {
      if (this.overrideBid === true)
        this.manualBid = (this.deal.dollarValues * this.downPayment) / 100;
    },
    manualBid: function() {
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
    totalSF: function() {
      this.buildingSF = this.totalSF;
    },
    investmentType: function() {
      if (this.investmentType === 2) this.rent = 1;
    },
    bidAmount: function() {
      this.loanAmount;
      this.loanTerm;
      this.pMonths;
      this.monthlyRate;
      this.debtService;
      this.monthlyPayment;
      this.balanceAfterN;
    }
  },
  beforeMount() {
    this.cl();
    this.findImage();
  },
    beforeUpdate() {
        this.graphValuesDiscount();
        this.graphValuesAppreciation();
        this.graphValuesNoi();
    }
};
</script>

<style>
.vx-card {
  border-radius: 15px;
  height: 430px !important;
  width: 330px !important;
  background-color: #e6e6e6;
  margin-top: 20px;
  max-width: 330px;
}

.overlay-img {
  width: auto;
  height: 386px;
}

.deal-title {
  text-transform: uppercase;
  width: 55%;
  align-self: center;
}

.building-status {
  font-size: 12px;
}

.view-btn {
  width: 166px;
}

.request-btn {
  width: 166px;
}

.card-overlay {
  height: 386px !important;
}

.fields {
  font-size: 10px;
}

.vx-card__footer {
  background: white;
}

.fields {
  background: #f5f5f5;
  width: 330px !important;
  margin-left: -21px;
}

.values {
  width: 330px !important;
  margin-left: -21px;
}

.first-margin {
  margin-left: 20px;
}

.card-alignment {
  margin-right: 1.5%;
  margin-top: 1.5%;
}

@media (max-width: 1200px) {
  .vx-card {
    width: 30%;
  }
}

@media (max-width: 1000px) {
  .vx-card {
    width: 48%;
  }
}

@media (max-width: 602px) {
  .vx-card {
    width: 100%;
    max-width: unset;
  }
}

.save {
  position: absolute;
  right: 2%;
  top: 2%;
  z-index: 1;
}

.agree-popup{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.con-vs-popup .vs-popup--content{
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
