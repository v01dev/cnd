<template>
  <div>
    <div class="flex flex-wrap justify-between w-full">
      <div class="flex tab-nav">
        <router-link to="./dashboard">Units</router-link>
        <router-link to="./dashboard">Buildings</router-link>
        <router-link to="developers">Developers</router-link>
        <router-link class="last" to="cities">Cities</router-link>
      </div>
      <div class="flex sort justify-end lg:justify-between mt-4 md:mt-0">
        <span>Sort by</span>
        <span @click="activeSort=2" class="font-bold cursor-pointer" v-show="activeSort==1">Most Savings</span>
        <span @click="activeSort=3" class="font-bold cursor-pointer" v-show="activeSort==2">Most Recent</span>
        <span @click="activeSort=1" class="font-bold cursor-pointer" v-show="activeSort==3">Rating</span>
      </div>
    </div>
    <div class="w-full flex flex-col items-center mt-20 desc">
      <span class="font-bold">New Construction</span>
      <h1 class="text-center">Downtown Brickell Condos</h1>
      <span class="font-light">10% Cap Rate, $100k+ /mo Rental</span>
    </div>
    <div class="date mt-20">
      <span>Published 2 days ago</span>
    </div>
    <div class="flex flex-wrap justify-between">
      <condos-card-big></condos-card-big>
      <condos-card :buildingName="item.name" :key="item.name" v-for="item in items"></condos-card>
      <condos-card-big class="w-full"></condos-card-big>
    </div>
    <div class="mt-10 media">
      <div class="categories">
        <span @click="all=true, photos=false, videos=false" class="cursor-pointer"
              v-bind:class="{active: all}">ALL </span>
        <span>|</span>
        <span @click="all=false, photos=true, videos=false" class="cursor-pointer" v-bind:class="{active: photos}"> PHOTOS </span>
        <span>|</span>
        <span @click="all=false, photos=false, videos=true" class="cursor-pointer" v-bind:class="{active: videos}"> VIDEOS</span>
      </div>
    </div>
    <div class="date mt-10">
      <h1>Units Avaliable</h1>
    </div>
    <div class="mt-10 flex flex-wrap justify-between units-avaliable">
      <condos-card :buildingName="unit.name" :key="unit.name" style="height: 262px;" v-for="unit in units"
                   сlass=""></condos-card>
    </div>
    <div class="mt-20 actions">
      <div>
        <router-link to="">
      <span>
        Schedule A Video Call
      </span>
        </router-link>
      </div>
      <div class="reserve">
        <router-link to="">
      <span class="p-6">
        Reserve Units
      </span>
        </router-link>
      </div>
      <div class="purchase">
        <router-link to="">
      <span>
        Start Purchase
      </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import CondosCard from "../layouts/components/CondosCard.vue";
    import CondosCardBig from "../layouts/components/CondosCardBig.vue";
    import {API, graphqlOperation} from "aws-amplify";
    import {getBuilding} from "../graphql/queries";

    export default {
        data() {
            return {
                activeSort: 1,
                items: [{"name": "Downtown Brickell"}, {"name": "Downtown Brickell"}],
                all: true,
                photos: false,
                videos: false,
                building: {},
                getCurrentRoute: {
                    id: this.$route.params.id
                },
                units: [{"name": "Condo #1"}, {"name": "Condo #2"}, {"name": "Condo #3"}, {"name": "Condo #4"}, {"name": "Condo #5"}, {"name": "Condo #5"}, {"name": "Condo #7"}, {"name": "Condo #8"}]
            };
        },
        components: {
            CondosCard, CondosCardBig,
        },
        methods: {
            async getBuilding() {
                ////console.log(this.getCurrentRoute);
                this.building = await API.graphql(graphqlOperation(getBuilding, {id: this.getCurrentRoute.id}));
                ////console.log(this.building);
            }
        },
        watch: {
            "$media"() {
                this.all = this.all;
                this.photos = this.photos;
                this.videos = this.videos;
            }
        },
        mounted() {
            this.getBuilding();
        }
    };
</script>

<style lang="scss">
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

  .tab-nav .last {
    margin-right: 0;
  }

  @media(max-width: 600px) {
    .tab-nav a {
      margin-right: 1.5rem;
    }
  }

  @media(max-width: 767px) {
    .sort {
      width: 100%;
    }
  }

  .desc {
    h1 {
      font-size: 45px;
      width: 30%;
    }

    span {
      font-size: 17px;
    }
  }

  .media {
    height: 70vh;
    background-color: #E6E6E6;
    font-size: 35px;
    padding: 2rem;
    border-radius: 15px;
    margin-right: 1.5%;
  }

  .media .active {
    color: #fbbf88;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .actions div {
    font-size: 25px;
    margin: 2rem;
    color: #707070;
    text-align: center;
  }

  .actions a {
    color: #707070;
  }

  .actions .reserve a {
    color: #FFFFFF;
  }

  .reserve {
    padding: 0.8rem;
    background-color: #fbbf88;
    border-radius: 12px;
  }

  .actions {
    margin-right: 5rem;
  }

  .units-avaliable .vx-card {
    margin-top: 0;
    margin-bottom: 1.5%;
  }

  @media(max-width: 1200px) {
    .actions div {
      font-size: 20px;
    }
    .desc h1 {
      width: 37%;
    }
  }

  @media(max-width: 1024px) {
    .desc {
      h1 {
        width: 45%;
      }
    }
    .actions div {
      margin: 1rem;
    }
    .actions {
      margin-right: 3rem;
    }
  }

  @media(max-width: 854px) {
    .desc {
      h1 {
        width: 55%;
      }
    }
  }

  @media(max-width: 768px) {
    .desc {
      h1 {
        width: 60%;
      }
    }
    .media {
      font-size: 30px;
    }
    .actions {
      flex-direction: column;
      margin: 0;
    }
    .purchase {

    }
  }

  @media(max-width: 680px) {
    .desc {
      h1 {
        width: 70%;
      }
    }
    .media {
      font-size: 25px;
    }
  }

  @media(max-width: 500px) {
    .desc {
      h1 {
        width: 100%;
        font-size: 35px;
      }
    }
    .media {
      font-size: 20px;
    }
  }
</style>
