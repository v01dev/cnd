<template>
  <div>
    <div class="mt-24 create-dev">
      <vs-input label-placeholder="Developer Name" v-model="developer.name"></vs-input>
      <vs-input label-placeholder="Developer Phone Number" v-model="developer.tel"></vs-input>
      <vs-input label-placeholder="Developer Email" v-model="developer.email"></vs-input>
      <vs-input label-placeholder="Developer Year of Formation" v-model="developer.yearFormed"></vs-input>
      <vs-input label-placeholder="Developer State" v-model="developer.state"></vs-input>
      <!--<vs-input v-model="developer.city"></vs-input>-->
      <vs-input label-placeholder="Developer Address" v-model="developer.address"></vs-input>
      <vs-button :key="this.$store.state.userObject.developer" @click="createDeveloper()"
                 v-if="this.$store.state.userObject.developer == null">Create New Developer
      </vs-button>
      <vs-button @click="updateDeveloper()" v-else>Update Developer</vs-button>
    </div>
  </div>
</template>

<script>
    import {API, graphqlOperation} from "aws-amplify";
    import {createDeveloper, updateDeveloper, updateUser} from "../graphql/mutations";
    import {getDeveloper, getUser} from "../graphql/queries";

    export default {
        data() {
            return {
                user: {},
                developer: {
                    name: "",
                    tel: "",
                    email: "",
                    developerUserId: this.$store.state.userObject.id,
                    yearFormed: 1971,
                    state: "",
                    zip: "",
                    address: "",

                },
                developerExists: false,
                created_dev: false,
            };
        },
        methods: {
            setUser() {
                this.user = this.$store.state.userObject;
                //console.log(this.user);
                //console.log("i'm user");
            },
            async getDeveloper() {
                if (this.user.developer != null) {
                    this.developer = await API.graphql(graphqlOperation(getDeveloper, {id: this.$store.state.userObject.developer.id}));
                    this.developer = this.developer.data.getDeveloper;
                    //console.log("i'm developer");
                }
            },
            async createDeveloper() {
                //console.log(this.developer);
                let createdDev = await API.graphql(graphqlOperation(createDeveloper, {input: this.developer}));
                createdDev = createdDev.data.createDeveloper.id;
                this.user.userDeveloperId = createdDev;
                let updatedUser = {
                    id: this.$store.state.userObject.id,
                    userDeveloperId: createdDev,
                };
                updatedUser = await API.graphql(graphqlOperation(updateUser, {input: updatedUser}));
                this.$store.commit("setUserObject", updatedUser.data.updateUser);
                this.setUser();
                this.getDeveloper();
            },
            async updateDeveloper() {
                let devUpdate = {
                    id: this.developer.id,
                    name: this.developer.name,
                    tel: this.developer.tel,
                    email: this.developer.email,
                    yearFormed: this.developer.yearFormed,
                    state: this.developer.state,
                    zip: this.developer.zip,
                    address: this.developer.address,
                };
                let response = await API.graphql(graphqlOperation(updateDeveloper, {input: devUpdate}));
                let getUpdatedUser = await API.graphql(graphqlOperation(getUser, {id: this.$store.state.userObject.id}));
                this.$store.commit("setUserObject", getUpdatedUser.data.getUser);
                this.setUser();
                this.getDeveloper();
            }
        },
        created() {
            this.setUser();
            this.getDeveloper();
        }
    };
</script>

<style>
  .create-dev input {
    margin-bottom: 10px;
  }
</style>
