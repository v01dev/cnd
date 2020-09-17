<template>
  <div class="units-wrapper form-area">
    <vs-table :data="myUnits" search stripe>
      <template slot="header">
        <h1 class="w-full text-left section-title">My Units</h1>
      </template>
      <template slot="thead">
        <vs-th>Nickname <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>Building <vx-tooltip
    title="Tooltip title"
    color="success"
    class="inline"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></vs-th>
        <vs-th>In Deal <vx-tooltip
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
          <vs-td :data="data[indextr]">{{data[indextr].nickname}}</vs-td>

          <vs-td
            :data="data[indextr].buildingName.name"
            v-if="data[indextr].buildingName != null"
          >{{data[indextr].buildingName.name}}</vs-td>
          <vs-td :data="data[indextr].buildingName" v-else></vs-td>
          <vs-td :data="data[indextr].deal">
            <router-link
              :to="'../../deal-details/' + data[indextr].deal.id"
              target="_blank"
              v-if="data[indextr].deal != null"
            >View Deal</router-link>
            <span v-else>Not In Deal</span>
          </vs-td>

          <vs-td :data="data[indextr].id">
            <router-link
              :to="'../../unit-details/' + data[indextr].id"
              class="ml-2 mr-2"
              target="_blank"
            >
              <vs-icon color="#626262" icon="visibility" size="small"></vs-icon>
            </router-link>
            <router-link :to="'../../create-unit/' + data[indextr].id + '/edit'" class="ml-2 mr-2">
              <vs-icon color="#626262" icon="create" size="small"></vs-icon>
            </router-link>
            <vs-icon
              @click="deleteUnit(data[indextr].id, indextr)"
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
import { deleteUnit } from "../graphql/mutations";
import { listMyUnits } from "../graphql/custom-queries";

export default {
  data() {
    return {
      myUnits: [],
      selected: []
    };
  },
  methods: {
    async listMyUnits() {
      this.myUnits = await API.graphql(
        graphqlOperation(listMyUnits, {
          limit: 1000,
          filter: { owner: { eq: this.$store.state.userObject.id } }
        })
      );
      this.myUnits = this.myUnits.data.listUnits.items;
    },
    async deleteUnit(id, index) {
      let deleteInput = {};
      deleteInput.id = id;
      await API.graphql(graphqlOperation(deleteUnit, { input: deleteInput }));
      this.myUnits.splice(index, 1);
    }
  },
  mounted() {
    this.listMyUnits();
  }
};
</script>

<style>
.con-tablex.vs-table--content {
    margin-left: 5%;
    width: 95%;
}
</style>
