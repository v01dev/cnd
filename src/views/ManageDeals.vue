<template>
  <div class="units-wrapper form-area">
    <vs-table :data="myDeals" search stripe v-if="loaded">
      <template slot="header">
        <h1 class="w-full text-left section-title">My Deals</h1>
      </template>
      <template slot="thead">
        <vs-th>Title <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Building <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Unit Types <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Unit Count <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Actions <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr
          :data="tr"
          :key="indextr"
          v-for="(tr, indextr) in data"
          v-if="data[indextr].building != null && data[indextr].unitNumbers != null"
        >
          <vs-td :data="data[indextr]" v-if="data[indextr].title != null">{{data[indextr].title}}</vs-td>
          <vs-td v-else>Deal</vs-td>
          <vs-td
            :data="data[indextr].building.name"
            v-if="data[indextr].building != null"
          >{{data[indextr].building.name}}</vs-td>
          <vs-td v-else>None</vs-td>
          <vs-td
            :data="data[indextr].unitNumbers"
            v-if="data[indextr].unitNumbers != null"
          >{{data[indextr].units.items.length}}</vs-td>
          <vs-td
              :data="data[indextr].unitCount"
          >{{data[indextr].unitCount}}</vs-td>
          <vs-td :data="data[indextr].id">
            <router-link
              :to="'../../deal-details/' + data[indextr].id"
              class="ml-2 mr-2"
              target="_blank"
            >
              <vs-icon color="#626262" icon="visibility" size="small"></vs-icon>
            </router-link>
            <router-link :to="'../../create-deal/' + data[indextr].id + '/edit'" class="ml-2 mr-2">
              <vs-icon color="#626262" icon="create" size="small"></vs-icon>
            </router-link>
            <vs-icon
              @click="deleteDeal(data[indextr].id, indextr)"
              class="ml-2 mr-2 cursor-pointer"
              color="#626262"
              icon="delete_forever"
              size="small"
            ></vs-icon>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { deleteDeal } from "../graphql/mutations";
import { listDeals } from "../graphql/custom-queries";

export default {
  data() {
    return {
      myDeals: [],
      selected: [],
        loaded: false,
    };
  },
  methods: {
    async listMyDeals() {
      this.myDeals = await API.graphql(
        graphqlOperation(listDeals, {
          limit: 1000,
          filter: { owner: { eq: this.$store.state.userObject.id } }
        })
      );
      this.myDeals = this.myDeals.data.listDeals.items;
      this.myDeals.forEach((item,index) => {
          let counter = 0;
          item.units.items.forEach((unit,index) => {
              counter += unit.quantity;
          })
          this.myDeals[index].unitCount = counter;
      })
        this.loaded = true;
      ////console.log(this.myDeals);
    },
    async deleteDeal(id, index) {
      let deleteInput = {};
      deleteInput.id = id;
      await API.graphql(graphqlOperation(deleteDeal, { input: deleteInput }));
      this.myDeals.splice(index, 1);
    }
  },
  mounted() {
    this.listMyDeals();
  }
};
</script>

<style>
</style>
