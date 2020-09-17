<template>
  <div
    class="the-navbar__user-meta flex items-center"
    v-if="this.$store.state.userObject"
  >
    <vs-dropdown
      class="cursor-pointer"
      vs-custom-content
      vs-trigger-click
      :key="this.$route.path"
    >
      <div class="con-img ml-3 relative">
        <img
          :src="userImage"
          alt="user-img"
          class="rounded-full shadow-md cursor-pointer block"
          height="40"
          key="onlineImg"
          v-if="userImage != ''"
          width="40"
        />
        <div
          class="rounded-full shadow-md block flex items-center justify-center"
          style="width:40px; height:40px;"
          v-else
        >
          <img
            style="width: 20px; height: 20px;"
            src="../../../../../public/user-solid.svg"
          />
        </div>
        <vs-chip
          class="absolute notifications-count"
          color="danger"
          v-if="
            this.$store.state.userObject.notifications != undefined &&
              this.$store.state.userObject.notifications.items.length > 0
          "
          >{{
            this.$store.state.userObject.notifications.items.length
          }}</vs-chip
        >
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <router-link class="dropdown-link" to="../../../my-deals"
              >My Deals</router-link
            >
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <router-link class="dropdown-link" to="../../../favorites"
              >My Favorites</router-link
            >
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            v-if="this.$store.state.sa"
          >
            <router-link class="dropdown-link" to="../../../devtools"
              >Seller Tools</router-link
            >
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white relative"
          >
            <router-link class="dropdown-link" to="../../../notifications"
              >Notifications</router-link
            >
            <vs-chip
              class="absolute notifications-count notification-count--inner"
              color="danger"
              v-if="
                this.$store.state.userObject.notifications != undefined &&
                  this.$store.state.userObject.notifications.items.length > 0
              "
              >{{
                this.$store.state.userObject.notifications.items.length
              }}</vs-chip
            >
          </li>
          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <router-link class="dropdown-link" to="../../../investors">Investors</router-link>
          </li>
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <router-link class="dropdown-link" to="../../../sellers">Sellers</router-link>
          </li>
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <router-link class="dropdown-link" to="../../../company">Company</router-link>
          </li>
          <vs-divider/>
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <router-link class="dropdown-link" to="../../../support">Support</router-link>
          </li>-->
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <router-link class="dropdown-link" to="../../../contact"
              >Contact</router-link
            >
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            v-if="this.$store.state.sa"
          >
            <router-link class="dropdown-link" to="../../access-requests"
              >Access Requests</router-link
            >
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <router-link class="dropdown-link" to="../../edit-profile"
              >Edit Profile</router-link
            >
          </li>
          <li
            @click="logout"
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { Auth, Storage } from "aws-amplify";

export default {
  data() {
    return {
      username: "default",
      userImage: "",
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    getUserImage() {
      if (this.$store.state.userObject.avatar != null) {
        Storage.get(this.$store.state.userObject.avatar).then((result) => {
          this.userImage = result;
        });
      }
    },
    async logout() {
      this.$store.commit("log");
      Auth.signOut().then((data) => console.log(data));
      this.$store.commit("setCurrentUser", this.username);
      this.$store.commit("setUserObject", {});
      this.$router.push("/login").catch(() => {});
    },
  },
  watch: {
    "$store.state.userObject.avatar": function() {
      this.getUserImage();
    },
  },
  created() {
    this.getUserImage();
  },
};
</script>

<style>
.dropdown-link {
  color: inherit !important;
}

.name-navbar {
  font-size: 13px;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
}

.notifications-count {
  top: -20%;
  right: -30%;
  cursor: pointer;
  z-index: 1000;
}

.notification-count--inner {
  left: -15%;
  top: 12%;
  right: unset;
}
</style>
