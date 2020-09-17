<template>
  <vx-card actionable class="card-alignment flex-grow" id="dashboardcard" no-shadow style="">
    <router-link :to="link">
      <div class="flex flex-col items-end justify-between h-full">
        <div class="h-1/3 flex flex-col items-end" style="height: 33%;">
          <span class="">{{from_now}}</span>
          <span class="ml-4 font-bold" v-if="unit.name || unit.nickname">{{unit.status}}</span>
          <span class="ml-4" v-if="unit.city && unit.state">{{unit.city}}, {{unit.state}}</span>
          <span></span>
        </div>
        <div class="card-info-container">
          <h1 class="name" v-if="unit.name">{{ unit.name }}</h1>
          <h1 class="name" v-if="unit.nickname">{{ unit.nickname }}</h1>
          <h1 class="name" v-if="!unit.name && !unit.nickname && unit.title == null">Deal</h1>
          <h1 class="name" v-if="unit.title != null">{{unit.title}}</h1>
          <div class="rates" v-if="unit.nickname">
            <div>10% Cap Rate,</div>
            <div>$100k+ /mo Rental</div>
            <div v-if="unit.price">{{(unit.price/unit.squareFootage).toLocaleString("en-US", {style: "currency",
              currency: "USD"})}}/sf
            </div>
            <div v-else-if="unit.squareFootage">{{unit.squareFootage}}</div>
          </div>
          <div class="rates" v-if="unit.name">
            <div v-if="unit.units.items">{{units()}}</div>
            <div>$100k+ /mo Rental</div>
          </div>
          <div class="rates" v-if="!unit.name && !unit.nickname">
            <div>{{unit.unitNumbers.items.length}} unit deal</div>
            <div v-if="unit.developer">{{unit.developer.name}}</div>
          </div>
        </div>
      </div>
    </router-link>
  </vx-card>
</template>

<script>
    import moment from "moment";

    export default {
        data() {
            return {
                from_now: {},
                moment: {},
                link: "",
            };
        },
        name: "card",
        props: {
            unit: {
                type: Object,
            },
        },
        methods: {
            calculateDiff() {
                this.moment = moment().format("YYYY.M.DD");
                this.moment = this.moment.split(".").map(Number);
                if (this.unit.createdDate != null) {
                    this.unit.createdDate = this.unit.createdDate.split(".").map(Number);
                }
                this.from_now = moment(this.unit.createdDate).diff(moment(this.moment));

                this.from_now = Math.round(-this.from_now / 86400000);
                if (this.from_now == 0) {
                    this.from_now = "Today";
                } else {
                    this.from_now == 1 ? this.from_now = this.from_now + " day ago" : this.from_now = this.from_now + " days ago";
                }
            },
            seeType() {
                if (!this.unit.name && this.unit.nickname) {
                    this.link = "../unit-details/" + this.unit.id;
                } else if (this.unit.name) {
                    this.link = "../building-details/" + this.unit.id;
                } else {
                    this.link = "../deal-details/" + this.unit.id;
                }
                //console.log(this.unit);
            },
            units() {
                let string = "";
                if (this.unit.units.items.length == 1) return "1 unit in this building";
                else {
                    string = string + this.unit.units.items.length + " units in this building";
                    return string;
                }

            }
        },
        beforeMount() {
            this.calculateDiff();
            this.seeType();
        }
    };
</script>

<style lang="scss" scoped>
  #dashboardcard {

    .vx-card {
      border-radius: 15px;
      height: 364px;
      width: 23%;
      background-color: #e6e6e6;
      margin-top: 20px;
      cursor: pointer;
    }

    .vx-card__collapsible-content {
      height: 100%;
    }

    .vx-card__body {
      height: 100%;
    }

    .vx-card .card-info-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 14px;
      color: #707070;
      text-align: end;
    }

    .vx-card a {
      color: #707070;
    }

    .name {
      text-align: end;
      font-size: 31px;
      color: #fbbf81;
      width: 100%;
    }

    .card-alignment {
      margin-right: 1.5%;
      margin-top: 1.5%;
    }

    @media (max-width: 1200px) {
      .vx-card {
        width: 30%;
      }

      .name {
        width: 100%;
      }
    }

    @media (max-width: 800px) {
      .vx-card {
        width: 48%;
      }

      .name {
        width: 80%;
      }
    }

    @media (max-width: 602px) {
      .vx-card {
        width: 100%;
      }

      .name {
        width: 100%;
      }
    }

  }
</style>
