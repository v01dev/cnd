<template>
  <vx-card class="overlay-card card-alignment overflow-hidden flex-grow">
    <template slot="no-body">
      <img
        alt="user-profile-cover"
        class="responsive overlay-img"
        src="https://sydneyexpert.com/wp-content/uploads/2019/11/Sydney-street-in-the-Rocks-at-night.jpg"
        v-if="titleImage == ''"
      />
      <img :src="titleImage" alt="user-profile-cover" class="responsive overlay-img" v-else />
      <div class="card-overlay text-white h-full flex flex-col justify-center">
        <p class="building-status text-center mb-2" v-if="unit.status != null">{{ unit.status }}</p>
        <h4 class="text-white text-center mb-4 deal-title">{{ unit.nickname }}</h4>
        <h5
          class="text-white text-center mb-2 unit-count"
        >{{ unit.bed }} Beds / {{ unit.bath }} Baths</h5>
        <h4 class="text-white text-center mb-2 unit-count">
          {{
          unit.rentalAssumptions.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          })
          }}
          RENT PER MONTH
        </h4>
        <h6 class="text-white text-center mb-4 unit-count">
          {{
          unit.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          })
          }}
          MARKET PRICE
        </h6>
        <vs-button
          @click="viewDetails(unit.id)"
          class="view-btn text-black self-center mb-2"
          color="#FFFFFF"
        >View Details</vs-button>
      </div>
    </template>
  </vx-card>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";

export default {
  data() {
    return {
      titleImage: ""
    };
  },
  name: "unitCard",
  props: {
    unit: {
      type: Object
    }
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
        let imageKey = this.unit.images[1];
        Storage.get(imageKey).then(result => {
          this.titleImage = result;
        });
      }
    }
  },
  beforeMount() {
    this.findImage();
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
  z-index: 1000;
}
</style>
