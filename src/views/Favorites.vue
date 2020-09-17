<template>
  <div>
    <!--<img src="https://maps.googleapis.com/maps/api/staticmap?center=12+Main+St,NY,NY&zoom=14&size=400x400&key=AIzaSyAnWJGsQaK0z0tQyLPKeuWHifPTmhR8zcI" :key="activePeriod">-->
    <div class="chart-section" v-if="deals.length > 0">
      <div class="chart-left">
        <div class="chart-header">
          <div class="chart-tabs">
            <span>All</span>
            <span>Favorites</span>
            <span>My Deals</span>
          </div>
          <div class="chart-appreciation-switch">
            <div class="appreciation-text-wrapper">
              <span class="appreciation-text">{{activePeriod}} Year Appreciation</span>
            </div>
            <div class="buttons">
              <vs-button
                @click="activePeriod = 5"
                :color="activePeriod == 5 ? '#616161' : '#d7d7d7'"
                :text-color="activePeriod == 5 ? '#ffffff' : '#666666' "
              >5 Yrs</vs-button>
              <vs-button
                @click="activePeriod = 10"
                :color="activePeriod == 10 ? '#616161' : '#d7d7d7'"
                :text-color="activePeriod == 10 ? '#ffffff' : '#666666' "
              >10 Yrs</vs-button>
              <vs-button
                @click="activePeriod = 20"
                :color="activePeriod == 20 ? '#616161' : '#d7d7d7'"
                :text-color="activePeriod == 20 ? '#ffffff' : '#666666' "
              >20 Yrs</vs-button>
              <vs-button
                @click="activePeriod = 30"
                :color="activePeriod == 30 ? '#616161' : '#d7d7d7'"
                :text-color="activePeriod == 30 ? '#ffffff' : '#666666' "
              >30 Yrs</vs-button>
            </div>
          </div>
          <div class="chart-return-distribution">
            <span>Return Distribution</span>
          </div>
        </div>
        <div class="chart-calculations" :key="counter">
          <div class="values">
            <div class="key-value">
              <span class="key">TOTAL SQ. FT.</span>
              <span class="value">32,000</span>
            </div>
            <div class="key-value">
              <span class="key">#OF UNITS</span>
              <span class="value">12</span>
            </div>
            <div class="key-value">
              <span class="key">MARKET PRICE</span>
              <span class="value">$2,775,000</span>
            </div>
            <div class="key-value">
              <span class="key">MARKET PRICE (SQ. FT.)</span>
              <span class="value">$800/sq.ft.</span>
            </div>
            <div class="key-value">
              <span class="key">DEAL PRICE</span>
              <span class="value">$1,775,000</span>
            </div>
            <div class="key-value">
              <span class="key">DEAL PRICE (SQ. FT.)</span>
              <span class="value">$700/sq.ft.</span>
            </div>
            <vs-divider></vs-divider>
            <div class="key-value">
              <span class="key">5 YR SELLING PRICE</span>
              <span class="value">$4,070,830</span>
            </div>
            <div class="key-value">
              <span class="key">5 YR SELLING PRICE</span>
              <span class="value">$1,200/sq.ft.</span>
            </div>
          </div>
          <div class="line-chart flex items-center justify-center">
            <stacked-chart :chartdata="lineData" :options="optionsLines" class="h-full w-full"></stacked-chart>
          </div>
          <div class="doughnut-chart flex items-center justify-center">
            <doughnut-chart :chartdata="chartDataAll" :options="options" class="w-full"></doughnut-chart>
          </div>
        </div>
      </div>
      <div class="chart-right">
        <div class="right-header">
          <span>Investment Returns</span>
        </div>
        <div class="values">
          <div class="key-value border-left border-left-yellow">
            <span class="key">PRICE DISCOUNT TO MARKET</span>
            <span class="value">$1,500,000</span>
          </div>
          <div class="key-value border-left border-left-blue">
            <span class="key">5 YR APPRECIATION FROM MARKET</span>
            <span class="value">$1,795,830</span>
          </div>
          <div class="key-value border-left border-left-green">
            <span class="key">5 YR RENTAL CASHFLOW (NOI)</span>
            <span class="value">$775,000</span>
          </div>
          <vs-divider></vs-divider>
          <div class="key-value">
            <span class="key">TOTAL RETURN</span>
            <span class="value">$4,070,830</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex sort w-full justify-between lg:justify-between items-center mt-4 md:mt-0 w-full flex-wrap"
    >
      <span class="section-header self-start">My Favorites</span>
      <div class="sort-options" v-if="deals.length > 0">
        <span>Sort by</span>
        <v-select
          :clearable="false"
          :options="['Alphabetical', 'Price', 'Most Recent', 'Cap Rate', 'Total Return']"
          class="border-0 sort-select ml-2 w-9/12"
          placeholder="Alphabetical"
          v-model="sort"
        ></v-select>
      </div>
    </div>
    <div class="flex flex-wrap cards" v-if="deals.length > 0">
      <deal-card-new
        :deal="item"
        :key="item.id"
        @appreciation="addAppreciation(index, ...arguments)"
        @capRate="addCapRate(index, ...arguments)"
        @discount="addDiscount(index, ...arguments)"
        @noi="addNoi(index, ...arguments)"
        @totalReturn="addTotalReturn(index, ...arguments)"
        @unFav="remove(index)"
        v-for="(item,index) in deals"
      ></deal-card-new>
    </div>
    <div class="flex w-full justify-center items-center mt-8" v-else>
      <span class="no_records">
        No favorites added. Please click the heart icon on a deal to add it to your favorites list.
        <router-link :to="'deals'" class="link-to">Click here to view all deals</router-link>
      </span>
    </div>
    <!--    <div :key="counter" class="flex flex-wrap justify-between mt-8" v-if="counter != 0">-->

    <!--      &lt;!&ndash;      <doughnut-chart :chartdata="chartData"&ndash;&gt;-->
    <!--      &lt;!&ndash;                      :options="options" class="w-full lg:w-5/12" ></doughnut-chart>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <doughnut-chart :chartdata="chartDataBaths"&ndash;&gt;-->
    <!--      &lt;!&ndash;                      :options="options" class="w-full lg:w-5/12"></doughnut-chart>&ndash;&gt;-->
    <!--    </div>-->
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
  background-color: #ffffff !important;
}

body {
  background-color: #ffffff !important;
}

.content-wrapper {
  background-color: #f6f6f6;
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
  margin-left: 1%;
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

.chart-section {
  width: 100%;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  box-shadow:15px 15px 13px -10px #cecece82;
  @media (max-width: 1260px) {
    flex-direction: column;
  }
  .chart-left {
    width: 80%;
    background-color: #fff;
    padding: 15px;
    display: flex;
        padding-left: 30px;
        padding-top:26px;
    flex-direction: column;
    @media (max-width: 1260px) {
      width: 100%;
    }

    .chart-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      flex-wrap: wrap;
      .chart-tabs {
        width: 30%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        @media (max-width: 1024px) {
          width: 40%;
        }
        @media (max-width: 700px) {
          width: 100%;
        }
        @media (max-width: 400px) {
          justify-content: space-around;
          margin-bottom: 10px;
        }
        span {
          margin-right: 5%;
          font-size: 22px;
          color: #767676;
          font-family: 'Khmer MN',Georgia, 'Times New Roman', Times, serif;
          @media (max-width: 1370px) {
            font-size: 18px;
          }
          @media (max-width: 400px) {
            margin-right: 0;
          }
        }
      }

      .chart-appreciation-switch {
        width: 40%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 1024px) {
          width: 60%;
        }
        @media (max-width: 700px) {
          width: 100%;
        }
        @media (max-width: 400px) {
          flex-wrap: wrap;
        }

        button {
              padding: 3px 3px !important;
              margin:0 !important;
              margin-left:1px !important;
              font-size: 0.8rem !important;
    text-transform: uppercase !important;
    border-radius:3px !important;


        }

      }
      @media (max-width: 400px) {
        .appreciation-text-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .appreciation-text {
        font-size: 22px;
        color: #767676;
        font-family: 'Khmer MN',Georgia, 'Times New Roman', Times, serif;
        @media (max-width: 1370px) {
          font-size: 18px;
        }

        @media (max-width: 550px) {
          font-size: 13px;
        }
      }
      .chart-return-distribution {
        width: 30%;
        // display: flex;
        // align-items: center;
        text-align: center;
        @media (max-width: 1024px) {
          display: none;
          width: unset;
        }
        span {
          font-size: 22px;
          color: #767676;
          font-family: 'Khmer MN',Georgia, 'Times New Roman', Times, serif;
          @media (max-width: 1370px) {
            font-size: 18px;
          }
        }
      }
      div {
        .vs-button {
          margin-left: 10px;
        }
      }
      .buttons {
        @media (max-width: 1790px) {
          display: flex;
          // flex-wrap: wrap;
          justify-content: flex-end;
          width: 50%;
          .vs-button {
            width: 40%;
            margin: 5px;
          }
          .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
            padding: 0.75rem 1rem;
          }
        }
        @media (max-width: 550px) {
          width: 60%;
        }
        @media (max-width: 400px) {
          width: 100%;
          justify-content: space-around;
        }
      }
    }

    .chart-calculations {
      width: 100%;
      display: flex;
      justify-content: space-between;
      // flex-wrap: wrap;
      flex-grow: 1;
      .values {
        width: 30%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        // align-items: space-around;
        margin-right:15px;
        @media (max-width: 1024px) {
          width: 40%;
        }
        @media (max-width: 700px) {
          width: 100%;
        }
        .vs-divider {
          margin: 7px 0;
        }
        .key-value {
          width: 45%;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          margin-top: 5px;
          margin-bottom: 0px;

          .key {
            color: #767676;
            font-size: 11px;
          }
          .value {
            color: #767676;
            font-size: 20px;
            font-family: Helvetica Neue;
            font-weight: bold;
          }
        }
      }

      .line-chart {
        width: 40%;
        max-height:240px;
        @media (max-width: 1024px) {
          width: 60%;
        }
        @media (max-width: 700px) {
          width: 100%;
        }
      }

      #line-chart {
    width: 100%;
}

      .doughnut-chart {
        width: 30%;
        max-height:200px;
        @media (max-width: 1024px) {
          width: 100%;
          padding: 0 15% 0 15%;
          // margin: 20px 0 20px 0;
        }
      }

      #doughnut-chart {
        height:200px !important;
      }
    }
  }

  .chart-right {
    padding: 15px;
    padding-top:26px;
    width: 20%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    @media (max-width: 1260px) {
      width: 100%;
    }
    .right-header {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      span {
        font-size: 22px;
        color: #767676;
        font-family: 'Khmer MN',Georgia, 'Times New Roman', Times, serif;
        @media (max-width: 1370px) {
          font-size: 18px;
        }
      }
    }
    .values {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: normal;
      flex-grow: 1;
      height: 100%;
      .border-left {
        position: relative;
        padding-left: 12px;
      }
      .border-left::before {
        content: "";
        position: absolute;
        height: 85%;
        width: 2px;
        border: 1px solid #000;
        background: #000;
        border-radius: 12px;
        left: 0;
      }

      .border-left-yellow::before {
        border: 1px solid #006f35;
        background: #006f35;
      }
      .border-left-blue:before {
        border: 1px solid #23c56c;
        background: #23c56c;
      }
      .border-left-green:before {
        border: 1px solid #8dff8d;
        background: #8dff8d;
      }
      .key-value {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 7px;
        @media (max-width: 1260px) {
          width: 25%;
        }
        @media (max-width: 1024px) {
          width: 45%;
          margin-bottom: 15px;
        }
        @media (max-width: 768px) {
          width: 100%;
          margin-bottom: 7px;
        }
        .key {
          color: #767676;
          font-family: Helvetica Neue;
          font-size: 11px;
        }
        .value {
          color: #767676;
          font-size: 23px;
          font-family: Helvetica Neue;
          font-weight: bold;
        }
      }
      .key-value:nth-child(5n) {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: auto;
        // margin-bottom: 45px;
        @media (max-width: 1260px) {
          margin-bottom: 0;
        }
        .key {
          color: #767676;
          font-family: Helvetica Neue;
          font-size: 12px;
        }
        .value {
          color: #767676;
          font-size: 26px;
          font-family: Helvetica Neue;
          font-weight: bold;
        }
      }
    }
  }
}
@media (max-width: 645px) {
  .cards {
    justify-content: center;
  }
}
</style>

<script>
import DealCardNew from "../layouts/components/DealCardNew.vue";
import { getDealGraph } from "../graphql/custom-queries";
import { API, graphqlOperation } from "aws-amplify";
import vSelect from "vue-select";
import DoughnutChart from "../layouts/components/DoughnutChart.vue";
import StackedChart from "../layouts/components/StackedChart.vue";

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      favorites: [1, 2, 3, 4],
      myDeals: [1, 2, 3, 4],
      collapseDeals: true,
      activeItem: true,
      collapseFav: true,
      activeSort: 1,
      deals: [],
      buildingName: "Sunny Hills",
      myBuildings: "Boulevard Royale",
      favBuilding: "Downtown Brickell",
      sort: "Alphabetical",
      discount: 0,
      noiArray: [],
      appreciationArray: [],
      labelsArray: [],
      discountArray: [],
      loaded: 0,
      counter: 0,
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
        },
      },
      optionsLines: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += tooltipItem.yLabel.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
              return label;
            },
          },
        },
        responsive: true,

        maintainAspectRatio: false,
        // Can't just just `stacked: true` like the docs say
        scales: {
          yAxes: [
            {
              stacked: true,
            },
          ],
          xAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 60,
              },
            },
          ],
        },
        animation: {
          duration: 750,
        },
      },
      lineData: {
        datasets: [
          {
            label: "Discount",
            fill: true,
            borderCapStyle: "round",
            data: 1,
            backgroundColor: "#006f35",
          },
          {
            label: "Appreciation",
            fill: true,
            borderCapStyle: "round",
            data: 1,
            backgroundColor: "#23c56c",
          },
          {
            label: "NOI",
            fill: true,
            borderCapStyle: "round",
            data: 1,

            backgroundColor: "#8dff8d",
          },
        ],
        labels: ["1", "2", "NOI"],
      },
      chartDataAll: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#006f35", "#23c56c", "#8dff8d"],
          },
        ],
        labels: ["Discount", "Appreciation", "NOI"],
      },
      activePeriod: 5,
    };
  },
  methods: {
    getFavorites() {
      //console.log(this.options.tooltips.callbacks)
      let dealIDS = [];
      this.$store.state.userObject.favorites.forEach(async function (
        item,
        index
      ) {
        //console.log("LOLOLO");
        let dealObject = await API.graphql(
          graphqlOperation(getDealGraph, { id: item })
        );
        if (
          dealObject.data.getDeal != null &&
          dealObject.data.getDeal.privacy != "Hidden"
        )
          dealIDS.push(dealObject.data.getDeal);
      });
      this.deals = dealIDS;
      //console.log(this.deals);
      this.loaded = this.loaded + 1;
      //setTimeout(this.graphCalc, 2000)
      this.noiArray = new Array(60);
      this.appreciationArray = new Array(60);
      this.noiArray.fill(0);
      this.appreciationArray.fill(0);
      this.labelsArray = new Array(60);
      this.discountArray = new Array(60);
      for (let i = 0; i < 60; i++) {
        this.labelsArray[i] = i + 1;
      }
      this.lineData.labels = this.labelsArray;
    },
    randomColor() {
      return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    },
    graphCalc() {
      // if(this.deals.length > 0){
      // let buffer = this.deals;
      // console.log(buffer);
      // this.deals.forEach((deal) => {
      //     deal.units.items.forEach((item) => {
      //         console.log(item.unit.bed);
      //         if(item.unit.bed <= 100 && item.unit.bath <= 100)
      //         this.chartData.labels[item.unit.bed - 1] = item.unit.bed + 'bd';
      //         this.chartDataBaths.labels[item.unit.bath - 1] = item.unit.bath + 'bth';
      //             this.chartData.datasets[0].data[item.unit.bed - 1] += 1 * item.quantity;
      //             this.chartData.datasets[0].backgroundColor[item.unit.bed - 1] = this.randomColor();
      //             this.chartDataBaths.datasets[0].data[item.unit.bath - 1] += 1 * item.quantity;
      //             this.chartDataBaths.datasets[0].backgroundColor[item.unit.bed - 1] = this.randomColor();
      //
      //         }
      //     })
      // })
      // }
    },
    remove(index) {
      this.deals.splice(index, 1);
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
    addNoi(index, value) {
      this.deals[index].noi = value;
      console.log(value);
      this.noiArray = this.noiArray.map((a, i) => a + value[i]);

      this.lineData.datasets[2].data = this.noiArray;
      this.chartDataAll.datasets[0].data[2] = this.noiArray[59];
      //console.log(this.noiArray);
      //console.log(this.noiArray);
    },

    addDiscount(index, value) {
      this.deals[index].discount = value;

      this.discount += value;
      this.discountArray.fill(this.discount);
      this.lineData.datasets[0].data = this.discountArray;
      this.chartDataAll.datasets[0].data[0] = this.discount;
      //console.log(this.discount)
    },

    addAppreciation(index, value) {
      //console.log(this.appreciationArray);
      this.deals[index].appreciation = value;
      this.appreciationArray = this.appreciationArray.map(
        (a, i) => a + value[i]
      );
      this.lineData.datasets[1].data = this.appreciationArray;
      this.chartDataAll.datasets[0].data[1] = this.appreciationArray[59];
      this.counter++;
      console.log(this.counter);
      //console.log(this.counter);
      //console.log(this.appreciationArray);
    },
    sortAlphabetical() {
      this.deals.sort(this.dynamicSort("title"));
    },
    sortPrice() {
      this.deals.sort(this.dynamicSort("dollarValues"));
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
  components: {
    DealCardNew,
    vSelect,
    DoughnutChart,
    StackedChart,
  },
  created() {
    this.getFavorites();

    this.graphCalc();
  },
};
</script>
