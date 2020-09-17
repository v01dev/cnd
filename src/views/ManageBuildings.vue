<template>
  <div class="units-wrapper form-area">
    <vs-table :data="myBuildings" search stripe>
      <template slot="header">
        <h1 class="w-full text-left section-title">My Buildings</h1>
      </template>
      <template slot="thead">
        <vs-th>Name <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>City <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Deal Count <vx-tooltip
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
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].name">{{data[indextr].name}}</vs-td>

          <vs-td :data="data[indextr].city">{{ data[indextr].city }}</vs-td>

          <vs-td :data="data[indextr].deal">{{data[indextr].deal.items.length}}</vs-td>

          <vs-td :data="data[indextr].id">
            <router-link
              :to="'../../building-details/' + data[indextr].id"
              class="ml-2 mr-2"
              target="_blank"
            >
              <vs-icon color="#626262" icon="visibility" size="small"></vs-icon>
            </router-link>
            <router-link
              :to="'../../create-building/' + data[indextr].id + '/edit'"
              class="ml-2 mr-2"
            >
              <vs-icon color="#626262" icon="create" size="small"></vs-icon>
            </router-link>
            <vs-icon
              @click="deleteBuilding(data[indextr].id, indextr)"
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
import { deleteBuilding } from "../graphql/mutations";
import { listMyBuildings } from "../graphql/custom-queries";

export default {
  data() {
    return {
      myBuildings: [],
      selected: [],
    };
  },
  methods: {
    async listMyBuildings() {
      this.myBuildings = await API.graphql(
        graphqlOperation(listMyBuildings, {
          limit: 1000,
          filter: { owner: { eq: this.$store.state.userObject.id } },
        })
      );
      this.myBuildings = this.myBuildings.data.listBuildings.items;
    },
    async deleteBuilding(id, index) {
      let deleteInput = {};
      deleteInput.id = id;
      await API.graphql(
        graphqlOperation(deleteBuilding, { input: deleteInput })
      );
      this.myBuildings.splice(index, 1);
    },
  },
  mounted() {
    this.listMyBuildings();
  },
};
</script>

<style>
td span a {
  z-index: 1000;
}
</style>
